const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPE = 'playlist-modify-public';

// --- PKCE helpers ---

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64UrlEncode(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

async function generateCodeChallenge(verifier) {
    const hashed = await sha256(verifier);
    return base64UrlEncode(hashed);
}

// --- Token storage helpers ---

function saveTokens({ access_token, refresh_token, expires_in }) {
    const expiresAt = Date.now() + expires_in * 1000;
    localStorage.setItem('spotify_access_token', access_token);
    localStorage.setItem('spotify_token_expires_at', String(expiresAt));
    if (refresh_token) {
        localStorage.setItem('spotify_refresh_token', refresh_token);
    }
}

function getStoredAccessToken() {
    const token = localStorage.getItem('spotify_access_token');
    const expiresAt = Number(localStorage.getItem('spotify_token_expires_at'));
    if (token && Date.now() < expiresAt) {
        return token;
    }
    return null;
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    if (!refreshToken) return null;

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        })
    });

    if (!response.ok) return null;

    const data = await response.json();
    saveTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token || refreshToken,
        expires_in: data.expires_in
    });
    return data.access_token;
}

async function exchangeCodeForToken(code) {
    const codeVerifier = localStorage.getItem('spotify_code_verifier');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        })
    });

    if (!response.ok) {
        throw new Error('Failed to exchange authorization code for token');
    }

    const data = await response.json();
    saveTokens(data);
    localStorage.removeItem('spotify_code_verifier');
    return data.access_token;
}

async function redirectToSpotifyAuth() {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: SCOPE,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });

    window.location = `${AUTH_ENDPOINT}?${params.toString()}`;
}

// --- Public API ---

const Spotify = {
    async getAccessToken() {
        // 1. Already have a valid token in memory/storage
        const existingToken = getStoredAccessToken();
        if (existingToken) return existingToken;

        // 2. Returning from Spotify redirect with an authorization code
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        if (code) {
            window.history.pushState('Access Token', null, '/');
            return exchangeCodeForToken(code);
        }

        // 3. Try refreshing an expired token
        const refreshed = await refreshAccessToken();
        if (refreshed) return refreshed;

        // 4. No valid token, no code, no refresh token: start auth flow
        await redirectToSpotifyAuth();
        return null; // execution stops here; browser redirects away
    },

    async search(term) {
        const token = await Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    async savePlaylist(name, trackUris) {
        if (!name || trackUris.length === 0) return;

        const token = await Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const response = await fetch('https://api.spotify.com/v1/me', { headers });
        const { id: userId } = await response.json();

        const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ name })
        });
        const playlist = await createResponse.json();

        await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
        });
    }
};

export default Spotify;
const clientId = ''; // Your Spotify client ID (WEB API blocked, as I do not have a premium account)
const redirectUri = ''; // Your redirect URL
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        // Check for access token in URL after redirect
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            const expiresIn = Number(expiresMatch[1]);

            // Clear token after it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // Redirect to Spotify authorization
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = authUrl;
        }
    },

    async search(term) {
        const token = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
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

        const token = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        let userId;

        // Get user ID
        const response = await fetch('https://api.spotify.com/v1/me', { headers });
        const jsonResponse = await response.json();
        userId = jsonResponse.id;

        // Create a new playlist
        const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ name })
        });
        const playlist = await createResponse.json();

        // Add tracks to the playlist
        await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
        });
    }
};

export default Spotify;
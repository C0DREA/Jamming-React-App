// Creating a mock Spotify module for testing purposes, until the real Spotify module is integrated.

const mockTracks = [
    {
        id: '1',
        name: 'Mock Song One',
        artist: 'Mock Artist',
        album: 'Mock Album',
        uri: 'spotify:track:1'
    },
    {
        id: '2',
        name: 'Mock Song Two',
        artist: 'Another Artist',
        album: 'Fake Album',
        uri: 'spotify:track:2'
    },
    {
        id: '3',
        name: 'Mock Song Three',
        artist: 'Someone Else',
        album: 'Imaginary Album',
        uri: 'spotify:track:3'
    }
];

const Spotify = {
    search(term) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    mockTracks.filter(track =>
                        track.name.toLowerCase().includes(term.toLowerCase())
                    )
                );
            }, 500); // simulate network delay
        });
    },

    savePlaylist(name, trackUris) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Playlist saved!');
                console.log('Name:', name);
                console.log('Tracks:', trackUris);
                resolve();
            }, 500); // simulate network delay
        });
    }
};

export default Spotify;
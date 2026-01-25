import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import TrackList from './components/Tracklist/Tracklist.jsx';
import Playlist from './components/Playlist/Playlist.jsx';
import { useState } from 'react';

function App() {

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const search = (term) => {
    const mockResults = [
      { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A' },
      { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B' },
      { id: 3, name: 'Song C', artist: 'Artist C', album: 'Album C' }
    ]
    setSearchResults(mockResults);
  }
  
  const addTrack = (track) => {
    // preventing duplicates
    if(!playlistTracks.find(t => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  const savePlaylist = (tracks) => {
    const trackNames = tracks.map(track => track.name);
    console.log('Saving playlist to Spotify:', trackNames)
  };

  return (
    <div className='app'>
      <Header />
      <SearchBar onSearch={search} />
      <div className='content'>
        <TrackList tracks={searchResults} isRemoval={false} onAdd={addTrack} />
        <Playlist 
          name='My Playlist' 
          tracks={playlistTracks}
          onRemove={removeTrack}
          onSave={savePlaylist}/>
      </div>
    </div>
  );
}

export default App;
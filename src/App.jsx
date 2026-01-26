import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import TrackList from './components/Tracklist/Tracklist.jsx';
import Playlist from './components/Playlist/Playlist.jsx';
import { useState } from 'react';
import Spotify from './util/Spotify.js';

function App() {

  // setting states

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [searchResults, setSearchResults] = useState([]);

  // adding loading states

  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // functions

  const search = async (term) => {

    // error handling for search

    try {
      setIsSearching(true);
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed!', error);
    } finally {
      setIsSearching(false);
    };

    // original version without error handling

    setIsSearching(true);
    const results = await Spotify.search(term);
    setSearchResults(results);
    setIsSearching(false);
  };
  
  const addTrack = (track) => {
    // preventing duplicates
    if(!playlistTracks.find(t => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  // error handling for savePlaylist
  const savePlaylist = async (tracks) => {
    
    if (trackUris.length === 0) return;

    setIsSaving(true);
    try {
      const trackUris = tracks.map(track => track.uri);
      await Spotify.savePlaylist(playlistName, trackUris);

      setPlaylistTracks([]); // clear playlist after saving
      setPlaylistName('New Playlist'); // reset playlist name

    } catch (error) {
      console.error('Save playlist failed!', error);
      
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='app'>
      <Header />
      <SearchBar 
        onSearch={search} 
        isSearching={isSearching} 
      />
      <div className='content'>
        <TrackList 
          tracks={searchResults} 
          isRemoval={false} 
          onAdd={addTrack}
          playlistTracks={playlistTracks} 
        />
        <Playlist
          tracks={playlistTracks}
          onRemove={removeTrack}
          onSave={savePlaylist}
          playlistName={playlistName}
          onNameChange={setPlaylistName}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}

export default App;
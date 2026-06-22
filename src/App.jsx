// ============================================
// Jamming Playlist App - Main Application
// This is the main component that manages:
// - Searching for songs using Spotify API
// - Adding/removing tracks from playlist
// - Saving playlist to Spotify user account
// ============================================

import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import TrackList from './components/Tracklist/Tracklist.jsx';
import Playlist from './components/Playlist/Playlist.jsx';
import { useState } from 'react';
import Spotify from './util/Spotify.js';

function App() {

// STATE MANAGEMENT - Variables that track app data and update the UI

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [searchResults, setSearchResults] = useState([]);

  // adding loading states

  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // functions

  // SEARCH FUNCTION - Gets song results from Spotify when user searches

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
  };

  // ADD TRACK FUNCTION - Adds selected song to playlist (prevents duplicates)

  const addTrack = (track) => {
    // preventing duplicates
    if(!playlistTracks.find(t => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // REMOVE TRACK FUNCTION - Removes song from playlist

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  // SAVE PLAYLIST FUNCTION - Saves the playlist to user's Spotify account (with error handling)
  
  const savePlaylist = async (tracks) => {
    const trackUris = tracks.map(track => track.uri);
    if (trackUris.length === 0) return;

    setIsSaving(true);
    try {
      await Spotify.savePlaylist(playlistName, trackUris);

      setPlaylistTracks([]); // clear playlist after saving
      setPlaylistName('New Playlist'); // reset playlist name

    } catch (error) {
      console.error('Save playlist failed!', error);
      
    } finally {
      setIsSaving(false);
    }
  };

  // UI LAYOUT - Shows header, search bar, search results on left, playlist on right
  
  return (
    <div className='app'>
      <Header />
      
      <div className='content'>
        <div className='left-column'>
          <SearchBar 
            onSearch={search} 
            isSearching={isSearching} 
          />
          <div className="results">
            <h2>Results</h2>
            <TrackList 
              tracks={searchResults} 
              isRemoval={false} 
              onAdd={addTrack}
              playlistTracks={playlistTracks} 
            />
          </div>
        </div>
        <div className='right-column'>
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
    </div>
    );
  }

export default App;
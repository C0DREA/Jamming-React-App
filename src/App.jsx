import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import TrackList from './components/Tracklist/Tracklist.jsx';
import Playlist from './components/Playlist/Playlist.jsx';

function App() {

  const searchResults = [
    {
      id: 1,
      name: 'Song A',
      artist: 'Artist A',
      album: 'Album A'
    },
    {
      id: 2,
      name: 'Song B',
      artist: 'Artist B',
      album: 'Album B'
    }
  ];

  const playlistTracks = [];

  return (
    <div className='app'>
      <Header />
      <SearchBar />
      <div className='content'>
        <TrackList tracks={searchResults} />
        <Playlist name='My Playlist' tracks={playlistTracks}/>
      </div>
    </div>
  );
}

export default App;
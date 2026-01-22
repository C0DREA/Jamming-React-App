import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import TrackList from './components/Tracklist/Tracklist.jsx';
import Playlist from './components/Playlist/Playlist.jsx';

function App() {
  return (
    <div className='app'>
      <Header />
      <SearchBar />
      <div className='content'>
        <TrackList />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
// SEARCH BAR COMPONENT

import React from "react";
import "./SearchBar.css";
import { useState } from "react";

// Input field where user types song/artist/album names
// Has search button and keyboard Enter support
// Disabled during active search

function SearchBar({ onSearch, isSearching }) {

    // Track what user is typing in the input field

    const [term, setTerm] = useState("");

    // UPDATE INPUT - Saves what user types

    const handleChange = (e) => setTerm(e.target.value);

    // TRIGGER SEARCH - Calls the search function from App

    const handleSearch = () => {
        if (onSearch) onSearch(term);
    };

    // KEYBOARD SUPPORT - Allow Enter key to trigger search

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    // RENDER - Shows input field and search button
    
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Enter a song, artist, or album..." 
                value={term} 
                onChange={handleChange} 
                onKeyDown={handleKeyPress}
                disabled={isSearching}
            />
            <button 
                onClick={handleSearch}
                disabled={isSearching}
            >
                {isSearching ? 'Searching...' : 'Search'}
            </button>
        </div>
    );
}

export default SearchBar;
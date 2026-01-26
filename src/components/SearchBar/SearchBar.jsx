import React from "react";
import { useState } from "react";

function SearchBar({ onSearch, isSearching }) {

    const [term, setTerm] = useState("");

    const handleChange = (e) => setTerm(e.target.value);

    const handleSearch = () => {
        if (onSearch) onSearch(term);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

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
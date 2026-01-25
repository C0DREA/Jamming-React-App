import React from "react";
import { useState } from "react";

function SearchBar({ onSearch }) {

    const [term, setTerm] = useState("");

    const handleChange = (e) => setTerm(e.target.value);

    const handleSearch = () => {
        if (onSearch) onSearch(term);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <section>
            <input 
                type="text" 
                placeholder="Search..." 
                value={term} 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} />
            <button onClick={handleSearch}>Search</button>
        </section>
    );
}

export default SearchBar;
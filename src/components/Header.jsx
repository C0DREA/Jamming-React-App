// HEADER COMPONENT

import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import './Header.css';

// Displays app title and dark mode toggle button

function Header() {

    // Uses ThemeContext to access dark mode state
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    // Retrieves dark mode state and toggle function from ThemeContext
    
    return (
        <header>
            <h1>Jamming</h1>
            <button 
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
}

export default Header;
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import './Header.css';

function Header() {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

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
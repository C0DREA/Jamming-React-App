// ============================================
// THEME CONTEXT - Dark/Light Mode System
// Manages theme state across entire app
// Saves user preference to browser storage
// ============================================

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    // INITIALIZE THEME STATE
    // Check if user previously selected a theme
    // If not, use system preference (dark mode if device uses it)
    // Otherwise default to light mode

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage for theme preference
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        // Default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // SAVE AND APPLY THEME
    // Saves theme choice to browser storage so it remembers next time
    // Updates HTML document with theme attribute for CSS to use

    useEffect(() => {
        // Save the preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update the root element class
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // TOGGLE FUNCTION - Switch between dark and light mode

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // PROVIDE THEME TO ALL COMPONENTS
    // Any component can access isDarkMode and toggleTheme function

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
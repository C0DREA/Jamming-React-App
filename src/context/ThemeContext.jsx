// Creating a ThemeContext to manage light and dark themes in a React application

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage for theme preference
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        // Default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Save the preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update the root element class
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
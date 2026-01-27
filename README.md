# Jamming - Spotify Playlist Creator 🎵

## Overview
Jamming is a React web application that allows users to search for songs using the Spotify API and create custom playlists that can be saved directly to their Spotify account. Built with modern React patterns and styled with a beautiful dark/light mode toggle.

## Features ✨

- 🔍 **Song Search** - Search for songs, artists, or albums using Spotify's search API
- ➕ **Add Tracks** - Add songs to your custom playlist
- ❌ **Remove Tracks** - Remove songs from your playlist
- 💾 **Save Playlists** - Save your created playlist directly to your Spotify account
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistent storage
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Error Handling** - Robust error handling and user feedback

## Tech Stack 🛠️

- **Frontend Framework:** React 18 with Vite
- **State Management:** React Hooks (useState, useContext)
- **API Integration:** Spotify Web API
- **Styling:** CSS3 with CSS Variables (for theme support)
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)

## Installation 📦

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Spotify Developer Account (for API credentials)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/C0DREA/Jamming-React-App.git
   cd jamming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get Spotify API Credentials**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app to get your Client ID
   - Add `http://localhost:5173/` to Redirect URIs (adjust port if needed)

4. **Configure API Keys**
   - Open `src/util/Spotify.js`
   - Add your Spotify Client ID:
   ```javascript
   const CLIENT_ID = 'your_client_id_here';
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

## Usage 🎧

1. **Search for Songs**
   - Enter a song name, artist, or album in the search bar
   - Click "Search" or press Enter
   - Results will appear on the left side

2. **Create Your Playlist**
   - Click "Add" on any song to add it to your playlist
   - Change the playlist name (default: "New Playlist")
   - View all added tracks on the right side

3. **Save to Spotify**
   - Click "Save to Spotify" to save your playlist
   - You'll be redirected to Spotify for authentication
   - Your playlist will appear in your Spotify account!

4. **Toggle Dark Mode**
   - Click the "Dark Mode" button in the header
   - Your preference is saved and persists across sessions

## Project Structure 📁

```
src/
├── App.jsx                 # Main app component
├── App.css                 # App styles
├── main.jsx               # React entry point
├── index.css              # Global styles with theme variables
├── components/
│   ├── Header.jsx         # App header with theme toggle
│   ├── Header.css
│   ├── SearchBar/         # Search input component
│   ├── Playlist/          # Playlist display component
│   ├── Tracklist/         # List of tracks component
│   └── Track/             # Individual track item component
├── context/
│   └── ThemeContext.jsx   # Dark/Light mode context
└── util/
    ├── Spotify.js         # Spotify API integration
    └── SpotifyMock.js     # Mock data for testing
```

## Key Components 🧩

### App Component
Main component managing:
- Search functionality
- Playlist state (adding/removing tracks)
- Spotify API communication

### ThemeContext
Manages application theme:
- Stores user preference in localStorage
- Provides dark/light mode toggle
- Respects system preferences

### SearchBar Component
Handles user input:
- Text input with placeholder
- Enter key support
- Loading state during search

### Playlist Component
Displays playlist information:
- Editable playlist name
- Track list with remove buttons
- Save to Spotify button

## Features Explained 🔍

### Dark Mode Implementation
The app uses React Context API to manage theme state globally. CSS variables change based on the `data-theme` attribute, providing smooth transitions between light and dark modes.

### Duplicate Prevention
When adding tracks to the playlist, the app checks if the track already exists using the track ID, preventing duplicates.

### Error Handling
API calls include try/catch blocks with user-friendly error messages logged to the console.

## Future Improvements 🚀

- [ ] Add ability to reorder tracks in playlist
- [ ] Show album artwork/cover images
- [ ] Play preview of songs
- [ ] View existing Spotify playlists
- [ ] Share playlists with friends
- [ ] Add music visualizer animation

## Known Issues 🐛

- Spotify API requires authentication every session
- Some songs may not have preview URLs available

## Learning Resources 📚

- [React Documentation](https://react.dev)
- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## License 📄

This project is open source and available under the MIT License.

## Author 👨‍💻

Created as a Codecademy Front-End Engineer Career Path project.

---

**Made with ❤️ by C0drea**

// PLAYLIST COMPONENT
// Shows playlist name input, track list, and save button
// Displays message if playlist is empty

import React from "react";
import TrackList from "../Tracklist/Tracklist";

function Playlist({ tracks, onRemove, onSave, playlistName, onNameChange, isSaving }) {

    // UPDATE PLAYLIST NAME - Saves whatever user types as playlist name

    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    // SAVE TO SPOTIFY - Sends playlist to user's Spotify account

    const handleSave = () => {
        if(onSave) onSave(tracks);
    };

    // RENDER PLAYLIST SECTION
        // - Input field for playlist name
        // - Empty state message if no tracks
        // - Track list if tracks exist
        // - Save button (disabled if empty or saving)

    return (
        <section className="playlist">
            <input 
                value={playlistName}
                onChange={handleNameChange}
                placeholder="New playlist"
            />
            {tracks.length === 0  && <p>Your playlist is empty. Add some tracks!</p>}
            
            {tracks && tracks.length > 0 && (
                <TrackList 
                    tracks={tracks} 
                    isRemoval={true} 
                    onRemove={onRemove} 
                />
            )}

            <button 
                onClick={handleSave}
                disabled={tracks.length === 0 || isSaving}
            >
                {isSaving ? 'Saving...' : 'Save to Spotify'}
            </button>
            
        </section>
    );
}

export default Playlist;
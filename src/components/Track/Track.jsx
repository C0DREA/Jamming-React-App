// TRACK COMPONENT
// Displays one song with: Title, Artist, Album, and Action Button
// Action button is either "Add" (for search results) or "Remove" (for playlist)
// Shows "Added" state if track is already in playlist

import React from "react";
import './Track.css';

function Track({ track, isRemoval, onAdd, onRemove, isDisabled }) {

    // ADD THIS SONG - Adds track to playlist

    const handleAdd = () => {
        if (onAdd) onAdd(track);
    }

    // REMOVE THIS SONG - Removes track from playlist

    const handleRemove = () => {
        if(onRemove) onRemove(track);
    };

    // RENDER SINGLE TRACK
    // Left side: Song info (title, artist, album)
    // Right side: Add or Remove button

    return (
        <div className="track">
            <div>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {!isRemoval && <button onClick={handleAdd} disabled={isDisabled}>{isDisabled ? 'Added' : 'Add'}</button>}
            {isRemoval && <button onClick={handleRemove}>Remove</button>}
        </div>
    );
}

export default Track;
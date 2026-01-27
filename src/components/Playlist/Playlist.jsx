import React from "react";
import TrackList from "../Tracklist/Tracklist";

function Playlist({ tracks, onRemove, onSave, playlistName, onNameChange, isSaving }) {

    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    const handleSave = () => {
        if(onSave) onSave(tracks);
    };

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
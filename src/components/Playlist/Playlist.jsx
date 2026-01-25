import React from "react";
import TrackList from "../Tracklist/Tracklist";
import Track from "../Track/Track";

function Playlist({ name, tracks, onRemove, onSave }) {

    const handleSave = () => {
        if(onSave) onSave(tracks);
    };

    return (
        <section>
            <h2>{name}</h2>
            
            {tracks && tracks.length > 0 ? (
                <TrackList 
                    tracks={tracks} 
                    isRemoval={true} 
                    onRemove={onRemove} 
                />
            ) : (
                <p>No tracks here yet...</p>
            )}
            <button onClick={handleSave}>Save to Spotify</button>
            
        </section>
    );
}

export default Playlist;
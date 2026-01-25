import React from "react";
import TrackList from "../Tracklist/Tracklist";
import Track from "../Track/Track";

function Playlist({ name, tracks }) {
    return (
        <section>
            <h2>{name}</h2>
            
            {tracks && tracks.length > 0 ? (
                <TrackList tracks={tracks} />
            ) : (
                <p>No tracks here yet...</p>
            )}
            
        </section>
    );
}

export default Playlist;
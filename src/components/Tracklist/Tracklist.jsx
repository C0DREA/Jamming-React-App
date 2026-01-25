import React from "react";
import Track from "../Track/Track.jsx";

function TrackList({ tracks }) {
    return (
        <section>
            <h2>Results</h2>

            {tracks && tracks.length > 0 ? (
                tracks.map(track => (
                    <Track key={track.id} track={track} />
                ))
            ) : (
                <p>Tracks will appear here</p>
            )}            
        </section>
    );
}

export default TrackList;
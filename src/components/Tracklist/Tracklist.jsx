import React from "react";
import Track from "../Track/Track.jsx";

function TrackList({ tracks, isRemoval, onAdd, onRemove, playlistTracks }) {
    return (
        <section className="trackList">
            {tracks.map(track => {
                const isInPlaylist = playlistTracks?.some(
                    t => t.id === track.id
                );

                return (
                    <Track
                        key={track.id}
                        track={track}
                        isRemoval={isRemoval}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isDisabled={isInPlaylist}
                    />
                );
            })}
        </section>
    );
}

export default TrackList;
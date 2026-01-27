// TRACKLIST COMPONENT
// Displays list of tracks (either search results or playlist tracks)
// Each track shows add/remove button based on type

import React from "react";
import Track from "../Track/Track.jsx";

function TrackList({ tracks, isRemoval, onAdd, onRemove, playlistTracks }) {

    // CHECK IF TRACK IS IN PLAYLIST
    // If this is search results list, disable "Add" button for tracks already in playlist
    // If this is playlist list, show "Remove" button instead

    return (
        <section className="tracklist">
            {tracks.map(track => {

                // CREATE EACH TRACK ITEM
                // Pass all necessary data to Track component
                
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
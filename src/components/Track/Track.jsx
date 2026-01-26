import React from "react";
import './Track.css';

function Track({ track, isRemoval, onAdd, onRemove, isDisabled }) {

    const handleAdd = () => {
        if (onAdd) onAdd(track);
    }

    const handleRemove = () => {
        if(onRemove) onRemove(track);
    };

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
import React from "react";

const RandomMealButton = ({ onClick }) => {
    return (
        <button className="random-btn" onClick={onClick}>
            I am feeling hungry
        </button>
    );
};

export default RandomMealButton;

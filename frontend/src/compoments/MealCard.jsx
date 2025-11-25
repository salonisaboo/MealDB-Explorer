import React from "react";

const MealCard = ({ meal, onClick }) => {
    return (
        <div className="meal-card" onClick={onClick}>
            <img src={meal.thumbnail} alt={meal.name} />
            <div className="meal-card-body">
                <h3>{meal.name}</h3>
            </div>
        </div>
    );
};

export default MealCard;

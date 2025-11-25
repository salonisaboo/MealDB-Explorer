import React from "react";
import MealCard from "./MealCard.jsx";
import { fetchMealsById } from "../api/mealsApi.js";

const MealGrid = ({ meals, onSelectMeal }) => {
    if (!meals) return null;

    const list = Array.isArray(meals) ? meals : [meals];

    const handleClick = async (meal) => {
        const fullMeal = await fetchMealsById(meal.id);
        onSelectMeal(fullMeal);
    };

    return (
        <div className="meal-grid">
            {list.map((meal) => (
                <MealCard
                    key={meal.id}
                    meal={meal}
                    onClick={() => handleClick(meal)}
                />
            ))}
        </div>
    );
};

export default MealGrid;

import React from "react";

const MealDetailsModal = ({ meal, onClose }) => {
    if (!meal) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-btn" onClick={onClose}>Close</button>

                <h2>{meal.name}</h2>

                <img src={meal.thumbnail} alt={meal.name} />

                <div className="ingredients-container">
                    <h3>Ingredients</h3>

                    {meal.ingredients && meal.ingredients.length > 0 ? (
                        <ul>
                            {meal.ingredients.map((item, i) => (
                                <li key={i}>
                                    <strong>{item.name}</strong> — {item.measure}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No ingredients found.</p>
                    )}
                </div>

                <div className="instructions-container">
                    <h3>Instructions</h3>

                    {meal.instructions ? (
                        <ol>
                            {meal.instructions
                                .split(". ")
                                .filter(step => step.trim() !== "")
                                .map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                        </ol>
                    ) : (
                        <p>No instructions available.</p>
                    )}
                </div>

                {meal.youtubeUrl && (
                    <div className="video-wrapper">
                        <iframe
                            src={meal.youtubeUrl.replace("watch?v=", "embed/")}
                            title="Meal video"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MealDetailsModal;

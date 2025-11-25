import React from "react";

const CategoryList = ({ categories, selectedCategory, onClickCategory }) => {
    if (!categories || categories.length === 0) return null;

    return (
        <div className="category-list">
            {categories.map((c) => (
                <button
                    key={c.name}
                    className={`category-pill ${selectedCategory === c.name ? "active" : ""
                        }`}
                    onClick={() => onClickCategory(c.name)}
                >
                    {c.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryList;

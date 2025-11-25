import React, { useEffect, useState } from "react";
import {
    searchMeals,
    fetchCategories,
    fetchMealsByCategory,
    fetchRandomMeal,
    fetchMealsById
} from "../api/mealsApi.js";

import SearchBar from "../compoments/SearchBar.jsx";
import CategoryList from "../compoments/CategoryList.jsx";
import MealGrid from "../compoments/MealGrid.jsx";
import MealDetailsModal from "../compoments/MealDetailsModal.jsx";
import RandomMealButton from "../compoments/RandomMealButton.jsx";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);


    useEffect(() => {
        const loadDefault = async () => {
            setLoading(true);
            try {
                const data = await fetchMealsByCategory("Beef");
                setMeals(data || []);
                setSelectedCategory("Beef");
            } finally {
                setLoading(false);
            }
        };
        loadDefault();
    }, []);

    const handleSelectMeal = async (meal) => {
        setLoading(true);
        try {
            const fullMeal = await fetchMealsById(meal.id);
            setSelectedMeal(fullMeal);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = async (query) => {
        if (!query.trim()) return;

        setLoading(true);
        setSelectedCategory(null);

        try {
            const data = await searchMeals(query);
            setMeals(data || []);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = async (name) => {
        setSelectedCategory(name);
        setLoading(true);

        try {
            const data = await fetchMealsByCategory(name);
            setMeals(data || []);
        } finally {
            setLoading(false);
        }
    };

    const handleRandomClick = async () => {
        setLoading(true);

        try {
            const random = await fetchRandomMeal();

            if (random?.id) {
                const fullMeal = await fetchMealsById(random.id);
                setSelectedMeal(fullMeal);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-layout">

            <section className="controls">
                <SearchBar onSearch={handleSearch} />
                <RandomMealButton onClick={handleRandomClick} />
            </section>

            <section>
                <h2>Categories</h2>
                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onClickCategory={handleCategoryClick}
                />
            </section>

            <section className="meals-section">
                <h2>Meals</h2>

                {loading && <p>Loading...</p>}

                {!loading && meals.length > 0 && (
                    <MealGrid meals={meals} onSelectMeal={handleSelectMeal} />
                )}

                {!loading && meals.length === 0 && (
                    <p>No meals found. Try another search.</p>
                )}
            </section>

            {selectedMeal && (
                <MealDetailsModal
                    meal={selectedMeal}
                    onClose={() => setSelectedMeal(null)}
                />
            )}
        </div>
    );
};

export default HomePage;

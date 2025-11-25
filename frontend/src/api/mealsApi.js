const BASE_URL = "http://localhost:5000/api/meals";

export async function searchMeals(query) {
    if (!query || query.trim() === "") return [];
    const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    return res.json();
}

export async function fetchCategories() {
    const res = await fetch(`${BASE_URL}/categories/list`);
    return res.json();
}

export async function fetchMealsByCategory(name) {
    const res = await fetch(`${BASE_URL}/category/${encodeURIComponent(name)}`);
    return res.json();
}

export async function fetchRandomMeal() {
    const res = await fetch(`${BASE_URL}/random`);
    return res.json();
}

export async function fetchMealsById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
}

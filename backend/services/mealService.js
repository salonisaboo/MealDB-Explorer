import axios from "axios";
import cache from "../cache/cache.js";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const fetchWithCache = async (key, fetchFn) => {
  if (cache.has(key)) return cache.get(key);
  const data = await fetchFn();
  cache.set(key, data);
  return data;
};

const mapMeal = (m) => {
  if (!m) return null;
  return {
    id: m.idMeal,
    name: m.strMeal,
    category: m.strCategory,
    area: m.strArea,
    thumbnail: m.strMealThumb,
    instructions: m.strInstructions || "",
    youtubeUrl: m.strYoutube || "",
    ingredients: Array.from({ length: 20 }, (_, i) => ({
      name: m[`strIngredient${i + 1}`],
      measure: m[`strMeasure${i + 1}`],
    })).filter(i => i.name && i.name.trim() !== "")
  };
};

export const searchMeals = async (query) =>
  fetchWithCache(`search_${query}`, async () => {
    const res = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    const meals = res.data.meals || [];
    return meals.map(mapMeal);
  });

export const getMealById = async (id) => {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  const meal = res.data.meals ? res.data.meals[0] : null;
  return mapMeal(meal);
};

export const getCategories = async () =>
  fetchWithCache("categories", async () => {
    const res = await axios.get(`${BASE_URL}/list.php?c=list`);
    const list = res.data.meals || [];
    return list.map(c => ({ name: c.strCategory }));
  });

export const getMealsByCategory = async (name) =>
  fetchWithCache(`category_${name}`, async () => {
    const res = await axios.get(`${BASE_URL}/filter.php?c=${encodeURIComponent(name)}`);
    const meals = res.data.meals || [];
    
    return meals.map(m => ({
      id: m.idMeal,
      name: m.strMeal,
      thumbnail: m.strMealThumb
    }));
  });

export const getRandomMeal = async (maxAttempts = 6) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await axios.get(`${BASE_URL}/random.php`);
      const m = res.data.meals ? res.data.meals[0] : null;
      const meal = mapMeal(m);
    
      if (meal && (meal.instructions?.trim() || (meal.ingredients && meal.ingredients.length > 0))) {
        return meal;
      }
    } catch (err) {
      if (attempt === maxAttempts - 1) throw err;
    }
  }

  return null;
};

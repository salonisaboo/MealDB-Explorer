# MealDB Explorer

MealDB Explorer is a recipe browsing application built using **React** for the frontend and **Node.js + Express** for the backend.  
It interacts with TheMealDB API and uses in-memory caching to improve performance.

---

## Features

### 1. Browse Meals by Category
Users can select any category (Beef, Chicken, Dessert, etc.) to load meals from that category.

### 2. Search Meals
Search recipes by meal name. Matching recipes are displayed instantly.

### 3. Random Meal
Click the "I am feeling hungry" button to view a random recipe in a popup modal.

### 4. Recipe Modal
Each recipe displays:
- Meal image  
- Ingredients list  
- Step-by-step instructions  
- YouTube cooking video  

### 5. Fast API Performance with Caching
The backend uses **node-cache** to:
- Cache API results  
- Reduce duplicate external API calls  
- Improve response speed  
- Support TTL and size limits  

---

## Tech Stack

### Frontend
- React  
- Fetch API  
- Custom CSS  

### Backend
- Node.js  
- Express  
- Axios  
- node-cache (in-memory caching)

### External API
- TheMealDB (https://www.themealdb.com/api/json/v1/1)

---

## Folder Structure


import express from "express";
import {
  searchMeals,
  getMealById,
  getCategories,
  getMealsByCategory,
  getRandomMeal,
} from "../services/mealService.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = req.query.query ?? "";
    const data = await searchMeals(query);
    res.json(data);
  } catch (err) {
    console.error("search route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/categories/list", async (_, res) => {
  try {
    const cats = await getCategories();
    res.json(cats);
  } catch (err) {
    console.error("categories route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/category/:name", async (req, res) => {
  try {
    const data = await getMealsByCategory(req.params.name);
    res.json(data);
  } catch (err) {
    console.error("category route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/random", async (_, res) => {
  try {
    const meal = await getRandomMeal();
    res.json(meal);
  } catch (err) {
    console.error("random route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const meal = await getMealById(req.params.id);
    res.json(meal);
  } catch (err) {
    console.error("get by id route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import express from "express";
import { prisma } from "../lib/prisma.js";

// A Router is a mini-app grouping all /restaurants routes. It's mounted under
// the "/restaurants" prefix in index.ts, so paths here are relative to that.
const router = express.Router();

// GET /restaurants — return every restaurant as a JSON array.
router.get("/", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany();
  res.json(restaurants);
});

// GET /restaurants/:id — return one restaurant by id, or 404 if none exists.
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const restaurant = await prisma.restaurant.findUnique({ where: { id } });

  // findUnique returns null for a missing id — send a real 404 instead of
  // res.json(null) with a 200, and return so we don't fall through below.
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found." });
  }
  res.json(restaurant);
});

export default router;

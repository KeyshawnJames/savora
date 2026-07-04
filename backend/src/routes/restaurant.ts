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

export default router;

import express from "express";
import { prisma } from "./lib/prisma.js";
import restaurantRouter from "./routes/restaurant.js";

const app = express();
const PORT = 3000;

// Mount the restaurants router; every /restaurants* request routes into it.
app.use("/restaurants", restaurantRouter);

// Health check: confirms the server itself is up.
app.get("/", (req, res) => {
  res.send("Savora backend is running");
});

// Verifies the DB connection on startup (not part of request handling).
async function smokeTest() {
  const count = await prisma.restaurant.count();
  console.log(`✅ DB connected — ${count} restaurants`);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  smokeTest().catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
});

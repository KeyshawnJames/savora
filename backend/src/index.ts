import express from "express";
import { prisma } from "./lib/prisma.js";
import { fileURLToPath } from "node:url";
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

// Only listen when this file is run directly (npm run dev), not when it's
// imported — e.g. a test importing `app` to hit routes in memory shouldn't
// boot a real server or fire the DB smoke test. argv[1] is the file Node was
// told to run; import.meta.url is this file, converted to a path to compare.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    smokeTest().catch((err) => {
      console.error("❌ DB connection failed:", err);
    });
  });
}

export default app;

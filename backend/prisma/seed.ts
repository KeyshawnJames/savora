// Seed script — inserts baseline dev data so the app has something to show
// (GET /restaurants returns real rows instead of []). Registered in
// prisma.config.ts (migrations.seed) and run via `npx prisma db seed`.
// Reuses the shared client from src/lib/prisma.ts so it connects the same
// way the server does (driver adapter + pooled DATABASE_URL).
import { prisma } from "../src/lib/prisma.js";

// All the seeding work lives in one async function so we can `await` each
// insert. Kept separate from the run/cleanup logic at the bottom.
async function main() {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Romies",
      address: "465 Rue McGill, H2Y 2H1, Montreal, Quebec",
    },
  });

  // Log the created row — `create` returns it including the generated id,
  // which we need to test GET /restaurants/:id and the Bruno request.
  console.log("Seeded restaurant:", restaurant);
}

main()
  .then(() => {
    console.log("✅ Seed complete");
  })
  .catch((e) => {
    // Surface the error and mark the process as failed (non-zero exit),
    // so a broken seed is detectable by the CLI / CI instead of passing silently.
    console.error("❌ Seed failed:", e);
    process.exitCode = 1;
  })
  .finally(() => {
    // Always close the connection pool, success or failure, so the script
    // exits instead of hanging on an open DB connection.
    void prisma.$disconnect();
  });

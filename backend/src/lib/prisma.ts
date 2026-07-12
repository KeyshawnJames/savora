// Loads .env into process.env as a side effect. tsx does not auto-load .env,
// so this import must run before anything reads DATABASE_URL below.
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Cache the client on globalThis so `tsx watch` reuses one instance across
// hot reloads instead of opening a new connection pool on every file change.
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Prisma 7 dropped the bundled query engine; a driver adapter is now required.
// PrismaPg runs queries over node-postgres against the pooled DATABASE_URL.
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

// Reuse the cached client if present, otherwise create one.
export const prisma =
    globalForPrisma.prisma ?? new PrismaClient ({adapter});

// Only cache in dev. In production the module is loaded once, so there are no
// hot reloads to guard against and no need to hold a global reference.
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
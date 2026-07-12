import request from "supertest";
import { describe, it, expect, vi } from "vitest";

// Replace the real prisma module with a fake BEFORE app is imported.
// vitest hoists vi.mock() to the top of the file automatically.
vi.mock("../lib/prisma.js", () => ({
  prisma: {
    restaurant: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
}));

import app from "../index.js";

describe("GET /restaurants", () => {
    it("returns 200 and a json array", async () => {
        const res = await request(app).get("/restaurants");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
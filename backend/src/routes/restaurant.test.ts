import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Replace the real prisma module with a fake BEFORE app is imported.
// vitest hoists vi.mock() to the top of the file automatically.
vi.mock("../lib/prisma.js", () => ({
  prisma: {
    restaurant: {
      // findMany has one fixed return; findUnique is set per-test (row vs null)
      // via vi.mocked(...).mockResolvedValue(...) inside each :id test below.
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from "../lib/prisma.js";
import app from "../index.js";

// Mocks remember the last return value set on them, so wipe that state before
// each test — otherwise one test's mockResolvedValue could leak into the next.
beforeEach(() => vi.clearAllMocks());

describe("GET /restaurants", () => {
  it("returns 200 and a json array", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /restaurants/:id", () => {
  it("returns 200 and the restaurant when found", async () => {
    // Drive the mock: for this test, findUnique resolves to a fake row.
    // `as any` — the real return type is a full Restaurant; a stub is fine here.
    vi.mocked(prisma.restaurant.findUnique).mockResolvedValue({
      id: "abc",
      name: "Romies",
    } as any);

    const res = await request(app).get("/restaurants/abc");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("abc");
  });

  it("returns 404 when not found", async () => {
    // findUnique returns null for a missing id → handler's 404 branch.
    vi.mocked(prisma.restaurant.findUnique).mockResolvedValue(null);

    const res = await request(app).get("/restaurants/nonexistent");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Restaurant not found.");
  });
});
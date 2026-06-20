# Technical Plan: Savora

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS, built with Vite
- **Backend:** Node.js + Express + TypeScript (REST API, separate from the frontend)
- **Database:** PostgreSQL, hosted on Supabase, accessed via Prisma (TypeScript ORM — type-safe queries, migrations)
- **Auth:** Rolled by hand — email/password with hashed passwords (bcrypt) and server-side sessions (httpOnly cookies). Sessions are **stored in Postgres** (a `Session` table), not in memory, so they survive server restarts/cold-starts on a free-tier host. Supabase's built-in auth is deliberately *not* used, since writing this by hand is a learning goal.
- **Input validation:** Zod — every API request body/params is validated at the route boundary before it reaches business logic, and the validated shape doubles as the TypeScript type. This is what "the backend validates all writes" concretely means.
- **Testing:** Vitest — runs in both `frontend/` and `backend/`, wired into CI from day one (see Milestone 1). Coverage target is pragmatic, not exhaustive: each API route's happy + failure path, and the auth logic specifically. Optionally Playwright for end-to-end later.
- **File storage:** Supabase Storage, for restaurant photos

This is a fairly standard pattern for a CRUD-style content + accounts app (think: a simplified Yelp/booking-request system) — a relational database for clearly related entities (restaurants → menus → dishes, customers → favorites/booking requests), a REST API in front of it, and a separate frontend client. Nothing exotic is needed at MVP scale.

## System Architecture

Two separate services talking over HTTP:
- The **frontend** (React SPA) calls the backend's REST API for everything — restaurant data, auth, favorites, booking requests. It holds no business logic of its own beyond UI state.
- The **backend** (Express API) owns all business logic and is the only thing that talks to Postgres and file storage. It exposes REST endpoints, handles auth (issuing/checking session cookies), and validates all writes.

Kept as two separate codebases (not a single full-stack framework like Next.js) on purpose: it makes the client/server boundary explicit, which is a better mental model while learning how a "real" frontend-talks-to-backend-API app works, before reaching for a framework that blurs that line.

**Mobile readiness:** this same split is what makes the planned mobile app (see `vision.md` Future Features) cheap later — a mobile client is just another consumer of the existing REST API, no backend rewrite. One known caveat: auth uses httpOnly session cookies, which are ideal for web but awkward for native mobile clients, which prefer a token in an `Authorization` header. When mobile happens, add a token-issuing path alongside the cookie path (backed by the same `Session` table) — a small addition, not a redesign. No need to build it now.

Because the API will be consumed cross-origin (separate frontend/mobile origins), the backend needs an explicit **CORS allowlist** for the frontend origin from the start, and session cookies must be set with `httpOnly` + `Secure` + `SameSite`.

## Key Components

- **Public restaurant browsing** — list/search/detail views, no auth required
- **Customer auth** — sign up, log in, log out, session handling
- **Favorites** — authenticated customers save/unsave restaurants
- **Booking requests** — authenticated customers submit a request per restaurant; status is just a simple field (e.g. `pending`) for MVP, no real availability logic
- **Internal admin page** — password-protected, lets you (the founder) create/edit restaurant pages (name, location, hours, menu, photos) by hand — this is how restaurants get onto the platform pre-self-serve

## Data Models

- **Restaurant**: id, name, description, location/address, hours (JSON — per-day open/close, with a way to mark a day closed; structured enough to render but not over-engineered for MVP), createdAt
- **Dish** (belongs to Restaurant): id, restaurantId, name, description, price, category
- **Photo** (belongs to Restaurant): id, restaurantId, url, caption (optional)
- **Customer**: id, email, passwordHash, createdAt
- **Favorite**: id, customerId, restaurantId, createdAt (join table, customer ↔ restaurant)
- **BookingRequest**: id, customerId, restaurantId, requestedDate, partySize, status (`pending` for MVP), createdAt
- **AdminUser**: id, email, passwordHash — separate from Customer, used only for the internal admin page
- **Session**: id (the random session token stored in the cookie), customerId (or adminUserId), expiresAt, createdAt — the server-side record a logged-in cookie points at. This is what makes hand-rolled sessions survive restarts and be revocable.

## API Endpoints (high-level)

- `GET /restaurants` — list/search public restaurant pages
- `GET /restaurants/:id` — single restaurant page (menu, photos, hours)
- `POST /auth/signup` / `POST /auth/login` / `POST /auth/logout` — customer auth
- `GET /me/favorites` / `POST /me/favorites/:restaurantId` / `DELETE /me/favorites/:restaurantId`
- `GET /me/booking-requests` / `POST /restaurants/:id/booking-requests`
- `POST /admin/login` — separate admin auth
- `POST /admin/restaurants` / `PUT /admin/restaurants/:id` — admin create/edit restaurant pages
- `POST /admin/restaurants/:id/photos` — admin upload restaurant photos

**Conventions:** all error responses use one consistent shape — `{ error: { code, message } }` — so the frontend has a single way to read failures. Successful responses return the resource (or list) directly. Decided up front so it stays consistent as routes are added.

## Project Structure

Monorepo, plain folders (no Turborepo/Nx needed yet at this size):

```
savora/
  docs/              # planning docs (this skill's output)
  frontend/          # React + Vite + TS + Tailwind app
  backend/           # Express + TS API
    prisma/          # schema + migrations
  CLAUDE.md
```

One repo keeps frontend/backend changes reviewable together in a single PR while the two are evolving in lockstep during MVP build-out; splitting into separate repos only pays off once they have independent release cadences, which isn't the case yet.

## Tooling & Services

| Tool | Role (what it does) | Verdict |
|------|---------------------|---------|
| GitHub Actions | Runs lint/typecheck/tests automatically on every PR | ✅ now — cheap to set up, and it's the natural next step once branch protection requires a status check |
| Vitest | Test runner for both frontend and backend; runs in CI | ✅ now — set up in Milestone 1 so CI has real teeth and tests exist before auth (the highest-stakes code) is written |
| Bruno | API client for manually firing requests at endpoints during development | ✅ now — open-source and saves request collections as files committed in the repo (no cloud account); complements Vitest (manual poking vs. automated assertions). Added once the first real endpoints exist (Milestone 2) |
| Zod | Runtime validation of API inputs at the route boundary; inferred TS types | ✅ now — the concrete tool behind "validate all writes"; pairs naturally with TypeScript + Prisma |
| Supabase | Managed Postgres + file storage for restaurant photos, one provider for both | ✅ now — standard Postgres under the hood (no lock-in, no scalability tradeoff vs. other hosts), and it removes the need for a separate object-storage service; verify current free-tier limits before committing. **Prisma gotcha:** Supabase exposes a pooled connection (port 6543) for the app and a direct connection (5432) that `prisma migrate` requires — set both as `DATABASE_URL` and `DIRECT_URL` (see Milestone 1) |
| Railway or Render | Hosts the backend API (Express server) | ✅ now — needed to actually deploy the MVP; verify current free-tier limits before committing |
| Vercel or Netlify | Hosts/deploys the frontend (static React build) | ✅ now — both have generous free tiers for a project this size; pick whichever pairs more easily with the backend host chosen |
| CodeRabbit | AI bot that automatically reviews every PR and leaves inline comments on bugs/style/improvements | ✅ now — you specifically want to learn this tool, and it's a free way to get a second set of eyes on every PR even solo |
| Sentry | Error tracking — alerts you when the deployed app throws real errors | ⚠️ later — adds real value once real restaurants/customers are using it; low payoff pre-launch |
| PostHog | Analytics / usage tracking | ⚠️ later — nothing to analyze yet with zero real users; revisit once restaurants are live |

## Git & GitHub Workflow

Already in place (see root `CLAUDE.md`): trunk-based development, `main` protected (no direct pushes/force-pushes/deletions, PR required), short-lived branches (`phase-N-<name>` for docs, `feat/`/`fix/`/`chore/` for code), Conventional Commits, no required review (solo dev). Once GitHub Actions is added, the natural next step is making the lint/typecheck/test workflow a required status check on `main`. Installing the CodeRabbit GitHub app on the repo is a one-time setup task for Phase 4, after which it comments automatically on every new PR.

## Collaboration Mode by Stack Component

- **Frontend (React, TypeScript, Tailwind):** learning — this is the explicit focus; build it together with explanations of *why*, not just working code, especially around component structure, props/state, and TypeScript types.
- **Backend (Express, REST API design):** learning — build it together, working through routing, request/response handling, and validation as it's written.
- **Database (Postgres, Prisma):** learning — cover schema design and migrations as the data models above get implemented, not just handed over finished.
- **Auth (rolled by hand):** learning, with extra care — this is the one area where "learning by building it yourself" has real security stakes (password hashing, session/cookie handling). Build it together, explain the security reasoning at each step, and don't cut corners even though it's slower.
- **Infra/deploy (hosting, CI, object storage):** hands-off-leaning — these are mostly configuration rather than code to learn from; brief explanation of what's set up and why is enough unless you want more.

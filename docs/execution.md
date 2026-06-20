# Execution Plan: Savora

## Milestones

1. Project & tooling setup
2. Backend foundation (database + API skeleton)
3. Authentication
4. Restaurant browsing (public)
5. Customer features (favorites + booking requests)
6. Internal admin page (restaurant management)
7. Deployment
8. Manual restaurant seeding & launch

## Task Breakdown

### Milestone 1: Project & tooling setup

- [ ] Create `frontend/` (Vite + React + TypeScript + Tailwind) and `backend/` (Express + TypeScript) folders per the Phase 3 project structure
- [ ] Install CodeRabbit's GitHub app on the `savora` repo so it reviews future PRs automatically
- [ ] Create a Supabase project for Savora; note the Postgres connection string and storage bucket
- [ ] Add `backend/prisma/` with Prisma initialized against the Supabase Postgres connection string — set both `DATABASE_URL` (pooled, 6543) and `DIRECT_URL` (direct, 5432) so migrations work
- [ ] Set up Vitest in both `frontend/` and `backend/` with one trivial passing test each, so the test runner exists from day one
- [ ] Add Zod to `backend/` for request validation (no schemas yet — just installed and ready for Milestone 2/3)
- [ ] Add a GitHub Actions workflow that runs lint + typecheck + tests on every PR
- [ ] Add `.env.example` files for both `frontend/` and `backend/` documenting required environment variables (incl. both Supabase connection strings and the session secret)
- [ ] Start `docs/setup.md` — capture how the repo/env/Supabase project is wired as each piece above is set up

### Milestone 2: Backend foundation

- [ ] Write the Prisma schema for `Restaurant`, `Dish`, `Photo`, `Customer`, `Favorite`, `BookingRequest`, `AdminUser`, `Session` (see `technical.md`) — decide the `hours` JSON shape here
- [ ] Run the first Prisma migration against Supabase (uses `DIRECT_URL`)
- [ ] Set up the Express app skeleton (entry point, router structure, error-handling middleware)
- [ ] Add `GET /restaurants` and `GET /restaurants/:id` returning seeded test data, to prove the DB → API → response path end to end
- [ ] Set up a Bruno collection in the repo (e.g. `backend/bruno/`) with saved requests for these endpoints, so every new endpoint can be poked manually as it's built

### Milestone 3: Authentication

- [ ] Implement `POST /auth/signup` (hash password with bcrypt, create `Customer` row)
- [ ] Implement `POST /auth/login` (verify password, create a `Session` row, set the cookie with `httpOnly` + `Secure` + `SameSite`)
- [ ] Implement `POST /auth/logout` (delete the `Session` row, clear the cookie)
- [ ] Implement session-checking middleware (read cookie → look up `Session` → reject if missing/expired) to protect authenticated routes
- [ ] Configure CORS to allow only the frontend origin (with credentials) so the browser permits cookie'd API requests
- [ ] Add basic rate limiting to `/auth/login` and `/auth/signup` to blunt brute-force attempts
- [ ] Build the frontend signup and login pages, wired to the above endpoints
- [ ] Build a basic "logged in as ___" header state on the frontend

### Milestone 4: Restaurant browsing (public)

- [ ] Build the frontend restaurant list/search page (calls `GET /restaurants`)
- [ ] Build the frontend restaurant detail page — menu, photos, hours, location (calls `GET /restaurants/:id`)
- [ ] Style both pages with Tailwind to match the "beautiful, expressive" goal from `vision.md`

### Milestone 5: Customer features

- [ ] Implement `GET /me/favorites`, `POST /me/favorites/:restaurantId`, `DELETE /me/favorites/:restaurantId`
- [ ] Add a "save to favorites" button on the restaurant detail page (authenticated only)
- [ ] Build a frontend "my favorites" page
- [ ] Implement `POST /restaurants/:id/booking-requests` and `GET /me/booking-requests`
- [ ] Add a booking-request form on the restaurant detail page (authenticated only)
- [ ] Build a frontend "my booking requests" page showing request status

### Milestone 6: Internal admin page

- [ ] Implement `AdminUser` auth (`POST /admin/login`), separate from customer auth
- [ ] Implement `POST /admin/restaurants` and `PUT /admin/restaurants/:id`
- [ ] Implement `POST /admin/restaurants/:id/photos` (uploads to Supabase Storage)
- [ ] Build a minimal, password-protected frontend admin form to create/edit a restaurant's name, location, hours, menu, and photos

### Milestone 7: Deployment

- [ ] Deploy the backend (Railway or Render), connected to the Supabase Postgres instance
- [ ] Deploy the frontend (Vercel or Netlify), pointed at the deployed backend URL
- [ ] Verify the full flow works end to end in production: browse → sign up → favorite/booking request → admin can see it
- [ ] Add the deployed status check to GitHub Actions/branch protection once CI is proven stable

### Milestone 8: Manual restaurant seeding & launch

- [ ] Pick a small handful of real restaurants to onboard first
- [ ] Use the admin page to create each restaurant's page (menu, photos, hours)
- [ ] Do a final pass through the user flow from `vision.md` as a real customer would experience it
- [ ] Share the live link and gather first real feedback

## Suggested Timeline

A rough starting estimate, not a commitment — adjust as the learning pace on auth/backend/Prisma becomes clearer in practice:

- Milestone 1–2 (setup + backend foundation): ~1–2 weeks
- Milestone 3 (auth): ~1–2 weeks, given the deliberate slow-down for learning security correctly
- Milestone 4–5 (browsing + customer features): ~2 weeks
- Milestone 6 (admin page): ~1 week
- Milestone 7–8 (deployment + seeding): ~1 week

## MVP-First Strategy

All 8 milestones above are required to reach the MVP defined in `vision.md` — none of them are "nice to have" extras; they're the minimum needed for: public browsing, customer accounts, favorites, booking requests, and a way to actually get real restaurant data onto the platform.

Everything in `vision.md`'s "Future Features" (self-serve restaurant builder, AI page generation, real-time booking, reviews, social/discovery layer, influencer marketplace, photography service, mobile app, monetization) is explicitly out of scope for these milestones and should not be pulled forward without a deliberate scope decision.

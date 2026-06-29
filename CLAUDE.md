# Savora

A unified restaurant platform: customizable, AI-assisted restaurant page/menu builder + a social discovery layer for customers (Instagram/Beli-inspired) + an influencer-restaurant marketplace.

Planning docs live in [docs/](docs/) (not tracked in git — backed up via iCloud instead, see Git workflow):
- [docs/brainstorm.md](docs/brainstorm.md) — Phase 1: idea, problem, target users, goals
- [docs/vision.md](docs/vision.md) — Phase 2: MVP scope, features, user flow
- [docs/technical.md](docs/technical.md) — Phase 3: stack, architecture, data model
- [docs/execution.md](docs/execution.md) — Phase 4: 8-milestone task breakdown to MVP
- [docs/learning.md](docs/learning.md) — Phase 5: running log of concepts learned, added to continuously (not just during planning)
- [docs/teaching-style.md](docs/teaching-style.md) — how Claude should teach during the build (user runs commands, explains-first, one step at a time)
- [docs/reference/](docs/reference/) — long-form explainer docs per tool/concept (Vite, React, Prisma, etc.), for looking something up when confused

`setup.md` and `CHANGELOG.md` get added once real building starts (execution.md Milestone 1) — keep this list in sync when they're created.

## Status — where we left off

All five planning phases are complete and merged: brainstorm, vision, technical, execution, learning log.

**Next step:** mid Milestone 1 (Project & tooling setup), in teaching mode (see `docs/teaching-style.md`) — on branch `chore/milestone-1-setup`.

Done so far:
- `frontend/` scaffolded (Vite + react-ts), Tailwind v4 wired in via `@tailwindcss/vite`. Documented in `docs/reference/1-vite.md`, `docs/reference/2-tailwind.md`, and `docs/learning.md`.
- `docs/` untracked from git (now `.gitignore`d — backed up via iCloud instead).
- `backend/` set up: `express` (runtime dep), `typescript`/`@types/express`/`@types/node` (dev deps), `tsconfig.json` configured for Node/Express (rootDir/outDir, types: node, esModuleInterop, strict, etc.), `src/index.ts` entry point wired up with a working GET `/` route, `backend/.gitignore` (node_modules/, dist/). Documented in `docs/reference/3-typescript.md` and `docs/learning.md`. Committed (`chore: set up TypeScript and Express entry point for backend`) and pushed.
- Root `README.md` created with the CodeRabbit reviews badge. Committed and pushed.
- CodeRabbit GitHub app installed on the repo (user action, done).
- Stale merged branch `docs/planning-refinements` cleaned up (was already squash-merged into `main`; removed leftover `Co-Authored-By: Claude` trailer from being reachable).
- `docs/reference/4-express.md` written (Express setup + handler syntax + FastAPI comparisons + the esModuleInterop gotcha) — doc backlog caught up at the time.
- Supabase project created (`savora`), DB password saved in password manager, `photos` storage bucket created. Connection strings (`DATABASE_URL` pooled port 6543, `DIRECT_URL` direct port 5432) are in `backend/.env` (gitignored). Documented in `docs/reference/5-supabase.md`.
- Prisma initialized in `backend/` (`prisma`, `dotenv` as dev deps), `backend/prisma/schema.prisma` and `backend/prisma.config.ts` created and wired to Supabase. Hit and fixed Prisma 7's config split (`url`/`directUrl` moved out of `schema.prisma` into `prisma.config.ts`, pointed at `DIRECT_URL` since migrations need the unpooled connection) and a `tsconfig.json`/`prisma.config.ts` rootDir conflict (scoped `tsconfig.json`'s `include` to `src/**/*`, added `/// <reference types="node" />` to `prisma.config.ts`). Connection verified via `npx prisma db pull` (correctly reports the DB as empty, no tables yet). Documented in `docs/reference/6-prisma.md`.
- `backend/.env.example` added (placeholder connection strings, safe to commit) and `.env`/`.claude/settings.local.json` gitignore gaps closed.
- Committed (`chore: wire up Supabase connection and initialize Prisma`) and pushed to `chore/milestone-1-setup`.
- Full data model defined in `backend/prisma/schema.prisma` (Restaurant, Dish, Photo, Customer, Favourite, BookingRequest, AdminUser, Session) based on `docs/technical.md`, with two-way relations wired on both sides. Intentional deviations from the doc: `Restaurant.hours` optional, `Dish.price` optional (some menus omit prices), `@@unique([customerId, restaurantId])` on Favourite (no dupes), `BookingRequest.status` defaults to `"pending"`, `Session` foreign keys both optional (a session is customer-OR-admin). Schema formatted with `npx prisma format`.
- First migration run (`npx prisma migrate dev --name init`) — created all tables in Supabase for real. Verified via `npx prisma db pull --print` (matched schema) and Supabase Table Editor. Migrations folder (`backend/prisma/migrations/`) committed (no secrets, just SQL). Documented the migrations concept in `docs/reference/6-prisma.md` and `docs/learning.md`.
- Vitest set up in **both** `backend/` and `frontend/` (Milestone 1 task complete). Backend: `vitest` dev dep, `test`/`test:watch` scripts, trivial passing test at `backend/src/sanity.test.ts`. Frontend: `vitest` + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom` dev deps, `test` block added to `vite.config.ts` (`environment: 'jsdom'`, `globals: true`, `setupFiles: './src/test/setup.ts'`), import switched to `vitest/config`, `"vitest/globals"` added to `tsconfig.app.json` types, setup file at `frontend/src/test/setup.ts`, trivial DOM-rendering test at `frontend/src/sanity.test.tsx`. Both green (backend 1 test, frontend 2 tests). Documented in `docs/reference/7-vitest.md`.

- Zod installed in `backend/` as a runtime dependency (`zod` in `dependencies`, v4 `^4.4.3`) — install only, no schemas yet (those land in Milestone 2/3 with the first API routes). Documented in `docs/reference/8-zod.md` and `docs/learning.md`.

**Milestone 1 status:** 6 of 9 tasks done — folders ✅, CodeRabbit ✅, Supabase ✅, Prisma init ✅, Vitest ✅, Zod ✅. Plus two Milestone 2 tasks pulled forward early (schema + first migration). Remaining: GitHub Actions CI, `.env.example` for frontend, `docs/setup.md`.

**Next step:** GitHub Actions CI workflow. After that: frontend `.env.example`, `docs/setup.md`. Also still pending and treated as the bridge into Milestone 2: `npx prisma generate` for the typed client (output to `src/generated/prisma`, gitignored) + wire a `PrismaClient` instance into the backend (pooled `DATABASE_URL`).

Update this section as milestones complete so a new session knows exactly where to resume.

## Git workflow

Trunk-based development, solo dev:
- `main` is protected on GitHub — no direct pushes, no force pushes, no deletions. All changes go through a PR.
- Branch naming: `phase-N-<name>` for planning docs, `feat/<name>` / `fix/<name>` / `chore/<name>` for code.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
- No required PR approvals yet (solo dev can't self-approve) — revisit once collaborators or CI exist.
- `docs/` is gitignored, not committed — the planning docs live locally and are backed up via iCloud instead of git.

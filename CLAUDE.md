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

**Next step:** start Milestone 2 (Backend foundation), in teaching mode (see `docs/teaching-style.md`) — Milestone 1 is merged to `main`; create a new branch for Milestone 2 work.

Done so far (all merged to `main`):
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
- GitHub Actions CI added at `.github/workflows/ci.yml` — runs on PRs to `main` and pushes to `main`; two parallel jobs (`backend`, `frontend`) that set up Node 24, install deps, and run `npm test` (Vitest). Green on the Milestone 1 PR. Two gotchas: pushing workflow files needed the `workflow` token scope (`gh auth refresh -s workflow`), and `npm ci` failed on Linux CI with "Missing @emnapi/* from lock file" (macOS-generated lockfile omits Linux-only optional deps — known npm bug); worked around by using `npm install` instead of `npm ci` in CI. Tradeoff + "real" fix noted in `docs/learning.md`. The frontend `package-lock.json` resync from debugging this is also committed.

- Frontend `.env.example` added (`VITE_API_URL=http://localhost:3000`, matching the backend port; Vite only exposes `VITE_`-prefixed vars to browser code). Also patched `frontend/.gitignore` (Vite's default only ignored `*.local`, not plain `.env`) to ignore `.env`/`.env.*` while keeping `!.env.example` tracked.

**Milestone 1 status:** ✅ COMPLETE and merged to `main` (squash-merged from `chore/milestone-1-setup`, branch deleted). All 8 meaningful tasks done — folders, CodeRabbit, Supabase, Prisma init, Vitest, Zod, GitHub Actions CI, `.env.example` (both). Plus two Milestone 2 tasks pulled forward early (schema + first migration). The 9th task, `setup.md`, was **deferred into Milestone 2** on purpose (documents how to run the project, which isn't stable yet). CodeRabbit's free trial has since run out — CI is the real merge gate; CodeRabbit was advisory only.

Gotcha logged from the merge: the squash-merge **deleted the tracked planning docs** (`brainstorm/vision/technical/execution/learning.md`) from the working folder, because they were still tracked on old `main` while `docs/` had been untracked on the branch. Recovered from git history (`git show <commit-before-untrack>^:docs/<file>`). See `docs/learning.md` Mistakes section.

**Milestone 2 — Backend foundation (in progress, branch `feat/milestone-2-backend`):**
- ✅ Backend dev script: installed `tsx` (dev dep), added `"dev": "tsx watch src/index.ts"` to `backend/package.json` — runs the TS server directly and auto-restarts on save. Documented in `docs/reference/10-tsx.md` and `docs/learning.md`.
- ✅ Ran `npx prisma generate` — emitted the typed Prisma Client to `backend/src/generated/prisma` (gitignored, confirmed via `git check-ignore`). Generator was already configured (`provider = "prisma-client"`, `output = "../src/generated/prisma"`). Documented in `docs/reference/6-prisma.md` and `docs/learning.md`.
- ✅ Wired a single shared `PrismaClient` instance at `backend/src/lib/prisma.ts` (pooled `DATABASE_URL`). Hit the **Prisma 7 driver-adapter change**: the bundled query engine is gone, so `new PrismaClient()` needs an adapter — installed `@prisma/adapter-pg` (runtime dep) and instantiate with `new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })`. Includes `import "dotenv/config"` (tsx doesn't auto-load `.env`) and a `globalThis` hot-reload guard. Also learned the `nodenext` `.js`-extension-on-`.ts`-imports rule. Typechecks clean. Documented in `docs/reference/6-prisma.md` and `docs/learning.md`. **Not yet runtime-tested against Supabase** (next: a quick connection smoke test).

**Next step:** quick connection smoke test (call the shared `prisma` from `index.ts` to prove it reaches Supabase), **then** write `setup.md` documenting the now-stable run commands, then the Express app skeleton + `GET /restaurants` endpoints + a Bruno collection.

Update this section as milestones complete so a new session knows exactly where to resume.

## Git workflow

Trunk-based development, solo dev:
- `main` is protected on GitHub — no direct pushes, no force pushes, no deletions. All changes go through a PR.
- Branch naming: `phase-N-<name>` for planning docs, `feat/<name>` / `fix/<name>` / `chore/<name>` for code.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
- No required PR approvals yet (solo dev can't self-approve) — revisit once collaborators or CI exist.
- `docs/` is gitignored, not committed — the planning docs live locally and are backed up via iCloud instead of git.

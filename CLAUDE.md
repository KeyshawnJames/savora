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

Done so far: `frontend/` scaffolded (Vite + react-ts), Tailwind v4 wired in via `@tailwindcss/vite`. Documented in `docs/reference/1-vite.md`, `docs/reference/2-tailwind.md`, and `docs/learning.md`. `docs/` untracked from git (now `.gitignore`d — backed up via iCloud instead).

**Not yet committed** — `frontend/`, `.gitignore`, and `CLAUDE.md` changes are staged/unstaged on `chore/milestone-1-setup` but no commit has been made yet. Next action when resuming: have the user run `git add frontend .gitignore CLAUDE.md`, review `git status`, then commit (Conventional Commits, e.g. `chore: scaffold frontend with vite and tailwind, untrack docs`).

Still to do after that: `backend/` (Express + TS), Vitest in both frontend/backend, Zod in backend, Prisma init (`DATABASE_URL`/`DIRECT_URL`), `.env.example` for both, GitHub Actions workflow, CodeRabbit GitHub app install (user), Supabase project creation (user), `docs/setup.md`.

Update this section as milestones complete so a new session knows exactly where to resume.

## Git workflow

Trunk-based development, solo dev:
- `main` is protected on GitHub — no direct pushes, no force pushes, no deletions. All changes go through a PR.
- Branch naming: `phase-N-<name>` for planning docs, `feat/<name>` / `fix/<name>` / `chore/<name>` for code.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
- No required PR approvals yet (solo dev can't self-approve) — revisit once collaborators or CI exist.
- `docs/` is gitignored, not committed — the planning docs live locally and are backed up via iCloud instead of git.

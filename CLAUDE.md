# Savora

A unified restaurant platform: customizable, AI-assisted restaurant page/menu builder + a social discovery layer for customers (Instagram/Beli-inspired) + an influencer-restaurant marketplace.

## Docs

Planning docs live in [docs/](docs/) — **not tracked in git**, backed up via iCloud (see Git workflow):
- [docs/status.md](docs/status.md) — **living progress log; read this first to resume** (current milestone, next step, active deferrals)
- [docs/brainstorm.md](docs/brainstorm.md) — idea, problem, target users, goals
- [docs/vision.md](docs/vision.md) — MVP scope, features, user flow
- [docs/technical.md](docs/technical.md) — stack, architecture, data model
- [docs/execution.md](docs/execution.md) — 8-milestone task breakdown to MVP
- [docs/learning.md](docs/learning.md) — running log of concepts learned
- [docs/teaching-style.md](docs/teaching-style.md) — how Claude should teach during the build
- [docs/reference/](docs/reference/) — long-form explainer per tool/concept, numbered in the order introduced

`setup.md` (clone-to-running guide) and `CHANGELOG.md` (not yet created) live at the repo **root**, tracked — they document the committed code, not private planning.

## How to work on this project

- **Teaching mode.** I run the commands, not you — hand me the exact command, explain it first, then wait for me to report back. Explain new concepts plainly, one step at a time. Full rules: [docs/teaching-style.md](docs/teaching-style.md). Auth gets *extra* care (real security stakes).
- **Follow the plan.** Stick to [docs/execution.md](docs/execution.md) task order. Don't pull work forward from later milestones. Ask before doing anything off-plan — don't assume.
- **Commits.** Conventional Commits (`feat:` / `fix:` / `docs:` / `chore:` / `refactor:`). **Never** add a `Co-Authored-By` / AI-authorship trailer. Proactively flag good checkpoints and give the exact `git` command, then wait for my go-ahead (I run git).
- **Use Context7 for library / how-to questions.** When I ask how to do something with a library, framework, or tool, or say "follow best practices" / "use context7", fetch current docs via the Context7 MCP (`resolve-library-id` → `query-docs`) **before** answering — don't answer library specifics from memory. The `context7` plugin is already enabled.
- **Document as you go.** After each confirmed step, update [docs/learning.md](docs/learning.md) and the relevant [docs/reference/](docs/reference/) doc (a commit hook reminds me of this). See teaching-style rule 7.

## Tech stack

- **Frontend:** React + TypeScript + Tailwind CSS, built with Vite.
- **Backend:** Node.js + Express + TypeScript — REST API, separate codebase from the frontend.
- **Database:** PostgreSQL on Supabase, via Prisma (type-safe queries + migrations). Supabase Storage for photos.
- **Auth:** rolled by hand — bcrypt password hashing + server-side sessions (httpOnly cookies, `Session` table in Postgres). Supabase Auth deliberately *not* used (learning goal).
- **Validation:** Zod at every route boundary. **Testing:** Vitest (both apps, wired into CI).

Details and the *why* behind each choice: [docs/technical.md](docs/technical.md).

## Git workflow

Trunk-based development, solo dev:
- `main` is protected on GitHub — no direct pushes, no force pushes, no deletions. All changes go through a PR.
- Branch naming: `feat/<name>` / `fix/<name>` / `chore/<name>` for code, `phase-N-<name>` for planning docs.
- No required PR approvals yet (solo dev can't self-approve) — revisit once collaborators exist.
- `docs/` is gitignored — planning docs live locally, backed up via iCloud instead of git.

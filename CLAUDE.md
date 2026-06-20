# Savora

A unified restaurant platform: customizable, AI-assisted restaurant page/menu builder + a social discovery layer for customers (Instagram/Beli-inspired) + an influencer-restaurant marketplace.

Planning docs live in [docs/](docs/):
- [docs/brainstorm.md](docs/brainstorm.md) — Phase 1: idea, problem, target users, goals
- `docs/vision.md` — Phase 2: MVP scope, features, user flow (not yet written)
- `docs/technical.md` — Phase 3: stack, architecture, data model (not yet written)
- [docs/execution.md](docs/execution.md) — Phase 4: 8-milestone task breakdown to MVP
- [docs/learning.md](docs/learning.md) — Phase 5: running log of concepts learned, added to continuously (not just during planning)

`setup.md` and `CHANGELOG.md` get added once real building starts (execution.md Milestone 1) — keep this list in sync when they're created.

## Git workflow

Trunk-based development, solo dev:
- `main` is protected on GitHub — no direct pushes, no force pushes, no deletions. All changes go through a PR.
- Branch naming: `phase-N-<name>` for planning docs, `feat/<name>` / `fix/<name>` / `chore/<name>` for code.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
- No required PR approvals yet (solo dev can't self-approve) — revisit once collaborators or CI exist.

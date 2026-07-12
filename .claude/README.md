# .claude/ — Claude Code config for Savora

Project-level configuration for Claude Code. Committed to the repo so the setup
travels with the project.

## Files

- **`settings.json`** *(tracked)* — enabled plugins, a permission allowlist, and a
  hook.
  - **Permission allowlist** — safe, repeated commands (git reads, `git add`,
    `npm test`, `npx prisma generate/db pull`, etc.) so Claude doesn't prompt for
    them every time. Consequential or destructive commands (`git commit`,
    `git push`, `git restore`, `git stash`, `prisma migrate`, `prisma db seed`,
    `npm install`) are intentionally **left out** — those stay prompted, partly so
    I run them myself per the teaching workflow. `git add` is the one mutating git
    command that's auto-allowed, since it only stages and `/commit` relies on it.
  - **Hook** — a `PostToolUse` hook scoped to `git commit` (via
    `if: "Bash(git commit:*)"`) that, after each commit, re-injects the
    teaching-style **rule 7** reminder to update `docs/reference/` + `docs/learning.md`.
    It's the automated backstop to the manual `/document-step` command.
- **`settings.local.json`** *(gitignored)* — my personal machine-local overrides
  (e.g. individual MCP tool permissions). Not shared.

## Commands (`commands/`)

Custom slash commands (reusable prompts). Type `/` in Claude Code to see them;
anything typed after the command name replaces `$ARGUMENTS` in the prompt. The
grey placeholder in the `/` menu comes from each command's `argument-hint`, where
**`<foo>`** = a required arg and **`[foo]`** = an optional one.

- **`/commit`** — sanity-checks the diff and commits in Conventional Commits
  style, with **no AI co-author trailer**. Refuses to commit directly to `main`.
- **`/document-step`** — after a build step is confirmed working, updates
  `docs/learning.md` and the relevant `docs/reference/` doc (teaching-style rule 7).
- **`/new-reference <tool>`** — scaffolds the next numbered `docs/reference/`
  explainer and updates the index.
- **`/status`** — reports the current milestone and the next on-plan task from
  `docs/execution.md`, without pulling later-milestone work forward.

## Where the rules actually live

- **Project overview + status + git workflow** → root `CLAUDE.md`
- **How Claude should teach me** → `docs/teaching-style.md`
- **Stack & architecture decisions** → `docs/technical.md`
- **Milestone task breakdown** → `docs/execution.md`

The commands above are shortcuts that encode those rules; the rules themselves
stay in the docs so there's a single source of truth.

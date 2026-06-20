# Learning Log: Savora

This is a running log, added to throughout the project — not just during planning. Entries are written so they make sense again months from now, even if the surrounding context is forgotten.

## Key Concepts Learned

- **Trunk-based development:** a git workflow where everyone works off one main line (`main`) using short-lived branches that get merged back quickly, instead of long-lived branches that diverge for weeks (that older style is called Gitflow). For a solo project, this means: make a branch for each small chunk of work, open a pull request, merge it, delete the branch, repeat — rather than letting branches pile up.
- **Branch protection:** a GitHub setting on a specific branch (here, `main`) that blocks certain actions directly on it — we turned on "no direct pushes" (must go through a pull request), "no force pushes," and "no deletions." It does *not* support per-file-type rules (e.g. "allow `.md` files to skip this") — protection applies to the whole branch, not specific paths.
- **Pull request (PR):** a request to merge one branch's changes into another (here, always into `main`), which is also where review/comments happen before the merge. Even solo, with no one else required to approve it, opening a PR still creates a reviewable diff and a permanent record of *why* a change happened — that's the main reason to keep using them even alone.
- **Supabase:** a "Backend-as-a-Service" — a company that runs a managed Postgres database and file storage for you, with one dashboard instead of separately configuring a database host and a storage host. Important nuance: it's standard Postgres underneath, so using it doesn't lock you in or make the app less scalable than hosting Postgres yourself elsewhere — the database design and queries are still 100% something we write ourselves with Prisma. We're using it for the database and photo storage, but writing our own auth code instead of using Supabase's built-in auth, since hand-rolling auth was an explicit learning goal.
- **CodeRabbit:** an AI bot that connects to a GitHub repo and automatically leaves review comments on every new pull request — pointing out potential bugs, style issues, or improvements, similar to a human reviewer but automatic and immediate.
- **ORM (Prisma):** a library that lets you describe database tables as TypeScript-like definitions (a "schema") and then write queries as regular code instead of raw SQL strings, while still being backed by a real Postgres database. Prisma also manages "migrations" — versioned, recorded changes to the database structure over time, so the schema's history isn't just whatever state the live database happens to be in.
- **Sessions vs. tokens (auth):** we chose server-side sessions with httpOnly cookies for Savora's auth, rather than JWTs (a different common approach where the login state is encoded into a self-contained token the client holds). Sessions mean the server keeps a record of who's logged in and the browser just holds a cookie pointing at that record — simpler to reason about and revoke, which fit the "learn auth properly" goal better than the slightly more complex token approach.

## Patterns & Best Practices

- When advising on a stack, actively consider whether a bundled service (like a BaaS) fits before defaulting to assembling separate pieces (a database host + a separate storage host) — the first draft of Savora's `technical.md` missed considering Supabase until it was asked about directly.
- Keep planning docs (`brainstorm.md`, `vision.md`, etc.) written in first person, as if the project owner is speaking, not described in third person by an AI — these documents represent the user's own ideas being recorded, not an outside description of them.
- Frame a vague-sounding question with a concrete example before asking it (e.g. "how do you want to add a new restaurant's info, like Joe's Pizza's menu and photos?" instead of "does this need admin tooling?") — abstract phrasing caused real confusion once during this project's planning.

## Mistakes / Misunderstandings

- An early planning question asked about "admin tooling" for restaurant onboarding in abstract terms and wasn't understood; rephrasing with a concrete restaurant example (entering "Joe's Pizza"'s menu and photos) made the actual choice (admin UI vs. script) clear.
- The first draft of the technical plan proposed Railway/Render + a separate object-storage service (R2/S3) without considering Supabase as a bundled alternative — not wrong, but incomplete; Supabase was adopted after the gap was raised and the scalability tradeoff (there isn't one — it's still real Postgres) was checked.

## Reusable Knowledge for Future Projects

- A managed BaaS (Supabase, Neon, etc.) doesn't reduce how much you learn about databases if you're still the one designing the schema and writing the queries — it only replaces server administration (backups, patching, uptime), which is a separate skill from database design.
- GitHub branch protection rules apply to an entire branch, not to specific file paths or file types — there's no native way to require PRs for code but allow direct pushes for docs.

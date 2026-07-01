# Setup

How to go from a fresh clone to both servers running locally. For the *why* behind any tool, see `docs/reference/`.

## Prerequisites

- **Node.js 24** (matches CI; check with `node -v`)
- **npm** (ships with Node)
- A **Supabase project** for the database — see `docs/reference/5-supabase.md`. You'll need its connection strings and the DB password.

The repo has two independent npm packages, `backend/` and `frontend/`, each set up separately.

## Backend

```bash
cd backend
npm install
cp .env.example .env        # then fill in the real Supabase values (see below)
npx prisma generate         # generates the typed Prisma client into src/generated/prisma
npm run dev                 # starts the API on http://localhost:3000 (tsx watch, auto-restarts)
```

On startup you should see:

```
Server running on http://localhost:3000
✅ DB connected — 0 restaurants
```

That second line is the connection smoke test proving the app reaches Supabase.

## Frontend

```bash
cd frontend
npm install
cp .env.example .env        # default points at the local backend, usually no change needed
npm run dev                 # starts the Vite dev server (default http://localhost:5173)
```

## Environment variables

`.env` files are gitignored (they hold secrets). Copy each `.env.example` and fill in real values.

### `backend/.env`

| Variable | Purpose | Port |
| --- | --- | --- |
| `DATABASE_URL` | Pooled connection used by the app at runtime | 6543 |
| `DIRECT_URL` | Direct connection used by Prisma for migrations | 5432 |

Both come from the Supabase dashboard (Project Settings → Database). The DB password is stored in the password manager, not in git. See `docs/reference/5-supabase.md` and `docs/reference/6-prisma.md` for why the app and migrations use different connections.

### `frontend/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API (default `http://localhost:3000`) |

Only `VITE_`-prefixed vars are exposed to browser code by Vite.

## Common tasks

| Task | Command (from the relevant folder) |
| --- | --- |
| Run backend / frontend dev server | `npm run dev` |
| Run tests once | `npm test` |
| Run tests in watch mode | `npm run test:watch` |
| Apply a schema change (backend) | `npx prisma migrate dev --name <description>` |
| Regenerate the Prisma client (backend) | `npx prisma generate` |
| Build the frontend for production | `npm run build` |

## Ports

- Backend API: **3000**
- Frontend dev server: **5173** (Vite default)

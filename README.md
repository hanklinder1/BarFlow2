# BarFlow

Cutting edge app to help College Students enjoy night life. See where your friends are tonight.

## Structure

- `frontend/` — React + Vite + TypeScript (deploys to Vercel)
- `backend/` — Express + Socket.IO + TypeScript (deploys to Railway)

## Setup

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for connecting GitHub, Neon, Railway, Vercel, Mapbox, and Stripe.

## Quick Start (Local)

```bash
# Backend
cd backend && npm install && cp .env.example .env
# Edit .env with DATABASE_URL, JWT_SECRET
npm run dev

# Frontend (new terminal)
cd frontend && npm install && cp .env.example .env
# Edit .env with VITE_API_URL=http://localhost:3000
npm run dev
```

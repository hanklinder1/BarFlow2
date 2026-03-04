# BarFlow — Connection Setup Guide

This guide walks you through connecting every tool in the BarFlow stack. Follow the steps in order.

---

## Overview

| Service | Purpose |
|--------|---------|
| **GitHub** | Source code and repo for deployment |
| **Neon** | PostgreSQL database |
| **Railway** | Backend API (Express + Socket.IO) |
| **Vercel** | Frontend (React + Vite) |
| **Mapbox** | Maps and location display |
| **Stripe** | BarFlow Premium payments |

---

## Step 1: GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Make sure your repo exists: [github.com/hanklinder1/BarFlow2](https://github.com/hanklinder1/BarFlow2).
3. Initialize and push your local project (run these from the project root):

   ```bash
   cd /Users/hanklinder/Barflow2
   git init
   git remote add origin https://github.com/hanklinder1/BarFlow2.git
   git add .
   git commit -m "Initial BarFlow setup"
   git branch -M main
   git push -u origin main
   ```

   Use your GitHub credentials or a personal access token.

---

## Step 2: Neon (PostgreSQL)

1. Go to [console.neon.tech](https://console.neon.tech).
2. Create or open your project (e.g. `round-thunder-60188320`).
3. Get your connection string:
   - Open the project → **Connection Details**.
   - Copy the **Pooled connection** string (starts with `postgresql://`).

4. Use this in your backend:
   - Variable: `DATABASE_URL`
   - Example format: `postgresql://user:password@host/neondb?sslmode=require`

⚠️ Never commit the real connection string. Add `.env` to `.gitignore` and use env vars.

---

## Step 3: Railway (Backend)

1. Go to [railway.app](https://railway.app) and sign in (GitHub recommended).
2. Create a new project:
   - **New Project** → **Deploy from GitHub repo**.
   - Choose `hanklinder1/BarFlow2`.
3. Configure the service:
   - Set **Root Directory** to `backend` (the folder with your Express app).
   - Railway will detect Node.js and use `npm install` + `npm run build` + `npm start`.
4. Add environment variables:
   - In the service → **Variables**:

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Your Neon connection string from Step 2 |
   | `JWT_SECRET` | Random string (e.g. from `openssl rand -hex 32`) |
   | `NODE_ENV` | `production` |
   | `CORS_ORIGIN` | Your Vercel URL (e.g. `https://barflow.vercel.app`) |

5. Get your API URL:
   - **Settings** → **Networking** → **Generate Domain**.
   - Copy the URL (e.g. `https://barflow-backend-production.up.railway.app`).
6. Use this URL in your frontend for API calls and Socket.IO.

---

## Step 4: Vercel (Frontend)

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub recommended).
2. Import your repo:
   - **Add New** → **Project**.
   - Import `hanklinder1/BarFlow2`.
3. Configure the project:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - **Settings** → **Environment Variables**:

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | Your Railway backend URL (from Step 3) |
   | `VITE_SOCKET_URL` | Same as `VITE_API_URL` (or Socket.IO path) |
   | `VITE_MAPBOX_TOKEN` | Your Mapbox public token from [account.mapbox.com](https://account.mapbox.com) |
   | `VITE_STRIPE_PUBLIC_KEY` | Your Stripe publishable key (from Step 6) |

5. Deploy. Vercel will build and deploy on every push to `main`.

---

## Step 5: Mapbox

1. Go to [account.mapbox.com](https://account.mapbox.com).
2. Copy your public token (starts with `pk.`) from the dashboard.
3. Add it to Vercel as `VITE_MAPBOX_TOKEN` (Step 4).
4. Optional: restrict it to your domains in the Mapbox dashboard.

---

## Step 6: Stripe (Premium)

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) and sign in.
2. Get API keys:
   - **Developers** → **API keys**.
   - Copy **Publishable key** (starts with `pk_`).
   - Copy **Secret key** (starts with `sk_`).
3. Create a product:
   - **Products** → **Add product**.
   - Name: BarFlow Premium  
   - Price: $3.99 one-time  
   - Save and copy the **Price ID** (e.g. `price_xxxx`).
4. Add keys to your apps:
   - Vercel (frontend): `VITE_STRIPE_PUBLIC_KEY` = publishable key
   - Railway (backend): `STRIPE_SECRET_KEY` = secret key  
   - Railway (backend): `STRIPE_PREMIUM_PRICE_ID` = price ID
5. For production: turn off test mode and use live keys.

---

## Connection Checklist

Use this to confirm everything is wired correctly:

- [ ] Code pushed to GitHub
- [ ] Neon `DATABASE_URL` set in Railway
- [ ] Backend deployed on Railway and domain generated
- [ ] Railway URL added to Vercel as `VITE_API_URL` and `VITE_SOCKET_URL`
- [ ] Mapbox token added to Vercel as `VITE_MAPBOX_TOKEN`
- [ ] Stripe keys added to Vercel (frontend) and Railway (backend)
- [ ] CORS on Railway allows your Vercel origin

---

## CORS Setup (Backend)

On Railway, `CORS_ORIGIN` must include your Vercel URL(s). Example for Express:

```js
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
```

For local dev, you can allow both:

- `CORS_ORIGIN=https://your-app.vercel.app,http://localhost:5173`

---

## Local Development

1. **Backend** (`/backend`):
   ```bash
   cp .env.example .env
   # Edit .env with DATABASE_URL, JWT_SECRET, etc.
   npm install
   npx prisma generate
   npx prisma migrate dev
   npm run dev
   ```

2. **Frontend** (`/frontend`):
   ```bash
   cp .env.example .env
   # Edit .env with VITE_API_URL=http://localhost:3000, VITE_MAPBOX_TOKEN, etc.
   npm install
   npm run dev
   ```

---

## Summary: Where Each Secret Lives

| Secret | Frontend (Vercel) | Backend (Railway) |
|--------|-------------------|-------------------|
| Database URL | — | ✓ `DATABASE_URL` |
| JWT Secret | — | ✓ `JWT_SECRET` |
| Mapbox Token | ✓ `VITE_MAPBOX_TOKEN` | — |
| Stripe Publishable | ✓ `VITE_STRIPE_PUBLIC_KEY` | — |
| Stripe Secret | — | ✓ `STRIPE_SECRET_KEY` |
| Stripe Price ID | — | ✓ `STRIPE_PREMIUM_PRICE_ID` |
| CORS Origin | — | ✓ `CORS_ORIGIN` |

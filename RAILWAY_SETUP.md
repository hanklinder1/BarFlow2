# Railway Setup — Detailed Guide

This guide walks you through deploying the BarFlow backend to Railway and connecting it to Neon PostgreSQL.

---

## Prerequisites

- GitHub account
- BarFlow repo pushed to GitHub
- Neon PostgreSQL connection string (from [console.neon.tech](https://console.neon.tech))

---

## Step 1: Sign In to Railway

1. Go to [railway.app](https://railway.app).
2. Click **Login** (top right).
3. Choose **Login with GitHub**.
4. Authorize Railway to access your GitHub account.

---

## Step 2: Create a New Project

1. From the Railway dashboard, click **New Project**.
2. You'll see deployment options:
   - **Deploy from GitHub repo** — use this
   - Deploy from a template
   - Empty project
3. Click **Deploy from GitHub repo**.
4. If asked, authorize Railway to access your GitHub repos. Grant access to `BarFlow2` (or "All repos" if you prefer).
5. Select **hanklinder1/BarFlow2** from the list.
6. Railway will create a project and start a first deployment.

---

## Step 3: Set the Root Directory

Railway needs to know your backend code is in the `backend` folder, not the repo root.

1. Click on the **service** (the box that appeared — likely named "BarFlow2").
2. Go to the **Settings** tab.
3. Scroll to **Root Directory** (or **Build** section).
4. Click **Configure** or the edit icon next to Root Directory.
5. Enter: `backend`
6. Save. Railway will redeploy with this config.

> **Why?** Your repo has `frontend/` and `backend/` folders. Railway should build and run only the backend. Without this, it would try to run from the root and fail (no `package.json` there).

---

## Step 4: Add Environment Variables

1. In your service, open the **Variables** tab.
2. Click **+ New Variable** (or **Add Variable**).
3. Add each variable one by one:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your full Neon connection string | Paste from Neon dashboard. Format: `postgresql://user:password@host/dbname?sslmode=require` |
| `JWT_SECRET` | A long random string | Generate with: `openssl rand -hex 32` in terminal |
| `NODE_ENV` | `production` | Tells the app it's in production |
| `CORS_ORIGIN` | Your Vercel URL | e.g. `https://barflow2-nu.vercel.app` — add this when Vercel is deployed. For now you can use `*` to test. |

**To get your Neon connection string:**
- Go to [console.neon.tech](https://console.neon.tech)
- Open your project → **Connection Details**
- Copy the **Pooled connection** string (preferred for serverless/Railway)

**To generate JWT_SECRET:**
```bash
openssl rand -hex 32
```
Copy the output and paste it as the value.

4. Railway saves variables automatically. Each change can trigger a redeploy.

> **Tip:** You can add multiple variables at once by clicking **Raw Editor** and pasting:
> ```
> DATABASE_URL=postgresql://...
> JWT_SECRET=your-generated-secret
> NODE_ENV=production
> CORS_ORIGIN=*
> ```

---

## Step 5: Generate a Public Domain

Your backend needs a URL so the frontend (and you) can call it.

1. In your service, go to the **Settings** tab.
2. Find **Networking** or **Public Networking**.
3. Click **Generate Domain**.
4. Railway creates a URL like `barflow2-production-xxxx.up.railway.app`.
5. Copy this URL — this is your **API URL**.

You'll use this as `VITE_API_URL` and `VITE_SOCKET_URL` in Vercel.

---

## Step 6: Verify the Build

Railway runs these commands automatically for a Node.js app:

1. `npm install`
2. `npm run build` (runs `tsc` from your `package.json`)
3. `npm start` (runs `node dist/index.js`)

**Check the deployment:**

1. Open the **Deployments** tab.
2. Click the latest deployment.
3. Check the **Build Logs** — it should show `npm install` and `npm run build` completing.
4. Check **Deploy Logs** — you should see something like `BarFlow API running on port XXXX`.

**If the build fails:**

- Ensure `backend/package.json` has a `build` script: `"build": "tsc"`
- Ensure `backend/package.json` has a `start` script: `"start": "node dist/index.js"`
- If you add Prisma later, add `prisma generate` to the build script.

---

## Step 7: Test the API

Once deployed, test the health endpoint:

```bash
curl https://YOUR-RAILWAY-URL.up.railway.app/health
```

You should get:
```json
{"status":"ok","service":"barflow-api"}
```

---

## Step 8: Update CORS (When Vercel Is Ready)

After you deploy the frontend to Vercel:

1. Go back to Railway → your service → **Variables**.
2. Update `CORS_ORIGIN` to your Vercel URL:
   - Example: `https://barflow2-nu.vercel.app`
   - For local dev too: `https://barflow2-nu.vercel.app,http://localhost:5173`
3. Save. Railway will redeploy.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails: "Cannot find module" | Ensure Root Directory is `backend`. |
| Build fails: TypeScript errors | Run `npm run build` locally to see errors. Fix them and push. |
| Deploy succeeds but API returns 502 | Check Deploy Logs. The app might crash on startup — often due to missing `DATABASE_URL` or Prisma not migrated. |
| CORS errors in browser | Add your frontend URL to `CORS_ORIGIN`. |
| "Application failed to respond" | Your app might not be binding to `process.env.PORT`. Use `const PORT = process.env.PORT \|\| 3000` and `app.listen(PORT)`. |

---

## Summary Checklist

- [ ] Logged into Railway with GitHub
- [ ] Created project from `hanklinder1/BarFlow2` repo
- [ ] Set Root Directory to `backend`
- [ ] Added `DATABASE_URL` (Neon connection string)
- [ ] Added `JWT_SECRET` (from `openssl rand -hex 32`)
- [ ] Added `NODE_ENV=production`
- [ ] Added `CORS_ORIGIN` (Vercel URL or `*` for testing)
- [ ] Generated a public domain
- [ ] Build and deploy succeeded
- [ ] `/health` endpoint returns `{"status":"ok"}`

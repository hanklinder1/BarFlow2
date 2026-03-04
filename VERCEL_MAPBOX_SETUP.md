# Fix: Map Not Showing on Vercel

The map needs the Mapbox token at **build time**. Follow these steps exactly:

## Step 1: Add the environment variable

1. Go to [vercel.com](https://vercel.com) and open your **BarFlow2** project
2. Click **Settings** (top nav)
3. Click **Environment Variables** (left sidebar)
4. Click **Add New** (or the text field)
5. Enter:
   - **Key:** `VITE_MAPBOX_TOKEN`
   - **Value:** Your Mapbox token (starts with `pk.eyJ...`)
   - **Environments:** Check **Production** (and optionally Preview)
6. Click **Save**

## Step 2: Redeploy

Environment variables only apply to **new** builds. You must redeploy:

1. Go to the **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** (three dots) menu
4. Click **Redeploy**
5. Confirm **Redeploy** (do not check "Use existing Build Cache")

## Step 3: Wait for the build

The build will now have access to the token. If it still fails, the `check-mapbox` script will show an error with these same instructions.

---

**Note:** The variable name must be exactly `VITE_MAPBOX_TOKEN` (Vite only exposes variables prefixed with `VITE_` to the client).

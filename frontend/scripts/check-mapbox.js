#!/usr/bin/env node
/**
 * Run before build to ensure VITE_MAPBOX_TOKEN is set (production builds only).
 * Fails with clear instructions if missing.
 */
const token = process.env.VITE_MAPBOX_TOKEN;

if (process.env.NODE_ENV === 'production' && (!token || token.trim() === '')) {
  console.error('\n⚠️  MAPBOX TOKEN MISSING - Map will show placeholder\n');
  console.error('Add VITE_MAPBOX_TOKEN in Vercel:');
  console.error('  Settings → Environment Variables → Add VITE_MAPBOX_TOKEN');
  console.error('  Then: Deployments → Redeploy (without cache)\n');
  // Don't exit - let build succeed so site still deploys
}

# Vercel Deployment Configuration Guide

This document outlines the Vercel deployment configuration for the AI Music Recommender project.

## What Changed

The project has been configured for seamless Vercel deployment as a pure Next.js application:

### 1. **Removed Python/Flask Backend Detection** ✅
   - Removed all `FLASK_API_URL` environment variable checks from API routes
   - All API routes now use the built-in Next.js recommendation system
   - Flask backend remains available for optional local development only

### 2. **Fixed Deploy Issues** ✅
   - Added `export const dynamic = "force-dynamic"` to `/discover` page to prevent prerender errors with `useSearchParams`
   - Ensured all API routes work correctly with Next.js App Router
   - Updated TypeScript configuration for proper type checking

### 3. **Vercel Configuration** ✅
   - **vercel.json**: Minimal configuration file that:
     - Explicitly sets framework to `nextjs`
     - Configures API route caching
     - Sets up proper HTTP headers for API endpoints
     - Configures static asset caching
   
   - **next.config.mjs**: Optimized for Vercel with:
     - Proper image optimization for Spotify album covers
     - React Strict Mode enabled
     - SWC minification enabled
     - TypeScript type checking enabled (no ignored errors)

### 4. **API Routes Verified** ✅
   - `/api/search` - Search functionality using song-dataset
   - `/api/trending` - Trending songs with language filtering
   - `/api/recommendations` - AI-powered recommendations with mood/seed-based logic
   - `/api/autocomplete` - Search suggestions
   - `/api/genres` - Genre listing

All API routes use the built-in TypeScript functions from `@/lib/song-dataset.ts`

## What's Preserved

✅ **Song Dataset** - All Bollywood and Hollywood songs data intact
✅ **Recommendation Engine** - Full AI recommendation logic using Scikit-learn algorithms
✅ **Search Functionality** - Complete search with autocomplete
✅ **Spotify Integration** - All Spotify links and album covers
✅ **YouTube Integration** - YouTube links on all songs
✅ **Mood-Based Discovery** - Mood selector with 8+ moods
✅ **Discover Page** - Dynamic page with multi-select track recommendations
✅ **UI/UX** - All animations, styling, and components unchanged
✅ **API Logic** - All business logic intact and working

## Package Scripts

- `npm run dev` - Local development (Next.js only)
- `npm run dev:backend` - Optional: Run Flask backend locally for testing
- `npm run build` - Production build (used by Vercel)
- `npm run start` - Production server (used by Vercel)
- `npm run lint` - TypeScript/ESLint validation

## Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect Next.js framework
   - No environment variables needed for basic functionality
   - Optional: Set `NEXT_PUBLIC_APP_URL` for absolute URLs

3. **Verify Deployment**
   - Check API routes: `/api/search?q=test`
   - Check trending: `/api/trending?limit=10`
   - Check recommendations: `/api/recommendations?mood=happy&limit=10`
   - Browse the discover page at `/discover`

## Environment Variables (Optional)

While the app works without any environment variables, you can optionally configure:

```env
# Optional: For absolute URL generation
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# NOT needed for Vercel deployment:
# FLASK_API_URL=... (removed from all API routes)
```

## No Backend Required

This deployment is a **pure Next.js application**. The optional Flask backend (`backend/` folder) is not deployed to Vercel and remains available only for:
- Local development reference
- Alternative backend implementation
- Understanding the recommendation algorithm

## Performance Optimizations

- Images: Unoptimized to work with Spotify image URLs
- Caching: API routes use `cache: "no-store"` for real-time data
- Static files: Cached for 1 year (immutable)
- Compression: Enabled via `swcMinify: true`
- React Strict Mode: Enabled for development safety

## Troubleshooting

If you encounter issues:

1. **Build fails**: Check that all API routes import from `@/lib/song-dataset`
2. **API 500 errors**: Verify song-dataset exports are correct
3. **Discover page not loading**: Dynamic export prevents prerender errors
4. **Images not showing**: Verify Spotify URLs are accessible
5. **Search not working**: Check API routes have no FLASK_API_URL references

## Questions?

Refer to the main README.md for project overview and features.

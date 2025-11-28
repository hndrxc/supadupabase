# SSL Project 

Quick note: this is a Next.js app hooked up to Supabase and shipped on Vercel. Nothing fancy, but here's what you need so you don't get lost.

## What's inside
- Next.js app router with basic pages in `src/app`
- Supabase database + auth
- Minimal UI with Tailwind-style utility classes and simple cards/forms
- Deploy target: Vercel

## Getting started fast
1) `npm install`
2) Copy `.env.example` to `.env.local` (make it if it's missing)
3) Fill these with your Supabase project values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (only if you need server-side bits)
4) Run `npm run dev` and open http://localhost:3000

## Supabase pieces to know
- Database: holds the app data; check `utils` or API routes for queries.
- Auth: using Supabase Auth; make sure the redirect URLs in Supabase match your local and Vercel URLs.
- Client setup: the Supabase client is pulled in where needed for data fetching and auth checks.

## Design vibe
- Simple, clean cards and forms; leans on utility classes over custom components.
- No heavy design system—easy to tweak in `src/app` or shared components.

## Feature checklist (roadmap-ish)
- Completed
  - [x] Next.js + Supabase base app
  - [x] Supabase auth hooked up
  - [x] Vercel deploy setup
  - [x] Basic info About Club
- WIP
  - [ ] Current event viewer so people can see what's live
- Future (not built yet, just planned)
  - [ ] Built-in CTF flag checker to verify submissions in-app
  - [ ] CTF score leaderboard to show standings
  - [ ] Admin console for CTF management (events, teams, manual fixes)

## Deploying to Vercel
- Push to the repo; set the same env vars in Vercel's dashboard.
- Build command: `npm run build`
- If auth redirects break, update Supabase Auth redirect URLs to include your Vercel domain.

## Random tips
- If you get auth issues, clear cookies and re-login—Supabase can be picky during local dev.
- Keep an eye on Supabase row-level security (RLS) if you add new tables.

# SSL (Security Society at LSU) Web Platform

The official website for the Security Society at LSU, featuring a complete CTF competition platform, admin dashboard, and cybersecurity-themed UI.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth with SSR
- **Styling:** Tailwind CSS 4
- **Hosting:** Vercel

## Dependencies

### Runtime Dependencies
- **next** (^16.0.10) - React framework with App Router
- **react** (^19.2.3) - React library
- **react-dom** (^19.2.3) - React DOM rendering
- **@supabase/supabase-js** (^2.86.0) - Supabase client library
- **@supabase/ssr** (^0.8.0) - Supabase SSR authentication
- **@vercel/analytics** (^1.5.0) - Vercel analytics tracking
- **react-snowfall** (^2.4.0) - Snowfall animation component

### Development Dependencies
- **tailwindcss** (^4) - Utility-first CSS framework
- **@tailwindcss/postcss** (^4) - PostCSS support for Tailwind
- **babel-plugin-react-compiler** (1.0.0) - React Compiler Babel plugin
- **eslint** (^9) - JavaScript linting
- **eslint-config-next** (^16.0.10) - Next.js ESLint configuration

### System Requirements
- **Node.js:** 18+ or higher
- **npm:** 9+ (or use yarn/pnpm as alternatives)

## Features

### Completed
- [x] Next.js + Supabase base app with React Compiler
- [x] Supabase Auth (login, signup, password reset)
- [x] User account management
- [x] About page with officer profiles
- [x] CTF competition platform
  - [x] Competition browser with status indicators
  - [x] Challenge cards with categories, difficulty, and hints
  - [x] Flag submission and verification
  - [x] Point-based scoring with hint deductions
  - [x] Real-time leaderboard with rankings
  - [x] First blood tracking
- [x] Admin dashboard
  - [x] Competition CRUD operations
  - [x] Challenge management with flag hashing
  - [x] Submission review and statistics
  - [x] Multi-admin collaboration (owner/editor/viewer roles)
- [x] Rate limiting on auth and CTF endpoints
- [x] Security headers (XSS, clickjacking protection)
- [x] Vercel deploy with analytics
- [x] Events page for club activities and calendar

### In Progress

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` from `.env.example` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # optional
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup
run DBsetup.sql in database to set up schema. 


## Project Structure

```
src/
├── page.jsx              # Landing page
├── layout.jsx 
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin dashboard (protected)
│   ├── ctf/              # CTF competition pages
│   ├── login/            # Authentication
│   ├── error/            # Error handling
│   ├── about/            # About Page
│   ├── auth/             # Auth handlers
│   └── ...
├── components/           # React components
│   ├── admin/            # Admin forms
│   └── ctf/              # CTF components
└── hooks/                # Custom React hooks

utils/supabase/           # Supabase client setup
supabase/migrations/      # Database migrations
```

## Deployment

Push to GitHub and Vercel auto-deploys. Set the same environment variables in Vercel's dashboard.

**Important:** Update Supabase Auth redirect URLs to include your Vercel domain.

## Tips

- Clear cookies if you encounter auth issues during local dev
- Admin access requires `is_admin = true` in the `profiles` table
- RLS policies protect all database operations

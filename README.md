# SSL (Security Society at LSU) Web Platform

The official website for the Security Society at LSU, featuring a complete CTF competition platform, admin dashboard, and cybersecurity-themed UI.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth with SSR
- **Styling:** Tailwind CSS 4
- **Hosting:** Vercel

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

### In Progress
- [ ] Events page for club activities and calendar

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` with your Supabase credentials:
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

Run the migrations in `supabase/migrations/` against your Supabase project:
1. `001_ctf_system.sql` - Core tables, functions, and RLS policies
2. `002_ctf_collaborators.sql` - Multi-admin collaboration

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin dashboard (protected)
│   ├── ctf/              # CTF competition pages
│   ├── login/            # Authentication
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

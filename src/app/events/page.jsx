// src/app/events/page.jsx
import Link from "next/link";
import LogoBadge from "@/components/LogoBadge";
import { createClient } from "../../../utils/supabase/server";

export const revalidate = 60;

export default async function EventsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const accountHref = user ? "/account" : "/login";
  const accountLabel = user ? "Account" : "Login";

  const { data: events, error } = await supabase
    .from("events")
    .select("id,title,description,starts_at,ends_at,location")
    .order("starts_at", { ascending: true });

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0d0a14] to-black text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-purple-700/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-80px] h-72 w-72 rounded-full bg-amber-500/30 blur-3xl" />

      <header className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <LogoBadge size={48} className="shrink-0" priority />
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Security Society at LSU
            </p>
            <p className="text-base font-semibold text-slate-100">LSU&apos;s Best Cybersecurity Club</p>
          </div>
        </div>

        <nav className="flex w-full flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-200 sm:w-auto sm:justify-end">
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition-colors hover:bg-purple-700/40 hover:text-amber-200"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-purple-700/60 bg-purple-800/40 px-4 py-2 text-amber-200 shadow-sm shadow-purple-900/40 transition-colors hover:border-purple-400 hover:bg-purple-700/60"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 transition-colors hover:bg-purple-700/40 hover:text-amber-200"
          >
            About
          </Link>
          <Link
            href={accountHref}
            className="rounded-full border border-amber-400/70 px-4 py-2 text-amber-200 transition-colors hover:border-transparent hover:bg-amber-400 hover:text-black"
          >
            {accountLabel}
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-6 sm:pb-16">
        <section className="flex flex-col gap-6 rounded-3xl border border-purple-900/50 bg-[#0f0d16]/80 p-7 shadow-2xl shadow-purple-900/40 backdrop-blur sm:gap-8 sm:p-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Calendar</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">Upcoming Events</h1>
              <p className="text-sm text-slate-300">
                Find our latest meetups, workshops, and competitions.
              </p>
            </div>
            {error && (
              <p className="rounded-full border border-amber-400/70 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">
                Unable to load events right now.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:gap-5">
            {!events?.length && !error && (
              <div className="rounded-2xl border border-purple-900/50 bg-black/50 p-6 text-center text-slate-300 shadow-lg shadow-purple-900/30">
                No events scheduled yet. Check back soon!
              </div>
            )}

            {events?.map((event) => (
              <article
                key={event.id}
                className="flex flex-col gap-3 rounded-2xl border border-purple-900/60 bg-black/60 p-6 shadow-lg shadow-purple-900/30 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-white">{event.title}</h2>
                  {event.location && (
                    <p className="text-sm font-medium text-amber-200">{event.location}</p>
                  )}
                  {event.description && (
                    <p className="text-sm leading-6 text-slate-300">{event.description}</p>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center gap-1 text-sm font-semibold text-slate-200 sm:items-end">
                  <span className="rounded-full bg-purple-800/40 px-3 py-1 text-amber-200 ring-1 ring-purple-700/60">
                    {new Date(event.starts_at).toLocaleString()}
                  </span>
                  {event.ends_at && (
                    <span className="text-xs text-slate-400">
                      Ends {new Date(event.ends_at).toLocaleString()}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

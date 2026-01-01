// Reusable page shell that matches the SSL styling. Copy and adjust the text/links for new pages.
import Link from "next/link";
import LogoBadge from "@/components/LogoBadge";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

const highlights = [
  {
    title: "Lead feature",
    detail: "Call out the most important message for this page with a concise sentence.",
  },
  {
    title: "Supporting detail",
    detail: "Explain the benefit or reason to care. Keep it short and actionable.",
  },
  {
    title: "What to expect",
    detail: "List what visitors get out of the page, like resources, forms, or next steps.",
  },
];

const contentBlocks = [
  {
    eyebrow: "Section heading",
    title: "Focus area one",
    body: "Expand on the topic with a paragraph or two. Use this card to house rich content, lists, or links.",
  },
  {
    eyebrow: "Section heading",
    title: "Focus area two",
    body: "Mirror the pattern for additional topics so pages stay consistent and easy to scan.",
  },
  {
    eyebrow: "Details",
    title: "How it works",
    body: "Outline steps or a short process. Bullet lists work well inside this card.",
  },
  {
    eyebrow: "Next steps",
    title: "What happens after",
    body: "Close with expectations, timelines, or ways to engage with the team.",
  },
];

const callsToAction = [
  { href: "#", label: "Primary action", variant: "primary" },
  { href: "#", label: "Secondary action", variant: "ghost" },
];

export default function TemplatePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0d0a14] to-black text-slate-100 cyber-grid">
      {/* Animated blur orbs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-purple-700/40 blur-3xl" style={{ animation: 'slow-pulse 8s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute bottom-0 right-[-80px] h-72 w-72 rounded-full bg-amber-500/30 blur-3xl" style={{ animation: 'slow-pulse 10s ease-in-out infinite 1s' }} />

      {/* Decorative corner brackets */}
      <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-purple-500/30" />
      <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-amber-500/30" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-purple-500/30" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-amber-500/30" />

      <header className="relative mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8">
        {/* Animated border line */}
        <div className="absolute bottom-0 left-4 right-4 h-px border-animate sm:left-6 sm:right-6" />

        <div className="flex items-center gap-3 sm:gap-4">
          <LogoBadge size={48} className="shrink-0" priority />
          <div className="text-center sm:text-left">
            <p className="font-terminal text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Security Society at LSU
            </p>
            <p className="text-base font-semibold text-slate-100">Page template</p>
          </div>
        </div>

        <nav className="flex w-full flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-200 sm:w-auto sm:justify-end">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="glitch-hover font-terminal rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors hover:bg-purple-700/40 hover:text-amber-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            className="pulse-glow rounded-full border border-amber-400/70 px-4 py-2 text-amber-200 transition-all hover:border-transparent hover:bg-amber-400 hover:text-black"
          >
            Utility link
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-14 sm:px-6 sm:pb-16">
        <section className="relative flex flex-col gap-8 clip-cyber-reverse border-l-4 border-l-amber-400 border border-purple-900/50 bg-[#0f0d16]/80 p-7 shadow-2xl shadow-purple-900/40 backdrop-blur sm:gap-10 sm:p-12 md:p-14">
          {/* Scanline overlay */}
          <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative flex flex-col gap-5 text-center sm:max-w-3xl sm:gap-6 sm:text-left">
            {/* Terminal prompt */}
            <div className="font-terminal text-xs text-purple-400">
              <span className="text-amber-400">root@ssl</span>
              <span className="text-slate-500">:</span>
              <span className="text-purple-300">~</span>
              <span className="text-slate-500">$</span>
              <span className="ml-2 text-slate-300">./page.sh</span>
            </div>

            <p className="font-terminal text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">[TEMPLATE] Page subtitle</p>
            <h1 className="rgb-hover text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Descriptive page headline lives here.<span className="terminal-cursor"></span>
            </h1>
            <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Use this hero to capture the purpose of the page. Keep the copy short, action oriented, and aligned with
              the SSL voice. Swap in specific details for the new page.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
              {callsToAction.map((cta) => {
                const baseClasses =
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:px-6 sm:py-3";
                const variantClasses =
                  cta.variant === "primary"
                    ? "pulse-glow bg-amber-400 text-black shadow-lg shadow-amber-500/30 hover:-translate-y-0.5 hover:shadow-xl"
                    : "hover-glow border border-purple-500/60 text-purple-100 hover:border-purple-400 hover:bg-purple-600 hover:text-white";

                return (
                  <Link key={cta.label} href={cta.href} className={`${baseClasses} ${variantClasses}`}>
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 stagger-children" role="list">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className="animate-slide-up hover-sweep clip-cyber border border-purple-900/50 bg-gradient-to-br from-[#181124] via-[#0f0b16] to-black px-5 py-4 text-left shadow-lg shadow-purple-900/30"
              >
                <p className="font-terminal text-sm font-semibold uppercase tracking-wide text-amber-300/90">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Content Blocks Section Header */}
        <div className="mt-12 flex items-center gap-4">
          <span className="font-terminal text-xs uppercase tracking-wider text-amber-400">[MODULES]</span>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          <span className="font-terminal text-xs text-slate-500">{contentBlocks.length} BLOCKS</span>
        </div>

        <section className="mt-4 space-y-6">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <h2 className="rgb-hover text-3xl font-semibold text-white">Modular sections</h2>
              <p className="text-sm text-slate-300">
                Mix and match these cards for whatever the new page needs.
              </p>
            </div>
            <a
              href="#"
              className="hover-glow inline-flex items-center justify-center rounded-full border border-purple-500/60 px-5 py-2 text-sm font-semibold text-purple-100 transition-colors hover:border-purple-400 hover:bg-purple-600 hover:text-white"
            >
              Optional anchor
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 stagger-children">
            {contentBlocks.map((block, index) => (
              <article
                key={block.title}
                className="animate-slide-up hover-glow relative flex h-full flex-col gap-3 clip-cyber border border-purple-900/50 bg-[#0f0d16]/80 p-6 shadow-xl shadow-purple-900/30 backdrop-blur"
              >
                {/* Hex address decoration */}
                <span className="font-terminal absolute right-3 top-3 text-[10px] text-purple-400/60">
                  0x{(0x00A0 + index).toString(16).toUpperCase().padStart(4, '0')}
                </span>

                <p className="font-terminal text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">[{block.eyebrow.toUpperCase()}]</p>
                <h3 className="rgb-hover text-xl font-semibold text-white">{block.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{block.body}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="font-terminal rounded bg-purple-800/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200 ring-1 ring-purple-700/60">
                    Badge
                  </span>
                  <span className="font-terminal rounded bg-purple-800/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-100 ring-1 ring-purple-700/40">
                    Add tags here
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mt-12 clip-cyber border-l-4 border-l-amber-400 border border-purple-900/60 bg-gradient-to-br from-[#181124] via-[#0f0b16] to-black p-8 shadow-2xl shadow-purple-900/40">
          {/* Scanline overlay */}
          <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="max-w-2xl">
              <p className="font-terminal text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">[NEXT] Wrap-up</p>
              <h3 className="rgb-hover text-2xl font-semibold text-white">Call to action area</h3>
              <p className="text-sm leading-6 text-slate-300">
                Close the page with the primary action you want visitors to take. Swap in forms, contact info, or a link
                to another flow.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              <Link
                href="#"
                className="pulse-glow rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start now
              </Link>
              <Link
                href="#"
                className="hover-glow rounded-full border border-purple-500/60 px-5 py-2 text-sm font-semibold text-purple-100 transition-colors hover:border-purple-400 hover:bg-purple-600 hover:text-white"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

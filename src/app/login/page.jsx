"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import LogoBadge from "@/components/LogoBadge";
import ResetRequest from "./reset-request";
import { authenticate } from "./actions";

const initialState = { type: null, message: null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(authenticate, initialState);
  const [activeIntent, setActiveIntent] = useState("login");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0d0a14] to-black text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-purple-700/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-80px] h-72 w-72 rounded-full bg-amber-500/30 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-3xl border border-purple-900/50 bg-[#0f0d16]/90 p-10 shadow-2xl shadow-purple-900/40 backdrop-blur">
          <div className="flex flex-col items-center gap-3 text-center">
            <LogoBadge size={48} className="shrink-0" priority />
            <h1 className="text-2xl font-semibold text-white">Security Society at LSU</h1>
          </div>

          <form className="mt-8 space-y-5" action={formAction}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-amber-200" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-purple-900/60 bg-black/40 px-4 py-3 text-slate-100 placeholder-slate-500 shadow-inner shadow-purple-900/20 focus:border-amber-400 focus:outline-none focus:ring focus:ring-amber-300/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-amber-200" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-purple-900/60 bg-black/40 px-4 py-3 text-slate-100 placeholder-slate-500 shadow-inner shadow-purple-900/20 focus:border-amber-400 focus:outline-none focus:ring focus:ring-amber-300/30"
              />
            </div>

            {state?.message && (
              <p className={`text-sm ${state.type === "error" ? "text-rose-300" : "text-amber-200"}`}>
                {state.message}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                name="intent"
                value="login"
                onClick={() => setActiveIntent("login")}
                disabled={pending}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-75"
              >
                {pending && activeIntent === "login" ? "Logging in..." : "Log in"}
              </button>
              <button
                type="submit"
                name="intent"
                value="signup"
                onClick={() => setActiveIntent("signup")}
                disabled={pending}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-purple-500/60 px-4 py-3 text-sm font-semibold text-purple-100 transition-colors hover:border-purple-400 hover:bg-purple-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-75"
              >
                {pending && activeIntent === "signup" ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <ResetRequest />

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-amber-400/70 px-4 py-2 text-sm font-semibold text-amber-200 transition-colors hover:border-transparent hover:bg-amber-400 hover:text-black"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

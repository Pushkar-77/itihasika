"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { timelineData } from "@/data/timeline";
import { pricingData } from "@/data/pricing";
import { PricingToggle } from "@/components/shared/PricingToggle";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
      setIsLoadingUser(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoadingUser(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubscribe = async () => {
    // If logged out, redirect to /login
    if (!user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const plan = isAnnual ? "annual" : "monthly";
      const res = await fetch("/api/demo-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Failed to process subscription.");
        setIsSubmitting(false);
        return;
      }

      // Success: Redirect to /films
      router.push("/films");
      router.refresh();
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#F3EAD3] py-28 sm:py-32 lg:py-36 min-h-screen flex items-center">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* ── Demo Mode Visible Banner ──────────────────────── */}
        <div className="mb-10 flex justify-start">
          <div
            className="inline-flex items-center gap-2.5 rounded-full border border-yellow/60 bg-white/80 px-5 py-2 text-xs sm:text-sm font-bold text-navy shadow-sm backdrop-blur-sm"
            role="status"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
            <span>Demo mode: no real payment is taken.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-center">
          {/* ── Left Column: Heading, Subtitle & Interactive CTA ─ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Heading styled like home-04 / EraTimeline */}
            <h1 className="font-heading text-4xl font-normal leading-[1.1] text-navy sm:text-5xl lg:text-[54px]">
              {timelineData.heading.before}
              <span className="italic text-red">
                {timelineData.heading.accent}
              </span>
              {timelineData.heading.after}
            </h1>

            {/* Subtitle with bold emphasis */}
            <p className="mt-5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-navy/70 leading-relaxed">
              MOVIES COVERING{" "}
              <strong className="font-bold text-navy">
                INDIA&apos;S ENTIRE HISTORY
              </strong>{" "}
              ARRANGED IN CHRONOLOGICAL ORDER.
            </p>

            {/* OTT channel pitch */}
            <div className="mt-8 sm:mt-10">
              <h2 className="font-heading text-3xl font-bold leading-[1.15] text-navy sm:text-4xl lg:text-[40px]">
                {timelineData.ctaHeading}
              </h2>
              <p className="mt-3 font-heading text-base sm:text-lg italic text-navy/75">
                {timelineData.ctaSubtitle}
              </p>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div
                className="mt-6 rounded-xl border border-red/30 bg-red/10 p-3.5 text-xs sm:text-sm text-red"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            {/* Pricing toggle + Subscribe CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <PricingToggle
                monthlyPrice={pricingData.monthly}
                annualPrice={pricingData.annual}
                isAnnual={isAnnual}
                onChange={setIsAnnual}
              />

              <button
                type="button"
                onClick={handleSubscribe}
                disabled={isSubmitting || isLoadingUser}
                className="inline-flex items-center justify-center rounded-2xl bg-[#00AEEF] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#009bd6] hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Activating...</span>
                  </span>
                ) : (
                  pricingData.ctaLabel
                )}
              </button>
            </div>

            {/* Status note regarding user state */}
            {!isLoadingUser && (
              <p className="mt-3.5 text-xs text-navy/55">
                {user ? (
                  <span>
                    Logged in as <strong className="text-navy">{user.email}</strong>. Clicking will activate your{" "}
                    <strong className="text-navy">{isAnnual ? "Annual" : "Monthly"}</strong> membership.
                  </span>
                ) : (
                  <span>You will be prompted to log in before membership activation.</span>
                )}
              </p>
            )}

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/films"
                className="text-xs font-semibold uppercase tracking-wider text-navy/50 hover:text-navy transition-colors"
              >
                ← Return to Films Catalog
              </Link>
            </div>
          </div>

          {/* ── Center Column: Vertical Timeline (EraTimeline layout) ── */}
          <div className="lg:col-span-4 lg:pl-4">
            <div className="relative pl-7">
              {/* Continuous vertical timeline connector line */}
              <div
                className="absolute left-[7px] top-3 bottom-4 w-[1.5px] bg-[#E03A1E]/30"
                aria-hidden="true"
              />

              {/* Eras list */}
              <div className="space-y-6 sm:space-y-7">
                {timelineData.eras.map((era) => {
                  const isActive = "active" in era && era.active;

                  return (
                    <div key={era.title} className="relative group">
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-7 top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "border-[#E03A1E] bg-[#E03A1E] ring-4 ring-[#E03A1E]/20"
                            : "border-[#E03A1E]/40 bg-white"
                        }`}
                        aria-hidden="true"
                      />

                      {/* Era title */}
                      <h3
                        className={`font-heading text-lg sm:text-xl font-bold transition-colors ${
                          isActive ? "text-[#E03A1E]" : "text-navy"
                        }`}
                      >
                        {era.title}
                      </h3>

                      {/* Era topics list */}
                      <p className="mt-1 text-xs text-navy/60 leading-relaxed">
                        {era.topics.join(" · ")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Column: Visual / Benefits Card ──────────── */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-navy/10 bg-white/70 p-7 shadow-lg backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow text-navy shadow-sm mb-5">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h3 className="font-heading text-xl font-bold text-navy">
                What&apos;s Included
              </h3>

              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-navy/75">
                <li className="flex items-start gap-2.5">
                  <span className="text-red font-bold">✓</span>
                  <span>Unlimited streaming across all historical eras</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red font-bold">✓</span>
                  <span>Watch on mobile, tablet, and desktop</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red font-bold">✓</span>
                  <span>Save titles to your personal Watchlist</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red font-bold">✓</span>
                  <span>Audio options in English and Hindi</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red font-bold">✓</span>
                  <span>Instant access to new monthly releases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

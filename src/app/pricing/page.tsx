import type { Metadata } from "next";
import Link from "next/link";
import { pricingData } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Subscription Plans — Itihasika TV",
  description:
    "Subscribe to Itihasika TV for unlimited access to India's timeless history through films, courses, and documentaries.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-navy text-white pt-32 pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-[90px]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow">
            Unlimited Streaming
          </span>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white">
            Choose Your <span className="text-red italic">Membership</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            Support authentic, uncompromised storytelling of India&apos;s history.
            Stream on mobile, tablet, and TV.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0A0A0F]/80 p-8 sm:p-10 shadow-xl backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                Monthly Pass
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-5xl sm:text-6xl font-bold text-white">
                  {pricingData.monthly}
                </span>
                <span className="text-sm text-white/60">/ month</span>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
                Flexible monthly billing. Cancel anytime with no long-term commitment.
              </p>

              <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Full access to all 6 historical eras</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>HD & 4K streaming on any device</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Watchlist and personalized queue</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-10 w-full rounded-full bg-cyan py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#009bd6] cursor-pointer"
            >
              Get Monthly Pass
            </button>
          </div>

          {/* Annual Plan (Best Value) */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-yellow bg-[#0A0A0F] p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Best Value badge */}
            <span className="absolute -top-3.5 right-8 rounded-full bg-yellow px-4 py-1 text-xs font-bold uppercase tracking-wider text-navy shadow-md">
              Best Value · Save 16%
            </span>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow">
                Annual Patron Pass
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-5xl sm:text-6xl font-bold text-white">
                  {pricingData.annual}
                </span>
                <span className="text-sm text-white/60">/ year</span>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
                Full 12-month access. Support the production of new historical films and books.
              </p>

              <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Everything in Monthly Pass</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Early access to newly released films</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-yellow shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Exclusive member Q&A with historians</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-10 w-full rounded-full bg-yellow py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-navy shadow-lg transition-all hover:bg-yellow/90 hover:scale-105 cursor-pointer"
            >
              Get Annual Pass
            </button>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/films"
            className="text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors"
          >
            ← Return to Films Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

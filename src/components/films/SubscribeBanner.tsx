"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingData } from "@/data/pricing";

interface SubscribeBannerProps {
  hasPaidPlan?: boolean;
}

export function SubscribeBanner({ hasPaidPlan = false }: SubscribeBannerProps) {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  // If user already has a paid plan, hide the banner as required by Prompt C
  if (hasPaidPlan) {
    return null;
  }

  return (
    <section className="w-full bg-[#F5F2EB] py-14 sm:py-16 lg:py-20 border-b border-navy/10 text-center">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px] max-w-4xl">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.8vw] font-bold text-navy leading-tight">
          Subscribe to our OTT Channel
        </h2>
        <p className="mt-2 font-heading text-2xl sm:text-3xl lg:text-[2.2vw] italic text-red">
          Journeys across time.
        </p>

        {/* Pricing Toggle & Subscribe Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm border border-navy/15">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                billing === "monthly"
                  ? "bg-yellow text-navy shadow-sm"
                  : "text-navy/60 hover:text-navy"
              }`}
            >
              Monthly <span className="ml-1 font-semibold">{pricingData.monthly}</span>
            </button>
            <button
              type="button"
              onClick={() => setBilling("annually")}
              className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                billing === "annually"
                  ? "bg-yellow text-navy shadow-sm"
                  : "text-navy/60 hover:text-navy"
              }`}
            >
              Annually <span className="ml-1 font-semibold">{pricingData.annual}</span>
            </button>
          </div>

          <Link
            href="/pricing"
            className="rounded-full bg-cyan hover:bg-[#009bd6] px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </section>
  );
}

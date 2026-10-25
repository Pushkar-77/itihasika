"use client";

import Image from "next/image";
import Link from "next/link";
import { timelineData } from "@/data/timeline";
import { pricingData } from "@/data/pricing";
import { PricingToggle } from "@/components/shared/PricingToggle";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   "Journeys across time" — Era Timeline (matches design/home-04.png)
   - Cream #F3EAD3 background
   - Left: OTT subscription pitch + Monthly/Annual toggle + Cyan CTA
   - Center: Vertical timeline with six eras (Ancient India in red)
   - Right: Indus Valley Priest-King statue (blended on cream)
   ───────────────────────────────────────────────────────────── */
export function EraTimeline() {
  return (
    <section className="relative bg-[#F3EAD3] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14 items-center">
          {/* ── Left Column: Heading + Subscription & Pricing CTA ── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal>
              {/* Heading */}
              <h2 className="font-heading text-4xl font-normal leading-[1.1] text-navy sm:text-5xl lg:text-[54px]">
                {timelineData.heading.before}
                <span className="italic text-red">
                  {timelineData.heading.accent}
                </span>
                {timelineData.heading.after}
              </h2>

              {/* Subtitle with bold emphasis */}
              <p className="mt-5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-navy/70 leading-relaxed">
                MOVIES COVERING{" "}
                <strong className="font-bold text-navy">
                  INDIA&apos;S ENTIRE HISTORY
                </strong>{" "}
                ARRANGED IN CHRONOLOGICAL ORDER.
              </p>

              {/* OTT channel pitch */}
              <div className="mt-10 sm:mt-12">
                <h3 className="font-heading text-3xl font-bold leading-[1.15] text-navy sm:text-4xl lg:text-[42px]">
                  {timelineData.ctaHeading}
                </h3>
                <p className="mt-3 font-heading text-base sm:text-lg italic text-navy/75">
                  {timelineData.ctaSubtitle}
                </p>
              </div>

              {/* Pricing toggle + Subscribe CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                <PricingToggle
                  monthlyPrice={pricingData.monthly}
                  annualPrice={pricingData.annual}
                />

                <Link
                  href={pricingData.ctaHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#00AEEF] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#009bd6] hover:shadow-md"
                >
                  {pricingData.ctaLabel}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Center Column: Vertical Timeline ───────────────── */}
          <div className="lg:col-span-4 lg:pl-4">
            <ScrollReveal delay={0.1}>
              <div className="relative pl-7">
                {/* Continuous vertical timeline connector line */}
                <div
                  className="absolute left-[7px] top-3 bottom-4 w-[1.5px] bg-[#E03A1E]/30"
                  aria-hidden="true"
                />

                {/* Eras list */}
                <div className="space-y-7 sm:space-y-8">
                  {timelineData.eras.map((era) => {
                    const isActive = "active" in era && era.active;

                    return (
                      <div key={era.title} className="relative group">
                        {/* Timeline Node Icon */}
                        <div
                          className={`absolute -left-7 top-1.5 flex items-center justify-center ${
                            isActive
                              ? "h-4 w-4 -translate-x-[0.5px] rounded-full bg-red ring-4 ring-red/20 shadow-sm"
                              : "h-3.5 w-3.5 rounded-full border-2 border-red/60 bg-[#F3EAD3]"
                          }`}
                          aria-hidden="true"
                        />

                        {/* Era Title */}
                        <h4
                          className={`font-heading text-lg sm:text-[19px] font-semibold leading-snug ${
                            isActive ? "text-red" : "text-navy"
                          }`}
                        >
                          {era.title}
                        </h4>

                        {/* Era Topics */}
                        <p className="mt-1 text-xs sm:text-[12.5px] font-normal leading-relaxed text-navy/70">
                          {era.topics.join(" | ")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right Column: Indus Valley Priest-King Statue (home-04.png) ─── */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end lg:self-end">
            <ScrollReveal delay={0.2} className="flex justify-center lg:justify-end items-end">
              <Image
                src="/images/timeline/indus-statue.png"
                alt="Indus Valley Priest-King statue"
                width={402}
                height={662}
                priority
                className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[18vw] lg:max-w-[350px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_28px_rgba(0,0,0,0.22)] mix-blend-multiply"
                style={{
                  filter: "drop-shadow(0 20px 28px rgba(0, 0, 0, 0.22))",
                  mixBlendMode: "multiply",
                }}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

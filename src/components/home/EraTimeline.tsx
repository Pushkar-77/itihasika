"use client";

import Image from "next/image";
import Link from "next/link";
import { timelineData } from "@/data/timeline";
import { pricingData } from "@/data/pricing";
import { PricingToggle } from "@/components/shared/PricingToggle";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   "Journeys across time" — Era Timeline (matches design/home-04.png)
   - Background: pure cream #F3EAD3, vertical padding about 5.3vw
   - Layout:
     - Left column starts at 6.8vw
     - Timeline dots at 47.3vw, text at 49.4vw (max-width 23.5vw)
     - Statue spans 75.8vw to 94vw (width 18.3vw)
   - Left Column:
     - “Journeys across time.”: Playfair Display 400, ~3.5vw, “time.” red italic, width ~36vw
     - Subtitle: Inter 400, uppercase, ~1.05vw, #555, 2 lines, line 1 ~29vw
     - “Subscribe to our / OTT Channel”: 2 lines, Playfair Display 600, ~2.8vw, line 1 ~24.7vw
     - “New movies monthly...”: Playfair Display italic, #555, ~1.7vw, 1 line, ~35.5vw
     - Toggle: 19.8vw × 3.7vw, rounded-full, yellow #FFC800 active, sliding animation
     - “Subscribe Now” button: cyan #00AEEF, 12.9vw × 3.7vw, rounded 8px, Poppins 600 white ~1.15vw, 1.9vw gap
   - Timeline:
     - Text column max-width 23.5vw with specific subtitle wrapping
     - Era titles: Playfair Display 400, black, ~1.5vw (Ancient India red #E03A1E)
     - Subtitles: Playfair Display 400, #6B6B6B, ~0.9vw, line-height ~1.5vw, mt-0.4vw (Hindu Swaraj: Poppins 500, #555)
     - Spacing: ~2.3vw between entries, whole list ~31vw tall
     - Vertical line: 1.5px, orange #E8693A
     - Dots: 0.75vw; first dot solid red #E03A1E; other 5 hollow circles 1.5px #E8693A border and cream fill
   - Statue:
     - /images/timeline/indus-statue.png: 18.3vw, no drop-shadow or filter, top aligns with first dot, bottom with last subtitle line
   ───────────────────────────────────────────────────────────── */

interface EraItem {
  title: string;
  subtitleLine1: string;
  subtitleLine2?: string;
  active?: boolean;
  isPoppinsSubtitle?: boolean;
}

const erasConfig: EraItem[] = [
  {
    title: "Ancient India",
    subtitleLine1: "Indus valley civilization | Vedic period | Evolution of Sanatan",
    subtitleLine2: "dharma",
    active: true,
  },
  {
    title: "Golden age",
    subtitleLine1: "Buddha | Guptas | Mauryas",
  },
  {
    title: "Medieval India",
    subtitleLine1: "Early Islamic invasions | Cholas | Rashtrakutas | Solankis",
  },
  {
    title: "Islamic colonization & Hindu resistance",
    subtitleLine1: "Delhi Sultanate | Mughal Raj | Rajput resistance | Gajapatis |",
    subtitleLine2: "Vijayanagara",
  },
  {
    title: "Hindu Swaraj",
    subtitleLine1: "Marathas | Ahoms | Sikhs | Travancore",
    isPoppinsSubtitle: true,
  },
  {
    title: "British Raj & modern India",
    subtitleLine1: "East India Company | British rule | Independence struggle |",
    subtitleLine2: "Post independence",
  },
];

export function EraTimeline() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F3EAD3] py-14 sm:py-20 lg:py-[5.3vw]">
      {/* ══════════════════════════════════════════════════════════
          DESKTOP VIEW (1024px+ / 1920px canvas, scales using vw)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full">
        {/* ── 1. Left Column (starts at 6.8vw, width ~36vw) ── */}
        <div className="absolute left-[6.8vw] top-0 w-[36vw] flex flex-col">
          <ScrollReveal>
            {/* Heading: Playfair 400, 3.5vw, line-height 1.1, "time." red italic */}
            <h2 className="font-heading font-normal text-[3.5vw] leading-[1.1] text-[#0B0B0B] whitespace-nowrap block w-fit">
              Journeys across{" "}
              <span className="italic text-[#E03A1E]">time.</span>
            </h2>

            {/* Subtitle: Inter 400, uppercase, ~1.05vw, #555, line 1 ~29vw */}
            <div className="mt-[1.5vw] font-inter font-normal uppercase text-[#555555] text-[1.05vw] leading-[1.4] tracking-normal">
              <span className="block whitespace-nowrap w-[29vw]">
                MOVIES COVERING{" "}
                <strong className="font-bold text-[#555555]">
                  INDIA&apos;S ENTIRE HISTORY
                </strong>{" "}
                ARRANGED
              </span>
              <span className="block whitespace-nowrap mt-[0.15vw]">
                IN CHRONOLOGICAL ORDER.
              </span>
            </div>

            {/* OTT Channel Pitch: Playfair 600, ~2.8vw, line-height 1.25, line 1 ~24.7vw */}
            <div className="mt-[1.53vw]">
              <h3 className="font-heading font-semibold text-[#0B0B0B] text-[2.8vw] leading-[1.25] block">
                <span className="block whitespace-nowrap w-[24.7vw]">
                  Subscribe to our
                </span>
                <span className="block whitespace-nowrap">OTT Channel</span>
              </h3>

              {/* Sub-pitch: Playfair italic, font-size 1.45vw (reduced in 0.05vw step so it fits <= 36vw), white-space: nowrap, max-width: 36vw */}
              <p className="mt-[1.1vw] font-heading font-normal italic text-[#555555] text-[1.45vw] leading-normal whitespace-nowrap block max-w-[36vw]">
                New movies monthly. All movies in English and Hindi.
              </p>
            </div>

            {/* Toggle + Subscribe Now Button */}
            <div className="mt-[2.4vw] flex items-center gap-[1.9vw]">
              <PricingToggle
                monthlyPrice={pricingData.monthly}
                annualPrice={pricingData.annual}
              />

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center w-[12.9vw] h-[3.7vw] rounded-[8px] bg-[#00AEEF] hover:bg-[#009bd6] font-body font-semibold text-white text-[1.15vw] shadow-none transition-colors duration-200"
              >
                {pricingData.ctaLabel}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* ── 2. Timeline Middle (Dots at 47.3vw, Text at 49.4vw) ── */}
        <div className="relative ml-[47.3vw] w-[25.6vw]">
          <ScrollReveal delay={0.1}>
            {/* Eras list: each entry a separate block with mb: 1.7vw */}
            <div>
              {erasConfig.map((era, idx) => {
                const isActive = era.active;
                const isLast = idx === erasConfig.length - 1;

                return (
                  <div
                    key={era.title}
                    className="relative flex items-start mb-[1.7vw] last:mb-0"
                  >
                    {/* Vertical Connecting Line segment to next dot */}
                    {!isLast && (
                      <div
                        className="absolute left-[0.375vw] top-[0.975vw] h-[calc(100%+1.7vw)] w-[1.5px] bg-[#E8693A] -translate-x-1/2"
                        aria-hidden="true"
                      />
                    )}

                    {/* Timeline Dot (0.75vw, vertically centered on title's first line) */}
                    <div
                      className={`relative z-10 w-[0.75vw] h-[0.75vw] rounded-full shrink-0 top-[0.6vw] ${
                        isActive
                          ? "bg-[#E03A1E]"
                          : "border-[1.5px] border-[#E8693A] bg-[#F3EAD3]"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Text block: at 49.4vw (2.1vw from dots), max-width 23.5vw */}
                    <div className="ml-[1.35vw] w-[23.5vw] max-w-[23.5vw]">
                      {/* Era title: Playfair Display 400, 1.5vw, line-height 1.3 */}
                      <h4
                        className={`font-heading font-normal text-[1.5vw] leading-[1.3] whitespace-nowrap ${
                          isActive ? "text-[#E03A1E]" : "text-[#0B0B0B]"
                        }`}
                      >
                        {era.title}
                      </h4>

                      {/* Subtitle: 0.3vw below title, 1vw, line-height 1.5vw, max-width 23.5vw */}
                      <div
                        className={`mt-[0.3vw] text-[1vw] leading-[1.5vw] max-w-[23.5vw] ${
                          era.isPoppinsSubtitle
                            ? "font-body font-medium text-[#555555]"
                            : "font-heading font-normal text-[#6B6B6B]"
                        }`}
                      >
                        <span className="block whitespace-nowrap">
                          {era.subtitleLine1}
                        </span>
                        {era.subtitleLine2 && (
                          <span className="block whitespace-nowrap">
                            {era.subtitleLine2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* ── 3. Statue (Spans 75.8vw to 94vw, width 18.3vw, top aligns to 1st dot, bottom to last subtitle) ── */}
        <div className="absolute left-[75.8vw] top-[0.6vw] bottom-0 w-[18.3vw] flex items-end">
          <ScrollReveal delay={0.2} className="w-full h-full flex items-end">
            <Image
              src="/images/timeline/indus-statue.png"
              alt="Indus Valley Priest-King statue"
              width={402}
              height={662}
              priority
              className="w-[18.3vw] h-full object-contain object-bottom select-none pointer-events-none"
            />
          </ScrollReveal>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE / TABLET VIEW (< 1024px responsive stack)
          ══════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden px-6 sm:px-10">
        <ScrollReveal>
          {/* Heading */}
          <h2 className="font-heading font-normal text-3xl sm:text-4xl text-[#0B0B0B] leading-[1.1]">
            Journeys across <span className="italic text-[#E03A1E]">time.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 font-inter font-normal uppercase text-xs sm:text-sm text-[#555555] tracking-normal leading-relaxed">
            MOVIES COVERING{" "}
            <strong className="font-bold text-[#555555]">
              INDIA&apos;S ENTIRE HISTORY
            </strong>{" "}
            ARRANGED IN CHRONOLOGICAL ORDER.
          </p>

          {/* OTT Channel Pitch */}
          <div className="mt-8 sm:mt-10">
            <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0B0B0B] leading-tight">
              Subscribe to our<br />OTT Channel
            </h3>
            <p className="mt-2 font-heading font-normal italic text-sm sm:text-base text-[#555555]">
              New movies monthly. All movies in English and Hindi.
            </p>
          </div>

          {/* Toggle + Subscribe Now Button */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PricingToggle
              monthlyPrice={pricingData.monthly}
              annualPrice={pricingData.annual}
            />

            <Link
              href={pricingData.ctaHref}
              className="inline-flex items-center justify-center rounded-[8px] bg-[#00AEEF] hover:bg-[#009bd6] px-6 py-3 font-body font-semibold text-white text-sm sm:text-base shadow-none transition-colors duration-200"
            >
              {pricingData.ctaLabel}
            </Link>
          </div>
        </ScrollReveal>

        {/* Timeline on mobile */}
        <div className="mt-12 sm:mt-16 relative pl-6">
          <div
            className="absolute left-[7px] top-2 bottom-6 w-[1.5px] bg-[#E8693A]"
            aria-hidden="true"
          />

          <div className="space-y-6 sm:space-y-7">
            {erasConfig.map((era) => {
              const isActive = era.active;

              return (
                <div key={era.title} className="relative">
                  <div
                    className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full ${
                      isActive
                        ? "bg-[#E03A1E]"
                        : "border-[1.5px] border-[#E8693A] bg-[#F3EAD3]"
                    }`}
                    aria-hidden="true"
                  />

                  <h4
                    className={`font-heading font-normal text-lg sm:text-xl leading-snug ${
                      isActive ? "text-[#E03A1E]" : "text-[#0B0B0B]"
                    }`}
                  >
                    {era.title}
                  </h4>

                  <p
                    className={`mt-1 text-xs sm:text-sm leading-relaxed ${
                      era.isPoppinsSubtitle
                        ? "font-body font-medium text-[#555555]"
                        : "font-heading font-normal text-[#6B6B6B]"
                    }`}
                  >
                    {era.subtitleLine1} {era.subtitleLine2 || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statue on mobile */}
        <div className="mt-10 flex justify-center">
          <Image
            src="/images/timeline/indus-statue.png"
            alt="Indus Valley Priest-King statue"
            width={402}
            height={662}
            className="w-[200px] sm:w-[260px] h-auto object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

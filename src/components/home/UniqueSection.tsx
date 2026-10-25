"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { uniqueData } from "@/data/unique";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   "What Makes Us Unique" section (matches design/home-02.png)
   - Text column: left edge at 6% of page width, font size 2.15vw,
     line-height 1.8. 6 separate lines, each in its own
     <span className="block whitespace-nowrap"> on desktop.
   - Image cluster: relative container, w-[45vw] h-[29vw], left edge at 51.4vw.
   - Book: absolute left-0 top-0 w-[21.7vw], height auto, clearly taller than tablet.
   - Tablet: absolute right-0 top-[7.1vw] w-[29vw] aspect-[537/400], overlaps book by ~6vw.
   ───────────────────────────────────────────────────────────── */
export function UniqueSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
      <div className="w-full">
        {/* ── Main content layout: Text column on left, Image cluster on right ── */}
        <div className="flex flex-col lg:flex-row items-start">
          {/* ── Text column (left edge at 6% of page width: ml-[6vw]) ── */}
          <div className="w-full px-6 sm:px-10 lg:px-0 lg:ml-[6vw] lg:w-[39.5vw] shrink-0">
            {/* Label: 48px dash on left only, no dash on right */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-3 font-body font-bold text-red text-lg sm:text-xl lg:text-[25px] tracking-[0.3em] uppercase">
                <span className="h-[1px] w-[48px] bg-red shrink-0" aria-hidden="true" />
                <span>{uniqueData.leftLabel}</span>
              </span>
            </ScrollReveal>

            {/* Body paragraph: 6 separate lines, each in <span className="block whitespace-nowrap"> */}
            <ScrollReveal delay={0.1}>
              <p className="mt-6 sm:mt-7 lg:mt-[38px] font-heading font-normal text-xl sm:text-2xl lg:text-[2.15vw] leading-[1.8] text-[#0B0B0B]">
                <span className="block whitespace-nowrap max-lg:inline max-lg:whitespace-normal">
                  Most children meet Indian history as a
                </span>{" "}
                <span className="block whitespace-nowrap max-lg:inline max-lg:whitespace-normal">
                  list of dates. We hand them{" "}
                  <span className="font-semibold italic text-red">the story</span>
                </span>{" "}
                <span className="block whitespace-nowrap max-lg:inline max-lg:whitespace-normal">
                  instead —{" "}
                  <span className="font-bold text-red">kings and rivers</span>, verses
                </span>{" "}
                <span className="block whitespace-nowrap max-lg:inline max-lg:whitespace-normal">
                  and voyages — told with the craft of a
                </span>{" "}
                <span className="block whitespace-nowrap max-lg:inline max-lg:whitespace-normal">
                  <span className="font-bold text-red">picture book</span> and the honesty of a
                </span>{" "}
                <span className="block whitespace-nowrap max-lg:inline max-lg:whitespace-normal">
                  good teacher.
                </span>
              </p>
            </ScrollReveal>
          </div>

          {/* ── Right column: Right label + Image cluster (starts at 51.4vw from page's left: 6vw + 39.5vw + 5.9vw = 51.4vw) ── */}
          <div className="w-full px-6 sm:px-10 lg:px-0 lg:ml-[5.9vw] lg:w-[45vw] shrink-0 mt-12 lg:mt-0">
            {/* Right label: dashes on both sides, moved ~10px higher than left label on desktop */}
            <ScrollReveal>
              <div className="flex justify-center mb-6 sm:mb-8 lg:mb-[32px] lg:-translate-y-[10px]">
                <span className="inline-flex items-center gap-3 font-body font-bold text-red text-lg sm:text-xl lg:text-[25px] tracking-[0.3em] uppercase">
                  <span className="h-[1px] w-[48px] bg-red shrink-0" aria-hidden="true" />
                  <span>{uniqueData.rightLabel}</span>
                  <span className="h-[1px] w-[48px] bg-red shrink-0" aria-hidden="true" />
                </span>
              </div>
            </ScrollReveal>

            {/* Image cluster: relative container, w-[45vw] h-[29vw], left edge at 51.4vw from page left */}
            <ScrollReveal delay={0.15}>
              <div className="relative aspect-[45/29] w-full max-w-[540px] mx-auto lg:max-w-none lg:w-[45vw] lg:h-[29vw]">
                {/* Book (history-india.png): absolute left-0 top-0 w-[21.7vw], height auto */}
                <Image
                  src={uniqueData.bookImage}
                  alt="History of India for Curious Kids book cover"
                  width={666}
                  height={752}
                  className="absolute left-0 top-0 w-[48.2%] lg:w-[21.7vw] h-auto z-10 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-2"
                  priority
                />

                {/* Tablet: absolute right-0 top-[7.1vw] w-[29vw] aspect-[537/400], gray bezel, home button and video */}
                <div className="absolute right-0 top-[24.5%] lg:top-[7.1vw] w-[64.4%] lg:w-[29vw] aspect-[537/400] z-20 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] border-2 border-[#8A8A8A] bg-gradient-to-b from-[#2b2b2b] to-[#3a3a3a] px-3 py-2 sm:px-6 sm:py-3.5 lg:px-[40px] lg:py-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                  {/* Front camera dot on left bezel */}
                  <div
                    className="absolute left-2 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-[#18181a] ring-1 ring-white/10"
                    aria-hidden="true"
                  />

                  {/* Circular home button centered on right edge */}
                  <div
                    className="absolute right-2 sm:right-3 lg:right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 rounded-full border border-white/20 bg-[#222224] shadow-inner flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 lg:h-2 lg:w-2 rounded-[2px] border border-white/25" />
                  </div>

                  {/* Tablet screen */}
                  <div className="relative h-full w-full overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[12px] bg-black">
                    {!prefersReducedMotion && (
                      <video
                        src={uniqueData.tabletVideo}
                        poster={uniqueData.tabletPoster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover motion-reduce:hidden"
                      />
                    )}
                    <img
                      src={uniqueData.tabletPoster}
                      alt="Shiva film on tablet display"
                      className={`h-full w-full object-cover ${prefersReducedMotion ? "block" : "hidden motion-reduce:block"}`}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

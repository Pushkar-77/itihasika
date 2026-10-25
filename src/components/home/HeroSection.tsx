"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { heroData } from "@/data/hero";
import { CountUp } from "@/components/shared/CountUp";

/* ─────────────────────────────────────────────────────────────
   Hero — full-viewport, video background, headline + CTAs +
   stat bar (matches design/home-01.png).
   All desktop sizes in vw (1920px basis).

   Font: Outfit 600 for headline & stat numbers (single-storey 'a').
   Headline:
   - "India’s timeless history reimagined for curious minds."
   - 3 lines forced breaks, left edge at 3.1vw, ~4.8vw font size (line 1 ~58vw wide)
   - line-height ~6vw.
   Buttons:
   - 15.9vw × 3.9vw, fully rounded, gap 1.5vw, Poppins 500, ~1.2vw, dark #111.
   - mt ~2.2vw from heading.
   Stats bar:
   - 50.4vw × 6.8vw, fully rounded, bg rgba(255,255,255,0.12), backdrop-blur 12px,
     border 1px solid rgba(255,255,255,0.25).
   - 3 equal columns, 1px white dividers 2.6vw tall.
   - Numbers: Outfit 600, yellow #FFC800, ~3vw.
   - Labels: Poppins 500, white, ~0.95vw, uppercase, no letter spacing.
   - mt ~1vw from buttons.
   Overlay:
   - 25% black across video, with darker gradient on the left behind text.
   ───────────────────────────────────────────────────────────── */
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Skip video entirely when reduced motion is preferred.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    setVideoSrc(
      isMobile ? heroData.video.mobile : heroData.video.desktop
    );
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      {/* ── Poster background (always present as base layer) ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroData.video.poster})` }}
        aria-hidden="true"
      />

      {/* ── Video (client-mounted, skipped for reduced motion) ── */}
      {videoSrc && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {/* ── Dark overlay: ~25% black base + subtle darker gradient on left behind text ── */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════════
          DESKTOP VIEW (lg / 1024px+, vw-scaled to 1920px design)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative z-10 w-full pl-[3.1vw] pb-[2.8vw] pt-32">
        {/* ── Heading: Josefin Sans 700, 3 forced lines, left edge 3.1vw ── */}
        <h1
          id="hero-heading"
          style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 700 }}
          className="text-white text-[5.38vw] leading-[1.1] tracking-normal"
        >
          <span id="hero-heading-line1" className="block whitespace-nowrap">
            India&apos;s <span className="text-[#FFC800]">timeless</span> history
          </span>
          <span id="hero-heading-line2" className="block whitespace-nowrap">
            reimagined for
          </span>
          <span id="hero-heading-line3" className="block whitespace-nowrap">
            <span className="text-[#FFC800]">curious</span> minds.
          </span>
        </h1>

        {/* ── Buttons: 15.9vw × 3.9vw, fully rounded, gap 1.5vw, mt 2.2vw ── */}
        <div className="mt-[2.2vw] flex items-center gap-[1.5vw]">
          {heroData.ctas.map((cta, idx) => (
            <Link
              key={cta.label}
              id={`hero-cta-${idx}`}
              href={cta.href}
              className={`w-[15.9vw] h-[3.9vw] rounded-full flex items-center justify-center font-body font-medium text-[1.156vw] text-[#111111] transition-transform duration-200 hover:scale-[1.02] cursor-pointer shrink-0 text-center ${
                cta.variant === "yellow"
                  ? "bg-[#FFC800] hover:bg-[#f5c000]"
                  : "bg-white hover:bg-white/95"
              }`}
            >
              <span className="hero-cta-text block whitespace-nowrap">{cta.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Stats bar: 50.4vw × 6.8vw, fully rounded, mt 1vw ── */}
        <div
          id="hero-stats-bar"
          className="mt-[1vw] w-[50.4vw] h-[6.8vw] rounded-full bg-[rgba(255,255,255,0.12)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.25)] flex items-center justify-between px-[1vw]"
        >
          {/* Column 1: Views on YouTube */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span
              id="hero-stat-num-0"
              style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 700 }}
              className="text-[#FFC800] text-[3.345vw] leading-none"
            >
              <CountUp end={heroData.stats[0].value} suffix={heroData.stats[0].suffix} />
            </span>
            <span
              id="hero-stat-label-0"
              className="hero-stat-label mt-[0.35vw] font-body font-medium text-white text-[1.02vw] leading-none uppercase tracking-normal whitespace-nowrap block"
            >
              {heroData.stats[0].label}
            </span>
          </div>

          {/* Divider 1: 1px × 2.6vw white */}
          <div className="w-[1px] h-[2.6vw] bg-white/35 shrink-0" aria-hidden="true" />

          {/* Column 2: Books Sold */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span
              id="hero-stat-num-1"
              style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 700 }}
              className="text-[#FFC800] text-[3.345vw] leading-none"
            >
              <CountUp end={heroData.stats[1].value} suffix={heroData.stats[1].suffix} />
            </span>
            <span
              id="hero-stat-label-1"
              className="hero-stat-label mt-[0.35vw] font-body font-medium text-white text-[1.02vw] leading-none uppercase tracking-normal whitespace-nowrap block"
            >
              {heroData.stats[1].label}
            </span>
          </div>

          {/* Divider 2: 1px × 2.6vw white */}
          <div className="w-[1px] h-[2.6vw] bg-white/35 shrink-0" aria-hidden="true" />

          {/* Column 3: Global Awards */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span
              id="hero-stat-num-2"
              style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 700 }}
              className="text-[#FFC800] text-[3.345vw] leading-none"
            >
              <CountUp end={heroData.stats[2].value} suffix={heroData.stats[2].suffix} />
            </span>
            <span
              id="hero-stat-label-2"
              className="hero-stat-label mt-[0.35vw] font-body font-medium text-white text-[1.02vw] leading-none uppercase tracking-normal whitespace-nowrap block"
            >
              {heroData.stats[2].label}
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE / TABLET VIEW (< 1024px)
          ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative z-10 w-full px-6 sm:px-10 pb-10 pt-32 sm:pb-14">
        {/* Headline */}
        <h1
          style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 700 }}
          className="text-[32px] sm:text-[46px] leading-[1.15] text-white"
        >
          <span className="block">
            India&apos;s <span className="text-[#FFC800]">timeless</span> history
          </span>
          <span className="block">reimagined for</span>
          <span className="block">
            <span className="text-[#FFC800]">curious</span> minds.
          </span>
        </h1>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
          {heroData.ctas.map((cta) => (
            <Link
              key={cta.label}
              href={cta.href}
              className={`rounded-full px-7 py-3.5 text-sm sm:text-base font-body font-medium text-[#111111] text-center transition-transform active:scale-95 ${
                cta.variant === "yellow"
                  ? "bg-[#FFC800] hover:bg-[#f5c000]"
                  : "bg-white hover:bg-white/95"
              }`}
            >
              {cta.label}
            </Link>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-8 inline-flex flex-col sm:flex-row items-stretch rounded-2xl sm:rounded-full bg-white/12 border border-white/25 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {heroData.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-6 py-4 sm:px-8 sm:py-5"
            >
              <span
                style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 700 }}
                className="text-2xl sm:text-3xl md:text-4xl text-[#FFC800]"
              >
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-[11px] font-body font-medium uppercase tracking-normal text-white">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

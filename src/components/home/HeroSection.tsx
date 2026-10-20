"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { heroData } from "@/data/hero";
import { CountUp } from "@/components/shared/CountUp";

/* ─────────────────────────────────────────────────────────────
   Hero — full-viewport, video background, headline + CTAs +
   stat bar at the bottom.

   Video: muted, autoplay, loop, playsInline, preload="metadata".
   Mobile (<768 px) gets hero-home-mobile.mp4.
   With prefers-reduced-motion the video is hidden and only the
   poster image is shown.
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

      {/* ── Dark gradient overlay for text legibility ──────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-[90px] pb-10 pt-36 sm:pb-14">
        {/* Headline — Poppins bold, accent words in yellow, forced line breaks on desktop */}
        <h1 className="mb-8 font-body text-[32px] font-bold leading-[1.1] text-white sm:text-[42px] md:text-[54px] lg:text-[64px] xl:text-[72px]">
          {heroData.headline.lines.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((part, partIdx) =>
                part.accent ? (
                  <span key={partIdx} className="text-yellow">
                    {part.text}
                  </span>
                ) : (
                  <span key={partIdx}>{part.text}</span>
                )
              )}
            </span>
          ))}
        </h1>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-wrap gap-4">
          {heroData.ctas.map((cta) => (
            <Link
              key={cta.label}
              href={cta.href}
              className={`rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 ${
                cta.variant === "yellow"
                  ? "bg-yellow text-navy shadow-lg shadow-yellow/20 hover:bg-yellow/90"
                  : "bg-white text-navy shadow-lg shadow-white/10 hover:bg-white/90"
              }`}
            >
              {cta.label}
            </Link>
          ))}
        </div>

        {/* Stats bar */}
        <div className="inline-flex items-stretch rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          {heroData.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-8 py-5 ${
                i > 0 ? "border-l border-white/20" : ""
              }`}
            >
              <span className="text-2xl font-bold text-yellow sm:text-3xl md:text-4xl">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

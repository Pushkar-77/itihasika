"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pricingData } from "@/data/pricing";

interface FilmsHeaderProps {
  featuredTitle?: {
    slug: string;
    title: string;
    description: string;
    thumbnail_url: string | null;
  } | null;
}

const TIMELINE_ERAS = [
  {
    id: "era-ancient-india",
    label: "Ancient India",
    subtitle: "Indus valley | Vedic period",
  },
  {
    id: "era-golden-age",
    label: "Golden age",
    subtitle: "Buddha | Guptas | Mauryas",
  },
  {
    id: "era-medieval-india",
    label: "Medieval India",
    subtitle: "Early invasions | Cholas | Solankis",
  },
  {
    id: "era-islamic-colonization",
    label: "Islamic colonization & Hindu resistance",
    subtitle: "Mughal Raj | Rajput | Vijayanagara",
  },
  {
    id: "era-hindu-swaraj",
    label: "Hindu Swaraj",
    subtitle: "Marathas | Ahoms | Sikhs",
  },
  {
    id: "era-british-raj",
    label: "British Raj & modern India",
    subtitle: "British rule | Independence struggle",
  },
];

export function FilmsHeader({ featuredTitle }: FilmsHeaderProps) {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  const defaultHero = {
    slug: "rajendra-chola",
    watermark: "SOUTH INDIA",
    titleBefore: "Rajendra Chola The ",
    accentWord1: "lord",
    titleMiddle: " of the ",
    accentWord2: "seas",
    description:
      "The emperor who sailed an army across the Bay of Bengal.",
    image: "/images/films/rajendra-chola.jpg",
  };

  return (
    <div className="w-full">
      {/* ── 1. Top Cinematic Hero Banner (ott-01.png) ─────────── */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] w-full flex items-end overflow-hidden bg-[#0A0A0F] pt-28 pb-16 sm:pb-20">
        {/* Background Image / Ambient Poster */}
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredTitle?.thumbnail_url || defaultHero.image}
            alt={featuredTitle?.title || "Featured Film"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 brightness-75 transition-all duration-700"
          />
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/90 via-[#0A0A0F]/40 to-transparent" />
        </div>

        {/* Big Watermark text behind content */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center font-heading text-6xl sm:text-8xl md:text-[130px] font-bold tracking-[0.25em] text-white/[0.04] uppercase whitespace-nowrap"
          aria-hidden="true"
        >
          {defaultHero.watermark}
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
          <div className="max-w-2xl">
            {/* Small badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-yellow backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-yellow animate-pulse" />
              Featured Chronicle
            </span>

            {/* Title */}
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.1]">
              Rajendra Chola The{" "}
              <span className="text-yellow font-semibold">lord</span> of the{" "}
              <span className="text-yellow font-semibold">seas</span>
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              {featuredTitle?.description || defaultHero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/films/${featuredTitle?.slug || defaultHero.slug}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-yellow px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-navy shadow-lg shadow-yellow/20 transition-all duration-300 hover:bg-yellow/90 hover:scale-105 cursor-pointer"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Film</span>
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full bg-cyan px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg transition-all duration-300 hover:bg-[#009bd6] cursor-pointer"
              >
                Join OTT Channel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OTT Channel Subscription & Timeline Bar (ott-02.png) ── */}
      <section className="bg-light-gray/60 border-y border-navy/5 py-14 sm:py-16">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
          <div className="text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-normal text-navy">
              Subscribe to our OTT Channel
            </h2>
            <p className="mt-1 font-heading text-2xl sm:text-3xl italic text-red">
              Journeys across time.
            </p>

            {/* Pricing toggle & Subscribe CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex rounded-full bg-white p-1 shadow-sm border border-navy/10">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    billing === "monthly"
                      ? "bg-yellow text-navy shadow-sm"
                      : "text-navy/60 hover:text-navy"
                  }`}
                >
                  Monthly <span className="ml-1 text-[11px] font-normal">{pricingData.monthly}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annually")}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    billing === "annually"
                      ? "bg-yellow text-navy shadow-sm"
                      : "text-navy/60 hover:text-navy"
                  }`}
                >
                  Annually <span className="ml-1 text-[11px] font-normal">{pricingData.annual}</span>
                </button>
              </div>

              <Link
                href="/pricing"
                className="rounded-full bg-cyan px-7 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#009bd6] cursor-pointer"
              >
                Subscribe Now
              </Link>
            </div>
          </div>

          {/* Chronological Era Timeline strip */}
          <div className="mt-12 overflow-x-auto pb-4 scrollbar-hide">
            <div className="relative min-w-[760px] pt-4">
              {/* Connecting line */}
              <div className="absolute top-7 left-8 right-8 h-[2px] bg-navy/20" aria-hidden="true" />

              <div className="grid grid-cols-6 gap-3">
                {TIMELINE_ERAS.map((era) => (
                  <a
                    key={era.id}
                    href={`#${era.id}`}
                    className="group relative flex flex-col items-center text-center focus:outline-none"
                  >
                    {/* Tick mark / Node */}
                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-navy/30 transition-all duration-300 group-hover:border-red group-hover:scale-125">
                      <div className="h-2 w-2 rounded-full bg-navy/40 group-hover:bg-red" />
                    </div>

                    {/* Label */}
                    <span className="mt-3 font-heading text-xs sm:text-sm font-bold text-navy group-hover:text-red transition-colors line-clamp-2">
                      {era.label}
                    </span>
                    <span className="mt-0.5 text-[10px] sm:text-[11px] text-navy/50 leading-tight line-clamp-2">
                      {era.subtitle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

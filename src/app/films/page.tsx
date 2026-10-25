import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { FilmsHeader } from "@/components/films/FilmsHeader";
import { FilmCard, TitleRecord } from "@/components/films/FilmCard";

export const metadata: Metadata = {
  title: "Films & Documentaries — Itihasika TV",
  description:
    "Explore India's history through our OTT catalog of documentary films, animated series, and historical chronicles.",
};

interface EraDefinition {
  id: string;
  name: string;
  headingBefore: string;
  headingAccent: string;
  subtext: string;
  matcher: (era: string) => boolean;
}

const ERAS: EraDefinition[] = [
  {
    id: "era-ancient-india",
    name: "Ancient India",
    headingBefore: "Ancient ",
    headingAccent: "India",
    subtext:
      "Indus valley civilization | Vedic period | Evolution of Sanatan dharma",
    matcher: (era: string) => /ancient/i.test(era),
  },
  {
    id: "era-golden-age",
    name: "Golden Age",
    headingBefore: "Golden ",
    headingAccent: "Age",
    subtext: "Buddha | Guptas | Mauryas",
    matcher: (era: string) => /golden/i.test(era),
  },
  {
    id: "era-medieval-india",
    name: "Medieval India",
    headingBefore: "Medieval ",
    headingAccent: "India",
    subtext: "Early Islamic invasions | Cholas | Rashtrakutas | Solankis",
    matcher: (era: string) => /medieval/i.test(era),
  },
  {
    id: "era-islamic-colonization",
    name: "Islamic colonization & Hindu resistance",
    headingBefore: "Islamic colonization & ",
    headingAccent: "Hindu resistance",
    subtext:
      "Delhi Sultanate | Mughal Raj | Rajput resistance | Gajapatis | Vijayanagara",
    matcher: (era: string) =>
      /islamic|resistance|colonization/i.test(era),
  },
  {
    id: "era-hindu-swaraj",
    name: "Hindu Swaraj",
    headingBefore: "Hindu ",
    headingAccent: "Swaraj",
    subtext: "Marathas | Ahoms | Sikhs | Travancore",
    matcher: (era: string) => /swaraj|hindu swaraj/i.test(era),
  },
  {
    id: "era-british-raj",
    name: "British Raj & modern India",
    headingBefore: "British Raj & modern ",
    headingAccent: "India",
    subtext:
      "East India Company | British rule | Independence struggle | Post independence",
    matcher: (era: string) => /british|modern/i.test(era),
  },
];

async function FilmsCatalogContent() {
  const supabase = await createClient();

  const { data: rawTitles } = await supabase
    .from("titles")
    .select("*")
    .order("sort_order", { ascending: true });

  const titles: TitleRecord[] = (rawTitles as TitleRecord[]) || [];

  // Find a featured title for the hero
  const featuredTitle =
    titles.find((t) => t.slug === "rajendra-chola") || titles[0] || null;

  // Filter eras with titles (Hide empty eras)
  const populatedEras = ERAS.map((era) => {
    const eraTitles = titles.filter((t) => era.matcher(t.era));
    return {
      ...era,
      titles: eraTitles,
    };
  }).filter((era) => era.titles.length > 0);

  return (
    <>
      {/* 1. Header Section (ott-01 & ott-02) */}
      <FilmsHeader featuredTitle={featuredTitle} />

      {/* 2. Rows by Era (ott-03 to ott-06) */}
      <div className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px] space-y-20 sm:space-y-24">
          {populatedEras.map((era) => (
            <section
              key={era.id}
              id={era.id}
              className="scroll-mt-28"
              aria-labelledby={`${era.id}-heading`}
            >
              {/* Era Heading and Subtitle */}
              <div className="text-center mb-10 sm:mb-12">
                <h2
                  id={`${era.id}-heading`}
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight"
                >
                  {era.headingBefore}
                  <span className="text-red italic">{era.headingAccent}</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-navy/60 font-medium tracking-wide">
                  {era.subtext}
                </p>
              </div>

              {/* Title Cards Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {era.titles.map((title) => (
                  <FilmCard key={title.id} title={title} />
                ))}
              </div>
            </section>
          ))}

          {/* Fallback if no titles in database */}
          {populatedEras.length === 0 && (
            <div className="text-center py-20">
              <p className="font-heading text-2xl text-navy/60">
                No titles available at the moment.
              </p>
              <p className="mt-2 text-sm text-navy/40">
                Please check back soon as our catalog is updated weekly.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilmsLoadingFallback() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="h-[480px] w-full bg-[#0A0A0F] animate-pulse flex items-center justify-center">
        <div className="h-10 w-48 rounded-full bg-white/10" />
      </div>
      {/* Rows skeleton */}
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px] py-16 space-y-12">
        <div className="h-8 w-64 mx-auto rounded-full bg-navy/10 animate-pulse" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video rounded-2xl bg-navy/5 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FilmsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<FilmsLoadingFallback />}>
        <FilmsCatalogContent />
      </Suspense>
    </div>
  );
}

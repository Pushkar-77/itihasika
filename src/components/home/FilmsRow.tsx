import Image from "next/image";
import Link from "next/link";
import { filmsData } from "@/data/films";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   Films Row — "Movies that build connection." (home-05.png)
   White background · 4 cards in a row · "View All" link
   Bajirao Ballal gets a clearly marked placeholder card.
   ───────────────────────────────────────────────────────────── */
export function FilmsRow() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* ── Header row ──────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-left">
              <h2 className="section-heading text-4xl sm:text-5xl lg:text-[54px] leading-[1.1]">
                {filmsData.heading.before}
                <span className="accent">{filmsData.heading.accent}</span>
                {filmsData.heading.after}
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-navy/70">
                {filmsData.subtitle}
              </p>
            </div>
            <Link
              href={filmsData.viewAllHref}
              className="shrink-0 text-sm font-semibold uppercase tracking-[0.15em] text-navy underline underline-offset-4 transition-colors hover:text-red"
            >
              View all
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Film cards grid ─────────────────────────────── */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filmsData.items.map((film) => (
              <article key={film.title} className="group">
                {/* Thumbnail / Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-light-gray">
                  {film.image ? (
                    <Image
                      src={film.image}
                      alt={film.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    /* ── Clearly marked placeholder ──────── */
                    <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-red/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red">
                        <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
                        Placeholder
                      </div>
                      <svg
                        className="h-16 w-16 text-navy/20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.2}
                          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z"
                        />
                      </svg>
                      <p className="text-xs text-navy/40 font-medium">
                        {film.title} — thumbnail coming soon
                      </p>
                    </div>
                  )}

                  {/* Views badge */}
                  {"badge" in film && film.badge && (
                    <span className="absolute bottom-3 left-3 rounded-md bg-cyan px-3 py-1 text-xs font-bold text-white shadow-lg">
                      {film.badge}
                    </span>
                  )}
                </div>

                {/* Title + subtitle */}
                <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-navy sm:text-xl">
                  {film.title}
                </h3>
                <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                  {film.subtitle}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

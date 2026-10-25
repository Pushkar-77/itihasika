import Image from "next/image";
import Link from "next/link";
import { filmsData } from "@/data/films";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   Films Row — "Movies that build connection." (home-05.png)
   White background · 4 cards in a row · "View All" link
   16:9 aspect ratio · rounded-2xl · scale-[1.03] · hover lift
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
              <article
                key={film.title}
                className="group transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail (16:9, rounded-2xl, clipped box) */}
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-light-gray shadow-sm transition-all duration-300 group-hover:shadow-md">
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    className="object-cover transition-transform duration-500 scale-[1.03] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
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

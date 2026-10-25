import Image from "next/image";
import Link from "next/link";
import { filmsData } from "@/data/films";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   Films Row — "Movies that build connection." (home-05.png)
   All sizes in vw (1920px basis).
   Header:
   - Heading: centered, Playfair Display 500, #111, "connection." red italic, ~38.7vw wide
   - Subtitle: centered, one line, Poppins 400, black, ~1.05vw, ~43.7vw wide, no max-width
   - VIEW ALL: same line as subtitle, right edge 4vw from window edge, Poppins 400, ~1.05vw, #1D3FB0, underlined
   - Gap subtitle to card row: ~3.2vw
   Cards:
   - 4 columns, side padding 0.9vw, column gap 1.75vw (cards ~23.3vw wide)
   - Thumbnail: aspect-ratio 7/4, border-radius 1vw, overflow hidden, object-fit: cover
   - Card title: Poppins 600, black, ~1vw, ~16.3vw wide, margin-top ~1.2vw, padding-left 0.8vw
   - Description: Poppins 400, black #000, ~0.8vw, line-height 1.4, ~19.4vw wide, padding-left 0.8vw
   ───────────────────────────────────────────────────────────── */
export function FilmsRow() {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20 lg:py-[4.5vw] overflow-hidden">
      {/* ══════════════════════════════════════════════════════════
          DESKTOP VIEW (lg / 1024px+, vw-scaled to 1920px design)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full">
        {/* ── Header ────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="relative w-full">
            {/* Heading: Playfair 500, #111, centered, "connection." red italic, ~38.7vw wide */}
            <h2 className="font-heading font-medium text-[#111111] text-[2.91vw] leading-[1.15] text-center whitespace-nowrap block w-fit mx-auto">
              {filmsData.heading.before}
              <span className="italic text-[#E03A1E]">{filmsData.heading.accent}</span>
              {filmsData.heading.after}
            </h2>

            {/* Subtitle row with VIEW ALL on the same line */}
            <div className="relative mt-[0.9vw] flex items-center justify-center w-full">
              {/* Subtitle: Poppins 400, black, ~1.05vw, centered, ~43.7vw wide, whitespace-nowrap */}
              <p className="font-body font-normal text-black text-[1.05vw] leading-normal whitespace-nowrap block w-fit text-center">
                {filmsData.subtitle}
              </p>

              {/* VIEW ALL: right edge 4vw from window edge */}
              <Link
                href={filmsData.viewAllHref}
                className="absolute right-[calc(4vw-(100vw-100%))] font-body font-normal text-[1.05vw] text-[#1D3FB0] underline tracking-normal hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Card row: side padding 0.9vw, gap 1.75vw, mt 3.2vw ── */}
        <ScrollReveal delay={0.1}>
          <div className="mt-[3.2vw] w-full px-[0.9vw]">
            <div className="grid grid-cols-4 gap-[1.75vw]">
              {filmsData.items.map((film) => (
                <article key={film.title} className="group flex flex-col">
                  {/* Thumbnail: 7/4 aspect ratio, rounded-[1vw], overflow-hidden, object-cover */}
                  <div className="relative aspect-[7/4] w-full rounded-[1vw] overflow-hidden bg-[#F0F0F0]">
                    <Image
                      src={film.image}
                      alt={film.title}
                      fill
                      className="object-cover scale-[1.03] transition-transform duration-500 group-hover:scale-105"
                      sizes="25vw"
                    />
                  </div>

                  {/* Title & Description container: padding-left 0.8vw */}
                  <div className="pl-[0.8vw]">
                    {/* Title: Poppins 600, black, ~1vw, mt 1.2vw, ~16.3vw wide for Lachit */}
                    <h3 className="mt-[1.2vw] font-body font-semibold text-black text-[1vw] leading-snug">
                      {film.title}
                    </h3>

                    {/* Description: Poppins 400, black #000, ~0.8vw, line-height 1.4, ~19.4vw wide for Lachit */}
                    <p className="mt-[0.25vw] font-body font-normal text-black text-[0.785vw] leading-[1.4]">
                      {film.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE / TABLET VIEW (< 1024px responsive stack)
          ══════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden px-6 sm:px-10">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-heading font-medium text-3xl sm:text-4xl text-[#111111] leading-[1.15]">
              {filmsData.heading.before}
              <span className="italic text-[#E03A1E]">{filmsData.heading.accent}</span>
              {filmsData.heading.after}
            </h2>
            <p className="mt-3 text-sm sm:text-base font-body font-normal text-black">
              {filmsData.subtitle}
            </p>
            <div className="mt-3 flex justify-center">
              <Link
                href={filmsData.viewAllHref}
                className="font-body font-normal text-sm text-[#1D3FB0] underline tracking-normal hover:opacity-80 transition-opacity"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filmsData.items.map((film) => (
              <article key={film.title} className="group flex flex-col">
                <div className="relative aspect-[7/4] w-full rounded-2xl overflow-hidden bg-[#F0F0F0]">
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    className="object-cover scale-[1.03] transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="pl-2">
                  <h3 className="mt-4 font-body font-semibold text-black text-lg sm:text-xl leading-snug">
                    {film.title}
                  </h3>
                  <p className="mt-1 font-body font-normal text-black text-sm sm:text-base leading-relaxed">
                    {film.subtitle}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

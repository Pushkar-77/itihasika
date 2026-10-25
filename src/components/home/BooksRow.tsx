import Image from "next/image";
import Link from "next/link";
import { booksData } from "@/data/books";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   Books Row — "Stories that build character." (home-06 / 07)
   Light gray #F0F0F0 background · 4 book cards with age badges,
   book-cover images, and text-only price pills.
   ───────────────────────────────────────────────────────────── */
export function BooksRow() {
  return (
    <section className="bg-light-gray py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* ── Header row ──────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-left">
              <h2 className="section-heading text-4xl sm:text-5xl lg:text-[54px] leading-[1.1]">
                {booksData.heading.before}
                <span className="accent">{booksData.heading.accent}</span>
                {booksData.heading.after}
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-navy/70">
                {booksData.subtitle}
              </p>
            </div>
            <Link
              href={booksData.viewAllHref}
              className="shrink-0 text-sm font-semibold uppercase tracking-[0.15em] text-navy underline underline-offset-4 transition-colors hover:text-red"
            >
              View all
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Book cards grid ─────────────────────────────── */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {booksData.items.map((book) => (
              <article key={book.title} className="group text-center">
                {/* Book cover with age badge */}
                <div className="relative mx-auto max-w-[260px]">
                  {/* Age badge — blue circle */}
                  <div className="absolute -left-2 -top-2 z-10 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-cyan text-white shadow-md">
                    <span className="text-[9px] font-bold uppercase leading-none tracking-wide">
                      Ages
                    </span>
                    <span className="text-sm font-extrabold leading-tight">
                      {book.ageRange}
                    </span>
                  </div>

                  {/* Cover image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl transition-transform duration-500 group-hover:-translate-y-2">
                    <Image
                      src={book.image}
                      alt={`${book.title} book cover`}
                      fill
                      className="object-contain drop-shadow-[0_12px_25px_rgba(0,0,0,0.18)]"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
                    />
                  </div>
                </div>

                {/* Title + subtitle */}
                <h3 className="mt-6 font-heading text-lg font-bold leading-snug text-navy sm:text-xl">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                  {book.subtitle}
                </p>

                {/* ── Price pills (text only — no logos) ─────── */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {book.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-navy/10 bg-white px-3 py-2 text-xs font-medium text-navy shadow-sm transition-all duration-200 hover:border-cyan hover:shadow-md"
                    >
                      <span className="text-navy/50">{link.label}</span>
                      <span className="font-bold text-navy">
                        {link.price}
                      </span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { booksData } from "@/data/books";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

// TODO: replace with client logo
function RetailLogo({ type }: { type: "amazon" | "amazon-in" | "amazon-kindle" | "pdf" }) {
  if (type === "amazon") {
    return (
      <svg viewBox="0 0 54 20" className="w-[2.7vw] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="2" y="12" fill="#000000" fontFamily="var(--font-poppins)" fontWeight="700" fontSize="10">amazon</text>
        <path d="M4 14.5C12 17.5 24 17.5 35 13" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M33 11.5L36 13L33.5 15" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  if (type === "amazon-in") {
    return (
      <svg viewBox="0 0 58 20" className="w-[2.9vw] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="1" y="12" fill="#000000" fontFamily="var(--font-poppins)" fontWeight="700" fontSize="9.5">amazon<tspan fontSize="8">.in</tspan></text>
        <path d="M3 14.5C10 17.5 22 17.5 33 13" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M31 11.5L34 13L31.5 15" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  if (type === "amazon-kindle") {
    return (
      <svg viewBox="0 0 66 20" className="w-[3.1vw] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="1" y="12" fill="#000000" fontFamily="var(--font-poppins)" fontWeight="700" fontSize="8.5">amazon<tspan fill="#FF9900" fontWeight="400">kindle</tspan></text>
        <path d="M2 14.2C8 16.5 18 16.5 27 12.8" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M25 11.5L28 12.8L26 14.2" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 20" className="w-[1vw] max-w-[16px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1C1.45 1 1 1.45 1 2V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V6L10 1H2Z" fill="#E03A1E" />
      <path d="M10 1V6H15L10 1Z" fill="#C02810" />
      <text x="8" y="14" fill="#FFFFFF" fontFamily="var(--font-poppins)" fontWeight="700" fontSize="4.5" textAnchor="middle">PDF</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Books Row — "Stories that build character." (home-06 / 07)
   Background #F0F0F0. All sizes in vw (1920px basis).
   ───────────────────────────────────────────────────────────── */
export function BooksRow() {
  return (
    <section className="relative w-full bg-[#F0F0F0] py-14 sm:py-20 lg:py-[5vw] overflow-hidden">
      {/* ══════════════════════════════════════════════════════════
          DESKTOP VIEW (lg / 1024px+, vw-scaled to 1920px design)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full">
        {/* ── Header ────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="relative w-full">
            {/* Heading: Playfair 500, #111, centered, "character." red italic, ~37vw wide */}
            <h2 className="font-heading font-medium text-[#111111] text-[2.93vw] leading-[1.15] text-center whitespace-nowrap block w-fit mx-auto">
              {booksData.heading.before}
              <span className="italic text-[#E03A1E]">{booksData.heading.accent}</span>
              {booksData.heading.after}
            </h2>

            {/* Subtitle row with VIEW ALL on the same line */}
            <div className="relative mt-[0.9vw] flex items-center justify-center w-full">
              {/* Subtitle: Poppins 400, black, ~1.06vw, centered, ~34.3vw wide, whitespace-nowrap */}
              <p className="font-body font-normal text-black text-[1.06vw] leading-normal whitespace-nowrap block w-fit text-center">
                {booksData.subtitle}
              </p>

              {/* VIEW ALL: right edge 3.4vw from window edge */}
              <Link
                href={booksData.viewAllHref}
                className="absolute right-[calc(3.4vw-(100vw-100%))] font-body font-normal text-[1.05vw] text-[#1D3FB0] underline tracking-normal hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 4 Book columns: ml-[1.9vw], each 20.3vw wide, 4.7vw gap, mt 5.3vw ── */}
        <ScrollReveal delay={0.1}>
          <div className="mt-[5.3vw] ml-[1.9vw] flex items-start gap-[4.7vw]">
            {booksData.items.map((book) => (
              <article key={book.title} className="w-[20.3vw] shrink-0 flex flex-col items-center text-center">
                {/* Book Box container: 15.2vw x 18.3vw with overlapping age badge */}
                <div className="relative w-full h-[18.3vw]">
                  {/* Age badge: cyan circle 3.6vw, left: calc(50% - 8.8vw), top: 0.4vw */}
                  <div
                    className="absolute z-20 w-[3.6vw] h-[3.6vw] rounded-full bg-[#00AEEF] flex flex-col items-center justify-center select-none"
                    style={{
                      left: "calc(50% - 8.8vw)",
                      top: "0.4vw",
                    }}
                  >
                    <span className="font-body font-medium text-white text-[0.75vw] uppercase leading-none tracking-wide">
                      AGES
                    </span>
                    <span className="font-body font-semibold text-white text-[1.15vw] leading-none mt-[0.1vw]">
                      {book.ageRange}
                    </span>
                  </div>

                  {/* Book image: 15.2vw x 18.3vw, object-fit contain, drop-shadow, mix-blend-multiply */}
                  <div className="relative mx-auto w-[15.2vw] h-[18.3vw]">
                    <Image
                      src={book.image}
                      alt={`${book.title} book cover`}
                      fill
                      className="object-contain"
                      style={{
                        filter: "drop-shadow(-0.5vw 0.7vw 1vw rgba(0, 0, 0, 0.25))",
                        mixBlendMode: "multiply",
                      }}
                      sizes="20vw"
                    />
                  </div>
                </div>

                {/* Title: Poppins 600, black, ~1.35vw, centered, margin-top 2.1vw from book box */}
                <h3 className="mt-[2.1vw] font-body font-semibold text-black text-[1.35vw] leading-tight text-center">
                  {book.title}
                </h3>

                {/* Description: Poppins 400, black #000, ~0.87vw, line-height 1.28vw, centered, whitespace-nowrap exact breaks */}
                <div className="mt-[0.6vw] font-body font-normal text-black text-[0.87vw] leading-[1.28vw] text-center">
                  <span className="block whitespace-nowrap">{book.descLine1}</span>
                  <span className="block whitespace-nowrap">{book.descLine2}</span>
                </div>

                {/* Price chips: 2 chips per row, 4 chips per book (9.9vw x 2.5vw, gap 0.4vw horiz, 1vw vert) */}
                <div className="mt-[1.8vw] grid grid-cols-2 gap-x-[0.4vw] gap-y-[1vw] w-full justify-items-center">
                  {book.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center w-[9.9vw] h-[2.5vw] shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      {/* Left tile: white, 3.7vw wide, 1px #DDD border, 4px radius on left side */}
                      <div className="w-[3.7vw] h-full shrink-0 bg-white border border-[#DDDDDD] border-r-0 rounded-l-[4px] flex items-center justify-center p-[0.2vw]">
                        <RetailLogo type={link.type} />
                      </div>

                      {/* Right tile: cyan #00AEEF, 4px radius on right side, padding-left 0.5vw */}
                      <div className="flex-1 h-full bg-[#00AEEF] rounded-r-[4px] pl-[0.5vw] flex flex-col justify-center text-left">
                        <span className="font-body font-medium text-white text-[0.65vw] leading-tight block whitespace-nowrap">
                          {link.label}
                        </span>
                        <span className="font-body font-semibold text-white text-[1.1vw] leading-tight block whitespace-nowrap mt-[0.05vw]">
                          {link.price}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </article>
            ))}
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
              {booksData.heading.before}
              <span className="italic text-[#E03A1E]">{booksData.heading.accent}</span>
              {booksData.heading.after}
            </h2>
            <p className="mt-3 text-sm sm:text-base font-body font-normal text-black">
              {booksData.subtitle}
            </p>
            <div className="mt-3 flex justify-center">
              <Link
                href={booksData.viewAllHref}
                className="font-body font-normal text-sm text-[#1D3FB0] underline tracking-normal hover:opacity-80 transition-opacity"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-12 justify-items-center">
            {booksData.items.map((book) => (
              <article key={book.title} className="w-full max-w-[280px] flex flex-col items-center text-center">
                <div className="relative w-[200px] h-[240px]">
                  <div className="absolute -left-3 -top-2 z-10 w-12 h-12 rounded-full bg-[#00AEEF] flex flex-col items-center justify-center text-white">
                    <span className="text-[9px] font-medium uppercase leading-none">AGES</span>
                    <span className="text-sm font-semibold leading-none mt-0.5">{book.ageRange}</span>
                  </div>
                  <div className="relative w-full h-full">
                    <Image
                      src={book.image}
                      alt={`${book.title} book cover`}
                      fill
                      className="object-contain"
                      style={{
                        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
                        mixBlendMode: "multiply",
                      }}
                      sizes="280px"
                    />
                  </div>
                </div>

                <h3 className="mt-5 font-body font-semibold text-black text-lg">
                  {book.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-body font-normal text-black leading-relaxed">
                  {book.subtitle}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 w-full">
                  {book.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center h-10 rounded-[4px] overflow-hidden"
                    >
                      <div className="w-12 h-full bg-white border border-[#DDDDDD] border-r-0 rounded-l-[4px] flex items-center justify-center p-1">
                        <RetailLogo type={link.type} />
                      </div>
                      <div className="flex-1 h-full bg-[#00AEEF] rounded-r-[4px] pl-2 flex flex-col justify-center text-left">
                        <span className="font-body font-medium text-white text-[9px] leading-tight block whitespace-nowrap">
                          {link.label}
                        </span>
                        <span className="font-body font-semibold text-white text-xs leading-tight block whitespace-nowrap">
                          {link.price}
                        </span>
                      </div>
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

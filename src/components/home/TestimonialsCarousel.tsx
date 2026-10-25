"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   TestimonialsCarousel (matches design/home-03.png)
   - Background: pure white #FFFFFF
   - Heading: "Voices from thankful families." (Playfair 700, #0B0B0B,
     "thankful" in italic red #E03A1E, width ~40% / 768px)
   - Cards: 3 visible on desktop, 538px × 400px, 49px gap,
     first card at 5% from left edge, rounded-38px, border #ECECEC,
     shadow 0 25px 40px -12px rgba(0,0,0,0.18), inner padding 34px
   - Avatar: 128px circle with 3px #F2DCC0 border, top-left
   - Name: Poppins 600, 26px, #0B0B0B (28px gap from avatar)
   - Location: Poppins 400, 20px, #333
   - Quote: Poppins italic, 24px, line-height 36px, #111, ~30px below avatar,
     NO quotation marks around text
   - Decorative opening-quote glyph: 110px wide, #FCEFE3, bottom-right 40px
   - Arrows: 40px circles, 1px navy #2B2F5E border, thin ← / → glyphs,
     vertically centered on cards, left 2%, right 3%, scroll by one card,
     hide/disable when at ends
   ───────────────────────────────────────────────────────────── */
export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 4) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    } else {
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 25);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // Dynamically calculate exact step from first two cards
    const cards = el.querySelectorAll("article");
    let step = 538 + 49;
    if (cards.length >= 2) {
      step = cards[1].offsetLeft - cards[0].offsetLeft;
    } else if (cards.length === 1) {
      step = cards[0].offsetWidth;
    }

    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
      {/* ── Heading ─────────────────────────────────────────── */}
      <ScrollReveal>
        <div className="mx-auto w-full px-4 sm:px-6 text-center">
          <h2
            className="font-heading font-bold leading-[1.1] text-[#0B0B0B] whitespace-normal sm:whitespace-nowrap text-[clamp(28px,3.2vw,64px)]"
            style={{ fontSize: "clamp(28px, 3.2vw, 64px)" }}
          >
            {testimonialsData.heading.before}
            <span className="italic text-[#E03A1E]">
              {testimonialsData.heading.accent}
            </span>
            {testimonialsData.heading.after}
          </h2>
        </div>
      </ScrollReveal>

      {/* ── Carousel container with navigation arrows ───────── */}
      <div className="relative mt-12 w-full sm:mt-16 lg:mt-20">
        {/* Left Arrow Button (40px circle, 1px navy #2B2F5E border, left 2%) */}
        <button
          onClick={() => scrollByCard("left")}
          disabled={!canScrollLeft}
          aria-label="Previous testimonial"
          className={`absolute left-[2%] top-1/2 z-20 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-[#2B2F5E] bg-white text-[#2B2F5E] shadow-sm transition-all duration-300 hover:bg-[#2B2F5E] hover:text-white cursor-pointer ${
            !canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M11 18l-6-6 6-6"
            />
          </svg>
        </button>

        {/* Cards Track: first card at 5% from left, 49px gap */}
        <div
          ref={scrollRef}
          data-lenis-prevent="true"
          className="scrollbar-hide flex w-full overflow-x-auto pl-[5%] pr-[5%] scroll-pl-[5%] gap-6 sm:gap-8 lg:gap-[49px] pb-10 pt-4 snap-x snap-mandatory scroll-smooth"
        >
          {testimonialsData.items.map((item) => (
            <article
              key={item.name}
              className="relative flex w-[calc(100vw-10vw)] max-w-[538px] min-h-[380px] sm:min-h-[400px] lg:w-[538px] lg:min-h-[400px] shrink-0 flex-col justify-start rounded-[28px] sm:rounded-[38px] border border-[#ECECEC] bg-white p-6 sm:p-8 lg:p-[34px] shadow-[0_25px_40px_-12px_rgba(0,0,0,0.18)] snap-start overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Top Row: Avatar + Name & Location */}
              <div className="flex items-center gap-4 sm:gap-5 lg:gap-[28px] relative z-10">
                {/* Avatar: 128px circle with 3px #F2DCC0 border */}
                <div className="relative h-[88px] w-[88px] sm:h-[110px] sm:w-[110px] lg:h-[128px] lg:w-[128px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#F2DCC0] shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 88px, (max-width: 1024px) 110px, 128px"
                  />
                </div>

                {/* Name & Location */}
                <div>
                  <h3 className="font-body text-xl font-semibold leading-tight text-[#0B0B0B] sm:text-2xl lg:text-[26px]">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-body text-sm font-normal text-[#333333] sm:text-base lg:mt-2 lg:text-[20px]">
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Quote: Poppins italic, 24px, line-height 36px, #111, ~30px below avatar */}
              <blockquote className="relative z-10 mt-5 font-body text-base font-normal italic leading-relaxed text-[#111111] sm:mt-6 sm:text-lg lg:mt-[30px] lg:text-[24px] lg:leading-[36px]">
                {item.quote}
              </blockquote>

              {/* Decorative Opening-Quote Glyph: 110px wide, #FCEFE3, bottom-right 40px */}
              <svg
                className="pointer-events-none select-none absolute bottom-5 right-5 sm:bottom-7 sm:right-7 lg:bottom-[40px] lg:right-[40px] w-[70px] sm:w-[90px] lg:w-[110px] h-auto z-0"
                viewBox="0 0 110 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M45.5 28.5C45.5 12.76 35.3 0 20.5 0C8.2 0 0 9.8 0 22C0 39.5 13.5 54 28 58.5C25.5 67 18 76 6 82.5L12 85C32.5 77 45.5 55 45.5 28.5ZM110 28.5C110 12.76 99.8 0 85 0C72.7 0 64.5 9.8 64.5 22C64.5 39.5 78 54 92.5 58.5C90 67 82.5 76 70.5 82.5L76.5 85C97 77 110 55 110 28.5Z"
                  fill="#FCEFE3"
                />
              </svg>
            </article>
          ))}
        </div>

        {/* Right Arrow Button (40px circle, 1px navy #2B2F5E border, right 3%) */}
        <button
          onClick={() => scrollByCard("right")}
          disabled={!canScrollRight}
          aria-label="Next testimonial"
          className={`absolute right-[3%] top-1/2 z-20 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full border border-[#2B2F5E] bg-white text-[#2B2F5E] shadow-sm transition-all duration-300 hover:bg-[#2B2F5E] hover:text-white cursor-pointer ${
            !canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M13 6l6 6-6 6"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

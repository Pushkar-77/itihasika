"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   TestimonialsCarousel (matches design/home-03.png)
   - Heading: "Voices from thankful families." (red italic)
   - 3 family cards: circular avatars, faint quote mark, lift on hover
   - Flanking circular arrow buttons for smooth navigation
   ───────────────────────────────────────────────────────────── */
export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setCanScroll(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#FBFBFA] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* ── Heading ─────────────────────────────────────────── */}
        <ScrollReveal>
          <h2 className="mb-14 text-center font-heading text-3xl font-normal text-navy sm:text-4xl md:text-5xl lg:text-[52px]">
            {testimonialsData.heading.before}
            <span className="italic text-red">
              {testimonialsData.heading.accent}
            </span>
            {testimonialsData.heading.after}
          </h2>
        </ScrollReveal>

        {/* ── Carousel container with flanking arrows ────────── */}
        <div className="relative flex items-center gap-3 sm:gap-6">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous testimonial"
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal/70 shadow-sm transition-all duration-300 hover:border-black/40 hover:bg-white hover:text-navy hover:shadow-md"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Cards Track: only scrolls horizontally on mobile/tablet where content overflows */}
          <div
            ref={scrollRef}
            data-lenis-prevent={canScroll ? "true" : undefined}
            className="scrollbar-hide flex-1 max-lg:overflow-x-auto lg:overflow-visible pb-6 pt-2 max-lg:snap-x max-lg:snap-mandatory"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7">
              {testimonialsData.items.map((item, index) => (
                <div
                  key={item.name}
                  className="card-hover-lift group relative flex flex-col justify-between rounded-[28px] border border-black/[0.04] bg-white p-7 sm:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(0,0,0,0.1)] snap-start"
                >
                  <div>
                    {/* Top row: Avatar + Name & Location */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-yellow/30 shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h3 className="font-body text-base font-bold text-navy sm:text-lg leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-charcoal/60 tracking-wide">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="relative z-10 mt-6 font-body text-[14px] sm:text-[15px] italic leading-relaxed text-charcoal/80">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Faint large quote watermark */}
                  <span
                    className="pointer-events-none select-none absolute bottom-2 right-5 font-heading text-7xl font-bold leading-none text-[#F3EAD3]/70 transition-colors group-hover:text-[#F3EAD3]"
                    aria-hidden="true"
                  >
                    &rdquo;
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next testimonial"
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal/70 shadow-sm transition-all duration-300 hover:border-black/40 hover:bg-white hover:text-navy hover:shadow-md"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile arrow controls */}
        <div className="mt-6 flex justify-center gap-4 sm:hidden">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal/70 shadow-sm"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal/70 shadow-sm"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

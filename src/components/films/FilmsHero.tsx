"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { filmsHeroSlides, type FilmsHeroSlide } from "@/data/filmsHero";

interface FilmsHeroProps {
  slides?: FilmsHeroSlide[];
}

export function FilmsHero({ slides = filmsHeroSlides }: FilmsHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance every 8s
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
  };

  const renderHighlightedTitle = (title: string, highlight: string[]) => {
    const words = title.split(" ");
    return words.map((word, idx) => {
      const isHighlighted = highlight.some((h) =>
        word.toLowerCase().includes(h.toLowerCase())
      );
      return (
        <span
          key={idx}
          className={isHighlighted ? "text-[#FFC800]" : "text-white"}
        >
          {word}
          {idx < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return (
    <section
      className="relative w-full h-screen min-h-[640px] overflow-hidden select-none bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Films OTT Hero Carousel"
    >
      <style jsx>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1.2);
          }
        }
        .hero-poster-zoom {
          animation: slowZoom 12s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* ── Slide Layers ────────────────────────────────────── */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-opacity duration-800 ${
              isActive
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Media */}
            <div className="absolute inset-0 overflow-hidden">
              {slide.video ? (
                <video
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  key={isActive ? `active-${index}` : `inactive-${index}`}
                  className="w-full h-full bg-cover bg-center hero-poster-zoom"
                  style={{
                    backgroundImage: `url(${slide.poster})`,
                    filter: "blur(3px)",
                  }}
                />
              )}

              {/* Bottom gradient: ~55% black at bottom, transparent at 50% height */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 50%)",
                }}
              />

              {/* Faint vignette around edges */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
                }}
              />
            </div>

            {/* Region title: centered at 49% height, Cinzel, 6.5vw, white at 85% opacity, letter-spacing 0.06em */}
            <div className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
              <h2 className="font-cinzel text-[6.5vw] font-normal text-white/85 tracking-[0.06em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
                {slide.region}
              </h2>
            </div>

            {/* Title at 72% height: one line, whitespace-nowrap, Josefin Sans 700, white, highlighted words #FFC800, about 3.7vw */}
            <div className="absolute top-[72%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none px-4">
              <h1
                className="font-josefin font-bold text-[3.7vw] text-white whitespace-nowrap leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              >
                {renderHighlightedTitle(slide.title, slide.highlight)}
              </h1>
            </div>

            {/* Subtitle at 80%: Poppins 400, white, about 1.3vw, about 38vw wide */}
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38vw] max-w-[90vw] text-center pointer-events-none">
              <p className="font-body font-normal text-[1.3vw] text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {slide.subtitle}
              </p>
            </div>

            {/* Button “See Details” at 85–92% (88.5%): yellow #FFC800 pill, 12.4vw × 3.2vw, text Josefin Sans 700 black ~1.45vw, 2.4vw black circle at right with yellow play triangle */}
            <div className="absolute top-[88.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <Link
                href={`/films/${slide.slug}`}
                className="group flex items-center justify-between w-[12.4vw] h-[3.2vw] pl-[1.6vw] pr-[0.4vw] rounded-full bg-[#FFC800] hover:bg-[#ffb700] transition-all duration-300 shadow-[0_4px_24px_rgba(255,200,0,0.35)] hover:scale-105 cursor-pointer"
              >
                <span className="font-josefin font-bold text-black text-[1.45vw] tracking-[0.02em] whitespace-nowrap">
                  See Details
                </span>
                <div className="w-[2.4vw] h-[2.4vw] rounded-full bg-black flex items-center justify-center shrink-0">
                  <svg
                    className="w-[1vw] h-[1vw] fill-[#FFC800] translate-x-[0.08vw] transition-transform duration-200 group-hover:scale-110"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        );
      })}

      {/* ── Controls at 97.5%: “<” arrow, 5 dots (0.84vw, pitch 1.57vw, active cyan #00AEEF, others white), “>” arrow ── */}
      <div className="absolute top-[97.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[1.2vw] z-20 pointer-events-auto">
        {/* Previous Arrow */}
        <button
          type="button"
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          aria-label="Previous slide"
          className="text-white hover:text-[#00AEEF] transition-colors p-[0.2vw] text-[1.4vw] font-bold cursor-pointer leading-none flex items-center justify-center"
        >
          <svg
            className="w-[1.2vw] h-[1.2vw] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* 5 Dots: 0.84vw diameter, pitch 1.57vw (gap 0.73vw) */}
        <div className="flex items-center gap-[0.73vw]">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-[0.84vw] h-[0.84vw] rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "bg-[#00AEEF] scale-110 shadow-[0_0_8px_rgba(0,174,239,0.8)]"
                  : "bg-white/75 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          aria-label="Next slide"
          className="text-white hover:text-[#00AEEF] transition-colors p-[0.2vw] text-[1.4vw] font-bold cursor-pointer leading-none flex items-center justify-center"
        >
          <svg
            className="w-[1.2vw] h-[1.2vw] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

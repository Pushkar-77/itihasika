"use client";

import Image from "next/image";

export interface TimelineEraItem {
  id: string;
  name: string;
  subtitle: string;
  statue: string;
  statueWidth: number;
  statueHeight: number;
}

export const TIMELINE_ERAS: TimelineEraItem[] = [
  {
    id: "era-ancient-india",
    name: "Ancient India",
    subtitle: "Indus valley | Vedic period",
    statue: "/images/timeline/ancient-india.png",
    statueWidth: 70,
    statueHeight: 100,
  },
  {
    id: "era-golden-age",
    name: "Golden age",
    subtitle: "Buddha | Guptas | Mauryas",
    statue: "/images/timeline/golden-age.png",
    statueWidth: 65,
    statueHeight: 100,
  },
  {
    id: "era-medieval-india",
    name: "Medieval India",
    subtitle: "Early invasions | Cholas",
    statue: "/images/timeline/medieval-india.png",
    statueWidth: 80,
    statueHeight: 100,
  },
  {
    id: "era-islamic-colonization",
    name: "Islamic colonization & Hindu resistance",
    subtitle: "Delhi Sultanate | Rajput | Vijayanagara",
    statue: "/images/timeline/islamic-colonization.png",
    statueWidth: 90,
    statueHeight: 75,
  },
  {
    id: "era-hindu-swaraj",
    name: "Hindu Swaraj",
    subtitle: "Marathas | Ahoms | Sikhs",
    statue: "/images/timeline/hindu-swaraj.png",
    statueWidth: 75,
    statueHeight: 100,
  },
  {
    id: "era-british-raj",
    name: "British Raj & modern India",
    subtitle: "British rule | Independence struggle",
    statue: "/images/timeline/british-raj.png",
    statueWidth: 65,
    statueHeight: 100,
  },
];

export function EraTimelineStrip() {
  const scrollToEra = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full bg-[#F5F2EB] border-t border-navy/10 py-12 lg:py-16 select-none overflow-hidden">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* Horizontal scroll container on smaller screens */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="relative min-w-[900px] lg:min-w-0">
            {/* Connecting line */}
            <div
              className="absolute top-[38px] left-[8%] right-[8%] h-[2px] bg-navy/20 z-0"
              aria-hidden="true"
            />

            {/* 6 Era Nodes & Statues */}
            <div className="grid grid-cols-6 gap-2 lg:gap-4 relative z-10">
              {TIMELINE_ERAS.map((era) => (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => scrollToEra(era.id)}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-none transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Era Title */}
                  <span className="font-heading text-xs sm:text-sm lg:text-[1.05vw] font-bold text-navy group-hover:text-red transition-colors line-clamp-2 h-10 flex items-center justify-center px-1">
                    {era.name}
                  </span>

                  {/* Tick Mark / Node on Timeline Line */}
                  <div className="my-2 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-navy/40 transition-all duration-300 group-hover:border-red group-hover:scale-125 shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-navy/60 group-hover:bg-red" />
                  </div>

                  {/* Statue Illustration */}
                  <div className="h-28 sm:h-32 lg:h-[8.5vw] w-full flex items-end justify-center pt-2">
                    <Image
                      src={era.statue}
                      alt={era.name}
                      width={era.statueWidth * 2}
                      height={era.statueHeight * 2}
                      className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-md"
                    />
                  </div>

                  {/* Subtitle / Era Themes */}
                  <span className="mt-2 text-[10px] sm:text-xs lg:text-[0.8vw] text-navy/55 leading-tight line-clamp-2 px-1">
                    {era.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

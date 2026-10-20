import Image from "next/image";
import { uniqueData } from "@/data/unique";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─────────────────────────────────────────────────────────────
   "What Makes Us Unique" section (matches design/home-02.png)
   - Left: Big Playfair serif body with red bold/italic accents
   - Right: History of India book overlapping a dark-bezel CSS tablet
   ───────────────────────────────────────────────────────────── */
export function UniqueSection() {
  return (
    <section className="relative bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* ── Subheaders row ─────────────────────────────────── */}
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-red">
              <span className="h-[2px] w-8 bg-red" aria-hidden="true" />
              {uniqueData.leftLabel}
            </span>
          </div>
          <div className="hidden lg:col-span-6 lg:flex lg:justify-center">
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-red">
              <span className="h-[2px] w-8 bg-red" aria-hidden="true" />
              {uniqueData.rightLabel}
              <span className="h-[2px] w-8 bg-red" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* ── Main content grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left column: Editorial copy ─────────────────── */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <p className="font-heading text-2xl font-normal leading-[1.35] text-[#111827] sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px]">
                {uniqueData.body.map((segment, i) => {
                  if (!segment.accent) {
                    return <span key={i}>{segment.text}</span>;
                  }
                  // Specific styling for each accent phrase
                  if (segment.text === "the story") {
                    return (
                      <span key={i} className="font-normal italic text-red">
                        {segment.text}
                      </span>
                    );
                  }
                  return (
                    <span key={i} className="font-bold text-red">
                      {segment.text}
                    </span>
                  );
                })}
              </p>
            </ScrollReveal>
          </div>

          {/* ── Right column: Book + CSS tablet frame ───────── */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={0.15}>
              <div className="relative mx-auto flex max-w-[560px] items-center justify-center lg:justify-end">
                {/* Book Cover (overlaps behind tablet) */}
                <div className="relative z-10 -mr-16 sm:-mr-20 w-[190px] sm:w-[250px] md:w-[280px] shrink-0 transition-transform duration-500 hover:-translate-y-2">
                  <Image
                    src={uniqueData.bookImage}
                    alt="History of India for Curious Kids book cover"
                    width={400}
                    height={460}
                    className="h-auto w-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)]"
                    priority
                  />
                </div>

                {/* CSS Tablet frame (dark rounded bezel) */}
                <div className="relative z-20 w-[280px] sm:w-[380px] md:w-[420px] shrink-0 rounded-[26px] sm:rounded-[34px] bg-[#141416] p-2.5 sm:p-3.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                  {/* Tablet front camera dot on left bezel (landscape) */}
                  <div
                    className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#2a2c33] ring-1 ring-white/10"
                    aria-hidden="true"
                  />

                  {/* Tablet screen */}
                  <div className="relative aspect-[16/10.5] w-full overflow-hidden rounded-[18px] sm:rounded-[24px] bg-black">
                    <Image
                      src={uniqueData.tabletScreenImage}
                      alt="Itihasika film on tablet display"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 420px"
                    />

                    {/* Subtle glass reflection overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

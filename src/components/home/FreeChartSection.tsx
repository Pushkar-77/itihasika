"use client";

import { useState } from "react";
import Image from "next/image";
import { freeChartData } from "@/data/freeChart";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { submitEmailSignup } from "@/app/actions/emailSignup";

/* ─────────────────────────────────────────────────────────────
   Free Printable Chart section (matches home-07 / home-08)
   All sizes in vw (1920px basis). Background #0F172A.
   Section:
   - Padding 4.3vw top and bottom
   - Two columns:
     * Left column starts at 5.6vw (w-[51.6vw], leaving left edge of image at 57.2vw)
     * Image column is 38.4vw wide (left edge 57.2vw, right edge ~4.3vw from window edge)
     * Left content vertically centered against image
   Left column:
   - Eyebrow: 2.5vw × 2px line in #F25A3C, 1vw gap, "FREE PRINTABLE CHART"
     in Poppins 600, #F25A3C, ~1.3vw, letter-spacing 0.2em, ~19.3vw wide
   - Heading: "Get Bharat’s history" in white, then "on one chart." in italic
     #F25A3C (period stays white). Playfair Display 500, line-height 1.25,
     ~3.9vw (line 1 ~38.5vw wide). Margin-top ~1.5vw from eyebrow.
   - Paragraph: Poppins 400, white, ~1.15vw, line-height 1.7vw, white-space: nowrap,
     exactly two lines (line 1 ~39.8vw wide). Margin-top ~2.6vw from heading.
   - Form (mt ~2.5vw):
     * Email field: 27.8vw × 3.7vw, border-radius 8px, background #1F2A44,
       1px border slightly lighter (#2D3B5E), placeholder "Your email address" in #6F7790,
       Poppins 400, ~1.1vw, left padding 1.5vw
     * 0.5vw gap
     * Button: 12.9vw × 3.7vw, background #00AEEF, border-radius 8px,
       Poppins 600, white, ~1.1vw, text "Send it to me"
   - Note: "We respect your inbox. No spam, ever." in Poppins 400, white, ~1vw,
     margin-top 0.9vw, left padding 0.4vw
   Right column:
   - /images/free-chart.jpg, full width 38.4vw, height auto (~37.7vw),
     no border radius, no border, no shadow.
   ───────────────────────────────────────────────────────────── */
export function FreeChartSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setResponseMessage("");
    try {
      const res = await submitEmailSignup(email);
      if (res.success) {
        setStatus("success");
        setResponseMessage(
          res.message || "Thank you! Your chart is on its way."
        );
      } else {
        setStatus("error");
        setResponseMessage(
          res.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setResponseMessage(
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#0F172A] py-14 sm:py-20 lg:py-[4.3vw] overflow-hidden">
      {/* ══════════════════════════════════════════════════════════
          DESKTOP VIEW (lg / 1024px+, vw-scaled to 1920px design)
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex relative w-full items-center min-h-[37.7vw]">
        {/* ── Left Column: starts at 5.6vw, width 51.6vw (right edge 57.2vw) ── */}
        <div className="ml-[5.6vw] w-[51.6vw] flex flex-col justify-center shrink-0">
          <ScrollReveal>
            {/* Eyebrow: 2.5vw × 2px line in #F25A3C, 1vw gap, Poppins 600, ~1.26vw, tracking 0.2em (text ~19.3vw wide) */}
            <div className="flex items-center gap-[1vw]">
              <span className="w-[2.5vw] h-[2px] bg-[#F25A3C] shrink-0" aria-hidden="true" />
              <span
                id="chart-eyebrow-text"
                className="font-body font-semibold text-[#F25A3C] text-[1.26vw] tracking-[0.2em] uppercase whitespace-nowrap block"
              >
                {freeChartData.label}
              </span>
            </div>

            {/* Heading: Playfair 500, line-height 1.25, mt 1.5vw, size ~4.32vw (line 1 ~38.5vw wide) */}
            <h2
              id="chart-heading"
              className="mt-[1.5vw] font-heading font-medium text-white text-[4.32vw] leading-[1.25]"
            >
              <span id="chart-heading-line1" className="block whitespace-nowrap">
                {freeChartData.heading.line1}
              </span>
              <span className="block whitespace-nowrap">
                <span className="italic text-[#F25A3C]">
                  {freeChartData.heading.accent}
                </span>
                {freeChartData.heading.after}
              </span>
            </h2>

            {/* Paragraph: Poppins 400, white, ~1.065vw, line-height 1.7vw, mt 2.6vw (line 1 ~39.8vw wide) */}
            <p
              id="chart-paragraph"
              className="mt-[2.6vw] font-body font-normal text-white text-[1.065vw] leading-[1.7vw]"
            >
              <span id="chart-para-line1" className="block whitespace-nowrap">
                {freeChartData.body.line1}
              </span>
              <span id="chart-para-line2" className="block whitespace-nowrap">
                {freeChartData.body.line2}
              </span>
            </p>

            {/* Form or Confirmation Block */}
            {status === "success" ? (
              <div
                className="mt-[2.5vw] flex items-center gap-[0.5vw]"
                role="status"
                aria-live="polite"
              >
                {/* Confirmation Message: 27.8vw × 3.7vw, bg #1F2A44, 8px rounded, 1px border #2D3B5E, pl 1.5vw */}
                <div className="w-[27.8vw] h-[3.7vw] rounded-[8px] bg-[#1F2A44] border border-[#2D3B5E] pl-[1.5vw] pr-[1.5vw] flex items-center gap-[0.7vw]">
                  <svg
                    className="h-[1.3vw] w-[1.3vw] text-[#00AEEF] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-body font-normal text-white text-[1.05vw] whitespace-nowrap">
                    {freeChartData.successMessage}
                  </span>
                </div>

                {/* Cyan Download Button: 12.9vw × 3.7vw, bg #00AEEF, 8px rounded, Poppins 600, white */}
                <a
                  href={freeChartData.chartImage}
                  download="indian-history-timeline-chart.jpg"
                  className="w-[12.9vw] h-[3.7vw] rounded-[8px] bg-[#00AEEF] hover:bg-[#009bd6] transition-colors text-white font-body font-semibold text-[1.02vw] flex items-center justify-center cursor-pointer shrink-0 text-center whitespace-nowrap"
                >
                  {freeChartData.downloadLabel}
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-[2.5vw] flex items-center gap-[0.5vw]"
              >
                <input
                  type="email"
                  required
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your email address"
                  className="w-[27.8vw] h-[3.7vw] rounded-[8px] bg-[#1F2A44] border border-[#2D3B5E] pl-[1.5vw] pr-[1.5vw] text-white placeholder:text-[#6F7790] font-body font-normal text-[1.1vw] outline-none transition-colors focus:border-[#00AEEF] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[12.9vw] h-[3.7vw] rounded-[8px] bg-[#00AEEF] hover:bg-[#009bd6] transition-colors text-white font-body font-semibold text-[1.1vw] flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    freeChartData.ctaLabel
                  )}
                </button>
              </form>
            )}

            {/* Error Message */}
            {status === "error" && (
              <p className="mt-[0.6vw] pl-[0.4vw] text-[0.9vw] font-body font-medium text-[#ff6b6b]" role="alert">
                {responseMessage}
              </p>
            )}

            {/* Note: Poppins 400, white, ~1vw, mt 0.9vw, pl 0.4vw */}
            <p className="mt-[0.9vw] pl-[0.4vw] font-body font-normal text-white text-[1vw]">
              {freeChartData.disclaimer}
            </p>
          </ScrollReveal>
        </div>

        {/* ── Right Column: 38.4vw wide, height auto (~37.7vw), left edge 57.2vw, right edge ~4.3vw ── */}
        <ScrollReveal delay={0.15} className="w-[38.4vw] shrink-0">
          <Image
            src={freeChartData.chartImage}
            alt="A timeline of Indian history — printable chronology chart"
            width={714}
            height={701}
            priority={false}
            className="w-[38.4vw] h-auto block select-none rounded-none border-0 shadow-none"
          />
        </ScrollReveal>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE / TABLET VIEW (< 1024px)
          ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden mx-auto w-full px-6 sm:px-10">
        <div className="flex flex-col gap-10">
          <ScrollReveal>
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#F25A3C] shrink-0" aria-hidden="true" />
              <span className="font-body font-semibold text-[#F25A3C] text-xs sm:text-sm tracking-[0.2em] uppercase">
                {freeChartData.label}
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-4 font-heading font-medium text-white text-3xl sm:text-4xl leading-tight">
              {freeChartData.heading.line1}
              <br />
              <span className="italic text-[#F25A3C]">
                {freeChartData.heading.accent}
              </span>
              {freeChartData.heading.after}
            </h2>

            {/* Paragraph */}
            <p className="mt-4 font-body font-normal text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
              {freeChartData.body.line1} {freeChartData.body.line2}
            </p>

            {/* Mobile Form or Confirmation Block */}
            {status === "success" ? (
              <div
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg"
                role="status"
                aria-live="polite"
              >
                <div className="flex-1 rounded-[8px] bg-[#1F2A44] border border-[#2D3B5E] px-4 py-3 text-sm font-body font-normal text-white flex items-center gap-2.5">
                  <svg
                    className="h-4 w-4 text-[#00AEEF] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{freeChartData.successMessage}</span>
                </div>
                <a
                  href={freeChartData.chartImage}
                  download="indian-history-timeline-chart.jpg"
                  className="rounded-[8px] bg-[#00AEEF] hover:bg-[#009bd6] px-6 py-3 text-sm font-body font-semibold text-white shadow-md transition-colors text-center cursor-pointer shrink-0"
                >
                  {freeChartData.downloadLabel}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  required
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your email address"
                  className="flex-1 rounded-[8px] bg-[#1F2A44] border border-[#2D3B5E] px-4 py-3 text-sm text-white placeholder:text-[#6F7790] font-body outline-none transition-colors focus:border-[#00AEEF] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-[8px] bg-[#00AEEF] hover:bg-[#009bd6] px-6 py-3 text-sm font-body font-semibold text-white shadow-md transition-colors disabled:opacity-60 cursor-pointer shrink-0"
                >
                  {isSubmitting ? "Sending..." : freeChartData.ctaLabel}
                </button>
              </form>
            )}

            {/* Error Message */}
            {status === "error" && (
              <p className="mt-2 text-xs font-medium text-[#ff6b6b]">
                {responseMessage}
              </p>
            )}

            {/* Note */}
            <p className="mt-2.5 text-xs text-white/80 font-body">
              {freeChartData.disclaimer}
            </p>
          </ScrollReveal>

          {/* Right: Chart Image */}
          <ScrollReveal delay={0.15}>
            <div className="w-full max-w-lg mx-auto">
              <Image
                src={freeChartData.chartImage}
                alt="A timeline of Indian history — printable chronology chart"
                width={714}
                height={701}
                className="w-full h-auto block select-none rounded-none border-0 shadow-none"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

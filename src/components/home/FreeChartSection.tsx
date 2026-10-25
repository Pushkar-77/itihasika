"use client";

import { useState } from "react";
import { freeChartData } from "@/data/freeChart";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { submitEmailSignup } from "@/app/actions/emailSignup";

/* ─────────────────────────────────────────────────────────────
   Free Printable Chart section (matches home-07 / home-08)
   Navy background · left: copy + email capture · right: chart
   placeholder image. No red divider lines.
   ───────────────────────────────────────────────────────────── */
export function FreeChartSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  return (
    <section className="bg-navy py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Copy + Email form ─────────────────── */}
          <div>
            <ScrollReveal>
              {/* Small label with dash */}
              <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                <span className="h-[2px] w-8 bg-white/40" aria-hidden="true" />
                {freeChartData.label}
              </span>

              {/* Heading */}
              <h2 className="mt-6 font-heading text-4xl font-normal leading-[1.1] text-white sm:text-5xl lg:text-[54px]">
                {freeChartData.heading.before}
                <br />
                <span className="italic text-red">
                  {freeChartData.heading.accent}
                </span>
                {freeChartData.heading.after}
              </h2>

              {/* Body text */}
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                {freeChartData.body}
              </p>

              {/* Email form or Thank-you message */}
              {status === "success" ? (
                <div
                  className="mt-8 max-w-lg rounded-2xl border border-yellow/30 bg-white/10 p-6 backdrop-blur-md transition-all duration-300"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow text-navy shadow-md">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">
                        Thank You!
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/80">
                        {responseMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setEmail("");
                          setResponseMessage("");
                        }}
                        className="mt-4 text-xs font-semibold uppercase tracking-wider text-yellow hover:underline"
                      >
                        ← Submit another email
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
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
                  }}
                  className="mt-8 max-w-lg"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
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
                      className="flex-1 rounded-full bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/40 outline-none ring-1 ring-white/15 transition-all duration-300 focus:bg-white/15 focus:ring-cyan disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-full bg-cyan px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#009bd6] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:text-base cursor-pointer"
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
                  </div>

                  {status === "error" && (
                    <p className="mt-2.5 text-xs font-medium text-[#ff6b6b]">
                      {responseMessage}
                    </p>
                  )}
                </form>
              )}

              {/* Disclaimer */}
              <p className="mt-3 text-xs text-white/40">
                {freeChartData.disclaimer}
              </p>
            </ScrollReveal>
          </div>

          {/* ── Right: Chart placeholder ────────────────── */}
          <div className="flex justify-center lg:justify-end">
            <ScrollReveal delay={0.15}>
              {freeChartData.chartImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={freeChartData.chartImage}
                  alt="A timeline of Indian history — printable chronology chart"
                  className="w-full max-w-md rounded-2xl shadow-2xl"
                />
              ) : (
                /* ── Clearly marked placeholder ──────────── */
                <div
                  className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-10 text-center min-h-[420px]"
                  role="img"
                  aria-label="Placeholder for timeline of Indian history chart"
                >
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-red/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red">
                    <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
                    Placeholder
                  </div>

                  {/* Chart icon */}
                  <svg
                    className="h-24 w-24 text-white/15"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 17V7m0 10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 10V7m0 10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2"
                    />
                  </svg>

                  <div>
                    <p className="font-heading text-lg font-bold text-white/60">
                      Timeline Chart
                    </p>
                    <p className="mt-1 text-xs text-white/30 leading-relaxed max-w-[220px]">
                      A beautifully designed, high-resolution chronology chart
                      of Indian history
                    </p>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

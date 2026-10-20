"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  navLinks,
  giftMembershipLink,
  socialLinks,
  contactLink,
} from "@/data/navigation";

/* ─────────────────────────────────────────────────────────────
   Navbar — dark rounded-pill bar, floats over the hero video.
   ───────────────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4">
        {/* ── Logo ───────────────────────────────────────────
            TODO: Client must supply a dedicated light / white
            version of logo.png for use on dark backgrounds.
            Currently using a CSS filter (brightness-0 invert)
            to approximate a white logo.
            ──────────────────────────────────────────────────── */}
        <Link href="/" className="shrink-0 relative z-10">
          <Image
            src="/images/logo.png"
            alt="Itihasika"
            width={80}
            height={60}
            className="h-12 w-auto brightness-0 invert"
            priority
          />
        </Link>

        {/* ── Desktop nav pill ────────────────────────────── */}
        <nav
          className={`hidden lg:flex items-center gap-0.5 rounded-full px-3 py-2 shadow-lg transition-all duration-300 ${
            scrolled
              ? "bg-navy/[0.98] shadow-navy/30"
              : "bg-navy/80 backdrop-blur-md"
          }`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 transition-colors hover:text-yellow"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={giftMembershipLink.href}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-yellow transition-colors hover:text-white"
          >
            {giftMembershipLink.label}
          </Link>

          {/* Social icons */}
          <div className="ml-1 flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: socialBg(s.icon) }}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>

          {/* Contact CTA */}
          <Link
            href={contactLink.href}
            className="ml-2 whitespace-nowrap rounded-full bg-yellow px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-yellow/90"
          >
            {contactLink.label}
          </Link>
        </nav>

        {/* ── Mobile hamburger ────────────────────────────── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden ml-auto rounded-full bg-navy/70 p-2.5 text-white backdrop-blur-md"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 rounded-2xl bg-navy/95 p-6 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-yellow"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={giftMembershipLink.href}
              className="text-sm font-semibold uppercase tracking-wider text-yellow"
              onClick={() => setMobileOpen(false)}
            >
              {giftMembershipLink.label}
            </Link>

            <div className="flex items-center gap-4 border-t border-white/10 pt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: socialBg(s.icon) }}
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>

            <Link
              href={contactLink.href}
              className="mt-2 block rounded-full bg-yellow px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-navy"
              onClick={() => setMobileOpen(false)}
            >
              {contactLink.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

/** Background colour for each social-icon circle. */
function socialBg(icon: string): string {
  switch (icon) {
    case "youtube":
      return "#FF0000";
    case "instagram":
      return "#E1306C";
    case "twitter":
      return "#1DA1F2";
    default:
      return "#555";
  }
}

function SocialIcon({ name }: { name: string }) {
  const cls = "h-3.5 w-3.5 text-white";
  switch (name) {
    case "youtube":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}

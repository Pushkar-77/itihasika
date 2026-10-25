"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  navLinks,
  giftMembershipLink,
  socialLinks,
  contactLink,
} from "@/data/navigation";

/* ─────────────────────────────────────────────────────────────
   Navbar — dark rounded-pill bar, right-aligned from logo to
   ~110 px from the right viewport edge.
   Background: near-black #0A0A0F.
   ───────────────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const supabase = createClient();

    // Fetch initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
      setAuthLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  // Social URLs from data
  const youtubeUrl =
    socialLinks.find((s) => s.icon === "youtube")?.href || "#";
  const instagramUrl =
    socialLinks.find((s) => s.icon === "instagram")?.href || "#";
  const twitterUrl =
    socialLinks.find((s) => s.icon === "twitter")?.href || "#";

  const desktopPageLinks = [
    { label: "BOOKS", href: navLinks.find((l) => l.label.toLowerCase() === "books")?.href || "#" },
    { label: "FILMS", href: navLinks.find((l) => l.label.toLowerCase() === "films")?.href || "/films" },
    { label: "COURSES", href: navLinks.find((l) => l.label.toLowerCase() === "courses")?.href || "#" },
    { label: "TIME TRAVEL", href: navLinks.find((l) => l.label.toLowerCase() === "time travel")?.href || "#" },
    { label: "ABOUT", href: navLinks.find((l) => l.label.toLowerCase() === "about")?.href || "#" },
    { label: "PRICING", href: navLinks.find((l) => l.label.toLowerCase() === "pricing")?.href || "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* ── Desktop Navbar (≥ 1024px) ──────────────────────────
          Matches design/home-01.png. Sizes are in vw (1920px basis).
          Pill starts at ~22% (21.8vw), ends ~6% before right edge (right: 5.8vw).
          ──────────────────────────────────────────────────── */}
      <div className="hidden lg:block relative w-full h-[4.4vw] mt-[1.7vw] pointer-events-none">
        {/* ── Logo at far left (left: 2vw, ~9.6vw wide, vertically centered on pill's center line) ──
            // TODO: replace with client logo that includes the TV badge */}
        <div className="absolute left-[2vw] top-0 bottom-0 flex items-center pointer-events-auto">
          <Link href="/" className="block w-[9.6vw] shrink-0">
            <Image
              src="/images/logo.png"
              alt="Itihasika"
              width={184}
              height={108}
              className="w-[9.6vw] h-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* ── Pill Container (left: 21.8vw, right: 5.8vw, height: 4.4vw) ── */}
        <nav
          className={`absolute left-[21.8vw] right-[5.8vw] top-0 h-[4.4vw] rounded-full border border-[rgba(255,255,255,0.22)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] flex items-center px-[2.2vw] pointer-events-auto transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(27,27,27,0.98)] shadow-black/50"
              : "bg-[rgba(27,27,27,0.94)] backdrop-blur-md"
          }`}
          aria-label="Main navigation"
        >
          {/* Links: BOOKS, FILMS, COURSES, TIME TRAVEL, ABOUT, PRICING, GIFT MEMBERSHIP */}
          <div className="flex items-center gap-[2.15vw] shrink-0">
            {desktopPageLinks.map((link) => {
              const isActive =
                link.href !== "#" && Boolean(pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-body font-semibold uppercase text-[0.8vw] tracking-[0.12em] whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-[#FFC800]"
                      : "text-white hover:text-[#FFC800]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* GIFT MEMBERSHIP with small yellow gift icon right before it */}
            <Link
              href={giftMembershipLink.href}
              className={`inline-flex items-center gap-[0.35vw] font-body font-semibold uppercase text-[0.8vw] tracking-[0.12em] whitespace-nowrap transition-colors ${
                pathname === giftMembershipLink.href
                  ? "text-[#FFC800]"
                  : "text-white hover:text-[#FFC800]"
              }`}
            >
              <GiftIcon className="w-[0.9vw] h-[0.9vw] text-[#FFC800] shrink-0" />
              <span>GIFT MEMBERSHIP</span>
            </Link>
          </div>

          {/* Social icons: margin-left 2.7vw, gap 1.2vw, 1.6vw filled circles */}
          <div className="ml-[2.7vw] flex items-center gap-[1.2vw] shrink-0">
            {/* YouTube (red #FF0000, white play triangle) */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-[1.6vw] h-[1.6vw] rounded-full bg-[#FF0000] flex items-center justify-center shrink-0 transition-opacity hover:opacity-85"
            >
              <svg
                className="w-[0.65vw] h-[0.65vw] fill-white translate-x-[0.05vw]"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>

            {/* Instagram (gradient circle from yellow through pink to purple, white camera outline) */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-[1.6vw] h-[1.6vw] rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-85"
              style={{
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              }}
            >
              <svg
                className="w-[0.85vw] h-[0.85vw] text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Twitter (#1DA1F2 circle with the white bird) */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-[1.6vw] h-[1.6vw] rounded-full bg-[#1DA1F2] flex items-center justify-center shrink-0 transition-opacity hover:opacity-85"
            >
              <svg
                className="w-[0.85vw] h-[0.85vw] fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>
          </div>

          {/* CONTACT US button: margin-left 3.4vw, background #FFC800, black text, 6.7vw × 1.8vw, rounded-full */}
          <Link
            href={contactLink.href}
            className="ml-[3.4vw] w-[6.7vw] h-[1.8vw] rounded-full bg-[#FFC800] hover:bg-[#e6b400] text-black font-body font-semibold text-[0.8vw] uppercase tracking-[0.05em] flex items-center justify-center shrink-0 whitespace-nowrap transition-colors"
          >
            CONTACT US
          </Link>
        </nav>
      </div>

      {/* ── Mobile Header Bar (< 1024px, UNCHANGED) ───────────── */}
      <div className="flex items-center justify-between px-6 sm:px-10 pt-4 lg:hidden">
        {/* Mobile Logo */}
        <Link href="/" className="relative z-10 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Itihasika"
            width={80}
            height={60}
            className="h-12 w-auto brightness-0 invert"
            priority
          />
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full bg-[#0A0A0F]/70 p-2.5 text-white backdrop-blur-md"
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
        <div className="mt-3 rounded-2xl bg-[#0A0A0F]/95 p-6 shadow-xl backdrop-blur-md lg:hidden">
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
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white"
              onClick={() => setMobileOpen(false)}
            >
              <GiftIcon />
              <span>Gift Membership</span>
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

            {/* Mobile Auth */}
            {!authLoading && (
              <div className="mt-2 border-t border-white/10 pt-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3 text-xs text-white/90">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span className="truncate font-medium">{user.email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="text-left text-sm font-semibold uppercase tracking-wider text-red transition-colors hover:text-red/80 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-yellow py-1"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-full bg-cyan px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-cyan/90"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

/** Yellow gift-box SVG icon. */
function GiftIcon({
  className = "h-4 w-4 text-yellow",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 7h-1.209A4.92 4.92 0 0019 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.498 3.527 10.4 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H4c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.55 0 1-.45 1-1V9c0-1.1-.9-2-2-2zm-4.5-3c.83 0 1.5.67 1.5 1.5S16.33 7 15.5 7H13c.5-1.58 1.37-3 2.5-3zM7 5.5C7 4.67 7.67 4 8.5 4c1.13 0 2 1.42 2.5 3H8.5C7.67 7 7 6.33 7 5.5zM4 9h7v2H4V9zm2 4h5v7H6v-7zm12 7h-5v-7h5v7zm-5-9V9h7v2h-7z" />
    </svg>
  );
}

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

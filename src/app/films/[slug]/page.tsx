import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WatchlistButton } from "@/components/films/WatchlistButton";
import { formatDuration } from "@/components/films/FilmCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: title } = await supabase
    .from("titles")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (!title) {
    return {
      title: "Film Not Found — Itihasika",
    };
  }

  return {
    title: `${title.title} — Itihasika TV`,
    description: title.description,
  };
}

async function FilmDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch title by slug
  const { data: title } = await supabase
    .from("titles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!title) {
    notFound();
  }

  // 2. Fetch user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Load video URL from title_media using user's Supabase session
  const { data: media } = await supabase
    .from("title_media")
    .select("video_url")
    .eq("title_id", title.id)
    .maybeSingle();

  // 4. Check watchlist status for logged-in user
  let inWatchlist = false;
  if (user) {
    const { data: wl } = await supabase
      .from("watchlist")
      .select("title_id")
      .eq("user_id", user.id)
      .eq("title_id", title.id)
      .maybeSingle();
    inWatchlist = !!wl;
  }

  const isUnlocked = Boolean(media?.video_url);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {isUnlocked ? (
        /* ── Unlocked: HTML5 Video Player ────────────────── */
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          <video
            controls
            playsInline
            poster={title.thumbnail_url || undefined}
            src={media!.video_url}
            className="h-full w-full object-contain"
          >
            Your browser does not support HTML5 video streaming.
          </video>
        </div>
      ) : (
        /* ── Locked: Lock Screen (No video URL in page) ──── */
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0A0A0F] shadow-2xl ring-1 ring-white/10 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
          {/* Blurred thumbnail background */}
          {title.thumbnail_url && (
            <div className="absolute inset-0 z-0">
              <Image
                src={title.thumbnail_url}
                alt={title.title}
                fill
                className="object-cover opacity-15 blur-lg scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0A0F]/85" />
            </div>
          )}

          {/* Lock card content */}
          <div className="relative z-10 max-w-md flex flex-col items-center">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-yellow/15 text-yellow mb-4 sm:mb-5 shadow-lg shadow-yellow/10">
              <svg
                className="h-7 w-7 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow animate-pulse" />
              Premium Subscriber Title
            </span>

            <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-white">
              This Title is Locked
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              &ldquo;{title.title}&rdquo; is exclusive to Itihasika TV members.
              Subscribe to unlock our full catalog of films, documentaries, and courses.
            </p>

            {/* Lock Screen Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="rounded-full bg-yellow px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-navy shadow-lg transition-all hover:bg-yellow/90 hover:scale-105 cursor-pointer"
              >
                Subscribe Now
              </Link>

              {!user && (
                <Link
                  href={`/login?redirect=/films/${slug}`}
                  className="rounded-full bg-cyan px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#009bd6] cursor-pointer"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Metadata & Watchlist Action Row ─────────────── */}
      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between border-b border-white/10 pb-8">
        <div className="space-y-3">
          {/* Badges / Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              {title.era}
            </span>

            {title.duration_seconds && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                {formatDuration(title.duration_seconds)} (
                {Math.round(title.duration_seconds / 60)} mins)
              </span>
            )}

            {title.language && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                {title.language}
              </span>
            )}

            {title.badge && (
              <span className="rounded-full bg-red/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red">
                {title.badge}
              </span>
            )}

            {title.is_premium ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow">
                <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Premium
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                Free to Watch
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title.title}
          </h1>
        </div>

        {/* Watchlist button for logged-in users */}
        <div className="shrink-0 pt-1">
          <WatchlistButton
            titleId={title.id}
            initialInWatchlist={inWatchlist}
            isLoggedIn={!!user}
            slug={slug}
          />
        </div>
      </div>

      {/* ── Description ─────────────────────────────────── */}
      <div className="mt-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-3">
          Synopsis & Historical Context
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          {title.description}
        </p>
      </div>
    </div>
  );
}

function FilmDetailSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto animate-pulse">
      <div className="aspect-video w-full rounded-2xl bg-[#0A0A0F]" />
      <div className="mt-8 space-y-4">
        <div className="h-8 w-1/3 rounded-full bg-white/10" />
        <div className="h-12 w-2/3 rounded-xl bg-white/10" />
        <div className="h-20 w-full rounded-xl bg-white/5" />
      </div>
    </div>
  );
}

export default function FilmDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-navy text-white pt-28 pb-20 sm:pb-28">
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[90px]">
        {/* ── Breadcrumb / Back Navigation ──────────────────── */}
        <div className="mb-6">
          <Link
            href="/films"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60 transition-colors hover:text-yellow"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to All Films</span>
          </Link>
        </div>

        <Suspense fallback={<FilmDetailSkeleton />}>
          <FilmDetailContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}

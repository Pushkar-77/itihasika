import Image from "next/image";
import Link from "next/link";

export interface TitleRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  era: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  language: string | null;
  badge: string | null;
  is_premium: boolean;
  sort_order: number;
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function FilmCard({ title }: { title: TitleRecord }) {
  return (
    <article className="group">
      <Link
        href={`/films/${title.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-yellow rounded-2xl"
      >
        {/* Thumbnail container (16:9 widescreen) */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0A0A0F] shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
          {title.thumbnail_url ? (
            <Image
              src={title.thumbnail_url}
              alt={title.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* ── Clearly marked placeholder ──────── */
            <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-[#1A1A24] to-[#0F172A] p-4 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow animate-pulse" />
                Demo content
              </span>
              <svg
                className="h-10 w-10 text-white/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <p className="text-[11px] text-white/40 max-w-[180px] line-clamp-1">
                {title.title}
              </p>
            </div>
          )}

          {/* Gradient overlay for text / chips readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* "New" badge (top right) */}
          {title.badge && (
            <span className="absolute top-2.5 right-2.5 rounded bg-black/85 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-md border border-white/10 backdrop-blur-sm">
              {title.badge}
            </span>
          )}

          {/* Lock icon for premium (bottom left) */}
          {title.is_premium && (
            <span
              className="absolute bottom-2.5 left-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/85 text-yellow shadow-md backdrop-blur-sm"
              title="Premium subscriber content"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}

          {/* Duration chip (bottom right) */}
          {title.duration_seconds && title.duration_seconds > 0 && (
            <span className="absolute bottom-2.5 right-2.5 rounded bg-black/85 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white tracking-wider backdrop-blur-sm shadow-sm">
              {formatDuration(title.duration_seconds)}
            </span>
          )}
        </div>

        {/* Card info */}
        <h3 className="mt-3 font-heading text-base sm:text-lg font-bold leading-snug text-navy transition-colors group-hover:text-red line-clamp-1">
          {title.title}
        </h3>
        {title.description && (
          <p className="mt-1 text-xs sm:text-sm text-navy/60 line-clamp-2 leading-relaxed">
            {title.description}
          </p>
        )}
      </Link>
    </article>
  );
}

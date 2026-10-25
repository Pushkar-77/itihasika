"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleWatchlist } from "@/app/actions/watchlist";

interface WatchlistButtonProps {
  titleId: string;
  initialInWatchlist: boolean;
  isLoggedIn: boolean;
  slug: string;
}

export function WatchlistButton({
  titleId,
  initialInWatchlist,
  isLoggedIn,
  slug,
}: WatchlistButtonProps) {
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/films/${slug}`);
      return;
    }

    // Optimistic toggle
    const nextState = !inWatchlist;
    setInWatchlist(nextState);

    startTransition(async () => {
      const res = await toggleWatchlist(titleId);
      if (!res.success) {
        // Revert on failure
        setInWatchlist(!nextState);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm ${
        inWatchlist
          ? "bg-yellow text-navy hover:bg-yellow/90 shadow-yellow/20"
          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
      }`}
      aria-label={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    >
      {inWatchlist ? (
        <>
          <svg
            className="h-4 w-4 text-navy stroke-[3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
}

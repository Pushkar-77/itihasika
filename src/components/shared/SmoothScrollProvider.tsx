"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth-scroll and syncs it with GSAP ScrollTrigger.
 * Skipped entirely when the user prefers reduced motion.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // native touch scrolling on touch devices prevents stuck gestures
      allowNestedScroll: true, // nested scroll containers can scroll without trapping page scroll
      autoResize: true,
      autoToggle: true,
    });
    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis' scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // When ScrollTrigger recalculates, ensure Lenis resizes to the latest page height
    const onScrollTriggerRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onScrollTriggerRefresh);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger and Lenis dimensions after content/assets settle
    const refreshBounds = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // 1. Initial refresh on mount
    refreshBounds();

    // 2. Refresh on window load
    window.addEventListener("load", refreshBounds);

    // 3. Refresh when web fonts finish loading
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(refreshBounds);
    }

    // 4. Refresh when images load
    const images = Array.from(document.querySelectorAll("img"));
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refreshBounds, { once: true });
        img.addEventListener("error", refreshBounds, { once: true });
      }
    });

    // 5. Refresh when videos load metadata/data
    const videos = Array.from(document.querySelectorAll("video"));
    videos.forEach((vid) => {
      if (vid.readyState < 2) {
        vid.addEventListener("loadeddata", refreshBounds, { once: true });
        vid.addEventListener("loadedmetadata", refreshBounds, { once: true });
      }
    });

    // 6. Observe document body resizing (dynamic additions, async hydration, layout shifts)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      ro = new ResizeObserver(() => {
        refreshBounds();
      });
      ro.observe(document.body);
    }

    return () => {
      window.removeEventListener("load", refreshBounds);
      ScrollTrigger.removeEventListener("refresh", onScrollTriggerRefresh);
      ro?.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in seconds before the animation starts. */
  delay?: number;
  /**
   * When > 0 the *direct children* are staggered by this many seconds.
   * When 0 (default) the wrapper itself fades in as a single unit.
   */
  stagger?: number;
  /** HTML tag to render. Defaults to `div`. */
  as?: keyof HTMLElementTagNameMap;
}

/**
 * Wraps content in a GSAP-powered fade-up reveal that triggers once
 * when the element scrolls into view. Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const targets = stagger > 0 ? Array.from(el.children) : [el];

    gsap.set(targets, { opacity: 0, y: 40 });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, stagger]);

  return (
    // @ts-expect-error — dynamic tag with ref is fine at runtime
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

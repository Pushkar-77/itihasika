export const heroData = {
  /** Headline rendered in Poppins bold; accent words in yellow #FFC800. */
  headline: {
    lines: [
      [
        { text: "India's ", accent: false },
        { text: "timeless", accent: true },
        { text: " history", accent: false },
      ],
      [
        { text: "reimagined for", accent: false },
      ],
      [
        { text: "curious", accent: true },
        { text: " minds.", accent: false },
      ],
    ],
  },

  video: {
    desktop: "/videos/hero-home-web.mp4",
    mobile: "/videos/hero-home-mobile.mp4",
    poster: "/images/hero-home-poster.jpg",
  },

  ctas: [
    { label: "Subscribe to our OTT", href: "#", variant: "yellow" as const },
    { label: "Browse our books", href: "#", variant: "white" as const },
    { label: "Enroll in our courses", href: "#", variant: "white" as const },
  ],

  stats: [
    { value: 11, suffix: " M+", label: "Views on YouTube" },
    { value: 3000, suffix: "+", label: "Books Sold" },
    { value: 10, suffix: "", label: "Global Awards" },
  ],
} as const;

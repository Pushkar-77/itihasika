export const timelineData = {
  heading: {
    before: "Journeys across ",
    accent: "time",
    after: ".",
  },

  subtitle:
    "Movies covering **India's entire history** arranged in chronological order.",

  ctaHeading: "Subscribe to our OTT Channel",
  ctaSubtitle: "New movies monthly. All movies in English and Hindi.",

  eras: [
    {
      title: "Ancient India",
      topics: [
        "Indus valley civilization",
        "Vedic period",
        "Evolution of Sanatan dharma",
      ],
      active: true,
    },
    {
      title: "Golden age",
      topics: ["Buddha", "Guptas", "Mauryas"],
    },
    {
      title: "Medieval India",
      topics: [
        "Early Islamic invasions",
        "Cholas",
        "Rashtrakutas",
        "Solankis",
      ],
    },
    {
      title: "Islamic colonization & Hindu resistance",
      topics: [
        "Delhi Sultanate",
        "Mughal Raj",
        "Rajput resistance",
        "Gajapatis",
        "Vijayanagara",
      ],
    },
    {
      title: "Hindu Swaraj",
      topics: ["Marathas", "Ahoms", "Sikhs", "Travancore"],
    },
    {
      title: "British Raj & modern India",
      topics: [
        "East India Company",
        "British rule",
        "Independence struggle",
        "Post independence",
      ],
    },
  ],

  /**
   * Indus Valley Priest-King statue (Ancient India, c. 2000 BCE)
   */
  statue: {
    src: "/images/timeline/indus-statue.png",
    alt: "Indus Valley Priest-King statue",
  },
} as const;

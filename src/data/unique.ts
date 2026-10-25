export const uniqueData = {
  leftLabel: "WHAT MAKES US UNIQUE",
  rightLabel: "WHY ITIHASIKA",

  /** Body copy — accent phrases render in red. */
  body: [
    { text: "Most children meet Indian history as a list of dates. We hand them ", accent: false },
    { text: "the story", accent: true },
    { text: " instead — ", accent: false },
    { text: "kings and rivers", accent: true },
    { text: ", verses and voyages — told with the craft of a ", accent: false },
    { text: "picture book", accent: true },
    { text: " and the honesty of a good teacher.", accent: false },
  ],

  /** Physical book shown on the left side of the image cluster. */
  bookImage: "/images/books/history-india.png",

  /** Video and poster displayed inside the iPad tablet frame. */
  tabletVideo: "/videos/shiva-web.mp4",
  tabletPoster: "/images/shiva-poster.jpg",
} as const;

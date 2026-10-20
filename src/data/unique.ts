export const uniqueData = {
  leftLabel: "What makes us unique",
  rightLabel: "Why Itihasika",

  /** Body copy — accent phrases render in red bold italic. */
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

  /**
   * Image displayed inside a CSS tablet frame (dark rounded bezel).
   * Using rajendra-chola.jpg as a placeholder screen.
   */
  tabletScreenImage: "/images/films/rajendra-chola.jpg",
} as const;

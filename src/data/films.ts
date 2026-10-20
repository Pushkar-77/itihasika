export const filmsData = {
  heading: {
    before: "Movies that build ",
    accent: "connection",
    after: ".",
  },
  subtitle:
    "Timeless history the whole family can watch together — then argue about at dinner.",
  viewAllHref: "#",

  items: [
    {
      title: "How Lachit annihilated Mughals",
      subtitle: "Saraighat, 1671 — one river, one immovable stand.",
      image: "/images/films/lachit.jpg",
      badge: "800K+ Views",
    },
    {
      title: "Blood Soaked revenge on pathans",
      subtitle:
        "A tale of grit and resolve from the northern frontier.",
      image: "/images/films/pathans.jpg",
    },
    {
      title: "Bajirao Ballal",
      subtitle:
        "The lighting on horseback that reclaimed Bharat for Hindus.",
      /** Placeholder — no thumbnail asset for Bajirao Ballal yet. */
      image: null as string | null,
    },
    {
      title: "Rajendra Chola",
      subtitle:
        "The emperor who sailed an army across the Bay of Bengal.",
      image: "/images/films/rajendra-chola.jpg",
    },
  ],
} as const;

export const filmsData = {
  heading: {
    before: "Movies that build ",
    accent: "connection",
    after: ".",
  },
  subtitle:
    "Timeless history the whole family can watch together — then argue about at dinner.",
  viewAllHref: "/films",

  items: [
    {
      title: "How Lachit annihilated Mughals",
      subtitle: "Saraighat, 1671 — one river, one immovable stand.",
      description: "Saraighat, 1671 — one river, one immovable stand.",
      image: "/images/films/lachit.jpg",
    },
    {
      title: "Blood Soaked revenge on pathans",
      subtitle: "A tale of grit and resolve from the northern frontier.",
      description: "A tale of grit and resolve from the northern frontier.",
      image: "/films/ranjit-singh.jpg",
    },
    {
      title: "Bajirao Ballal",
      subtitle: "The lightning on horseback that reclaimed Bharat for Hindus.",
      description: "The lightning on horseback that reclaimed Bharat for Hindus.",
      image: "/images/films/bajirao-ballal.png",
    },
    {
      title: "Rajendra Chola",
      subtitle: "The emperor who sailed an army across the Bay of Bengal.",
      description: "The emperor who sailed an army across the Bay of Bengal.",
      image: "/films/rajendra-lord-of-seas.jpg",
    },
  ],
} as const;

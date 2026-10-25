export interface FilmsHeroSlide {
  slug: string;
  region: string;
  title: string;
  highlight: string[];
  subtitle: string;
  video?: string;
  poster: string;
}

export const filmsHeroSlides: FilmsHeroSlide[] = [
  {
    slug: "rajendra-chola",
    region: "SOUTH INDIA",
    title: "Rajendra Chola The lord of the seas",
    highlight: ["lord", "seas"],
    subtitle: "The emperor who sailed an army across the Bay of Bengal.",
    poster: "/films/rajendra-lord-of-seas.jpg",
  },
  {
    slug: "how-lachit-annihilated-mughals",
    region: "NORTHEAST INDIA",
    title: "Lachit Borphukan The unvanquished commander",
    highlight: ["unvanquished", "commander"],
    subtitle: "The general who halted the Mughal conquest of Assam at Saraighat.",
    poster: "/films/lachit.jpg",
  },
  {
    slug: "how-hari-singh-nalwa-crushed-pathans",
    region: "NORTH INDIA",
    title: "Hari Singh Nalwa The terror of the frontier",
    highlight: ["terror", "frontier"],
    subtitle: "The warrior who conquered the Khyber Pass and tamed the wild northwest.",
    poster: "/films/pathans.jpg",
  },
  {
    slug: "when-mughals-begged-chhatrasal-for-mercy",
    region: "NORTH INDIA",
    title: "Maharaja Chhatrasal The blade of Bundelkhand",
    highlight: ["blade", "Bundelkhand"],
    subtitle: "The champion who defied Aurangzeb and established Bundelkhand's independence.",
    poster: "/films/mughals-begged.jpg",
  },
  {
    slug: "bajirao-ballal-41-battles-undefeated",
    region: "WEST INDIA",
    title: "Peshwa Bajirao The storm of Hindu Swaraj",
    highlight: ["storm", "Swaraj"],
    subtitle: "41 battles fought, zero defeats — the cavalry mastermind of the Maratha Empire.",
    poster: "/films/bajirao-ballal.png",
  },
];

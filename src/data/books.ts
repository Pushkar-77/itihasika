export const booksData = {
  heading: {
    before: "Stories that build ",
    accent: "character",
    after: ".",
  },
  subtitle:
    "Bestselling books loved to bits by kids and teens across the world",
  viewAllHref: "#",

  items: [
    {
      title: "ABC Activity Book of Gods",
      subtitle:
        "An alphabet of devtas with puzzles and colouring pages for little hands.",
      image: "/images/books/abc-gods.png",
      ageRange: "3–7",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#" },
        { label: "Amazon India", price: "₹424", href: "#" },
        { label: "Kindle", price: "$4.99", href: "#" },
        { label: "PDF Version", price: "$3.99", href: "#" },
      ],
    },
    {
      title: "The Bhagavad Gita",
      subtitle: "Timeless wisdom of the Gita, sized for young hearts.",
      image: "/images/books/gita-kids.png",
      ageRange: "3–7",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#" },
        { label: "Amazon India", price: "₹424", href: "#" },
        { label: "Kindle", price: "$4.99", href: "#" },
        { label: "PDF Version", price: "$3.99", href: "#" },
      ],
    },
    {
      title: "History of India",
      subtitle:
        "The youth-friendly sweep of the subcontinent, one glorious chapter at a time.",
      image: "/images/books/history-india.png",
      ageRange: "7–13",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#" },
        { label: "Amazon India", price: "₹424", href: "#" },
        { label: "Kindle", price: "$4.99", href: "#" },
        { label: "PDF Version", price: "$3.99", href: "#" },
      ],
    },
    {
      title: "My Ramayana",
      subtitle:
        "Rishi Valmiki's epic, retold gently — with all its courage intact.",
      image: "/images/books/my-ramayana.png",
      ageRange: "3–7",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#" },
        { label: "Amazon India", price: "₹424", href: "#" },
        { label: "Kindle", price: "$4.99", href: "#" },
        { label: "PDF Version", price: "$3.99", href: "#" },
      ],
    },
  ],
} as const;

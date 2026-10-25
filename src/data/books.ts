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
      descLine1: "An alphabet of devtas with puzzles and",
      descLine2: "colouring pages for little hands.",
      subtitle:
        "An alphabet of devtas with puzzles and colouring pages for little hands.",
      image: "/images/books/abc-gods.png",
      ageRange: "3–7",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#", logo: "/images/retail/amazon.svg", type: "amazon" as const },
        { label: "Amazon India", price: "₹424", href: "#", logo: "/images/retail/amazon-in.svg", type: "amazon-in" as const },
        { label: "Amazon Kindle", price: "$4.99", href: "#", logo: "/images/retail/amazon-kindle.svg", type: "amazon-kindle" as const },
        { label: "PDF Version", price: "$3.99", href: "#", logo: "/images/retail/pdf.svg", type: "pdf" as const },
      ],
    },
    {
      title: "The Bhagavad Gita",
      descLine1: "Timeless wisdom of the Gita, sized for",
      descLine2: "young hearts.",
      subtitle: "Timeless wisdom of the Gita, sized for young hearts.",
      image: "/images/books/gita-kids.png",
      ageRange: "3–7",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#", logo: "/images/retail/amazon.svg", type: "amazon" as const },
        { label: "Amazon India", price: "₹424", href: "#", logo: "/images/retail/amazon-in.svg", type: "amazon-in" as const },
        { label: "Amazon Kindle", price: "$4.99", href: "#", logo: "/images/retail/amazon-kindle.svg", type: "amazon-kindle" as const },
        { label: "PDF Version", price: "$3.99", href: "#", logo: "/images/retail/pdf.svg", type: "pdf" as const },
      ],
    },
    {
      title: "History of India",
      descLine1: "The youth-friendly sweep of the subcontinent,",
      descLine2: "one glorious chapter at a time.",
      subtitle:
        "The youth-friendly sweep of the subcontinent, one glorious chapter at a time.",
      image: "/images/books/history-india.png",
      ageRange: "7–13",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#", logo: "/images/retail/amazon.svg", type: "amazon" as const },
        { label: "Amazon India", price: "₹424", href: "#", logo: "/images/retail/amazon-in.svg", type: "amazon-in" as const },
        { label: "Amazon Kindle", price: "$4.99", href: "#", logo: "/images/retail/amazon-kindle.svg", type: "amazon-kindle" as const },
        { label: "PDF Version", price: "$3.99", href: "#", logo: "/images/retail/pdf.svg", type: "pdf" as const },
      ],
    },
    {
      title: "My Ramayana",
      descLine1: "Rishi Valmiki’s epic, retold gently — with all",
      descLine2: "its courage intact.",
      subtitle:
        "Rishi Valmiki's epic, retold gently — with all its courage intact.",
      image: "/images/books/my-ramayana.png",
      ageRange: "3–7",
      links: [
        { label: "Amazon Global", price: "$10.99", href: "#", logo: "/images/retail/amazon.svg", type: "amazon" as const },
        { label: "Amazon India", price: "₹424", href: "#", logo: "/images/retail/amazon-in.svg", type: "amazon-in" as const },
        { label: "Amazon Kindle", price: "$4.99", href: "#", logo: "/images/retail/amazon-kindle.svg", type: "amazon-kindle" as const },
        { label: "PDF Version", price: "$3.99", href: "#", logo: "/images/retail/pdf.svg", type: "pdf" as const },
      ],
    },
  ],
} as const;

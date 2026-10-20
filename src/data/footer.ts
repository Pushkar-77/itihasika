export const footerData = {
  tagline:
    "Educate, Empower and Inspire. Stories that build character and connection.",

  socials: [
    { label: "Facebook", href: "#", icon: "facebook" as const },
    { label: "Twitter", href: "#", icon: "twitter" as const },
    { label: "Instagram", href: "#", icon: "instagram" as const },
  ],

  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Refund Policy", href: "#" },
      ],
    },
    {
      title: "Categories",
      links: [
        { label: "History Comics", href: "#" },
        { label: "Books", href: "#" },
        { label: "Movies", href: "#" },
        { label: "Courses", href: "#" },
      ],
    },
    {
      title: "Good to Know",
      links: [
        { label: "Historical Maps (Time Travel)", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
  ],
} as const;

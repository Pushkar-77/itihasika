export interface TestimonialItem {
  name: string;
  location: string;
  quote: string;
  image: string;
}

export interface TestimonialsData {
  heading: {
    before: string;
    accent: string;
    after: string;
  };
  items: TestimonialItem[];
}

export const testimonialsData: TestimonialsData = {
  heading: {
    before: "Voices from ",
    accent: "thankful",
    after: " families.",
  },

  items: [
    {
      name: "Neeraj & Kristen Singh",
      location: "New Jersey – USA",
      quote:
        "Fifteen years in the US — and now it's the kids schooling us on Indian history at the dinner table. We're all learning together.",
      image: "/images/people/family-3.jpg",
    },
    {
      name: "Aaditya & Gauri Oka",
      location: "Dubai – UAE",
      quote:
        "I doubted kids raised in the UAE would take to the epics. The books and films proved me wrong — the mix of stories and activities has them hooked.",
      image: "/images/people/family-5.jpg",
    },
    {
      name: "Ashok & Mansi Kadkol",
      location: "Bengaluru · India",
      quote:
        "Two children who dodged every book we ever bought — now reading these on repeat and bursting with questions. History, turned into magic.",
      image: "/images/people/family-4.jpg",
    },
    {
      name: "Shalabh & Shubhra K.",
      location: "Pune – India",
      quote:
        "At a time when classrooms are increasingly shaped by political agendas, the Itihasika books and videos offer a breath of fresh air — rooted in timeless, wholesome values that spark independent thinking in our children.",
      image: "/images/people/family-6.jpg",
    },
  ],
};

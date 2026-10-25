import { HeroSection } from "@/components/home/HeroSection";
import { UniqueSection } from "@/components/home/UniqueSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { EraTimeline } from "@/components/home/EraTimeline";
import { FilmsRow } from "@/components/home/FilmsRow";
import { BooksRow } from "@/components/home/BooksRow";
import { FreeChartSection } from "@/components/home/FreeChartSection";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. "What makes us unique" */}
      <UniqueSection />

      {/* 3. Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 4. "Journeys across time" — Era Timeline */}
      <EraTimeline />

      {/* 5. Films Row — "Movies that build connection." */}
      <FilmsRow />

      {/* 6. Books Row — "Stories that build character." */}
      <BooksRow />

      {/* 7. Free Printable Chart */}
      <FreeChartSection />
    </>
  );
}

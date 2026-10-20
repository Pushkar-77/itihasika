import { HeroSection } from "@/components/home/HeroSection";
import { UniqueSection } from "@/components/home/UniqueSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { EraTimeline } from "@/components/home/EraTimeline";

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
    </>
  );
}

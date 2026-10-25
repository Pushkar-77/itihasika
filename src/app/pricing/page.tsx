import type { Metadata } from "next";
import { Suspense } from "react";
import { PricingSection } from "@/components/pricing/PricingSection";

export const metadata: Metadata = {
  title: "Subscription & Membership — Itihasika TV",
  description:
    "Subscribe to Itihasika TV for unlimited access to India's timeless history through films, courses, and documentary series.",
};

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3EAD3] flex items-center justify-center">
          <div className="h-8 w-48 rounded-full bg-navy/10 animate-pulse" />
        </div>
      }
    >
      <PricingSection />
    </Suspense>
  );
}

import FeatureSection from "./FeatureSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { LandingFooter } from "./LandingFooter";
import { PricingSection } from "./PricingSection";
import { SecondaryToolsSection } from "./SecondaryToolsSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <HowItWorks />
      <FeatureSection />
      <SecondaryToolsSection />
      <PricingSection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}

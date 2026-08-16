import { HeroSection } from "@/components/sections/HeroSection/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection/AboutSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection/ProgramsSection";
import { MentorshipSection } from "@/components/sections/MentorshipSection/MentorshipSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection/StatsSection";
import { CTASection } from "@/components/sections/CTASection/CTASection";

export function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <MentorshipSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}

export default Home;
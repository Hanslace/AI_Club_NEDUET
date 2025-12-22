import { HeroSection, SponsorSection, AboutSection, ProjectSection,ActivitySection,TeamSection } from "@/../components/shared";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <HeroSection />
      <SponsorSection />
      <AboutSection />
      <ProjectSection />
      <ActivitySection />
      <TeamSection />
    </div>
  );
}

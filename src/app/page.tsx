"use client";

import { usePortfolioData, SectionId, defaultSectionOrder } from "@/context/DataContext";
import {
  Navbar,
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Education,
  GitHubStats,
  StatsSection,
  Testimonials,
  Blog,
  Contact,
  Footer,
  CustomSection,
} from "@/components";
import ThemeApplier from "@/components/ThemeApplier";

// Map section IDs to components (only built-in sections)
const sectionComponents: Record<string, React.ComponentType<unknown> | null> = {
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  education: Education,
  stats: StatsSection,
  githubStats: () => <GitHubStats username="aniket-mishra" />,
  testimonials: Testimonials,
  blog: Blog,
  contact: Contact,
};

export default function Home() {
  const { data } = usePortfolioData();
  const visibility = data.sectionVisibility;
  const sectionOrder = data.sectionOrder || defaultSectionOrder;
  const customSections = data.customSections || [];

  return (
    <main className="min-h-screen bg-[var(--background)] relative z-10">
      <ThemeApplier />
      <Navbar />
      <Hero />

      {/* Render sections in configured order */}
      {sectionOrder.map((sectionId) => {
        // Check if it's a custom section (starts with "custom_")
        if (sectionId.startsWith("custom_")) {
          const customSection = customSections.find(s => s.id === sectionId);
          if (!customSection || !customSection.isVisible) return null;
          return <CustomSection key={sectionId} section={customSection} />;
        }

        // Built-in section - check visibility
        if (!visibility[sectionId as SectionId]) return null;

        // Get component for this section
        const Component = sectionComponents[sectionId];
        if (!Component) return null;

        return <Component key={sectionId} />;
      })}

      <Footer />
    </main>
  );
}

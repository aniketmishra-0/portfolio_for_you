"use client";

import { usePortfolioData } from "@/context/DataContext";
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
} from "@/components";
import ThemeApplier from "@/components/ThemeApplier";

export default function Home() {
  const { data } = usePortfolioData();
  const visibility = data.sectionVisibility;

  return (
    <main className="min-h-screen bg-[var(--background)] relative z-10">
      <ThemeApplier />
      <Navbar />
      <Hero />
      {visibility.about && <About />}
      {visibility.stats && <StatsSection />}
      {visibility.skills && <Skills />}
      {visibility.projects && <Projects />}
      {visibility.experience && <Experience />}
      {visibility.education && <Education />}
      {visibility.githubStats && <GitHubStats username="aniket-mishra" />}
      {visibility.testimonials && <Testimonials />}
      {visibility.blog && <Blog />}
      {visibility.contact && <Contact />}
      <Footer />
    </main>
  );
}

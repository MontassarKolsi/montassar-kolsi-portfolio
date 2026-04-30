import { Hero } from "@/sections/Hero";
import { About as AboutSection} from "@/sections/About";
import { Projects as ProjectsSection } from "@/sections/Projects";
import { Contact as ContactSection } from "@/sections/Contact";
import { memo } from "react";

export const Home = memo(() => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection isHome={true} />
      <ContactSection />
    </>
  );
});

Home.displayName = 'Home';
import { About as AboutSection} from "@/sections/About";
import { Hobbies } from "@/sections/Hobbies";
import { memo } from "react";

export const About = memo(() => {
  return (
    <>
      <AboutSection />
      <Hobbies />
    </>
  );
});

About.displayName = 'About';
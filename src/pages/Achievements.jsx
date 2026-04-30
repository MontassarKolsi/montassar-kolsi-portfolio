import { Projects } from "@/sections/Projects";
import { Certif } from "@/sections/Certif";
import { Activities } from "@/sections/Activities";
import { memo } from "react";

export const Achievements = memo(() => {
  return (
    <>
      <Projects />
      <Certif />
      <Activities />
    </>
  );
});

Achievements.displayName = 'Achievements';
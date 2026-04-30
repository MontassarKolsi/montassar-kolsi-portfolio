import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { Link } from "react-router-dom";
import { useState, memo, useCallback } from "react";

const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website featuring smooth UX, interactive animations, and 3D elements.",
    image: "/projects/project1.webp",
    tags: ["React", "Tailwind", "Animation", "3D"],
    link: "#",
    github: "#",
  },
  {
    title: "FoundIt ISIMM",
    description: "A platform for ISIMM students to share lost and found items, helping the community quickly reconnect people with their belongings.",
    image: "/projects/project2.webp",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
  {
    title: "Stock Management Desktop App",
    description: "A system to digitize stock management for my college, featuring quick search and complete traceability.",
    image: "/projects/project3.webp",
    tags: ["Java", "JavaFX", "PostgreSQL", "StarUML"],

  },
  {
    title: "Gym Website",
    description: "A responsive gym website with services, schedules and SEO optimization.",
    image: "/projects/project4.webp",
    tags: ["React", "Tailwind"],

  },
  
  
  {
    title: "PassParTout",
    description: "A MultiTasks full-stack platform that blends social networking, personal journaling, and task management with real-time chat, smart notifications, and secure authentication.",
    image: "/projects/project5.webp",
    tags: ["PHP", "MySQL", "Session Auth"],

  },
  

];

const ProjectCard = memo(({ project }) => (
  <div className="group glass rounded-2xl overflow-hidden h-full gpu-accelerated">
    <div className="relative overflow-hidden aspect-video">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        width="800"
        height="450"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">
        {/*
        <a
          href={project.link}
          className="p-3 glass rounded-full hover:bg-primary/20"
          aria-label={`View ${project.title} live`}
        >
          <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
        </a>
        <a
          href={project.github}
          className="p-3 glass rounded-full hover:bg-primary/20"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="w-5 h-5" aria-hidden="true" />
        </a>
        */}
      </div>
    </div>

    <div className="p-6 space-y-3">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-sm text-muted-foreground">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-surface border border-border/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export const Projects = memo(({ isHome = false }) => {
  const [showMore, setShowMore] = useState(false);

  const visibleProjects = isHome
    ? projects.slice(0, 4)
    : showMore
      ? projects
      : projects.slice(0, 4);

  const toggleShowMore = useCallback(() => {
    setShowMore(prev => !prev);
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden content-visibility-auto" aria-label="Projects section">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100">
            Diverse projects
            <span className="font-serif italic text-white"> built with purpose</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A curated selection of my work across different technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {visibleProjects.map((project, idx) => (
            <div
              key={`${project.title}-${idx}`}
              className="animate-fade-in"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {isHome ? (
          <div className="text-center mt-12">
            <Link to="/achievements">
              <AnimatedBorderButton>
                See More
                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </AnimatedBorderButton>
            </Link>
          </div>
        ) : (
          <div className="text-center mt-12">
            <AnimatedBorderButton onClick={toggleShowMore}>
              {showMore ? "Show Less" : "See More"}
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </AnimatedBorderButton>
          </div>
        )}
        <div className="glass rounded-2xl p-4 glow-border animate-fade-in animation-delay-300 mt-12">
        <p className="text-lg font-medium italic text-center mx-auto leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
          "More work is on the way — stay tuned."
        </p>
      </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';
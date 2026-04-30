import { memo, lazy, Suspense, useEffect, useRef, useState } from "react";

// Lazy load Robot component
const Robot = lazy(() => import("@/components/Robot").then(mod => ({ default: mod.Robot })));

const RobotFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" role="status">
      <span className="sr-only">Loading 3D robot...</span>
    </div>
  </div>
);

export const About = memo(() => {
  const [shouldLoadRobot, setShouldLoadRobot] = useState(false);
  const robotRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Wait for browser idle time
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => setShouldLoadRobot(true), { timeout: 2000 });
        } else {
          setTimeout(() => setShouldLoadRobot(true), 200);
        }
        observer.disconnect();
      }
    },
    { rootMargin: '400px' }
  );

  if (robotRef.current) {
    observer.observe(robotRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden content-visibility-auto" aria-label="About section">
      <div className="text-center mx-auto max-w-3xl mb-16">
        <div className="animate-fade-in">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            About Me
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
          Exploring technology,          <span className="font-serif italic font-normal text-white">
            {" "}
            Turning ideas into functional software.
          </span>
        </h2>
      </div>

      <div className="min-h-fit container mx-auto  px-6 relative z-10">


        <div className="lg:text-2xl sticky-12 md:relative px-5 py-15 z-0 grid grid-row-3 md:grid-cols-3 gap-10">

          <div className="space-y-4 text-justify text-muted-foreground animate-fade-in animation-delay-200 ">
            <p><br />I am currently pursuing an engineering diploma in software engineering at ISIMM, continuously developing my knowledge in modern software development principles, design conventions, and emerging technologies.</p>
            <p><span className="hidden md:inline"><br /></span>
              <br />I am passionate about understanding how software systems are built, optimized, and scaled. I focus on improving performance, user experience, and overall product quality by exploring efficient techniques, best practices, and innovative approaches in software development.</p>
          </div>

          <div className="flex items-center min-h-52 justify-center">
            {/* empty space reserved for robot */}
          </div>

          <div className="space-y-4 text-justify text-muted-foreground animate-fade-in animation-delay-200 ">
            <p><br />I am driven by problem-solving and logical thinking. I enjoy participating in programming contests and studying advanced algorithms that enhance efficiency while reducing time and resource consumption.</p>
            <p><br />Recently, I have also been exploring the field of Artificial Intelligence. I am fascinated by its potential and actively learning how to leverage AI technologies effectively, while also understanding the systems behind them.My long-term goal is to contribute to the design and engineering of AI systems, helping build the next generation of intelligent technologies.</p>
          </div>

        </div>
        <div ref={robotRef} className="absolute inset-0 flex items-center -top-60 -bottom-60 md:-left-60 md:-right-60 justify-center opacity-40 " aria-hidden="true">
          {shouldLoadRobot ? (
            <Suspense fallback={<RobotFallback />}>
              <Robot />
            </Suspense>
          ) : (
            <RobotFallback />
          )}
        </div>
      </div>
      <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
        <p className="text-lg font-medium italic  text-center mx-auto  leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
          “Between the known and the possible, I create.”
        </p>
      </div>
    </section>
  );
});

About.displayName = 'About';
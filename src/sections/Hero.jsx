import { Button } from "@/components/Button";
import { ArrowRight,  Github, Linkedin, Code, Download } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useEffect, useRef, memo, useCallback } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useAnimationPause } from '@/hooks/useAnimationPause';

const skills = ["Git", "GitHub Actions", "MongoDB", "Express", "React", "Node.js", "Vite", "Tailwind CSS", "JWT", "GSAP"];
const skills2 = ["HTML", "CSS", "JS", "PHP", "PostgreSQL", "C", "C++", "Java", "Python"];

const socialLinks = [
  { icon: Github, href: "https://github.com/MontassarKolsi", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/montassar-kolsi-3b684b323/", label: "LinkedIn" },
  { icon: Code, href: "https://codeforces.com/profile/KolsiMontassar", label: "Codeforces" },
];

const AnimatedText = memo(({ text }) => {
  const ref = useRef(null);

  useEffect(() => {
    const chars = ref.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      { scaleY: 0.1, scaleX: 1.8, filter: "blur(10px) brightness(50%)" },
      { scaleY: 1, scaleX: 1, filter: "blur(0px) brightness(100%)", duration: 0.5, stagger: 0.1, ease: "none" }
    );
  }, []);

  return (
    <h1 ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in animation-delay-100">
      {text.split(" ").map((c, i) => (
        <span key={i} className="char inline-block">
          {c + "\u00A0"}
        </span>
      ))}
    </h1>
  );
});

AnimatedText.displayName = 'AnimatedText';

const NameAnimation = memo(() => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  const handleEnter = useCallback(() => {
    const width = textRef.current.offsetWidth;
    gsap.to(cursorRef.current, { x: width, duration: 0.9, ease: "power2.out" });
    gsap.to(textRef.current, { color: "#20b2a6", textShadow: "0 0 20px rgba(255,255,255,0.35)", duration: 0.3 });
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(cursorRef.current, { x: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(textRef.current, { color: "#a1a1aa", textShadow: "none", duration: 0.3 });
  }, []);

  return (
    <span
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative inline-block text-2xl font-bold cursor-pointer"
    >
      <span ref={textRef} className="text-zinc-400 transition-colors">
        Montassar Kolsi
      </span>
      <span
        ref={cursorRef}
        className="absolute -left-1 top-0 text-[#20b2a6] drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] pointer-events-none"
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
});

NameAnimation.displayName = 'NameAnimation';

const GreenDots = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full opacity-60 animate-slow-drift"
        style={{
          backgroundColor: "#20B2A6",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
));

GreenDots.displayName = 'GreenDots';

const MarqueeSkills = memo(({ skills, reverse = false }) => (
  <div className={`flex ${reverse ? 'animate-marquee reverse' : 'animate-marquee'}`}>
    {[...skills, ...skills].map((skill, idx) => (
      <div key={idx} className="flex-shrink-0 px-2 md:px-8 py-4">
        <span className="text-base md:text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          {skill}
        </span>
      </div>
    ))}
  </div>
));

MarqueeSkills.displayName = 'MarqueeSkills';

export const Hero = memo(() => {
  const marqueeRef = useAnimationPause();
  return (
    <section className=" relative min-h-screen flex items-center overflow-hidden" aria-label="Hero section">
      {/* Background */}
      <div className="absolute top-0 lg:inset-0" aria-hidden="true">
        <img
          src="/hero-bg.webp"
          alt=""
          className="w-full h-full object-cover opacity-50"
          loading="eager"
          fetchPriority="high"  // ✅ Correct
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </div>

      <GreenDots />

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" aria-hidden="true" />
                Software Engineer • AI Enthusiast
              </span>
            </div>

            <div className="space-y-4">
              <AnimatedText text="Architect of Silent Thought, Shaping Invisible Purpose" />
              <h1 className="sr-only">Architect of Silent Thought, Shaping Invisible Purpose into Original Systems in Syntax & Soul</h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                <span className="text-xl font-serif italic">Hi</span>, I'm{" "}
                <NameAnimation />
                {" "}— Software Engineer Student turning complex problems into scalable, efficient, and high-performance systems through thoughtful engineering.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Link to="/contact">
                <Button  aria-label="Contact me">
                  Contact Me <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View CV (PDF)"
              >
                <AnimatedBorderButton as="span">
                  <Download className="w-5 h-5" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>

            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me:</span>
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}

            </div>
          </div>

          {/* Profile Image */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/50 via-transparent to-primary/20 blur-2xl animate-pulse" aria-hidden="true" />
              <div className="relative glass rounded-3xl p-2 glow-border">
                <div className="d-hover-3d">
                  <figure>
                    <img
                      src="/profile-photo.webp"
                      alt="Montassar Kolsi - Software Engineer"
                      className="w-full aspect-[5/7] object-cover rounded-2xl brightness-75 contrast-110"
                      loading="eager"
                      fetchPriority="high"
                      width="600"
                      height="840"
                    />
                  </figure>
                  {[...Array(8)].map((_, i) => <div key={i} aria-hidden="true" />)}
                </div>

                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                    <span className="text-sm font-medium">Open to internships || collabs</span>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text-primary">-3</div>
                  <div className="text-xs text-muted-foreground">Years to Graduate.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">Technologies I worked with</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div ref={marqueeRef} className="relative overflow-hidden">
              <MarqueeSkills skills={skills} />
              <MarqueeSkills skills={skills2} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
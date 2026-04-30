import { Carousel } from "@/components/Carousel";
import { memo } from "react";

export const Certif = memo(() => {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden content-visibility-auto" aria-label="Certificates section">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" aria-hidden="true" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Certificates
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Learning validated
            <span className="font-serif italic font-normal text-white">
              {" "}
              through practice.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Drag to explore • Click to view details
          </p>
        </div>
      </div>
      
      <Carousel />
      
      <div className="glass rounded-2xl p-4 glow-border animate-fade-in animation-delay-300 mt-12">
        <p className="text-lg font-medium italic text-center mx-auto leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
          "New additions are coming soon."
        </p>
      </div>
    </section>
  );
});

Certif.displayName = 'Certif';
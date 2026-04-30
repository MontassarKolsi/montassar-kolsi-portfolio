import { useState, memo, useCallback } from "react";
import { useAnimationPause } from '@/hooks/useAnimationPause';

const activities = [
  { images: ["/activities/djerba1.webp",  "/activities/djerba_desc.webp", "youth tourism trail"] },
  { images: ["/activities/tcpc1.webp", "/activities/tcpc_desc.webp", "TCPC :problem solving natioanl contest"] },
  { images: ["/activities/robot1.webp", "/activities/robot_desc.webp", "regional robotics camp"] },
  { images: ["/activities/photo1.webp", "/activities/photo_desc.webp", "digital image exhibition"] },
  { images: ["/activities/meca2.webp", "/activities/meca_desc.webp", "day of the youth"] },
  { images: ["/activities/ps1.webp", "/activities/ps_desc.webp", "problem solving contests"] },
];

const Modal = memo(({ selected, onClose }) => {
  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Activity preview"
    >
      <img
        src={selected}
        alt="Activity preview"
        className="max-w-[80%] max-h-[80%] rounded-lg shadow-2xl"
        loading="lazy"
      />
    </div>
  );
});

Modal.displayName = 'Modal';

export const Activities = memo(() => {
  const [selected, setSelected] = useState(null);

  const handleClose = useCallback(() => setSelected(null), []);
  const marqueeRef = useAnimationPause();

  return (
    <section id="activities" className="py-24 relative overflow-hidden content-visibility-auto" aria-label="Activities section">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-sm uppercase tracking-wider text-secondary-foreground animate-fade-in">
            Other Activities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground animate-fade-in animation-delay-100">
            Try everything{" "}
            <span className="font-serif italic font-normal text-white">
              to learn anything.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Hover or click to view details
          </p>
        </div>
      </div>

      <div ref={marqueeRef} className="mx-16 lg:mx-40 relative overflow-hidden">
        <div className="flex w-max animate-marquee p-12 gap-10 pointer-events-none">
          {[...activities, ...activities].map((activity, i) => (
            <div key={i} className=" w-[50dvw] md:w-[22vw] shrink-0  pointer-events-auto">
                <div className="flip-card   min-w-8 aspect-square  rounded-2xl  overflow-hidden brightness-75">
                  <div className="flip-card-inner aspect-square">
                    <div className="flip-card-front aspect-square object-cover">
                      <img src={activity.images[0]} alt={activity.images[2]}  className="w-full h-full object-cover brightness-75"/>
                    </div>
                    <div className="flip-card-back aspect-square object-cover">
                      <img src={activity.images[1]} alt={activity.images[2]} className="w-full h-full scale-105 object-cover" />
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      <Modal selected={selected} onClose={handleClose} />

      <div className="mt-12 glass rounded-2xl p-6 glow-border animate-fade-in">
        <p className="text-lg font-medium italic text-center text-secondary-foreground">
          "Profit as much from any opportunity before it's too late"
        </p>
      </div>
    </section>
  );
});

Activities.displayName = 'Activities';
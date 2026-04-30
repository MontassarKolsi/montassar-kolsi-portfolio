import { useEffect, useRef } from 'react';

export const useAnimationPause = (pauseClass = 'animation-paused') => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.classList.remove(pauseClass);
          } else {
            element.classList.add(pauseClass);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [pauseClass]);

  return ref;
};
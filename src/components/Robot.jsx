import { memo, useEffect, useRef } from 'react';
import '../Robot.css';

export const Robot = memo(() => {
  const robotRef = useRef(null);
  const eyesRef = useRef(null);
  const eyesShadowRef = useRef(null);

  useEffect(() => {
    const robot = robotRef.current;
    const eyes = eyesRef.current;
    const eyesShadow = eyesShadowRef.current;

    if (!robot || !eyes || !eyesShadow) return;

    let frame;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let activeTouchId = null;

    const clamp = (value) => Math.max(-1, Math.min(1, value));

    const updateTarget = (clientX, clientY) => {
      const rect = robot.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = clamp((clientX - centerX) / (rect.width * 0.75));
      targetY = clamp((clientY - centerY) / (rect.height * 0.75));
    };

    const handlePointerDown = (e) => {
      if (e.pointerType === 'touch') {
        activeTouchId = e.pointerId;
        updateTarget(e.clientX, e.clientY);
      }
    };

    const handlePointerMove = (e) => {
      if (e.pointerType === 'mouse') {
        updateTarget(e.clientX, e.clientY);
      } else if (
        e.pointerType === 'touch' &&
        e.pointerId === activeTouchId
      ) {
        updateTarget(e.clientX, e.clientY);
      }
    };

    const handlePointerUp = (e) => {
      if (e.pointerId === activeTouchId) {
        activeTouchId = null;
        targetX = 0;
        targetY = 0;
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      const rect = robot.getBoundingClientRect();

      // Movement scales with the orb's actual dimensions
      const eyeX = currentX * rect.width * 0.23;
      const eyeY = currentY * rect.height * 0.21;

      eyes.style.setProperty('--eye-x', `${eyeX}px`);
      eyes.style.setProperty('--eye-y', `${eyeY}px`);

      eyesShadow.style.setProperty('--eye-x', `${eyeX}px`);
      eyesShadow.style.setProperty('--eye-y', `${eyeY}px`);

      // Keep 3D tilt subtle on all devices
      robot.style.setProperty('--orb-rotate-y', `${currentX * 20}deg`);
      robot.style.setProperty('--orb-rotate-x', `${-currentY * 15}deg`);

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="robot-container" ref={robotRef}>
      <div className="robot-orb">

        <div className="orb-inner-glow" />
        <div className="orb-wave orb-wave-one" />
        <div className="orb-wave orb-wave-two" />

        <div className="robot-eyes-shadow" ref={eyesShadowRef}>
          <div className="robot-eye-shadow" />
          <div className="robot-eye-shadow" />
        </div>

        <div className="robot-eyes" ref={eyesRef}>
          <div className="robot-eye" />
          <div className="robot-eye" />
        </div>

        <div className="orb-highlight" />

      </div>
    </div>
  );
});

Robot.displayName = 'Robot';
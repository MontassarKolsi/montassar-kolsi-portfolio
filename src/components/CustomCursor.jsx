import { useEffect, useRef } from "react";

const MAX_TRAILS = 12;
const MAX_SPARKS = 8;

let activeTrails = 0;
let activeSparks = 0;

const CustomCursor = () => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const coreRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const lastMove = useRef({ x: 0, y: 0 });

  const pendingTrail = useRef(null);
  const pendingSpark = useRef({ count: 0, x: 0, y: 0 });

  const frame = useRef(null);

  const createTrail = (x, y, speed) => {
    if (!containerRef.current || activeTrails >= MAX_TRAILS) return;

    activeTrails++;

    const trail = document.createElement("div");
    trail.className = "cursor-trail";

    const size = Math.max(18, Math.min(60, 20 + speed * 0.35));

    trail.style.width = `${size}px`;
    trail.style.height = `${size}px`;

    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;

    trail.style.animationDuration = `${0.5 + Math.random() * 0.35}s`;

    containerRef.current.appendChild(trail);

    setTimeout(() => {
      trail.remove();
      activeTrails--;
    }, 900);
  };

  const createSpark = (x, y) => {
    if (!containerRef.current || activeSparks >= MAX_SPARKS) return;

    activeSparks++;

    const spark = document.createElement("div");
    spark.className = "cursor-spark";

    // 🎨 FIRST STYLE POSITIONING
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    const dx = `${(Math.random() - 0.5) * 100}px`;
    const dy = `${(Math.random() - 0.5) * 100}px`;

    spark.style.setProperty("--dx", dx);
    spark.style.setProperty("--dy", dy);

    containerRef.current.appendChild(spark);

    setTimeout(() => {
      spark.remove();
      activeSparks--;
    }, 850);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const dx = e.clientX - lastMove.current.x;
      const dy = e.clientY - lastMove.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // 🔥 same behavior as first (instant trigger feel, but buffered)
      if (speed > 1) {
        pendingTrail.current = { x: e.clientX, y: e.clientY, speed };
      }

      if (speed > 20) {
        pendingSpark.current = {
          count: speed > 40 ? 2 : 1,
          x: e.clientX,
          y: e.clientY,
        };
      }

      lastMove.current.x = e.clientX;
      lastMove.current.y = e.clientY;
    };

    const handleDown = () => {
      // 🎯 SAME FEEL AS FIRST (strong scale)
      coreRef.current.style.transform =
        "translate(-50%, -50%) scale(1.8)";
      glowRef.current.style.transform =
        "translate(-50%, -50%) scale(1.2)";
    };

    const handleUp = () => {
      coreRef.current.style.transform =
        "translate(-50%, -50%) scale(1)";
      glowRef.current.style.transform =
        "translate(-50%, -50%) scale(1)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // init center
    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;
    glowPos.current.x = mouse.current.x;
    glowPos.current.y = mouse.current.y;

    const animate = () => {
      const dx = mouse.current.x - glowPos.current.x;
      const dy = mouse.current.y - glowPos.current.y;

      glowPos.current.x += dx * 0.25;
      glowPos.current.y += dy * 0.25;

      glowRef.current.style.left = `${glowPos.current.x}px`;
      glowRef.current.style.top = `${glowPos.current.y}px`;

      coreRef.current.style.left = `${mouse.current.x}px`;
      coreRef.current.style.top = `${mouse.current.y}px`;

      if (pendingTrail.current) {
        createTrail(
          pendingTrail.current.x,
          pendingTrail.current.y,
          pendingTrail.current.speed
        );
        pendingTrail.current = null;
      }

      // ✨ SPARK PROCESSING
      if (pendingSpark.current.count > 0) {
        for (let i = 0; i < pendingSpark.current.count; i++) {
          createSpark(
            pendingSpark.current.x,
            pendingSpark.current.y
          );
        }
        pendingSpark.current = { count: 0, x: 0, y: 0 };
      }

      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    >
      <div
        ref={glowRef}
        className="cursor-glow absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <div
        ref={coreRef}
        className="cursor-core absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

export default CustomCursor;
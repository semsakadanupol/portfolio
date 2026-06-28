import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: -300, y: -300 };
    const pos1 = { x: -300, y: -300 };
    const pos2 = { x: -300, y: -300 };
    let raf: number;

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    function tick() {
      pos1.x += (target.x - pos1.x) * 0.1;
      pos1.y += (target.y - pos1.y) * 0.1;
      pos2.x += (target.x - pos2.x) * 0.05;
      pos2.y += (target.y - pos2.y) * 0.05;

      if (orb1.current) {
        orb1.current.style.transform = `translate(${pos1.x - 100}px, ${pos1.y - 100}px)`;
      }
      if (orb2.current) {
        orb2.current.style.transform = `translate(${pos2.x - 80}px, ${pos2.y - 80}px)`;
      }

      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <div
        ref={orb1}
        className="absolute top-0 left-0 size-[220px] rounded-full bg-indigo-6/8 dark:bg-indigo-5/15 blur-[60px] will-change-transform"
      />
      <div
        ref={orb2}
        className="absolute top-0 left-0 size-[180px] rounded-full bg-violet-5/6 dark:bg-cyan-5/10 blur-[50px] will-change-transform"
      />
    </div>
  );
}

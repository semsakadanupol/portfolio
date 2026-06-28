import { useState, useEffect, useRef } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { cx } from "@kbach/react";
import { useMotion } from "../../hooks/useMotion";

export default function MotionToggle() {
  const { motionEnabled, toggleMotion } = useMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  const dragging = useRef(false);
  const didDrag = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPos({ x: window.innerWidth - 60, y: window.innerHeight - 68 });
    setReady(true);
  }, []);

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;
      setPos({
        x: clamp(e.clientX - offset.current.x, 0, window.innerWidth - 44),
        y: clamp(e.clientY - offset.current.y, 0, window.innerHeight - 44),
      });
    }
    function onMouseUp() { dragging.current = false; }

    function onTouchMove(e: TouchEvent) {
      if (!dragging.current) return;
      const t = e.touches[0];
      const dx = t.clientX - startPos.current.x;
      const dy = t.clientY - startPos.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;
      setPos({
        x: clamp(t.clientX - offset.current.x, 0, window.innerWidth - 44),
        y: clamp(t.clientY - offset.current.y, 0, window.innerHeight - 44),
      });
    }
    function onTouchEnd() { dragging.current = false; }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  function handleMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    didDrag.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  }

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    dragging.current = true;
    didDrag.current = false;
    startPos.current = { x: t.clientX, y: t.clientY };
    offset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
  }

  function handleClick() {
    if (!didDrag.current) toggleMotion();
    didDrag.current = false;
  }

  if (!ready) return null;

  return (
    <button
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      title={motionEnabled ? "Disable animations" : "Enable animations"}
      style={{ left: pos.x, top: pos.y }}
      className={cx(
        "fixed z-50 size-10 rounded-xl flex items-center justify-center",
        "cursor-grab active:cursor-grabbing select-none",
        "border shadow-lg backdrop-blur-sm",
        "transition-colors duration-200",
        motionEnabled
          ? "bg-indigo-6/90 border-indigo-5/60 text-white hover:bg-indigo-7"
          : "bg-slate-1/90 dark:bg-slate-11/90 border-slate-3 dark:border-white/10 text-slate-5 dark:text-slate-6 hover:bg-slate-2 dark:hover:bg-slate-10",
      )}
    >
      {motionEnabled
        ? <FaCirclePause size={14} />
        : <FaCirclePlay size={14} />
      }
    </button>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  FaRegMoon,
  FaRegSun,
  FaCirclePause,
  FaCirclePlay,
} from "react-icons/fa6";
import { useTheme, cx } from "@kbach/react";
import { useMotion } from "../../hooks/useMotion";

const PANEL_W = 44;
const MARGIN = 16;

export default function FloatingControls() {
  const { toggle, isDark } = useTheme();
  const { motionEnabled, toggleMotion } = useMotion();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [snapping, setSnapping] = useState(false);

  const dragging = useRef(false);
  const didDrag = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const snappedSide = useRef<"left" | "right">("right");

  useEffect(() => {
    const x = window.innerWidth - PANEL_W - MARGIN;
    const y = window.innerHeight * 0.55;
    setPos({ x, y });
    posRef.current = { x, y };
    setReady(true);
  }, []);

  function snapToSide(currentX: number, currentY: number) {
    const side =
      currentX + PANEL_W / 2 < window.innerWidth / 2 ? "left" : "right";
    snappedSide.current = side;
    const snapX =
      side === "left" ? MARGIN : window.innerWidth - PANEL_W - MARGIN;
    const snapY = Math.max(
      MARGIN,
      Math.min(currentY, window.innerHeight - 100),
    );
    setSnapping(true);
    setPos({ x: snapX, y: snapY });
    posRef.current = { x: snapX, y: snapY };
    setTimeout(() => setSnapping(false), 400);
  }

  useEffect(() => {
    function onResize() {
      const snapX =
        snappedSide.current === "left"
          ? MARGIN
          : window.innerWidth - PANEL_W - MARGIN;
      const snapY = Math.max(
        MARGIN,
        Math.min(posRef.current.y, window.innerHeight - 100),
      );
      setPos({ x: snapX, y: snapY });
      posRef.current = { x: snapX, y: snapY };
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(v, hi));

    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;
      const x = clamp(
        e.clientX - offset.current.x,
        0,
        window.innerWidth - PANEL_W,
      );
      const y = clamp(e.clientY - offset.current.y, 0, window.innerHeight - 88);
      setPos({ x, y });
      posRef.current = { x, y };
    }
    function onMouseUp() {
      if (!dragging.current) return;
      dragging.current = false;
      snapToSide(posRef.current.x, posRef.current.y);
    }

    function onTouchMove(e: TouchEvent) {
      if (!dragging.current) return;
      const t = e.touches[0];
      const dx = t.clientX - startPos.current.x;
      const dy = t.clientY - startPos.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true;
      const x = clamp(
        t.clientX - offset.current.x,
        0,
        window.innerWidth - PANEL_W,
      );
      const y = clamp(t.clientY - offset.current.y, 0, window.innerHeight - 88);
      setPos({ x, y });
      posRef.current = { x, y };
    }
    function onTouchEnd() {
      if (!dragging.current) return;
      dragging.current = false;
      snapToSide(posRef.current.x, posRef.current.y);
    }

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
    offset.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    e.preventDefault();
  }

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    dragging.current = true;
    didDrag.current = false;
    startPos.current = { x: t.clientX, y: t.clientY };
    offset.current = {
      x: t.clientX - posRef.current.x,
      y: t.clientY - posRef.current.y,
    };
  }

  function handleThemeClick() {
    if (!didDrag.current) toggle();
    didDrag.current = false;
  }

  function handleMotionClick() {
    if (!didDrag.current) toggleMotion();
    didDrag.current = false;
  }

  if (!ready) return null;

  const btnBase = cx(
    "flex items-center justify-center size-11 transition-colors duration-150",
    "text-slate-6 dark:text-slate-5 hover:text-indigo-7 dark:hover:text-indigo-4",
    "hover:bg-slate-1 dark:hover:bg-white/8",
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        left: pos.x,
        top: pos.y,
        transition: snapping
          ? "left 0.38s cubic-bezier(0.34,1.56,0.64,1), top 0.38s cubic-bezier(0.34,1.56,0.64,1)"
          : "none",
      }}
      className={cx(
        "fixed z-50 flex flex-col items-center overflow-hidden",
        "rounded-2xl border border-black/50 dark:border-white/50",
        "bg-white/50 dark:bg-black/50 backdrop-blur-md",
        "shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(99,102,241,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(99,102,241,0.15)]",
        "cursor-grab active:cursor-grabbing select-none",
      )}
    >
      <button
        onClick={handleThemeClick}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={btnBase}
      >
        {isDark ? <FaRegSun size={14} /> : <FaRegMoon size={14} />}
      </button>

      <div className="w-full h-px bg-slate-2 dark:bg-white/8" />

      <button
        onClick={handleMotionClick}
        title={motionEnabled ? "Disable animations" : "Enable animations"}
        className={cx(
          btnBase,
          !motionEnabled &&
            "text-indigo-6 dark:text-indigo-4 hover:text-indigo-7 dark:hover:text-indigo-3",
        )}
      >
        {motionEnabled ? (
          <FaCirclePause size={14} />
        ) : (
          <FaCirclePlay size={14} />
        )}
      </button>
    </div>
  );
}

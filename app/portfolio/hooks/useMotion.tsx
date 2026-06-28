import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type MotionCtx = {
  motionEnabled: boolean;
  toggleMotion: () => void;
};

const MotionContext = createContext<MotionCtx>({ motionEnabled: true, toggleMotion: () => {} });

// Run synchronously at module load — before React renders anything.
// This sets the html class immediately so the CSS override applies on the first paint.
function readMotionPref(): boolean {
  try {
    const saved = localStorage.getItem("portfolio-motion");
    return saved !== null ? saved === "true" : true;
  } catch {
    return true;
  }
}

const INITIAL_MOTION = readMotionPref();
if (!INITIAL_MOTION && typeof document !== "undefined") {
  document.documentElement.classList.add("motion-off");
}

// CSS injected once into the page — overrides hidden animation states
// when the `motion-off` class is on <html>.
const OVERRIDE_CSS = `
  html.motion-off .opacity-0 { opacity: 1 !important; }
  html.motion-off [class*="translate-y"] { transform: none !important; }
  html.motion-off .duration-700,
  html.motion-off .duration-1000 { transition-duration: 0ms !important; }
`;

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState(INITIAL_MOTION);

  useEffect(() => {
    localStorage.setItem("portfolio-motion", String(motionEnabled));
    document.documentElement.classList.toggle("motion-off", !motionEnabled);
  }, [motionEnabled]);

  return (
    <MotionContext.Provider value={{ motionEnabled, toggleMotion: () => setMotionEnabled(p => !p) }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: OVERRIDE_CSS }} />
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}

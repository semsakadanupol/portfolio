import { useRef, useEffect, useState } from "react";
import { useMotion } from "./useMotion";

export function useFadeIn(threshold = 0.12) {
  const { motionEnabled } = useMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!motionEnabled) return;

    const el = ref.current;
    if (!el) return;

    // Start hidden, let observer decide
    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, motionEnabled]);

  // When motion is disabled, bypass state entirely — always visible
  if (!motionEnabled) return { ref, visible: true };
  return { ref, visible };
}

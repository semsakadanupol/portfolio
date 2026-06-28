import { cx } from "@kbach/react";
import { useState, useEffect } from "react";
import { container } from "./ui/preBuildStyle";
import { personal } from "../data/personal";
import { useMotion } from "../hooks/useMotion";

const NAV_LINKS = [
  { label: "about.tsx",    id: "about" },
  { label: "projects.tsx", id: "projects" },
  { label: "contact.tsx",  id: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function getActiveSection(): string | null {
  const trigger = window.scrollY + 56 + window.innerHeight * 0.15;
  let active: string | null = null;
  for (const { id } of NAV_LINKS) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= trigger) active = id;
  }
  return active;
}

export default function Navbar() {
  const { motionEnabled } = useMotion();
  const [navLoaded, setNavLoaded] = useState(!motionEnabled);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!motionEnabled) { setNavLoaded(true); return; }
    const t = setTimeout(() => setNavLoaded(true), 60);
    return () => clearTimeout(t);
  }, [motionEnabled]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
      setActiveSection(getActiveSection());
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cx(
        "fixed top-0 z-50 w-full h-[56px] flex items-center border-b transition-all duration-500",
        navLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
        scrolled
          ? "border-slate-2 dark:border-white/5 bg-white/80 dark:bg-slate-12/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className={container}>
        {/* Logo */}
        <button
          onClick={() => scrollTo("profile")}
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 group"
        >
          <span className="font-mono text-sm text-slate-5 dark:text-slate-6 group-hover:text-slate-6 transition-colors">
            ~/
          </span>
          <span className="font-mono text-sm font-bold bg-gradient-to-r from-indigo-6 to-violet-6 bg-clip-text text-transparent">
            {personal.initials}
          </span>
          <span className="font-mono text-sm text-slate-5 dark:text-slate-6 group-hover:text-slate-6 transition-colors">
            .tsx
          </span>
        </button>

        <div className="flex items-center gap-1">
          {/* Desktop */}
          {NAV_LINKS.map(({ label, id }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cx(
                  "hidden sm:flex items-center px-3 py-1.5 rounded-lg font-mono text-xs",
                  "bg-transparent border-none cursor-pointer transition-all duration-200",
                  active
                    ? "bg-indigo-5/10 dark:bg-indigo-5/12 text-indigo-7 dark:text-indigo-4"
                    : "text-slate-7 dark:text-slate-5 hover:text-indigo-7 dark:hover:text-indigo-4 hover:bg-slate-2 dark:hover:bg-white/5",
                )}
              >
                {label}
                {active && (
                  <span
                    className={cx(
                      "ml-0.5 text-indigo-5 dark:text-indigo-4 leading-none",
                      motionEnabled && "animate-pulse",
                    )}
                  >
                    █
                  </span>
                )}
              </button>
            );
          })}

          {/* Mobile — short label */}
          {NAV_LINKS.map(({ label, id }) => {
            const active = activeSection === id;
            return (
              <button
                key={id + "-m"}
                onClick={() => scrollTo(id)}
                className={cx(
                  "sm:hidden flex items-center px-2 py-1.5 rounded-lg font-mono text-xs",
                  "bg-transparent border-none cursor-pointer transition-all duration-200",
                  active
                    ? "bg-indigo-5/10 dark:bg-indigo-5/12 text-indigo-7 dark:text-indigo-4"
                    : "text-slate-7 dark:text-slate-5 hover:text-indigo-7 dark:hover:text-indigo-4 hover:bg-slate-2 dark:hover:bg-white/5",
                )}
              >
                {label.replace(".tsx", "")}
                {active && (
                  <span
                    className={cx(
                      "ml-0.5 text-indigo-5 dark:text-indigo-4 leading-none",
                      motionEnabled && "animate-pulse",
                    )}
                  >
                    █
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

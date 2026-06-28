import { cx } from "@kbach/react";
import { useState, useRef, useEffect } from "react";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { projects, type Project } from "../../data/projects";
import { useFadeIn } from "../../hooks/useFadeIn";
import GlassCard from "../ui/GlassCard";
import {
  sectionWrapper,
  sectionInner,
  sectionNum,
  synKeyword,
  synIdent,
  synString,
  synPunct,
  ideWinBar,
  ideWinBtn,
  ideWinClose,
} from "../ui/preBuildStyle";

const total = projects.length;
const slides = [projects[total - 1], ...projects, projects[0]];

function ProjectSlide({ project }: { project: Project }) {
  return (
    <GlassCard className="overflow-hidden h-full flex flex-col">
      {/* Window bar */}
      <div className={ideWinBar}>
        <div className="flex items-center gap-2 px-4 py-3 min-w-0 flex-1">
          {project.featured && (
            <span className="flex-shrink-0 text-xs font-mono text-indigo-9 dark:text-indigo-5 bg-indigo-5/10 px-2 py-0.5 rounded">
              featured
            </span>
          )}
          <span className="text-xs font-mono text-slate-8 dark:text-slate-5 truncate">
            ~/projects/{project.id}-
            {project.title.toLowerCase().replace(/ /g, "-")}.tsx
          </span>
        </div>
        <div className="flex items-stretch flex-shrink-0">
          <span className={ideWinBtn}>─</span>
          <span className={ideWinBtn}>□</span>
          <span className={ideWinClose}>✕</span>
        </div>
      </div>

      <div className="p-8 md:p-12 relative flex-1">
        <span className="absolute top-4 right-8 text-[9rem] font-black text-slate-9/8 dark:text-white/4 leading-none select-none pointer-events-none">
          {project.id}
        </span>

        <div className="relative z-10 md:max-w-[70%] h-full flex flex-col gap-5">
          {/* Import line */}
          <p className="font-mono text-xs leading-relaxed">
            <span className={synKeyword}>import </span>
            <span className={synPunct}>{"{ "}</span>
            {project.tech.map((t, i) => (
              <span key={t}>
                <span className={synIdent}>{t.replace(/[\s/.]/g, "")}</span>
                {i < project.tech.length - 1 && (
                  <span className={synPunct}>{", "}</span>
                )}
              </span>
            ))}
            <span className={synPunct}>{" } "}</span>
            <span className={synKeyword}>from </span>
            <span className={synString}>'@/tech'</span>
          </p>

          {/* JSDoc */}
          <div className="font-mono text-sm leading-[1.9rem]">
            <p className={synPunct}>{"/**"}</p>
            <p>
              <span className={synPunct}>{" * "}</span>
              <span className="text-slate-9 dark:text-white font-semibold">
                {project.title}
              </span>
            </p>
            <p className={synPunct}>{" *"}</p>
            <p>
              <span className={synPunct}>{" * "}</span>
              <span className="text-slate-8 dark:text-slate-4">
                {project.description}
              </span>
            </p>
            <p className={synPunct}>{"*/"}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 pt-1 mt-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-2 dark:bg-white/8 hover:bg-slate-3 dark:hover:bg-white/15 text-slate-7 dark:text-slate-3 text-xs sm:text-sm font-medium transition-all duration-150 no-underline border border-slate-3 dark:border-white/10 hover:border-slate-4 dark:hover:border-white/20"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-indigo-6 hover:bg-indigo-7 text-white text-xs sm:text-sm font-semibold transition-all duration-150 no-underline"
              >
                <FaArrowUpRightFromSquare /> Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-[350px] h-[220px] bg-gradient-to-tl from-indigo-6/15 to-transparent blur-3xl pointer-events-none" />
      </div>
    </GlassCard>
  );
}

export default function ProjectsSection() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn();
  const { ref, visible } = useFadeIn();

  const [pos, setPos] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const posRef = useRef(1);
  const transitioningRef = useRef(false);
  const dragStartX = useRef<number | null>(null);

  const realIndex = (((pos - 1) % total) + total) % total;

  function moveTo(newPos: number) {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    posRef.current = newPos;
    setPos(newPos);
    setTransitioning(true);
  }

  function onTransitionEnd() {
    const p = posRef.current;
    if (p === 0) {
      posRef.current = total;
      setPos(total);
    } else if (p === total + 1) {
      posRef.current = 1;
      setPos(1);
    }
    transitioningRef.current = false;
    setTransitioning(false);
  }

  function goToDot(i: number) {
    moveTo(i + 1);
  }

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) {
    dragStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (dragStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 50)
      moveTo(dx < 0 ? posRef.current + 1 : posRef.current - 1);
  }

  // Mouse drag — mouseup handled on window so it fires even if cursor leaves the track
  function onMouseDown(e: React.MouseEvent) {
    dragStartX.current = e.clientX;
    setIsDragging(true);
    e.preventDefault();
  }

  useEffect(() => {
    function onMouseUp(e: MouseEvent) {
      if (dragStartX.current === null) return;
      const dx = e.clientX - dragStartX.current;
      dragStartX.current = null;
      setIsDragging(false);
      if (Math.abs(dx) > 50)
        moveTo(dx < 0 ? posRef.current + 1 : posRef.current - 1);
    }
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  // Reflect grab cursor on body during drag so it stays even when mouse leaves the card
  useEffect(() => {
    document.body.style.cursor = isDragging ? "grabbing" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [isDragging]);

  return (
    <section id="projects" className={sectionWrapper}>
      <div className={sectionInner}>
        {/* Section header */}
        <div
          ref={headerRef}
          className={cx(
            "flex items-baseline gap-4 mb-12 transition-all duration-700",
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[20px]",
          )}
        >
          <span className={sectionNum}>02</span>
          <div>
            <p className="text-xs font-mono text-indigo-6 dark:text-indigo-5 mb-1">
              {"// projects.tsx"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-9 dark:text-slate-1">
              Projects
            </h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-6 to-violet-6 mt-3 rounded-full" />
          </div>
        </div>

        <div
          ref={ref}
          className={cx(
            "flex flex-col gap-4 transition-all duration-700",
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[24px]",
          )}
        >
          {/* Slider track */}
          <div
            className={cx(
              "overflow-hidden rounded-2xl",
              isDragging ? "cursor-grabbing select-none" : "cursor-grab",
            )}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${pos * 100}%)`,
                transition: transitioning
                  ? "transform 500ms ease-in-out"
                  : "none",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {slides.map((project, i) => (
                <div key={i} className="w-full flex-shrink-0 flex flex-col">
                  <ProjectSlide project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-1 pt-1">
            <button
              onClick={() => moveTo(pos - 1)}
              className="flex items-center justify-center size-9 rounded-xl border border-slate-3 dark:border-white/10 text-slate-6 dark:text-slate-5 hover:border-indigo-5/60 hover:text-indigo-6 dark:hover:text-indigo-4 transition-all duration-150"
              aria-label="Previous"
            >
              <FaChevronLeft size={12} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToDot(i)}
                    className={cx(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === realIndex
                        ? "w-6 bg-indigo-6 dark:bg-indigo-5"
                        : "w-1.5 bg-slate-3 dark:bg-slate-7 hover:bg-slate-4 dark:hover:bg-slate-6",
                    )}
                    aria-label={`Project ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-5 dark:text-slate-6">
                {String(realIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={() => moveTo(pos + 1)}
              className="flex items-center justify-center size-9 rounded-xl border border-slate-3 dark:border-white/10 text-slate-6 dark:text-slate-5 hover:border-indigo-5/60 hover:text-indigo-6 dark:hover:text-indigo-4 transition-all duration-150"
              aria-label="Next"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

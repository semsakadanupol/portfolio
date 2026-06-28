import { cx } from "@kbach/react";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { personal } from "../../data/personal";
import { useFadeIn } from "../../hooks/useFadeIn";
import GlassCard from "../ui/GlassCard";
import GridMatrixBg from "../ui/GridMatrixBg";
import {
  primaryBtn,
  secondaryBtn,
  gradientText,
  synKeyword,
  synIdent,
  synString,
  synProp,
  synPunct,
  synStatus,
  synJsxTag,
  synText,
  ideWinBar,
  ideWinFile,
  ideWinBtn,
  ideWinClose,
} from "../ui/preBuildStyle";

const ROLES = [
  "Frontend Developer",
  "UI Engineer",
  "React Developer",
  "Interface Craftsman",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState(ROLES[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[idx];

    if (!deleting && text === target) {
      const t = setTimeout(() => setDeleting(true), 2500);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText(
          deleting ? text.slice(0, -1) : target.slice(0, text.length + 1),
        ),
      deleting ? 35 : 75,
    );
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span>
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function ProfileSection() {
  const { ref, visible } = useFadeIn(0.05);

  return (
    <section
      id="profile"
      className="min-h-screen flex items-center py-20 px-4 relative overflow-hidden"
    >
      <GridMatrixBg />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start"
        >
          {/* ── Left 2: Hello text ── */}
          <div
            className={cx(
              "md:col-span-2 flex flex-col gap-3 justify-center py-2 transition-all duration-700",
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[28px]",
            )}
          >
            <p className="font-mono text-xs text-indigo-7 dark:text-indigo-4 tracking-widest">
              {"// hello.tsx"}
            </p>

            <span className="font-mono text-sm text-slate-6 dark:text-slate-6">
              Hi, I'm —
            </span>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personal.name}
            </h1>

            <p className="font-mono text-base text-slate-7 dark:text-slate-4">
              {"< "}
              <Typewriter />
              {" />"}
            </p>

            <p className="text-sm text-slate-7 dark:text-slate-5 leading-relaxed">
              {personal.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={primaryBtn}
              >
                Hire Me
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={secondaryBtn}
              >
                View Projects
              </button>
            </div>
          </div>

          {/* ── Right 3: Terminal card — spans cols 3–5 and both rows ── */}
          <div
            className={cx(
              "md:col-span-3 md:row-span-2 transition-all duration-700 delay-150",
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[28px]",
            )}
          >
            <GlassCard className="overflow-hidden">
              <div className={ideWinBar}>
                <span className={ideWinFile}>
                  ~/portfolio/sem-sakadanupol.tsx
                </span>
                <div className="flex items-stretch flex-shrink-0">
                  <span className={ideWinBtn}>─</span>
                  <span className={ideWinBtn}>□</span>
                  <span className={ideWinClose}>✕</span>
                </div>
              </div>

              <div className="p-7 font-mono text-sm leading-[1.9rem]">
                <p className="text-xs mb-5">
                  <span className={synKeyword}>import </span>
                  <span className={synPunct}>{"{ "}</span>
                  <span className={synIdent}>useState</span>
                  <span className={synPunct}>{" } "}</span>
                  <span className={synKeyword}>from </span>
                  <span className={synString}>'react'</span>
                </p>

                <p>
                  <span className={synKeyword}>export default function </span>
                  <span className={synIdent}>Sem</span>
                  <span className={synPunct}>{"() {"}</span>
                </p>

                <div className="pl-6 my-1 space-y-1">
                  <p>
                    <span className={synKeyword}>const </span>
                    <span className={synText}>[status] </span>
                    <span className={synPunct}>= </span>
                    <span className={synIdent}>useState</span>
                    <span className={synPunct}>(</span>
                    <span className={synString}>"available"</span>
                    <span className={synPunct}>)</span>
                    <span className={cx(synStatus, "animate-pulse ml-3")}>
                      ●
                    </span>
                  </p>

                  <p className="mt-2">
                    <span className={synKeyword}>return </span>
                    <span className={synPunct}>{"("}</span>
                  </p>

                  <div className="pl-6 space-y-0.5">
                    <p>
                      <span className={synPunct}>{"<"}</span>
                      <span className={synJsxTag}>Developer</span>
                    </p>
                    <div className="pl-4 text-xs space-y-0.5">
                      <p>
                        <span className={synProp}>role</span>
                        <span className={synPunct}>{'="'}</span>
                        <span className={synString}>{personal.role}</span>
                        <span className={synPunct}>{'"'}</span>
                      </p>
                      <p>
                        <span className={synProp}>location</span>
                        <span className={synPunct}>{'="'}</span>
                        <span className={synString}>{personal.location}</span>
                        <span className={synPunct}>{'"'}</span>
                      </p>
                      <p>
                        <span className={synProp}>passion</span>
                        <span className={synPunct}>{'="'}</span>
                        <span className={synString}>design × engineering</span>
                        <span className={synPunct}>{'"'}</span>
                      </p>
                      <p>
                        <span className={synProp}>status</span>
                        <span className={synPunct}>{"={"}</span>
                        <span className={synText}>status</span>
                        <span className={synPunct}>{"}"}</span>
                      </p>
                    </div>
                    <p>
                      <span className={synPunct}>{"/>"}</span>
                    </p>
                  </div>

                  <p>
                    <span className={synPunct}>{")"}</span>
                  </p>
                </div>

                <p>
                  <span className={synPunct}>{"}"}</span>
                </p>
              </div>
            </GlassCard>
          </div>

          {/* ── Left 2 row 2: Social card — auto-placed under hello text ── */}
          <div
            className={cx(
              "md:col-span-2 transition-all duration-700 delay-300",
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[28px]",
            )}
          >
            <GlassCard className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-11 rounded-xl bg-gradient-to-br from-indigo-5 to-violet-7 flex items-center justify-center text-base font-black text-white shadow-lg flex-shrink-0">
                  {personal.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-9 dark:text-slate-1 text-sm">
                    {personal.name}
                  </p>
                  <p className="text-xs font-mono text-slate-6 dark:text-slate-6">
                    {personal.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-slate-2 dark:bg-white/5 hover:bg-slate-3 dark:hover:bg-white/10 transition-all duration-150 no-underline text-slate-8 dark:text-slate-3 text-[10px] sm:text-xs font-medium"
                >
                  <FaGithub size={11} /> GitHub
                </a>
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-slate-2 dark:bg-white/5 hover:bg-slate-3 dark:hover:bg-white/10 transition-all duration-150 no-underline text-slate-8 dark:text-slate-3 text-[10px] sm:text-xs font-medium"
                >
                  <FaLinkedin size={11} /> LinkedIn
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-2 dark:border-white/10">
                {personal.stats.map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p
                      className={cx(
                        "text-base sm:text-lg font-black",
                        gradientText,
                      )}
                    >
                      {value}
                    </p>
                    <p className="text-xs text-slate-6 dark:text-slate-6 mt-0.5 font-mono leading-tight">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

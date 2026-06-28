import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { cx } from "@kbach/react";
import { personal } from "../data/personal";
import { useFadeIn } from "../hooks/useFadeIn";
import GlassCard from "./ui/GlassCard";
import {
  synKeyword, synIdent, synString, synProp, synPunct, synStatus,
  ideWinBar, ideWinFile, ideWinBtn, ideWinClose,
} from "./ui/preBuildStyle";

export default function Footer() {
  const { ref, visible } = useFadeIn();
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-8 pt-0">
      <div
        ref={ref}
        className={cx(
          "max-w-[1200px] mx-auto transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]",
        )}
      >
        <GlassCard className="overflow-hidden">

          {/* Window bar */}
          <div className={ideWinBar}>
            <span className={ideWinFile}>~/portfolio/footer.ts</span>
            <div className="flex items-stretch flex-shrink-0">
              <span className={ideWinBtn}>─</span>
              <span className={ideWinBtn}>□</span>
              <span className={ideWinClose}>✕</span>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 p-7 items-center">

            {/* Left — code block */}
            <div className="font-mono text-sm leading-[1.9rem]">
              <p>
                <span className={synKeyword}>export const </span>
                <span className={synIdent}>portfolio</span>
                <span className={synPunct}> = {"{"}</span>
              </p>
              <div className="pl-6 space-y-0.5">
                <p>
                  <span className={synProp}>author</span>
                  <span className={synPunct}>:  </span>
                  <span className={synString}>"{personal.name}"</span>
                  <span className={synPunct}>,</span>
                </p>
                <p>
                  <span className={synProp}>year</span>
                  <span className={synPunct}>:    </span>
                  <span className="text-indigo-7 dark:text-indigo-4">{year}</span>
                  <span className={synPunct}>,</span>
                </p>
                <p>
                  <span className={synProp}>status</span>
                  <span className={synPunct}>:  </span>
                  <span className={cx(synStatus, "animate-pulse")}>"open to work"</span>
                  <span className={synPunct}>,</span>
                </p>
              </div>
              <p className={synPunct}>{"}"}</p>
            </div>

            {/* Right — links + built-with */}
            <div className="flex flex-col gap-4 items-start sm:items-end">
              <div className="flex items-center gap-2">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-9 rounded-lg border border-slate-2 dark:border-white/10 text-slate-5 dark:text-slate-5 hover:border-indigo-5/60 hover:text-indigo-7 dark:hover:text-indigo-4 transition-all duration-150 no-underline"
                  aria-label="GitHub"
                >
                  <FaGithub size={14} />
                </a>
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-9 rounded-lg border border-slate-2 dark:border-white/10 text-slate-5 dark:text-slate-5 hover:border-indigo-5/60 hover:text-indigo-7 dark:hover:text-indigo-4 transition-all duration-150 no-underline"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={14} />
                </a>
              </div>

              <p className="font-mono text-xs text-slate-5 dark:text-slate-6">
                {"// built with "}
                <span className="text-indigo-7 dark:text-indigo-4">Kbach</span>
                {" & "}
                <span className="text-indigo-7 dark:text-indigo-4">React</span>
              </p>
            </div>

          </div>
        </GlassCard>
      </div>
    </footer>
  );
}

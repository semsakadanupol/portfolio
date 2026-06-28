import { cx } from "@kbach/react";
import { personal } from "../../data/personal";
import { skillGroups } from "../../data/skills";
import { useFadeIn } from "../../hooks/useFadeIn";
import GlassCard from "../ui/GlassCard";
import {
  sectionWrapper, sectionInner, sectionNum,
  synKeyword, synIdent, synString, synProp, synPunct, synStatus,
  ideWinBar, ideWinFile, ideWinBtn, ideWinClose, ideBadge,
} from "../ui/preBuildStyle";

function WinBar({ file }: { file: string }) {
  return (
    <div className={ideWinBar}>
      <span className={ideWinFile}>{file}</span>
      <div className="flex items-stretch flex-shrink-0">
        <span className={ideWinBtn}>─</span>
        <span className={ideWinBtn}>□</span>
        <span className={ideWinClose}>✕</span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn();
  const { ref, visible } = useFadeIn();

  return (
    <section id="about" className={sectionWrapper}>
      <div className={sectionInner}>

        {/* Section header */}
        <div
          ref={headerRef}
          className={cx(
            "flex items-baseline gap-4 mb-12 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]",
          )}
        >
          <span className={sectionNum}>01</span>
          <div>
            <p className="text-xs font-mono text-indigo-6 dark:text-indigo-5 mb-1">
              {"// about.tsx"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-9 dark:text-slate-1">About Me</h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-6 to-violet-6 mt-3 rounded-full" />
          </div>
        </div>

        <div
          ref={ref}
          className={cx(
            "grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[24px]",
          )}
        >

          {/* Bio card — light glass, JSDoc */}
          <GlassCard className="flex flex-col overflow-hidden md:row-span-2">
            <WinBar file="~/about/bio.ts" />

            <div className="p-7 font-mono text-sm leading-[1.9rem] flex-1">
              <p className="text-slate-5 dark:text-slate-5">{"/**"}</p>
              <p>
                <span className="text-slate-5 dark:text-slate-5">{" * "}</span>
                <span className="text-violet-7 dark:text-violet-4">{"@author "}</span>
                <span className="text-slate-8 dark:text-slate-3">{personal.name}</span>
              </p>
              <p>
                <span className="text-slate-5 dark:text-slate-5">{" * "}</span>
                <span className="text-violet-7 dark:text-violet-4">{"@role   "}</span>
                <span className="text-slate-8 dark:text-slate-3">{personal.role}</span>
              </p>
              <p>
                <span className="text-slate-5 dark:text-slate-5">{" * "}</span>
                <span className="text-violet-7 dark:text-violet-4">{"@loc    "}</span>
                <span className="text-slate-8 dark:text-slate-3">{personal.location}</span>
              </p>
              <p className="text-slate-5 dark:text-slate-5">{" *"}</p>
              <p>
                <span className="text-slate-5 dark:text-slate-5">{" * "}</span>
                <span className="text-emerald-8 dark:text-emerald-4">{personal.bio}</span>
              </p>
              <p className="text-slate-5 dark:text-slate-5">{" *"}</p>
              <p>
                <span className="text-slate-5 dark:text-slate-5">{" * "}</span>
                <span className="text-emerald-8 dark:text-emerald-4">
                  When not coding: contributing to open-source,
                </span>
              </p>
              <p>
                <span className="text-slate-5 dark:text-slate-5">{" * "}</span>
                <span className="text-emerald-8 dark:text-emerald-4">
                  exploring new tech, and hiking.
                </span>
              </p>
              <p className="text-slate-5 dark:text-slate-5">{" */"}</p>
            </div>

            {/* Stats footer */}
            <div className="grid grid-cols-3 gap-3 px-7 py-5 border-t border-slate-2 dark:border-white/10">
              {personal.stats.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-black bg-gradient-to-r from-indigo-6 to-violet-6 bg-clip-text text-transparent">
                    {value}
                  </p>
                  <p className="text-xs text-slate-6 dark:text-slate-6 mt-0.5 font-mono">{label}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Skills — stack.ts */}
          <GlassCard
            className={cx(
              "flex flex-col overflow-hidden transition-all duration-700 delay-100",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[24px]",
            )}
          >
            <WinBar file="~/about/stack.ts" />
            <div className="p-7 flex flex-col gap-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-mono mb-2">
                    <span className={synKeyword}>const </span>
                    <span className={synIdent}>{group.varName}</span>
                    <span className={synPunct}> = [</span>
                  </p>
                  <div className="flex flex-wrap gap-2 pl-4 mb-2">
                    {group.items.map((item) => (
                      <span key={item} className={ideBadge}>{item}</span>
                    ))}
                  </div>
                  <p className={cx("text-sm font-mono", synPunct)}>]</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Status card — status.ts */}
          <GlassCard
            className={cx(
              "flex flex-col overflow-hidden transition-all duration-700 delay-200",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[24px]",
            )}
          >
            <WinBar file="~/about/status.ts" />
            <div className="p-7 font-mono text-sm leading-[1.9rem]">
              <p>
                <span className={synKeyword}>export const </span>
                <span className={synIdent}>status</span>
                <span className={synPunct}> = {"{"}</span>
              </p>
              <div className="pl-6 space-y-1">
                <p>
                  <span className={synProp}>openTo</span>
                  <span className={synPunct}>: </span>
                  <span className={synString}>"new opportunities"</span>
                  <span className={synPunct}>,</span>
                </p>
                <p>
                  <span className={synProp}>type</span>
                  <span className={synPunct}>: </span>
                  <span className={synString}>"full-time / freelance"</span>
                  <span className={synPunct}>,</span>
                </p>
                <p>
                  <span className={synProp}>available</span>
                  <span className={synPunct}>: </span>
                  <span className={cx(synStatus, "animate-pulse")}>true</span>
                  <span className={synPunct}>,</span>
                </p>
              </div>
              <p className={synPunct}>{"}"}</p>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}

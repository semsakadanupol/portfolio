import { cx } from "@kbach/react";

export const container = cx(
  "w-full h-full max-w-[1200px] flex items-center justify-between mx-auto px-4",
);

export const sectionWrapper = cx("w-full py-20 px-4");
export const sectionInner = cx("max-w-[1200px] mx-auto");

export const bgColor = cx("bg-slate-1 dark:bg-slate-11");
export const bgSubtle = cx("bg-slate-2 dark:bg-slate-10");

export const glassCard = cx(
  "rounded-2xl border border-slate-2 dark:border-white/10",
  "bg-white/80 dark:bg-white/5 backdrop-blur-md transition-all duration-300",
);
export const glassCardDark = cx(
  "rounded-2xl border border-slate-3 dark:border-white/10 bg-[#f8f8f8] dark:bg-[#1e1e1e] backdrop-blur-md transition-all duration-300",
);
export const glassGlow = cx(
  "hover:border-indigo-5/50 dark:hover:border-indigo-5/50",
  "hover:shadow-[0_0_40px_rgba(99,102,241,0.07)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]",
);

export const sectionNum = cx(
  "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none select-none text-slate-3 dark:text-slate-9",
);
export const gradientText = cx(
  "bg-gradient-to-r from-indigo-6 to-violet-6 bg-clip-text text-transparent",
);
export const codeComment = cx("font-mono text-xs text-slate-5 dark:text-slate-6");

export const sectionTitle = cx(
  "text-2xl md:text-3xl font-bold text-slate-9 dark:text-slate-1 mb-3",
);
export const bodyText = cx("text-slate-6 dark:text-slate-5 leading-relaxed");

export const navLink = cx(
  "flex flex-row items-center justify-center gap-2 text-xl font-bold text-slate-9 dark:text-slate-3 hover:text-indigo-7 dark:hover:text-indigo-5 no-underline transition-all duration-150",
);
export const navItemLink = cx(
  "text-sm text-slate-7 dark:text-slate-5 hover:text-indigo-7 dark:hover:text-indigo-5 no-underline transition-all duration-150",
);
export const themeToggleBtn = cx(
  "flex items-center justify-center size-8 rounded-lg cursor-pointer transition-all duration-150",
  "border border-slate-3 dark:border-white/10 bg-transparent",
  "text-slate-7 dark:text-slate-5",
  "hover:bg-slate-2 dark:hover:bg-white/5 hover:border-indigo-5/50 hover:text-indigo-7 dark:hover:text-indigo-4",
);

export const badge = cx(
  "inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-indigo-6/10 text-indigo-7 dark:bg-indigo-5/10 dark:text-indigo-5",
);
export const badgeDark = cx(
  "inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-slate-3 border border-white/5",
);

export const primaryBtn = cx(
  "inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl",
  "bg-indigo-6 hover:bg-indigo-7 text-white text-xs sm:text-sm font-semibold",
  "transition-all duration-150 cursor-pointer no-underline",
  "shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]",
);
export const secondaryBtn = cx(
  "inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl",
  "border border-slate-4 dark:border-white/15 text-xs sm:text-sm font-medium",
  "text-slate-7 dark:text-slate-3",
  "hover:border-indigo-5/50 dark:hover:border-indigo-5/50 hover:text-indigo-6 dark:hover:text-indigo-5",
  "transition-all duration-150 no-underline cursor-pointer",
);
export const iconBtn = cx(
  "inline-flex items-center justify-center size-9 rounded-lg border border-slate-3 dark:border-white/10 text-slate-6 dark:text-slate-5 hover:border-indigo-5/60 dark:hover:border-indigo-5/60 hover:text-indigo-6 dark:hover:text-indigo-5 transition-all duration-150 no-underline",
);

export const inputField = cx(
  "w-full px-4 py-3 rounded-xl border border-slate-3 dark:border-white/10 bg-white dark:bg-white/5 text-slate-9 dark:text-slate-1 placeholder:text-slate-5 focus:outline-none focus:ring-2 focus:ring-indigo-5/50 backdrop-blur-sm transition-all duration-150",
);
export const formLabel = cx(
  "block text-sm font-medium text-slate-7 dark:text-slate-4 mb-2",
);

// ── IDE syntax token colors — same palette as bio card ──
export const synKeyword = cx("text-violet-7 dark:text-violet-4");
export const synIdent   = cx("text-indigo-8 dark:text-cyan-4");
export const synString  = cx("text-emerald-8 dark:text-emerald-4");
export const synProp    = cx("text-sky-8 dark:text-sky-4");
export const synPunct   = cx("text-slate-5 dark:text-slate-5");
export const synComment = cx("text-slate-6 dark:text-slate-6");
export const synJsxTag  = cx("text-violet-8 dark:text-red-4");
export const synText    = cx("text-slate-8 dark:text-slate-3");
export const synStatus  = cx("text-emerald-8 dark:text-emerald-5");

// ── IDE panel chrome — light glass style (matches bio card) ──
export const ideWinBar  = cx(
  "flex items-center justify-between border-b",
  "border-slate-2 dark:border-white/10 bg-slate-1/60 dark:bg-white/5",
);
export const ideWinFile  = cx("px-5 py-3 text-xs font-mono text-slate-6 truncate min-w-0");
export const ideWinBtn   = cx(
  "flex items-center justify-center w-10 py-3 text-xs cursor-default select-none",
  "text-slate-6 hover:bg-slate-2 dark:hover:bg-white/10",
);
export const ideWinClose = cx(
  "flex items-center justify-center w-10 py-3 text-xs cursor-default select-none rounded-tr-2xl",
  "text-slate-6 hover:bg-red-4/80 dark:hover:bg-red-5/70 hover:text-white",
);

// ── IDE card interactive rows ──
export const ideRow = cx(
  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 no-underline",
  "bg-slate-2 dark:bg-white/5 hover:bg-slate-3 dark:hover:bg-white/10",
  "border border-slate-2 dark:border-white/8 hover:border-slate-3 dark:hover:border-white/15",
);
export const ideRowText    = cx("font-mono text-xs text-slate-8 dark:text-slate-4");
export const ideRowMuted   = cx("font-mono text-xs text-slate-6 dark:text-slate-6");
export const ideRowIcon    = cx("text-slate-6 dark:text-slate-5 flex-shrink-0");
export const ideDivider    = cx("border-t border-slate-2 dark:border-white/10");
export const idePanelDivider = cx("hidden md:block bg-slate-2 dark:bg-white/10");

// ── Skill badge inside IDE card ──
export const ideBadge = cx(
  "text-xs font-medium px-3 py-1 rounded-full",
  "bg-slate-2 dark:bg-white/10 text-slate-8 dark:text-slate-3",
  "border border-slate-3 dark:border-white/5",
  "hover:border-indigo-5/50 hover:text-indigo-8 dark:hover:text-indigo-4 transition-all duration-150 cursor-default",
);

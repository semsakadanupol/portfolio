import { cx } from "@kbach/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  glow?: boolean;
}

export default function GlassCard({ children, className, dark = false, glow = false }: Props) {
  return (
    <div
      className={cx(
        "rounded-2xl border transition-all duration-300",
        dark
          ? "border-slate-3 dark:border-white/10 bg-[#f8f8f8] dark:bg-[#1e1e1e] backdrop-blur-md"
          : "border-slate-2 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md",
        glow && "hover:border-indigo-5/50 dark:hover:border-indigo-5/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.07)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

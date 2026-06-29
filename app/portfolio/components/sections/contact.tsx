import { cx } from "@kbach/react";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCheck,
  FaCopy,
} from "react-icons/fa6";
import { personal } from "../../data/personal";
import { useFadeIn } from "../../hooks/useFadeIn";
import GlassCard from "../ui/GlassCard";
import {
  sectionWrapper,
  sectionInner,
  sectionNum,
  primaryBtn,
  synKeyword,
  synIdent,
  synString,
  synProp,
  synPunct,
  synStatus,
  synComment,
  ideWinBar,
  ideWinFile,
  ideWinBtn,
  ideWinClose,
  ideRow,
  ideRowText,
  ideRowMuted,
  ideRowIcon,
  ideDivider,
  idePanelDivider,
} from "../ui/preBuildStyle";

const trimUrl = (url: string) => {
  try {
    return new URL(url).pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
};

export default function ContactSection() {
  const { ref: headerRef, visible: headerVisible } = useFadeIn();
  const { ref, visible } = useFadeIn();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" className={sectionWrapper}>
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
          <span className={sectionNum}>03</span>
          <div>
            <p className="text-xs font-mono text-indigo-6 dark:text-indigo-5 mb-1">
              {"// contact.tsx"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-9 dark:text-slate-1">
              Get in Touch
            </h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-6 to-violet-6 mt-3 rounded-full" />
          </div>
        </div>

        <div
          ref={ref}
          className={cx(
            "transition-all duration-700",
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[24px]",
          )}
        >
          <GlassCard className="overflow-hidden">
            {/* Window bar */}
            <div className={ideWinBar}>
              <span className={ideWinFile}>~/contact/send.ts</span>
              <div className="flex items-stretch flex-shrink-0">
                <span className={ideWinBtn}>─</span>
                <span className={ideWinBtn}>□</span>
                <span className={ideWinClose}>✕</span>
              </div>
            </div>

            {/* Two-panel content */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_380px]">
              {/* Left — code block */}
              <div className="p-8 flex flex-col gap-6">
                <div className="font-mono text-sm leading-[1.9rem]">
                  <p className={cx(synComment, "mb-4")}>
                    {"// let's build something great together"}
                  </p>

                  <p>
                    <span className={synKeyword}>async function </span>
                    <span className={synIdent}>sendMessage</span>
                    <span className={synPunct}>{"() {"}</span>
                  </p>
                  <div className="pl-6 space-y-0.5">
                    <p>
                      <span className={synKeyword}>await </span>
                      <span className={synIdent}>contact</span>
                      <span className={synPunct}>.send({"{"}</span>
                    </p>
                    <div className="pl-6 space-y-0.5">
                      <p>
                        <span className={synProp}>to</span>
                        <span className={synPunct}>: </span>
                        <span className={synString}>"{personal.name}"</span>
                        <span className={synPunct}>,</span>
                      </p>
                      <p>
                        <span className={synProp}>role</span>
                        <span className={synPunct}>: </span>
                        <span className={synString}>"{personal.role}"</span>
                        <span className={synPunct}>,</span>
                      </p>
                      <p>
                        <span className={synProp}>available</span>
                        <span className={synPunct}>: </span>
                        <span className={cx(synStatus, "animate-pulse")}>
                          true
                        </span>
                        <span className={synPunct}>,</span>
                      </p>
                    </div>
                    <p className={synPunct}>{"});"}</p>
                  </div>
                  <p className={synPunct}>{"}"}</p>
                </div>

                {/* Output */}
                <div
                  className={cx(
                    "font-mono text-xs space-y-1.5",
                    ideDivider,
                    "pt-5",
                  )}
                >
                  <p>
                    <span className="text-green-9 dark:text-emerald-4">
                      {"✓ "}
                    </span>
                    <span className="text-slate-9 dark:text-slate-5">
                      Open to full-time &amp; freelance
                    </span>
                  </p>
                  <p>
                    <span className="text-green-9 dark:text-emerald-4">
                      {"✓ "}
                    </span>
                    <span className="text-slate-9 dark:text-slate-5">
                      Response within 24h
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-9 dark:text-slate-5">
                      {"~ "}
                    </span>
                    <span className="text-slate-8 dark:text-slate-6">
                      Based in {personal.location}
                    </span>
                  </p>
                </div>

                <div className="pt-2">
                  <a href={`mailto:${personal.email}`} className={primaryBtn}>
                    <FaEnvelope /> Say Hello
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className={idePanelDivider} />

              {/* Right — quick links */}
              <div
                className={cx(
                  "p-8 flex flex-col gap-6 border-t md:border-t-0",
                  ideDivider,
                )}
              >
                <div>
                  <p className={cx("font-mono text-xs mb-4", synComment)}>
                    {"// quick links"}
                  </p>

                  {/* Copy email */}
                  <button
                    onClick={copyEmail}
                    className={cx("w-full justify-between group", ideRow)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FaEnvelope className={ideRowIcon} size={13} />
                      <span className={cx(ideRowText, "truncate")}>
                        {personal.email}
                      </span>
                    </div>
                    <span
                      className={cx(
                        ideRowMuted,
                        "flex-shrink-0 group-hover:text-slate-9 dark:group-hover:text-slate-4 transition-colors",
                      )}
                    >
                      {copied ? (
                        <FaCheck
                          size={12}
                          className="text-green-9 dark:text-emerald-4"
                        />
                      ) : (
                        <FaCopy size={12} />
                      )}
                    </span>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    {
                      icon: FaGithub,
                      label: "GitHub",
                      href: personal.social.github,
                    },
                    {
                      icon: FaLinkedin,
                      label: "LinkedIn",
                      href: personal.social.linkedin,
                    },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ideRow}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex flex-row gap-2">
                          <Icon className={ideRowIcon} size={13} />
                          <span className={ideRowText}>{label}</span>
                        </div>
                        <span className={cx(ideRowMuted, "truncate")}>{trimUrl(href)}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-auto font-mono text-xs space-y-1">
                  <p className={synComment}>{"// status"}</p>
                  <p>
                    <span className={synProp}>openTo</span>
                    <span className={synPunct}>: </span>
                    <span className={synString}>"new opportunities"</span>
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

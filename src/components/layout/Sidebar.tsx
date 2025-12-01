import type { SectionId } from "./AnimatedSection";
import HiGif from "../../assets/pics/hi.gif";
import { useState } from "react";

interface SidebarProps {
  sections: { id: SectionId; label: string }[];
  activeSection: SectionId;
  isLight: boolean;
}

export function Sidebar({ sections, activeSection, isLight }: SidebarProps) {
  const borderColor = isLight ? "border-slate-200" : "border-slate-800/70";
  const bgPanel = isLight ? "bg-white/80" : "bg-black/40";
  const brandText = isLight ? "text-slate-700" : "text-slate-300";
  const subtleText = isLight ? "text-slate-500" : "text-slate-500";
  const [gifVersion, setGifVersion] = useState(0);

  const handleGifClick = () => {
    // bump version so src changes → browser reloads GIF → animation restarts
    setGifVersion((v) => v + 1);
  };

  return (
    <aside
      className={`md:w-60 ${borderColor} border-r ${bgPanel} backdrop-blur-sm`}
    >
      <div className="flex flex-col h-full max-h-screen">
        {/* top brand area */}
        <div className={`px-4 pt-4 pb-3 border-b ${borderColor}`}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            <span className={`text-xs font-mono ${brandText}`}>
              Roselyn Zhang
            </span>
          </div>
          <p className={`mt-2 text-[11px] font-mono ${subtleText}`}>
            Curiosity · Initiative · Impact
          </p>
        </div>

        {/* middle stack: nav (shrink) + hi panel (flex-1) + contact (shrink) */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* scrollable nav */}
          <nav className="shrink-0 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {sections.map(({ id, label }) => {
                const isActive = id === activeSection;
                const baseText = isLight ? "text-slate-600" : "text-slate-400";
                const hoverBg = isLight
                  ? "hover:bg-slate-100"
                  : "hover:bg-slate-900/60";
                const activeBg = isLight
                  ? "bg-slate-200 text-slate-900 border-slate-400"
                  : "bg-slate-900/80 text-slate-100 border-slate-700";

                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={[
                        "flex items-center gap-2 rounded-md px-3 py-2 text-xs font-mono transition-colors border",
                        baseText,
                        hoverBg,
                        isActive ? activeBg : "border-transparent",
                      ].join(" ")}
                    >
                      <span className="h-[3px] w-[3px] rounded-full bg-emerald-400/70" />
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* animated hi panel */}
          <div className="flex-1 flex items-center justify-center px-4 pb-4">
            <button
              type="button"
              onClick={handleGifClick}
              className="flex flex-col items-center text-center cursor-pointer select-none focus:outline-none gap-[2px]"
            >
              <p
                className={`text-[15px] font-mono ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                hi, I&apos;m Roselyn 👋
              </p>

              <p
                className={`text-[13px] font-mono ${
                  isLight ? "text-slate-400" : "text-slate-500"
                }`}
              >
                click to say hi
              </p>

              <img
                src={`${HiGif}?v=${gifVersion}`}
                alt="Roselyn waving hi"
                className="mt-3 max-w-full"
              />
            </button>
          </div>

          {/* bottom contact card */}
          <div
            className={`shrink-0 border-t ${borderColor} px-4 py-4 flex flex-col justify-start min-h-[25vh]`}
          >
            <div
              className={`rounded-xl border px-4 py-5 h-full flex flex-col justify-between
              ${
                isLight
                  ? "border-slate-300 bg-white"
                  : "border-slate-700 bg-slate-950/80"
              }`}
            >
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-500">
                  contact
                </p>

                <div
                  className={`mt-3 space-y-2 text-[11px] font-mono ${
                    isLight ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  <a
                    href="https://www.linkedin.com/in/roselyn-zhang-82607a195/"
                    className="block group"
                  >
                    <p
                      className={`text-sm font-semibold group-hover:text-emerald-400 transition-colors ${
                        isLight ? "text-slate-900" : "text-slate-100"
                      }`}
                    >
                      Talk to me on LinkedIn →
                    </p>
                  </a>

                  <p
                    className={`text-sm font-semibold ${
                      isLight ? "text-slate-900" : "text-slate-100"
                    }`}
                  >
                    Or
                  </p>

                  <a
                    href="mailto:roselynzhang@outlook.com"
                    className="block group"
                  >
                    <p className="group-hover:text-emerald-400 transition-colors">
                      roselynzhang@outlook.com
                    </p>
                  </a>
                </div>
              </div>

              {/* tiny footer */}
              <p
                className={`text-[10px] font-mono mt-4 ${
                  isLight ? "text-slate-400" : "text-slate-500"
                }`}
              >
                available for collaborations · 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

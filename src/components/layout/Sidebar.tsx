import { useEffect, useState } from "react";
import type { SectionId } from "./AnimatedSection";
import HiGif from "../../assets/pics/hi.gif";
import type { ThemeMode } from "../../App";

interface SidebarProps {
  sections: { id: SectionId; label: string }[];
  activeSection: SectionId;
  isLight: boolean;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

export function Sidebar({
  sections,
  activeSection,
  isLight,
  theme,
  setTheme,
}: SidebarProps) {
  const borderColor = isLight ? "border-slate-200" : "border-slate-800/70";
  const bgPanel = isLight ? "bg-white/80" : "bg-black/40";
  const brandText = isLight ? "text-slate-700" : "text-slate-300";
  const subtleText = isLight ? "text-slate-500" : "text-slate-500";

  const [gifVersion, setGifVersion] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleGifClick = () => setGifVersion((v) => v + 1);

  // close mobile drawer after resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false); // md breakpoint
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // prevent background scroll when drawer is open (mobile)
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const ModeToggle = (
    <div
      className={`mt-2 inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[11px] font-mono ${
        isLight
          ? "border-slate-300 bg-white/70 text-slate-700"
          : "border-slate-700/80 bg-slate-950/70 text-slate-300"
      }`}
    >
      <span className="uppercase tracking-[0.18em] text-slate-500">mode</span>

      <button
        type="button"
        onClick={() => setTheme("light")}
        className={[
          "px-2 py-1 rounded-full transition-colors",
          theme === "light"
            ? "bg-slate-900 text-slate-50"
            : isLight
              ? "hover:bg-slate-200 hover:text-slate-900"
              : "hover:bg-slate-800 hover:text-slate-100",
        ].join(" ")}
      >
        light
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={[
          "px-2 py-1 rounded-full transition-colors",
          theme === "dark"
            ? "bg-slate-200 text-slate-900"
            : isLight
              ? "hover:bg-slate-200 hover:text-slate-900"
              : "hover:bg-slate-800 hover:text-slate-100",
        ].join(" ")}
      >
        dark
      </button>
    </div>
  );

  const Content = (
    <div className="flex-1 flex flex-col min-h-0">
      {/* nav (no nested scroll; the whole drawer scrolls on mobile) */}
      <nav className="shrink-0 px-3 py-4">
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
                  onClick={() => setMobileOpen(false)}
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
      <div className="px-4 pb-4 flex items-center justify-center">
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
            className="mt-2 max-w-full max-h-[38vh] object-contain"
          />
        </button>
      </div>

      {/* bottom contact card */}
      <div className={`border-t ${borderColor} px-4 py-4 mb-1`}>
        <div
          className={`rounded-xl border px-4 py-5 flex flex-col justify-between ${
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
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (md+) */}
      <aside
        className={`hidden md:flex md:w-60 ${borderColor} border-r ${bgPanel} backdrop-blur-sm`}
      >
        <div className="flex flex-col h-full max-h-screen w-full">
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

          {/* desktop: allow its own scrolling */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
            {Content}
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div
        className={`md:hidden w-full ${bgPanel} backdrop-blur-sm border-b ${borderColor}`}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
              <span className={`text-xs font-mono ${brandText}`}>
                Roselyn Zhang
              </span>
            </div>
            <p className={`mt-1 text-[11px] font-mono ${subtleText}`}>
              Curiosity · Initiative · Impact
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={[
              "px-3 py-2 rounded-md border text-xs font-mono transition-colors",
              isLight
                ? "border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                : "border-slate-700/80 bg-slate-950/70 hover:bg-slate-900 text-slate-200",
            ].join(" ")}
          >
            menu
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* drawer */}
          <aside
            className={`absolute top-0 left-0 h-full w-[82vw] max-w-[320px] ${bgPanel} backdrop-blur-sm border-r ${borderColor}`}
          >
            <div className="flex flex-col h-full w-full">
              {/* header with close + mode */}
              <div
                className={`px-4 pt-4 pb-3 border-b ${borderColor} flex items-start justify-between gap-3`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                    <span className={`text-xs font-mono ${brandText}`}>
                      Roselyn Zhang
                    </span>
                  </div>
                  <p className={`mt-1 text-[11px] font-mono ${subtleText}`}>
                    Curiosity · Initiative · Impact
                  </p>

                  {ModeToggle}
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "px-3 py-2 rounded-md border text-xs font-mono transition-colors",
                    isLight
                      ? "border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                      : "border-slate-700/80 bg-slate-950/70 hover:bg-slate-900 text-slate-200",
                  ].join(" ")}
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                {Content}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import type { SectionId } from "./components/layout/AnimatedSection";

import { HeroSection } from "./sections/HeroSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { PublicationsSection } from "./sections/PublicationsSection";

import { ConnectSection } from "./sections/ConnectSection";


export type ThemeMode = "light" | "dark";

const BACKGROUND_CLASSES: Record<ThemeMode, string> = {
  // light: bright-ish gradient
  light: "bg-[radial-gradient(circle_at_top,_#f9fafb,_#cbd5f5)]",
  // dark: what you had before
  dark: "bg-[radial-gradient(ellipse_at_top,_#1e293b,_#020617)]",
};

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "hero", label: "overview" },
  { id: "experience", label: "experiences" },
  { id: "publication", label: "publications" },
  { id: "connect", label: "connect" },
];


function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const isLight = theme === "light";

  // Always start at top
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveSection(id);
          }
        }
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`h-screen overflow-hidden ${BACKGROUND_CLASSES[theme]} ${
        isLight ? "text-slate-900" : "text-slate-100"
      }`}
    >
      {/* top-right light/dark toggle */}
      <div className="fixed top-3 right-4 z-30">
        <div
          className={`rounded-full border backdrop-blur-sm px-2 py-1 flex items-center gap-2 text-[11px] font-mono ${
            isLight
              ? "border-slate-300 bg-white/70 text-slate-700"
              : "border-slate-700/80 bg-slate-950/80 text-slate-300"
          }`}
        >
          <span
            className={`uppercase tracking-[0.18em] ${
              isLight ? "text-slate-500" : "text-slate-500"
            }`}
          >
            mode
          </span>
          <button
            onClick={() => setTheme("light")}
            className={[
              "px-2 py-1 rounded-full transition-colors",
              theme === "light"
                ? "bg-slate-900 text-slate-50"
                : "hover:bg-slate-200 hover:text-slate-900",
            ].join(" ")}
          >
            light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={[
              "px-2 py-1 rounded-full transition-colors",
              theme === "dark"
                ? "bg-slate-200 text-slate-900"
                : "hover:bg-slate-800 hover:text-slate-100",
            ].join(" ")}
          >
            dark
          </button>
        </div>
      </div>

      {/* overlay + layout */}
      <div
        className={`h-full flex flex-row ${
          isLight ? "bg-white/70" : "bg-black/40"
        }`}
      >
        <Sidebar sections={SECTIONS} activeSection={activeSection} isLight={isLight} />

        {/* main scroll area */}
        <main className="flex-1 w-full overflow-y-scroll snap-y snap-mandatory">
          {/* HERO – keep as is, centered + padded */}
          <div className="max-w-6xl mx-auto px-10 py-10">
            <HeroSection isLight={isLight} />
          </div>

          {/* EXPERIENCE – full width but with padded edges */}
          <div className="px-8 sm:px-12 lg:px-16">
            <ExperienceSection isLight={isLight} />
          </div>

          <div className="px-8 sm:px-12 lg:px-16">
            <PublicationsSection isLight={isLight} />
          </div>

           {/* connect – similar feel to hero, centered */}
          <div className="max-w-6xl mx-auto px-10 py-10">
            <ConnectSection isLight={isLight} />
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;

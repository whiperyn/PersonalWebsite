import { AnimatedSection } from "../components/layout/AnimatedSection";
import { FloatingLogos } from "../components/FloatingLogos";

interface HeroSectionProps {
  isLight?: boolean;
}

export function HeroSection({ isLight }: HeroSectionProps) {
  const subtitleColor = isLight ? "text-slate-700" : "text-slate-300";
  const boxBg = isLight
    ? "bg-white border-slate-200 hover:bg-slate-50 hover:border-emerald-400/80"
    : "bg-slate-950/60 border-slate-800 hover:bg-slate-900 hover:border-emerald-400/80";
  const boxDesc = isLight ? "text-slate-500" : "text-slate-400";

  return (
    <AnimatedSection
      id="hero"
      className="relative h-screen flex flex-col justify-center pt-4 overflow-hidden"
    >
      {/* floating logos background */}
      <FloatingLogos isLight={isLight} />

      {/* main hero content above logos */}
      <div className="relative z-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-emerald-500">
          personal workspace
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
          Roselyn Zhang
        </h1>
        <p className={`mt-3 text-sm sm:text-base ${subtitleColor}`}>
          CS @ Waterloo · Software Engineering & Machine Learning · quant-ish, research-ish, and occasionally chaotic.
        </p>

        {/* small action buttons */}
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <a
            href="#experience"
            className={`px-4 py-2 rounded-md border font-mono transition-colors ${
              isLight
                ? "border-slate-300 bg-white hover:border-emerald-500 hover:bg-emerald-50"
                : "border-slate-700 bg-slate-900/80 hover:border-emerald-400 hover:bg-slate-900"
            }`}
          >
            experience
          </a>
          <a
            href="#projects"
            className={`px-4 py-2 rounded-md border font-mono transition-colors ${
              isLight
                ? "border-slate-300 hover:bg-slate-100"
                : "border-slate-700/70 hover:border-slate-500"
            }`}
          >
            projects
          </a>
        </div>

        {/* section boxes for quick navigation */}
        <div className="mt-10 flex gap-4 flex-nowrap">
          {/* 01 overview */}
          <a
            href="#hero"
            className={`group rounded-xl border px-4 py-5 transition-colors ${boxBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              01 · overview
            </p>
            <h3 className="text-sm font-semibold">About / Summary</h3>
            <p className={`mt-2 text-xs ${boxDesc}`}>
              Quick snapshot of who I am and what I work on.
            </p>
          </a>

          {/* 02 experience */}
          <a
            href="#experience"
            className={`group rounded-xl border px-4 py-5 transition-colors ${boxBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              02 · experience
            </p>
            <h3 className="text-sm font-semibold">Internships & Roles</h3>
            <p className={`mt-2 text-xs ${boxDesc}`}>
              Meta, TikTok, BMO, RBC, research, and more.
            </p>
          </a>

          {/* 03 projects */}
          <a
            href="#projects"
            className={`group rounded-xl border px-4 py-5 transition-colors ${boxBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              03 · projects
            </p>
            <h3 className="text-sm font-semibold">Selected Work</h3>
            <p className={`mt-2 text-xs ${boxDesc}`}>
              MarkMatch, RLNoiseAttack, tools, experiments, etc.
            </p>
          </a>

          {/* 04 connect */}
          <a
            href="#connect"
            className={`group rounded-xl border px-4 py-5 transition-colors ${boxBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              04 · connect
            </p>
            <h3 className="text-sm font-semibold">Let’s Connect</h3>
            <p className={`mt-2 text-xs ${boxDesc}`}>
              Email, resume, LinkedIn & message box.
            </p>
          </a>
        </div>
      </div>

      {/* scroll hint at bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[11px] text-slate-400 z-10">
        <span className="uppercase tracking-[0.24em]">scroll</span>
        <span className="mt-1 animate-bounce">↓</span>
      </div>
    </AnimatedSection>
  );
}

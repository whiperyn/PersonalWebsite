import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "../components/layout/AnimatedSection";
import RicohLogo from "../assets/pics/Ricoh_Logo.png";
import RBCLogo from "../assets/pics/RBC_Logo.png";
import TikTokLogo from "../assets/pics/TikTok_Logo.png";
import BMOLogo from "../assets/pics/BMO_Logo.png";
import MetaLogo from "../assets/pics/Meta_Logo.png";

interface ExperienceSectionProps {
  isLight?: boolean;
}

const EXPERIENCES = [
  {
    id: "ricoh",
    years: "2021",
    title: "Software Developer Intern",
    company: "Ricoh",
    blurb: "...",
    tags: ["C#", ".NET", "Automation"],
    logo: RicohLogo,
  },
  {
    id: "rbc",
    years: "2022",
    title: "Technical Systems Analyst Intern",
    company: "RBC · Global Markets",
    blurb: "...",
    tags: ["Java", "SQL", "Global Markets"],
    logo: RBCLogo,
  },
  {
    id: "tiktok",
    years: "2023",
    title: "Software Engineer Intern",
    company: "TikTok",
    blurb: "...",
    tags: ["Go", "Microservices", "Kafka", "Redis"],
    logo: TikTokLogo,
  },
  {
    id: "bmo",
    years: "2024",
    title: "Quantitative Developer Intern",
    company: "BMO Capital Markets",
    blurb: "...",
    tags: ["C#", "Derivatives", "Monte Carlo"],
    logo: BMOLogo,
  },
  {
    id: "meta",
    years: "2025",
    title: "Software Engineer Intern",
    company: "Meta · Ads / GenAI",
    blurb: "...",
    tags: ["Python", "Backend", "GenAI"],
    logo: MetaLogo,
  },
];

export function ExperienceSection({ isLight }: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const subtitle = isLight ? "text-slate-600" : "text-slate-400";
  const cardBg = isLight
    ? "bg-white border-slate-200"
    : "bg-slate-950/70 border-slate-800";
  const metaText = isLight ? "text-emerald-600" : "text-emerald-400/80";
  const bodyText = isLight ? "text-slate-700" : "text-slate-200";
  const companyText = isLight ? "text-slate-500" : "text-slate-400";
  const tagBg = isLight
    ? "bg-slate-100 text-slate-700 border-slate-200"
    : "bg-slate-900 text-slate-300 border-slate-700";

  const edgeGradientLeft = isLight ? "from-white" : "from-slate-950/95";
  const edgeGradientRight = edgeGradientLeft;

  // detect which slide is centered
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slides = Array.from(
        container.querySelectorAll<HTMLElement>("[data-slide='true']")
      );
      if (!slides.length) return;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDist = Infinity;

      slides.forEach((slide, idx) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const dist = Math.abs(slideCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const goToIndex = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = Array.from(
      container.querySelectorAll<HTMLElement>("[data-slide='true']")
    );
    if (idx < 0 || idx >= slides.length) return;
    const target = slides[idx];
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta =
      targetRect.left -
      containerRect.left -
      (containerRect.width / 2 - targetRect.width / 2);

    container.scrollTo({
      left: container.scrollLeft + delta,
      behavior: "smooth",
    });
  };

  // keyboard ← / →
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToIndex(activeIndex + 1);
      } else if (e.key === "ArrowLeft") {
        goToIndex(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <AnimatedSection
      id="experience"
      className="h-screen flex flex-col justify-center pt-12"
    >
      {/* big section header pinned at top-left of main content */}
      <div className="flex items-baseline justify-between pr-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Experience
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${subtitle}`}>
            Scroll horizontally or use ← / → to move between roles.
          </p>
        </div>
        {/* progress + dots */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span>
            {activeIndex + 1} / {EXPERIENCES.length}
          </span>
          <div className="flex gap-1">
            {EXPERIENCES.map((_, idx) => (
              <span
                key={idx}
                className={[
                  "h-1.5 rounded-full transition-all",
                  idx === activeIndex
                    ? "w-4 bg-emerald-400"
                    : "w-1.5 bg-slate-500/50",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* giant horizontal hero cards */}
      <div className="relative mt-6 flex-1">
        <div
          ref={containerRef}
          className="h-full overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
        >
          <div className="flex gap-8 h-full">
            {EXPERIENCES.map((exp, idx) => (
              <article
                key={exp.id}
                data-slide="true"
                className={`snap-center shrink-0 
                  w-[95%] sm:w-[92%] lg:w-[88%] 
                  h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)] 
                  rounded-3xl border p-6 sm:p-10 
                  flex flex-col justify-between 
                  transition-transform duration-300 
                  ${cardBg} ${idx === activeIndex ? "" : "scale-[0.97]"}`}
              >
                <div>
                  <p className={`text-xs sm:text-sm font-mono ${metaText}`}>
                    {exp.years}
                  </p>
                  <h3 className="mt-3 text-xl sm:text-2xl font-semibold">
                    {exp.title}
                  </h3>
                  <p
                    className={`mt-1 text-xs sm:text-sm font-mono ${companyText}`}
                  >
                    {exp.company}
                  </p>
                  <p
                    className={`mt-5 text-sm sm:text-base leading-relaxed ${bodyText}`}
                  >
                    {exp.blurb}
                  </p>
                </div>

                {exp.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`border text-[10px] px-3 py-1 rounded-full font-mono ${tagBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

              </article>
            ))}
          </div>
        </div>

        {/* edge gradients to give that Apple-y peek effect */}
        <div
          className={`pointer-events-none absolute inset-y-4 left-0 w-12 bg-gradient-to-r ${edgeGradientLeft} to-transparent`}
        />
        <div
          className={`pointer-events-none absolute inset-y-4 right-0 w-12 bg-gradient-to-l ${edgeGradientRight} to-transparent`}
        />
      </div>

      <p className="mt-4 text-[11px] font-mono text-slate-400">
        hint: swipe / scroll horizontally, or press ← / → to move between
        experiences.
      </p>
    </AnimatedSection>
  );
}

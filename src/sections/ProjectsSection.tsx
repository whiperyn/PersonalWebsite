import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "../components/layout/AnimatedSection";

interface ProjectsSectionProps {
  isLight?: boolean;
}

const PROJECTS = [
  {
    id: "markmatch",
    years: "2024–2025",
    title: "MarkMatch: Same-Hand Stuffing Detection",
    kind: "Research · ICME 2025 Demo",
    blurb: "...",
    tags: ["Python", "TensorFlow", "Vision-Language"],
    logo: "/logos/icme.svg", // conference logo
  },
  {
    id: "rlnoise",
    years: "2024",
    title: "RLNoiseAttack",
    kind: "Research · Robustness / Adversarial",
    blurb: "...",
    tags: ["PyTorch", "RL", "Adversarial ML"],
    logo: "/logos/arxiv.svg", // or lab logo etc.
  },
  {
    id: "vocab",
    years: "2023",
    title: "GRE Vocab Trainer",
    kind: "Tool · Desktop App",
    blurb: "...",
    tags: ["Python", "Tkinter"],
    logo: "/logos/python.svg",
  },
  {
    id: "remind",
    years: "2023",
    title: "ReMind: AR Glasses for Seniors",
    kind: "Design / Prototype",
    blurb: "...",
    tags: ["React", "TypeScript", "UX"],
    logo: "/logos/uwaterloo.svg",
  },
  {
    id: "conics",
    years: "2022",
    title: "Conic Section Visualizer",
    kind: "Teaching · Math Visualization",
    blurb: "...",
    tags: ["Python", "Matplotlib", "Animation"],
    logo: "/logos/math.svg",
  },
];

export function ProjectsSection({ isLight }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const subtitle = isLight ? "text-slate-600" : "text-slate-400";
  const cardBg = isLight
    ? "bg-white border-slate-200"
    : "bg-slate-950/70 border-slate-800";
  const bodyText = isLight ? "text-slate-700" : "text-slate-200";

  // NEW: emerald year color, like Experience
  const yearText = isLight ? "text-emerald-600" : "text-emerald-400/80";

  // meta text for kind (keep gray)
  const metaText = isLight ? "text-slate-500" : "text-slate-400";

  const tagBg = isLight
    ? "bg-slate-100 text-slate-700 border-slate-200"
    : "bg-slate-900 text-slate-300 border-slate-700";

  const edgeGradientLeft = isLight ? "from-white" : "from-slate-950/95";
  const edgeGradientRight = edgeGradientLeft;

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
      id="projects"
      className="h-screen flex flex-col justify-center pt-12"
    >
      {/* big header */}
      <div className="flex items-baseline justify-between pr-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${subtitle}`}>
            Scroll horizontally or use ← / → to skim research and tools.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span>
            {activeIndex + 1} / {PROJECTS.length}
          </span>
          <div className="flex gap-1">
            {PROJECTS.map((_, idx) => (
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

      {/* big hero cards horizontally */}
      <div className="relative mt-6 flex-1">
        <div
          ref={containerRef}
          className="h-full overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
        >
          <div className="flex gap-8 h-full">
            {PROJECTS.map((p, idx) => (
              <article
                key={p.id}
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
                  {/* year line — emerald, same as Experience */}
                  <p className={`text-xs sm:text-sm font-mono ${yearText}`}>
                    {p.years}
                  </p>

                  {/* title + kind row */}
                  <div className="mt-3 flex items-baseline justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      {p.title}
                    </h3>
                    <span
                      className={`text-[10px] sm:text-xs font-mono ${metaText}`}
                    >
                      {p.kind}
                    </span>
                  </div>

                  {/* blurb */}
                  <p
                    className={`mt-5 text-sm sm:text-base leading-relaxed ${bodyText}`}
                  >
                    {p.blurb}
                  </p>
                </div>

                {p.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
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

        <div
          className={`pointer-events-none absolute inset-y-4 left-0 w-12 bg-gradient-to-r ${edgeGradientLeft} to-transparent`}
        />
        <div
          className={`pointer-events-none absolute inset-y-4 right-0 w-12 bg-gradient-to-l ${edgeGradientRight} to-transparent`}
        />
      </div>

      <p className="mt-4 text-[11px] font-mono text-slate-400">
        hint: swipe / scroll horizontally, or press ← / → to move between
        projects.
      </p>
    </AnimatedSection>
  );
}

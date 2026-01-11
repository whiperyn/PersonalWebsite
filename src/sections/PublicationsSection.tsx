import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "../components/layout/AnimatedSection";

interface PublicationsSectionProps {
  isLight?: boolean;
}

type Publication = {
  id: string;
  years: string;
  title: string;
  kind: string; // e.g., "Research · IEEE ICME 2025 Demo"
  paperUrl?: string;
  blurb: string;
  highlights: string[];
  tags: string[];
};

const PUBLICATIONS: Publication[] = [
  {
    id: "markmatch",
    years: "2024–2025",
    title: "MarkMatch: Same-Hand Stuffing Detection",
    kind: "Research · IEEE ICME 2025 Demo",
    paperUrl: "https://arxiv.org/abs/2505.07032",
    blurb:
      "Designed a retrieval-based system for detecting same-hand ballot stuffing that replaces fragile pairwise classification with dense-batch contrastive learning for scalable election auditing.",
    highlights: [
      "Designed and implemented MarkMatch, a contrastive-learning retrieval system for detecting same-hand ballot marks in real election datasets.",
      "Replaced fragile pairwise classification with a dense-batch similarity matrix and dual-loss training to enforce global consistency.",
      "Achieved 0.943 F1, clearly outperforming prior state-of-the-art methods for same-hand stuffing detection.",
      "Integrated mark extraction using Segment Anything (SAM) for flexible, template-free segmentation of handwritten marks.",
      "Built an auditor-facing interface with ranking tables and retrieval heatmaps, translating the research model into a practical non-biometric audit tool.",
    ],
    tags: [
      "Python",
      "Contrastive Learning",
      "Segment Anything",
      "Information Retrieval",
      "Computer Vision",
    ],
  },
  {
    id: "impr-hallucinations",
    years: "2024–2025",
    title: "Mitigating Image Captioning Hallucinations in Vision-Language Models",
    kind: "Research · IEEE IMPR 2025",
    paperUrl: "https://arxiv.org/abs/2505.03420",
    blurb:
      "Proposed a reinforcement-learning test-time adaptation framework that reduces hallucinations in vision–language models by correcting behavior at inference without retraining.",
    highlights: [
      "Developed a reinforcement-learning test-time adaptation (TTA) framework that updates only ~0.003% of model parameters at inference time.",
      "Enabled hallucination correction without retraining by adapting model behavior dynamically during inference. Designed a CLIP-based hallucination evaluation model to score factual consistency during caption generation.",
      "Introduced a dual-reward mechanism combining semantic alignment and non-hallucination probability to guide generation.",
      "Achieved a 15–17% reduction in hallucination rates on LLaVA and InstructBLIP while maintaining inference-time efficiency.",
    ],
    tags: [
      "Python",
      "Reinforcement Learning",
      "Vision-Language",
      "Test-Time Adaptation",
      "CLIP",
      "PyTorch",
    ],
  },
  {
    id: "vipde",
    years: "2024–2025",
    title:
      "Visual Prompt Learning of Foundation Models for Post-Disaster Damage Evaluation",
    kind: "Research · Remote Sensing (May 2025)",
    paperUrl: "https://www.mdpi.com/2072-4292/17/10/1664",
    blurb:
      "Developed a prompt-based framework for adapting frozen foundation models to assess building damage from satellite imagery, enabling efficient and generalizable post-disaster evaluation.",
    highlights: [
      "Developed ViPDE, a prompt-based framework that adapts a frozen foundation model (SAM) for post-disaster building damage assessment.",
      "Built a lightweight visual-prompt generator with contrastive learning using paired pre- and post-disaster satellite imagery.",
      "Kept the backbone model fully frozen to minimize compute cost and simplify real-world deployment.",
      "Enabled generalization across multiple disaster types using a unified prompting approach rather than task-specific retraining.",
      "Achieved robust performance with F1 ≈ 0.70 across diverse disaster scenarios.",
    ],
    tags: ["Python", "Prompt Learning", "Contrastive Learning", "Computer Vision"],
  },
];

export function PublicationsSection({ isLight }: PublicationsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const subtitle = isLight ? "text-slate-600" : "text-slate-400";
  const cardBg = isLight
    ? "bg-white border-slate-200"
    : "bg-slate-950/70 border-slate-800";
  const bodyText = isLight ? "text-slate-700" : "text-slate-200";
  const yearText = isLight ? "text-emerald-600" : "text-emerald-400/80";
  const metaText = isLight ? "text-slate-500" : "text-slate-400";

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
      if (e.key === "ArrowRight") goToIndex(activeIndex + 1);
      else if (e.key === "ArrowLeft") goToIndex(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <AnimatedSection
      id="publication"
      className="min-h-[100svh] flex flex-col justify-center pt-12"
    >
      {/* big header */}
      <div className="flex items-baseline justify-between pr-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Publications
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${subtitle}`}>
            Scroll horizontally or use ← / → to skim research outputs.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span>
            {activeIndex + 1} / {PUBLICATIONS.length}
          </span>
          <div className="flex gap-1">
            {PUBLICATIONS.map((_, idx) => (
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

      {/* cards */}
      <div className="relative mt-6 flex-1 min-h-0">
        <div
          ref={containerRef}
          className="h-full overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
        >
          <div className="flex gap-8 h-full">
            {PUBLICATIONS.map((p, idx) => (
              <article
                key={p.id}
                data-slide="true"
                className={`snap-center shrink-0
                  w-[95%] sm:w-[92%] lg:w-[88%]
                  h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)]
                  rounded-3xl border p-6 sm:p-10
                  flex flex-col overflow-hidden
                  transition-transform duration-300
                  ${cardBg} ${idx === activeIndex ? "" : "scale-[0.97]"}`}
              >
                {/* scrollable content area */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1">
                  {/* year */}
                  <p className={`text-xs sm:text-sm font-mono ${yearText}`}>
                    {p.years}
                  </p>

                  {/* title + link row */}
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold leading-snug">
                        {p.title}
                      </h3>
                      <p
                        className={`mt-1 text-[10px] sm:text-xs font-mono ${metaText}`}
                      >
                        {p.kind}
                      </p>
                    </div>

                    {p.paperUrl ? (
                      <a
                        href={p.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 group text-xs sm:text-sm font-mono text-emerald-500 hover:text-emerald-400 transition"
                      >
                        Read paper{" "}
                        <span className="inline-block group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </a>
                    ) : null}
                  </div>

                  {/* blurb */}
                  <p
                    className={`mt-6 text-[17px] sm:text-lg lg:text-xl leading-relaxed ${bodyText}`}
                  >
                    {p.blurb}
                  </p>

                  {/* highlights */}
                  {p.highlights?.length ? (
                    <div className={idx === activeIndex ? "opacity-100" : "opacity-70"}>
                      <div className="mt-4 mb-3 h-px w-full bg-gradient-to-r from-emerald-400/30 via-emerald-400/10 to-transparent" />
                      <ul className="space-y-4">
                        {p.highlights.map((h) => (
                          <li
                            key={h}
                            className={`flex items-start gap-4 text-[16px] sm:text-lg lg:text-[19px] leading-relaxed ${metaText}`}
                          >
                            <span className="mt-[10px] h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="break-words">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {/* tags pinned at bottom */}
                {p.tags?.length ? (
                  <div className="pt-6 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`border text-xs sm:text-sm px-4 py-2 rounded-full font-mono ${tagBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div />
                )}
              </article>
            ))}
          </div>
        </div>

        {/* edge gradients */}
        <div
          className={`pointer-events-none absolute inset-y-4 left-0 w-12 bg-gradient-to-r ${edgeGradientLeft} to-transparent`}
        />
        <div
          className={`pointer-events-none absolute inset-y-4 right-0 w-12 bg-gradient-to-l ${edgeGradientRight} to-transparent`}
        />
      </div>

      <p className="mt-4 text-[11px] font-mono text-slate-400">
        hint: swipe / scroll horizontally, or press ← / → to move between publications.
      </p>
    </AnimatedSection>
  );
}

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
    id: "meta",
    years: "May 2025 – Aug 2025",
    title: "Software Engineer Intern",
    company: "Meta · Facebook Monetization · Bellevue",
    blurb:
      "Built compliance and data-quality automation across ads infrastructure, reducing risk from deprecations while improving classification correctness and pipeline reliability.",
    highlights: [
      "Built Python automation to quantify third-party-data concentration, shifting privacy classification from static rules to data-level checks.",
      "Flagged over-blocking and enabled an A/B test revenue win-back of ~0.001% of Facebook app revenue by improving classification accuracy.",
      "Remediated 50+ ad features and migrated 82 features from a soon-to-be-deprecated to a supported data source in 5 days.",
      "Delivered a daily Hive compliance discrepancy-check table to monitor mismatches and drive systematic fixes.",
      "Revived a PHP revenue-tracking pipeline, stabilized a high-revenue dataset (mappings/deprecations/backfills), and defined legacy logging protocols—work adopted into H2 goals and leading to a new cross-org partnership.",
    ],
    tags: [
      "Python",
      "Hive",
      "Data Quality",
      "Compliance",
      "Pipelines",
      "Ads Infra",
    ],
    logo: MetaLogo,
  },
  {
    id: "bmo",
    years: "Sept 2024 – Dec 2024",
    title: "Software Developer Intern",
    company: "Bank of Montreal · Capital Markets · Toronto",
    blurb:
      "Worked on equity derivatives pricing with a focus on quantitative modeling and implementation, strengthening the firm’s analytic pricing capabilities.",
    highlights: [
      "Contributed within the Equity Modeling and XVA, Credit & Commodities team using Bloomberg Terminal data.",
      "Applied stochastic volatility modeling techniques while integrating a corridor variance swap model into the analytic pricer.",
      "Improved pricing coverage and efficiency with forward pricing techniques for equity derivatives including different swaps, Bermudan Swaption and Cross Currency Forward.",
      "Used Monte Carlo simulations to support valuation workflows and validate behavior under realistic market dynamics.",
    ],
    tags: [
      "Stochastic Volatility",
      "Monte Carlo",
      "Forward Pricing",
      "Derivatives",
      "Analytics",
    ],
    logo: BMOLogo,
  },
  {
    id: "tiktok",
    years: "May 2024 – Aug 2024",
    title: "Software Engineer Intern",
    company: "TikTok · Data TnS Core Safety · Vancouver",
    blurb:
      "Built scalable safety and data-access infrastructure for enforcement workflows, focusing on high-throughput services, caching, and large-scale data correctness.",
    highlights: [
      "Integrated the service with TikTok’s internal safety platform using Thrift RPC and Kafka to reliably ingest, process, and surface 50K+ violations per day.",
      "Designed a Redis read cache driven by ML-requested SQL to support latency-sensitive, read-heavy safety pipelines. Reduced production database reads by ~1000× across 11M+ rows (TPS), unlocking sustained throughput under peak load.",
      "Built Go reconciliation jobs to compare Redis cache state against Hive outputs, detecting missing or erroneous records automatically.",
      "Refilled corrupted or missing cache entries and raised the overall cache hit rate from 52% to 89%, stabilizing downstream safety systems.",
    ],
    tags: ["Go", "MySQL", "Thrift", "Kafka", "Redis", "Hive", "Microservices"],
    logo: TikTokLogo,
  },
  {
    id: "rbc",
    years: "May 2023 – Aug 2023",
    title: "Technical Systems Analyst Intern",
    company: "Royal Bank of Canada · Technology & Operation · Toronto",
    blurb:
      "Built internal tooling to speed up diagnostics and improve data visibility, combining scripting + full-stack web work to streamline operational workflows.",
    highlights: [
      "Developed Microsoft IIS troubleshooting scripts that increased RBC IIS TSS process efficiency by 10×+ for RBC’s expansion of CNB.",
      "Recognized as a major departmental accomplishment in 2023 Q3 for impact and adoption.",
      "Engineered internal web tooling across both front-end and back-end, combining UI/UX work with data plumbing for operational use.",
      "Built with .NET 6 (CSHTML), JavaScript, and CSS, focusing on responsiveness and clarity for internal users.",
      "Used Postman REST APIs to fetch 3,000+ lines of server data in seconds, improving visibility during investigations.",
    ],
    tags: [".NET 6", "CSHTML", "JavaScript", "CSS", "IIS", "Postman", "REST"],
    logo: RBCLogo,
  },
  {
    id: "ricoh",
    years: "Sept 2022 – Dec 2022",
    title: "Software Developer Intern",
    company: "Ricoh · Technology · Mississauga",
    blurb:
      "Worked on enterprise web maintenance and feature enhancements in a .NET environment, building solid fundamentals in end-to-end delivery and cross-team execution.",
    highlights: [
      "Troubleshot and enhanced production website pages (including MyRicoh), shipping fixes and improvements as requirements came in.",
      "Built and updated server-rendered pages using CSHTML, and worked with SQL Server to support data-backed UI flows.",
      "Worked in a .NET stack inside Visual Studio and Microsoft Azure, getting comfortable with enterprise tooling and deployment conventions.",
      "Learned and applied the MVC model in practice, translating tickets into maintainable changes across views, controllers, and data access.",
      "Followed SDLC phases end-to-end—implementing changes, validating behavior, and iterating based on test/UAT feedback.",
    ],
    tags: ["CSHTML", "SQL Server", ".NET", "Azure", "MVC", "SDLC"],
    logo: RicohLogo,
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
      if (e.key === "ArrowRight") goToIndex(activeIndex + 1);
      else if (e.key === "ArrowLeft") goToIndex(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <AnimatedSection
      id="experience"
      className="h-screen flex flex-col justify-center pt-12"
    >
      {/* header */}
      <div className="flex items-baseline justify-between pr-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Experiences
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${subtitle}`}>
            Scroll horizontally or use ← / → to move between roles.
          </p>
        </div>

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

      {/* cards */}
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
                {/* top content */}
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

                  {/* BIGGER blurb */}
                  <p
                    className={`mt-6 text-[17px] sm:text-lg lg:text-xl leading-relaxed tracking-[0.01em] ${bodyText}`}
                  >
                    {exp.blurb}
                  </p>

                  {/* Highlights: closer + MUCH bigger */}
                  {exp.highlights?.length ? (
                    <div
                      className={
                        idx === activeIndex ? "opacity-100" : "opacity-70"
                      }
                    >
                      <div className="mt-4 mb-3 h-px w-full bg-gradient-to-r from-emerald-400/30 via-emerald-400/10 to-transparent" />

                      <ul className="space-y-4">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className={`flex items-start gap-4 text-[16px] sm:text-lg lg:text-[19px] leading-relaxed ${companyText}`}
                          >
                            <span className="mt-[10px] h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {/* tags pinned to bottom, but bigger */}
                {exp.tags?.length ? (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
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
        hint: swipe / scroll horizontally, or press ← / → to move between
        experiences.
      </p>
    </AnimatedSection>
  );
}

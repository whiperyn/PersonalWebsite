import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type SectionId = "hero" | "experience" | "publication" | "contact" | "connect";

interface AnimatedSectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
}

function useScrollFade(id: SectionId) {
  const ref = useRef<HTMLElement | null>(null);
  const [ratio, setRatio] = useState<number>(id === "hero" ? 1 : 0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRatio(entry.intersectionRatio);
      },
      {
        // multiple thresholds to get a smooth ratio change
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);

  return { ref, ratio };
}

export function AnimatedSection({ id, children, className }: AnimatedSectionProps) {
  const { ref, ratio } = useScrollFade(id);

  // map intersection ratio → opacity (tweak to taste)
  const opacity = Math.min(1, Math.max(0, (ratio - 0.1) * 2));
  const translateY = (1 - opacity) * 24; // slide a bit when fading

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={["snap-start scroll-mt-0", className || ""].join(" ")}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
      }}
    >
      {children}
    </section>
  );
}

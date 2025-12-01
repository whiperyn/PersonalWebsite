import { AnimatedSection } from "../components/layout/AnimatedSection";

export function ContactSection() {
  return (
    <AnimatedSection
      id="contact"
      className="h-screen flex flex-col justify-center space-y-3 pb-10"
    >
      <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
      <p className="text-sm text-slate-400">
        Email, LinkedIn, GitHub, Google Scholar can go here.
      </p>
      <div className="text-xs font-mono text-slate-400 space-y-1">
        <p>email: your.name [at] domain [dot] com</p>
        <p>github: github.com/your-handle</p>
        <p>linkedin: /in/your-handle</p>
      </div>
    </AnimatedSection>
  );
}

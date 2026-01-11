import { AnimatedSection } from "../components/layout/AnimatedSection";

interface ConnectSectionProps {
  isLight?: boolean;
}

export function ConnectSection({ isLight }: ConnectSectionProps) {
  const subtitleColor = isLight ? "text-slate-600" : "text-slate-400";
  const cardBg = isLight
    ? "bg-white border-slate-200"
    : "bg-slate-950/70 border-slate-800";
  const cardSub = isLight ? "text-slate-500" : "text-slate-400";
  const cardMain = isLight ? "text-slate-900" : "text-slate-100";
  const inputBg = isLight ? "bg-white" : "bg-slate-950/80";
  const inputBorder = isLight ? "border-slate-300" : "border-slate-700";
  const inputText = isLight ? "text-slate-900" : "text-slate-100";
  const inputPlaceholder = isLight
    ? "placeholder:text-slate-400"
    : "placeholder:text-slate-500";

  return (
    <AnimatedSection
      id="connect"
      className="min-h-[100svh] flex flex-col justify-center"
    >
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-emerald-500">
          let&apos;s connect
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Stay in touch.
        </h2>
        <p className={`mt-2 text-sm sm:text-base ${subtitleColor}`}>
          Whether it&apos;s internships, research, collaborations, or just
          questions, I&apos;m happy to chat.
        </p>

        {/* quick contact actions: email / resume / linkedin */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:roselynzhang@outlook.com"
            className={`rounded-2xl border p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/80 ${cardBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              email
            </p>
            <p className={`text-sm font-semibold ${cardMain}`}>
              roselynzhang@outlook.com
            </p>
            <p className={`mt-2 text-xs ${cardSub}`}>
              Fastest way to reach me for anything important.
            </p>
          </a>

          <a
            href="https://drive.google.com/file/d/1rqUc-vSNPKhztCuCINyBmvesjCji-OQN/view?usp=sharing" // put your actual resume path here
            target="_blank"
            rel="noreferrer"
            className={`rounded-2xl border p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/80 ${cardBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              resume
            </p>
            <p className={`text-sm font-semibold ${cardMain}`}>
              View my resume
            </p>
            <p className={`mt-2 text-xs ${cardSub}`}>
              Full overview of experience, projects, and skills.
            </p>
          </a>

          <a
            href="https://www.linkedin.com/in/roselyn-zhang-82607a195/" // change to your real LinkedIn
            target="_blank"
            rel="noreferrer"
            className={`rounded-2xl border p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/80 ${cardBg}`}
          >
            <p className="text-[11px] font-mono text-emerald-500 mb-1">
              linkedin
            </p>
            <p className={`text-sm font-semibold ${cardMain}`}>
              /in/roselyn-zhang-82607a195
            </p>
            <p className={`mt-2 text-xs ${cardSub}`}>
              Let&apos;s stay connected professionally.
            </p>
          </a>
        </div>

        {/* message box hooked up to Formspree */}
        <div
          className={`mt-10 rounded-2xl border p-5 sm:p-6 lg:p-7 ${cardBg}`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold">
                Leave me a message
              </h3>
              <p className={`mt-1 text-xs sm:text-sm ${cardSub}`}>
                Drop a note about what you&apos;re working on or curious about.
              </p>
            </div>
            <p className="hidden sm:block text-[10px] font-mono text-slate-400">
              powered by Formspree
            </p>
          </div>

          <form
            className="mt-4 grid gap-3 sm:grid-cols-2"
            action="https://formspree.io/f/xkgdrgeg"
            method="POST"
          >
            {/* name */}
            <div className="space-y-1 sm:col-span-1">
              <label className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">
                name
              </label>
              <input
                type="text"
                name="name"
                className={`w-full rounded-md border px-3 py-2 text-xs sm:text-sm outline-none ${inputBg} ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500`}
                placeholder="Optional"
              />
            </div>

            {/* email */}
            <div className="space-y-1 sm:col-span-1">
              <label className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">
                email
              </label>
              <input
                type="email"
                name="email"
                className={`w-full rounded-md border px-3 py-2 text-xs sm:text-sm outline-none ${inputBg} ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500`}
                placeholder="So I can reply"
                required
              />
            </div>

            {/* message */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">
                message
              </label>
              <textarea
                name="message"
                rows={4}
                className={`w-full rounded-md border px-3 py-2 text-xs sm:text-sm outline-none resize-none ${inputBg} ${inputBorder} ${inputText} ${inputPlaceholder} focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500`}
                placeholder="Tell me about your project, ideas, or questions..."
                required
              />
            </div>

            {/* subtle honeypot to reduce spam */}
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              aria-hidden="true"
            />

            {/* where to redirect after submit (optional) */}
            {/* <input type="hidden" name="_next" value="https://your-site.com/thanks" /> */}

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs sm:text-sm rounded-md font-mono border border-emerald-500 bg-emerald-500/90 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                send
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </AnimatedSection>
  );
}

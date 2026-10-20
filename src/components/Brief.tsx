import { motion, useReducedMotion } from "motion/react";
import { event, objectives } from "../content/site";
import { FadeUp, Reveal, SectionLabel } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 01 — THE BRIEF (bone-white editorial band)
   Asymmetric: giant statement left, mission + numbered objectives right.
   The open middle is deliberate — hand-drawn accents float in it.
   ────────────────────────────────────────────────────────────────────────── */

/* Hand-drawn accent, drawn on scroll like the hero's (pathLength stroke). */
const DrawnArrowBrief = () => {
  const reduced = useReducedMotion();
  const draw = (delay: number) => ({
    initial: reduced ? false : ({ pathLength: 0, opacity: 0 } as const),
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { duration: delay === 0 ? 1.1 : 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <svg
      viewBox="0 0 120 80"
      className="pointer-events-none absolute top-[21%] left-[61%] hidden w-24 text-zenith-pink md:block lg:w-28"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <motion.path d="M4,10 C 28,6 56,14 74,34 C 84,46 88,56 90,68" {...draw(0.35)} />
      <motion.path d="M74,64 L91,70 L96,52" {...draw(1.2)} />
    </svg>
  );
};

/* Slow-spinning orbit mark — quiet counter-motion in the open gutter. */
const OrbitMarkBrief = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute top-[56%] left-[45%] hidden size-24 md:block lg:size-32"
  >
    <FadeUp className="size-full" delay={0.2}>
      <div className="relative grid size-full place-items-center">
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path
                id="brief-orbit"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
            </defs>
            {/* One clean revolution — textLength = 2π·38 ≈ 239, no seam overlap */}
            <text
              className="text-[8.5px] font-bold uppercase tracking-[0.22em]"
              fill="currentColor"
            >
              <textPath href="#brief-orbit" startOffset="0%" textLength="239" lengthAdjust="spacing">
                SCOPE CLUB • MLRIT • HYDERABAD •
              </textPath>
            </text>
          </svg>
        </div>
        <svg viewBox="0 0 24 24" className="size-5 text-zenith-pink lg:size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
        </svg>
      </div>
    </FadeUp>
  </div>
);

/* Floating hand-drawn plus marks */
const PlusBrief = ({ className, delay }: { className: string; delay: number }) => (
  <FadeUp className={`absolute hidden md:block ${className}`} delay={delay}>
    <svg viewBox="0 0 24 24" className="size-5 text-zenith-pink/70 md:size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M12 4v16M4 12h16" />
    </svg>
  </FadeUp>
);

export function Brief() {
  return (
    <section id="brief" className="relative overflow-hidden bg-bone text-ink" aria-labelledby="brief-heading">
      {/* Blueprint grid whisper — masked to nothing at its edges */}
      <div
        aria-hidden
        className="bg-grid-light pointer-events-none absolute top-[10%] left-[40%] hidden h-[38%] w-[26%] md:block"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 72%)",
        }}
      />
      <DrawnArrowBrief />
      <OrbitMarkBrief />
      <PlusBrief className="top-[14%] left-[40%]" delay={0.55} />
      <PlusBrief className="top-[72%] left-[58%]" delay={0.7} />

      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-40">
        <FadeUp>
          <SectionLabel index="01" title="The Brief" tone="light" />
        </FadeUp>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
          {/* Left — oversized statement */}
          <div className="md:col-span-7">
            <h2 id="brief-heading" className="display text-[13vw] leading-[0.9] md:text-[5.6vw]">
              <Reveal>
                <span>Three days</span>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="text-gradient">at the top.</span>
              </Reveal>
            </h2>
            <FadeUp delay={0.15}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-ink/70 md:text-lg">
                {event.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="label border border-ink/20 px-3 py-1.5">{event.institute}</span>
                <span className="label border border-ink/20 px-3 py-1.5">{event.city}</span>
                <span className="label bg-gradient-brand px-3 py-1.5 text-white">{event.datesLabel}</span>
              </div>
            </FadeUp>
          </div>

          {/* Right — numbered objectives ledger */}
          <div className="md:col-span-4 md:col-start-9">
            <FadeUp>
              <p className="label pb-3 text-ink/50 hairline-ink-b">Key Objectives</p>
            </FadeUp>
            <ol className="mt-1">
              {objectives.map((o, i) => (
                <FadeUp key={o} delay={0.05 * i}>
                  <li className="group flex items-baseline gap-4 py-4 hairline-ink-b">
                    <span className="label tnum shrink-0 text-zenith-pink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.975rem] leading-snug font-medium text-ink/85 transition-colors group-hover:text-ink">
                      {o}
                    </span>
                  </li>
                </FadeUp>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

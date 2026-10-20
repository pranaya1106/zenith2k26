import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform, motion } from "motion/react";
import { REGISTER_URL, event } from "../content/site";
import { FadeUp } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   FINALE — full-bleed brand gradient climax with a single register action.
   ────────────────────────────────────────────────────────────────────────── */

export function Finale() {
  /* Parallax: the corner ring drifts against the scroll for depth */
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 90, reduced ? 0 : -90]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-brand text-white"
      aria-labelledby="finale-heading"
    >
      {/* Echo of the zenith arc — a cropped ring in the corner */}
      <motion.svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{ y: ringY }}
        className="absolute -top-24 -right-24 size-[70vmax] opacity-25 mix-blend-overlay"
      >
        <circle cx="100" cy="100" r="99" fill="none" stroke="white" strokeWidth="0.35" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="white" strokeWidth="0.2" />
        <circle cx="100" cy="100" r="49" fill="none" stroke="white" strokeWidth="0.2" />
      </motion.svg>
      <div
        aria-hidden
        className="bg-grid-dark absolute inset-0 opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-36">
        <FadeUp>
          <p className="label text-white/70">
            {event.tagline} · {event.organizer}
          </p>
        </FadeUp>

        <h2 id="finale-heading" className="display mt-6 text-[15vw] leading-[0.88] md:text-[9vw]">
          <FadeUp delay={0.05}>
            <span className="block">Take your</span>
          </FadeUp>
          <FadeUp delay={0.12}>
            <span className="block">place at</span>
          </FadeUp>
          <FadeUp delay={0.18}>
            <span className="block text-ink">Zenith{event.year}</span>
          </FadeUp>
        </h2>

        <div className="mt-12 flex flex-col items-start gap-6 hairline-t border-white/30 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <FadeUp>
            <p className="max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              {event.datesLabel} · {event.venueLine} — three days of cloud, code and
              competition.
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 overflow-hidden bg-ink px-8 py-5 text-base font-bold tracking-widest text-white uppercase transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] md:px-12 md:py-6 md:text-xl"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0 bg-gradient-brand transition-all duration-500 group-hover:h-full"
              />
              <span className="relative">Register Now</span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="relative size-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

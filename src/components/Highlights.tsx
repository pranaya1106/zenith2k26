import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { highlights, whyJoin } from "../content/site";
import { FadeUp, Reveal, SectionLabel } from "./primitives";

/* ── The three reasons, as one rotating statement ────────────────────────
   A single oversized line cycles through the verbs while its note swaps
   beside it — typography instead of another card grid. */

function ReasonLine() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const active = whyJoin[index];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % whyJoin.length),
      4600,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-16 md:px-8 md:pb-20">
      <div className="grid gap-8 border-t border-white/12 pt-10 md:grid-cols-12 md:items-end md:gap-10 md:pt-14">
        <div className="md:col-span-7">
          <span className="label text-white/40">Because you get to</span>
          <div className="display relative mt-3 h-[1.18em] overflow-hidden text-[12vw] leading-[1.18] md:text-[5.6vw]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active.title}
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                exit={reduced ? { opacity: 0 } : { y: "-110%" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 bottom-0 whitespace-nowrap text-white"
              >
                {active.title}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <div className="min-h-[4.5em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active.title}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm leading-relaxed text-white/55 md:text-base"
              >
                {active.body}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Three rules that mark the cycle — click to jump */}
          <div className="mt-6 flex gap-2">
            {whyJoin.map((w, i) => (
              <button
                key={w.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${w.title}`}
                aria-current={i === index}
                className="group flex-1 cursor-pointer py-2"
              >
                <span
                  className={`block h-px w-full transition-colors duration-500 ${
                    i === index
                      ? "bg-gradient-brand"
                      : "bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SEC.02 — BY THE NUMBERS
   Oversized gradient numerals in an uneven horizontal strip, count-up on view.
   ────────────────────────────────────────────────────────────────────────── */

function Counter({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced, duration]);

  return (
    <span ref={ref} className="tnum">
      {n.toLocaleString("en-IN")}
    </span>
  );
}

export function Highlights() {
  return (
    <section className="relative bg-ink text-white" aria-labelledby="highlights-heading">
      <div className="mx-auto max-w-[1600px] px-5 pt-14 md:px-8 md:pt-14">
        <FadeUp>
          <SectionLabel index="02" title="By the Numbers" />
        </FadeUp>
        <h2 id="highlights-heading" className="display mt-8 text-[11vw] leading-[0.92] md:text-[4.2vw]">
          <Reveal>
            <span>Why join</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="text-gradient">Zenith?</span>
          </Reveal>
        </h2>
      </div>

      {/* Oversized numeral strip */}
      <div className="mx-auto max-w-[1600px] px-5 pt-10 md:px-8 md:pt-14">
        <div className="grid grid-cols-1 border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <FadeUp
              key={h.label}
              delay={0.06 * i}
              className={`group relative flex flex-col justify-between gap-6 border-b border-white/12 py-8 md:py-12 ${
                i % 2 === 1 ? "sm:pl-5" : "sm:pr-5"
              } lg:border-b-0 lg:px-8 ${i === 0 ? "lg:pl-0" : ""} ${i > 0 ? "lg:border-l lg:border-white/12" : ""}`}
            >
              <div className="flex items-baseline gap-0.5">
                {"prefix" in h && h.prefix && (
                  <span className="display text-gradient text-2xl md:text-4xl">{h.prefix}</span>
                )}
                {/* sm = two columns, so the numerals step down to fit the cell —
                    "75,000" is the widest string in the set */}
                <span className="display text-gradient text-[16vw] leading-[0.85] sm:text-[9vw] md:text-[7vw] lg:text-[4vw] xl:text-[4.4vw]">
                  <Counter value={h.value} />
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="label text-white">{h.label}</p>
                <p className="max-w-[24ch] text-sm leading-snug text-white/45">{h.note}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* One rotating line — the reasons read as a statement, not a grid */}
      <div className="pt-12 md:pt-16">
        <ReasonLine />
      </div>
    </section>
  );
}

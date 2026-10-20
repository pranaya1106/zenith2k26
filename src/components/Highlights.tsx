import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { highlights, whyJoin } from "../content/site";
import { FadeUp, Reveal, SectionLabel } from "./primitives";

/* One ribbon's content — the three reasons, duplicated by the caller for a
   seamless loop. Title in display caps, body trailing inline. */
function bandRow(tone: "brand" | "light") {
  return (
    <div className="flex shrink-0 items-center">
      {whyJoin.map((w, i) => (
        <span key={w.title} className="flex items-baseline">
          {i > 0 && (
            <span
              aria-hidden
              className={`mx-5 size-2 shrink-0 rounded-full md:mx-8 md:size-2.5 ${
                tone === "brand" ? "bg-white/70" : "bg-gradient-brand"
              }`}
            />
          )}
          <span
            className={`display text-[7vw] leading-none whitespace-nowrap md:text-[2.4vw] ${
              tone === "brand" ? "text-white" : "text-ink"
            }`}
          >
            {w.title}
          </span>
          <span
            className={`ml-3 text-[3.4vw] leading-none whitespace-nowrap md:ml-4 md:text-[1.2vw] ${
              tone === "brand" ? "text-white/85" : "text-ink/65"
            }`}
          >
            {w.body}
          </span>
        </span>
      ))}
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
      <div className="mx-auto max-w-[1600px] px-5 pt-20 md:px-8 md:pt-32">
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

      {/* Crossing bands — both ribbons share one centre axis and tilt in
          opposite directions, so they intersect into an X mid-viewport */}
      <div className="relative mt-4 h-[22vw] max-h-[20rem] min-h-[12rem] overflow-hidden md:mt-8">
        {/* Band 1 — brand gradient, rises to the right */}
        <div className="absolute top-1/2 -left-[10%] w-[120%] -translate-y-1/2 -rotate-[6deg] overflow-hidden bg-gradient-brand py-4 shadow-[0_18px_50px_rgba(6,6,11,0.45)] md:py-6">
          <div className="flex w-max animate-band-marquee">
            {bandRow("brand")}
            {bandRow("brand")}
          </div>
        </div>

        {/* Band 2 — bone white, falls to the right, rides on top at the crossing */}
        <div className="absolute top-1/2 -left-[10%] z-10 w-[120%] -translate-y-1/2 rotate-[6deg] overflow-hidden bg-white py-4 shadow-[0_18px_50px_rgba(6,6,11,0.45)] md:py-6">
          <div className="flex w-max animate-band-marquee-rev">
            {bandRow("light")}
            {bandRow("light")}
          </div>
        </div>
      </div>
    </section>
  );
}

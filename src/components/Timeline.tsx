import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { timeline } from "../content/site";
import { SectionLabel } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 05 — EVENT TIMELINE (pinned horizontal journey)
   Pattern from the 21st.dev "Timeline" component: the section holds still
   while the track slides sideways, the rule draws itself, and each milestone
   blooms as it reaches the centre. Re-skinned to the Zenith system — ink
   canvas, Wanted Sans display type, blue→pink brand accents — and driven by
   the motion/react engine the rest of the site already runs on.

   Progress is read from the section's live bounding rect on every scroll
   frame (not a cached useScroll range) so late-loading fonts and images
   above the section can never desync the pin from the track.
   ────────────────────────────────────────────────────────────────────────── */

const TOTAL = timeline.length;

function Milestone({
  item,
  index,
  total,
  above,
  armed,
  reduced,
  columnRef,
}: {
  item: (typeof timeline)[number];
  index: number;
  total: number;
  above: boolean;
  armed: boolean;
  reduced: boolean;
  columnRef: (el: HTMLDivElement | null) => void;
}) {
  const show = armed || reduced;

  return (
    <div
      ref={columnRef}
      className="relative h-[62vh] w-[66vw] shrink-0 md:h-[54vh] md:w-[23vw]"
    >
      {/* marker sitting on the rule */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 size-2.5 rounded-full bg-gradient-brand ring-4 ring-ink md:size-3"
        style={{
          transform: `translateY(-50%) scale(${show ? 1 : 0})`,
          transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* stem from the rule up/down to the copy */}
      <span
        aria-hidden
        className={`absolute left-[5px] w-px bg-white/25 md:left-[6px] ${
          above ? "bottom-1/2 h-8" : "top-1/2 h-8"
        }`}
        style={{
          transform: `scaleY(${show ? 1 : 0})`,
          transformOrigin: above ? "bottom" : "top",
          transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* copy */}
      <div
        className={`absolute left-0 w-full ${
          above ? "bottom-[calc(50%+2.75rem)]" : "top-[calc(50%+2.75rem)]"
        }`}
        style={{
          opacity: show ? 1 : 0,
          transform: `translateY(${show ? 0 : above ? 16 : -16}px)`,
          transition:
            "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span className="display text-gradient block text-[13vw] leading-none md:text-[3.2vw]">
          {item.date}
        </span>
        <h3 className="mt-3 text-lg font-bold md:text-2xl">{item.title}</h3>
        <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-white/50 md:text-[0.95rem]">
          {item.body}
        </p>
        <span className="label mt-4 inline-block text-white/35">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = !!useReducedMotion();

  /* Scroll progress through the pinned span, written on every scroll event. */
  const progress = useMotionValue(0);
  /* How far the track can travel. */
  const [shift, setShift] = useState(0);
  /* Milestones latch visible once reached — the timeline reads forward. */
  const armedRef = useRef<boolean[]>(timeline.map(() => false));
  const [armed, setArmed] = useState<boolean[]>(() => timeline.map(() => false));

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const viewport = document.documentElement.clientWidth;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const p =
        distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      progress.set(p);

      const travel = Math.max(0, track.offsetWidth - viewport);
      setShift((prev) => (prev === travel ? prev : travel));

      /* Each milestone arms once its column reaches the viewport centre.
         Measured live, so late font/image loads can never desync it. */
      const next = armedRef.current.slice();
      let changed = false;
      columnsRef.current.forEach((el, i) => {
        if (!el || next[i]) return;
        const columnCentre = el.offsetLeft + el.offsetWidth / 2;
        /* The first milestone is already on stage when the pin engages. */
        const threshold =
          i === 0 || travel <= 0
            ? 0
            : Math.min(1, Math.max(0, (columnCentre - viewport / 2) / travel));
        if (p >= threshold - 0.02) {
          next[i] = true;
          changed = true;
        }
      });
      if (changed) {
        armedRef.current = next;
        setArmed(next);
      }
    };

    /* One cheap layout read per scroll event; no rAF dependency, so the pin
       still tracks in tabs where the frame loop is throttled. */
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  const x = useTransform(progress, (p) => -shift * p);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative h-[270vh] bg-ink text-white md:h-[240vh]"
      aria-labelledby="timeline-heading"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Section marker — holds still while the track travels */}
        <div className="pointer-events-none absolute inset-x-0 top-20 z-20 mx-auto max-w-[1600px] px-5 md:top-28 md:px-8">
          <SectionLabel index="05" title="Event Timeline" />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, y: "-50%" }}
          className="absolute left-0 top-1/2 flex items-center gap-[10vw] pr-[16vw] pl-5 md:gap-[7vw] md:pr-[10vw] md:pl-8"
        >
          {/* the rule every milestone hangs from, and the gradient it fills with */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/12"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 bg-gradient-brand"
            style={{ scaleX: progress }}
          />

          {/* Lead panel */}
          <div className="w-[76vw] shrink-0 md:w-[26vw]">
            <h2
              id="timeline-heading"
              className="display text-[13vw] leading-[0.9] md:text-[4.4vw]"
            >
              The run
              <br />
              of <span className="text-gradient">show.</span>
            </h2>
            <p className="label mt-6 text-white/45">Nov 17 → Dec 19 · MLRIT</p>
            <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/55 md:text-base">
              Five moments across three days. Keep scrolling — the track
              travels, the rule draws, and each milestone lands as it reaches
              centre.
            </p>
          </div>

          {timeline.map((item, i) => (
            <Milestone
              key={`${item.date}-${item.title}`}
              item={item}
              index={i}
              total={TOTAL}
              above={i % 2 === 0}
              armed={armed[i] ?? false}
              reduced={reduced}
              columnRef={(el) => {
                columnsRef.current[i] = el;
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

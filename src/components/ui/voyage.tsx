import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* three.js is heavy — split it out so the hero never waits on it. */
const VoyageGlobe = lazy(() =>
  import("./voyage-globe").then((m) => ({ default: m.VoyageGlobe })),
);

/* ──────────────────────────────────────────────────────────────────────────
   THE AI VOYAGE — a continuation of the hero, not a new block.
   The planet climbs out of the hero's closing glow (its canvas is pulled
   up past the seam and masked in), holds while the wordmark splits and the
   planet swells toward the lens, then dissolves back into the ink the next
   section starts from. No borders, no panel edges — one continuous field.
   ────────────────────────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

export function Voyage() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Pin only where there is room for it: on phones the section stays a
       still frame instead of locking the scroll. */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const p = progress;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            onUpdate: (self) => {
              p.current = self.progress;
            },
          },
        });

        // The side words peel away early; the middle word rides the whole
        // descent, growing past the lens and only dissolving as it goes.
        tl.to("[data-voyage-left]", { xPercent: -115, opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
          .to("[data-voyage-right]", { xPercent: 115, opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
          .to("[data-voyage-mid]", { scale: 5.5, letterSpacing: "0.02em", duration: 0.95, ease: "power1.in" }, 0.05)
          .to("[data-voyage-mid]", { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.62)
          .to("[data-voyage-sub]", { opacity: 0, y: -8, ease: "none" }, 0)
          .to("[data-voyage-chrome]", { opacity: 0, y: -12, ease: "none" }, 0)
          // The junction light belongs to the arrival; the descent hands it
          // over to the planet's atmosphere.
          .to("[data-voyage-glow]", { opacity: 0, duration: 0.34, ease: "none" }, 0)
          .to("[data-voyage-label]", { opacity: 0, ease: "none" }, 0.05)
          // A horizon lifts as we come down; the field blooms, then both
          // settle back into ink so the section leaves the way the next one
          // arrives — no bright edge at the boundary.
          .to("[data-voyage-horizon]", { opacity: 0.9, duration: 0.45, ease: "power1.in" }, 0.26)
          .to("[data-voyage-horizon]", { opacity: 0, duration: 0.28, ease: "power1.out" }, 0.78)
          .to("[data-voyage-bloom]", { opacity: 0.7, duration: 0.35, ease: "power1.in" }, 0.52)
          .to("[data-voyage-bloom]", { opacity: 0, duration: 0.26, ease: "power1.out" }, 0.82);

        /* The globe is lazy-loaded, so it can mount after the page has already
           been scrolled — seed it with the live progress instead of 0, and
           re-seed whenever triggers refresh. */
        const sync = () => {
          const st = tl.scrollTrigger;
          if (st) p.current = st.progress;
        };
        sync();
        ScrollTrigger.addEventListener("refresh", sync);

        return () => ScrollTrigger.removeEventListener("refresh", sync);
      }, section);

      return () => ctx.revert();
    });

    // Pin positions shift when fonts load — recalculate once they settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="brief"
      ref={sectionRef}
      aria-label="The AI Voyage"
      className="relative isolate flex h-[100svh] min-h-[560px] items-center justify-center overflow-visible bg-ink"
    >
      {/* The horizon. This section paints *above* the hero, so this light is
          one element straddling the boundary: it rises in the hero's foot and
          sets behind the planet. Nothing is painted by the hero where it ends
          and nothing by this section where it begins, so there is no line to
          see — the only edge in the layout is invisible. It fades out as the
          descent starts (see the timeline), handing the light to the planet's
          own atmosphere. */}
      <div
        aria-hidden
        data-voyage-glow
        className="pointer-events-none absolute inset-x-0 top-[-20svh] z-0 h-[80svh] bg-[radial-gradient(78%_22%_at_50%_22.5%,rgba(255,29,142,0.50)_0%,rgba(166,50,224,0.30)_30%,rgba(68,38,224,0.10)_56%,transparent_76%)]"
      />

      {/* Globe — pulled up past the seam and masked in, so the planet's limb
          rises out of that light instead of starting at a hard edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10vh] bottom-0 z-[1] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.22)_11%,rgba(0,0,0,0.62)_18%,black_26%,black_78%,rgba(0,0,0,0.35)_93%,transparent_100%)]"
      >
        <Suspense fallback={null}>
          <VoyageGlobe progress={progress} />
        </Suspense>
      </div>

      {/* Soft shadow behind the wordmark for legibility; much lighter than a
          spotlight so the planet still reads through it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(46%_42%_at_50%_50%,rgba(6,6,11,0.48)_0%,rgba(6,6,11,0.18)_62%,transparent_100%)]"
      />

      {/* Bloom on arrival — light behind the type as the planet is reached. */}
      <div
        aria-hidden
        data-voyage-horizon
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[70vh] bg-[radial-gradient(66%_58%_at_50%_98%,rgba(255,29,142,0.62)_0%,rgba(166,50,224,0.36)_32%,rgba(68,38,224,0.14)_56%,transparent_74%)] opacity-0"
      />
      <div
        aria-hidden
        data-voyage-bloom
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(72%_64%_at_50%_52%,rgba(255,29,142,0.42)_0%,rgba(166,50,224,0.24)_38%,rgba(68,38,224,0.08)_62%,transparent_80%)] opacity-0"
      />

      {/* Foot fade — the section leaves the way the next one arrives: ink. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[12vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,6,11,0.6)_62%,#06060b_100%)]"
      />

      {/* Chrome, in the site's editorial voice */}
      <div
        data-voyage-chrome
        className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto flex w-full max-w-[1600px] items-baseline justify-between px-5 pt-24 md:px-8 md:pt-28"
      >
        <span className="label text-white/55">Sec. 01 · The Voyage</span>
        <span className="label hidden text-white/40 sm:block">Dec 17 — 19 · MLRIT</span>
      </div>

      {/* Wordmark on the planet */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span
          data-voyage-left
          className="display block text-[clamp(2.2rem,8vw,6rem)] leading-[0.9] text-white"
        >
          The
        </span>
        <span
          data-voyage-mid
          className="display text-gradient block text-[clamp(3rem,11.5vw,8.5rem)] leading-[0.86] will-change-transform"
        >
          AI
        </span>
        <span
          data-voyage-right
          className="display block text-[clamp(2.2rem,8vw,6rem)] leading-[0.9] text-white will-change-transform"
        >
          Voyage
        </span>

        <p data-voyage-sub className="mt-7 max-w-sm text-sm leading-relaxed text-white/60">
          Three days of cloud, code and competition — from the AWS Community Day to a
          24-hour build.
        </p>
      </div>

      <p
        data-voyage-label
        className="label absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/45"
      >
        Keep scrolling
      </p>
    </section>
  );
}

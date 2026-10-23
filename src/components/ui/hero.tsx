import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Cloud, Trophy } from "lucide-react";
import { REGISTER_URL, event, heroCards, links } from "../../content/site";
import { GhostButton } from "../primitives";/* ──────────────────────────────────────────────────────────────────────────
   ZENITH'26 — HERO (integrated from the supplied /components/ui/hero
   reference, re-skinned to the event poster's identity: Poppins at its
   heaviest, a near-black canvas with a purple→magenta glow, the poster's
   ZENITH wordmark (bolt + gradient letters + arrow) as the centrepiece,
   and magenta/purple/indigo accents).

   Concept: the supplied ZENITH 2026 poster lockup (bolt, gradient
   letters, 'The Year of 2026', arrow) sits alone as the hero's
   backdrop — with two frosted-glass cards for the sub-events floating
   above it, hand-drawn accents, and a rotating register badge. Pointer
   parallax gives the layers depth.
   ────────────────────────────────────────────────────────────────────────── */

/* ── Hand-drawn accents (reference paths, re-skinned to neon pink) ─────── */

const ArrowPinkLeft = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-white stroke-current overflow-visible"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowPinkRight = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-white stroke-current overflow-visible"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

/* ── Rotating register badge — the hero's second conversion point ─────── */

function Badge() {
  return (
    <a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Register for Zenith'26"
      className="group absolute bottom-[-13%] right-[2%] z-40 hidden pointer-events-auto sm:block md:right-[8%]"
    >
      <div className="relative grid size-24 rotate-12 place-items-center rounded-full bg-white shadow-[0_18px_40px_rgba(6,6,11,0.35)] transition-transform duration-300 group-hover:scale-105 md:size-36">
        <div className="absolute inset-1 animate-spin-badge">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="badge-circle"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
            </defs>
            <text
              className="text-[9px] font-black uppercase tracking-[0.18em] md:text-[11px]"
              fill="#FF1D8E"
            >
              {/* One clean revolution: textLength matches the circle's
                  circumference (2π × 36 ≈ 226) so the text never overlaps
                  itself at the seam and spacing stays even. */}
              <textPath
                href="#badge-circle"
                startOffset="0%"
                textLength="226"
                lengthAdjust="spacing"
              >
                REGISTER NOW • DEC 17—19 •
              </textPath>
            </text>
          </svg>
        </div>
        <ArrowUpRight
          className="absolute size-6 text-zenith-pink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:size-9"
          strokeWidth={3}
        />
      </div>
    </a>
  );
}

/* ── Glass sub-event card ──────────────────────────────────────────────── */

const CARD_ICONS = [Cloud, Trophy];
/* Card slots: the lockup is 980px wide, so a floating card only fits
   BESIDE the letters once the viewport has real side margins — xl
   (1280px). Below xl the cards are hidden entirely (the lockup owns
   the hero, as on the poster; the sub-events live in Program). At xl+
   they sit in the outer pockets — lower-left past '2026', upper-right
   past the arrow — with the letters' x-band (10%–90% of the image)
   fully clear. */
const CARD_SLOTS = [
  "bottom-[-5%] left-[-4%] xl:bottom-[-16%] xl:left-[-11%]",
  "top-[-5%] right-[-4%] xl:top-[0%] xl:right-[-11%]",
];
const CARD_TILT = ["rotate-[-12deg]", "rotate-[12deg]"];

function GlassCard({
  index,
  title,
  meta,
  reduced,
}: {
  index: number;
  title: string;
  meta: string;
  reduced: boolean | null;
}) {
  const Icon = CARD_ICONS[index];
  return (
    <div
      className={`absolute z-30 pointer-events-auto hidden xl:block ${CARD_SLOTS[index]}`}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.85 + index * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          animate={
            reduced ? undefined : { y: [0, index === 0 ? -15 : -20, 0] }
          }
          transition={{
            duration: index === 0 ? 5 : 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index === 0 ? 0 : 1,
          }}
        >
          <div
            className={`group flex aspect-[3/3.6] w-32 flex-col items-center justify-center rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.04] hover:!rotate-0 sm:w-40 sm:p-4 xl:w-48 xl:p-5 ${CARD_TILT[index]}`}
          >
            <div className="mb-2.5 flex size-11 items-center justify-center rounded-full border-[3px] border-white/60 bg-white shadow-[inset_0_2px_8px_rgba(6,6,11,0.14)] sm:mb-3 sm:size-14 md:mb-4 md:size-20">
              <Icon
                className={`size-5 sm:size-6 md:size-8 ${
                  index === 0 ? "text-zenith-blue" : "text-zenith-pink"
                }`}
                strokeWidth={2.2}
                aria-hidden
              />
            </div>
            <p className="text-center text-xs font-extrabold leading-snug text-white sm:text-sm md:text-lg">
              {title}
            </p>
            <p className="mt-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:mt-2 sm:text-[10px] md:text-[11px]">
              {meta}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const Component = () => {
  const reduced = useReducedMotion();

  /* Scroll parallax: as the hero leaves, the display stack drifts up
     faster than the page, the cards lag behind it, and the grid backdrop
     barely moves — three depths from one scroll. */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -150]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 56]);

  /* Pointer parallax: the type layers drift with the cursor, the cards
     counter-drift for depth. Springs keep it soft. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const l2x = useTransform(sx, (v) => v * 7);
  const l2y = useTransform(sy, (v) => v * 4);
  const c0x = useTransform(sx, (v) => v * -20);
  const c0y = useTransform(sy, (v) => v * -12);
  const c1x = useTransform(sx, (v) => v * -26);
  const c1y = useTransform(sy, (v) => v * -14);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  const cardParallax = [ { x: c0x, y: c0y }, { x: c1x, y: c1y } ];

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-hero text-white"
      aria-label="Zenith'26"
    >
      {/* Layer 1 — blueprint grid over the electric-blue field */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="absolute inset-0 z-0 bg-grid-dark pointer-events-none"
      />

      {/* Layer 2 — the field recedes into space under the fold, so the next
          section begins in the same darkness the hero ends in. Sits above the
          gradient and below the content, so the type and buttons stay crisp. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[46vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,6,11,0.35)_38%,rgba(6,6,11,0.82)_72%,#06060b_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pt-24 pb-8 md:px-8 md:pt-28">
        {/* Poster lockup + floating overlays */}
        <div className="relative flex flex-1 items-center py-5 md:py-7">
          <div className="relative mx-auto w-full max-w-5xl">
            <h1 className="sr-only">
              Zenith{event.year} — {event.tagline}
            </h1>

            {/* The event name, as background */}
            <motion.div
              aria-hidden
              style={{ y: typeY }}
              className="flex flex-col"
            >
              {/* ZENITH 2026 — the supplied poster lockup, used exactly as-is */}
              <div className="relative flex justify-center">
                <motion.div
                  className="overflow-hidden"
                  style={{ x: l2x, y: l2y }}
                >
                  <motion.div
                    className="relative"
                    initial={reduced ? false : { y: "135%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.05,
                      delay: 0.24,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <img
                      src="/img/zenith-lockup.png"
                      alt=""
                      width={2765}
                      height={1257}
                      draggable={false}
                      className="block w-[min(92vw,980px)] drop-shadow-[0_18px_50px_rgba(166,50,224,0.35)]"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Overlays: glass cards, accents, badge */}
            <motion.div style={{ y: cardsY }} className="absolute inset-0 pointer-events-none">
              {heroCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="absolute inset-0"
                  style={cardParallax[i]}
                >
                  <GlassCard
                    index={i}
                    title={card.title}
                    meta={card.meta}
                    reduced={reduced}
                  />
                </motion.div>
              ))}

              {/* Hand-drawn accents */}
              <motion.div
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-[-8%] left-0 z-20 hidden w-20 sm:block md:left-[4%] md:w-28 xl:left-[15%]"
              >
                <ArrowPinkLeft />
              </motion.div>
              <motion.div
                initial={reduced ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-[-4%] right-0 z-20 hidden w-20 sm:block md:right-[3%] md:w-28 xl:top-[62%] xl:right-[-10%]"
              >
                <ArrowPinkRight />
              </motion.div>

              <Badge />
            </motion.div>
          </div>
        </div>

        {/* Bottom: actions + scroll cue */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 border-t border-white/25 pt-6 text-center md:gap-5"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <GhostButton href="#brief">Explore the Event</GhostButton>
            <a
              href={links.problemStatements}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex items-center gap-1 text-white/85 underline decoration-white/60 decoration-2 underline-offset-4 transition-colors hover:text-white"
            >
              Problem Statements
              <ArrowUpRight className="size-3" strokeWidth={2.5} />
            </a>
          </div>

          {/* Scroll cue */}
          <div className="mt-1 flex items-center gap-3 text-white/75">
            <ArrowDown className="size-4 animate-bounce" aria-hidden />
            <span className="label">Scroll</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

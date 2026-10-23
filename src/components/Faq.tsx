import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contact, faqs } from "../content/site";
import { FadeUp, Reveal, SectionLabel } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 07 — FAQ (ink band)
   Hairline accordion: numbered rows, gradient rule on open state.
   ────────────────────────────────────────────────────────────────────────── */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="bg-ink text-white" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 md:py-14">
        <FadeUp>
          <SectionLabel index="08" title="Questions" />
        </FadeUp>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-10">
          {/* One sticky column — heading + contact pin together so they
              can never collide the way two separate stickies did */}
          <div className="md:col-span-4 md:sticky md:top-24 md:self-start">
            <h2 id="faq-heading" className="display text-[13vw] leading-[0.9] md:text-[4.4vw]">
              <Reveal>
                <span>
                  FAQ<span className="text-gradient">s.</span>
                </span>
              </Reveal>
            </h2>
            <div className="hidden md:mt-8 md:block">
              <p className="max-w-xs text-sm leading-relaxed text-white/55">
                Can&apos;t find what you&apos;re looking for? Write to us and the SCOPE
                team will get back to you.
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="label mt-4 inline-block text-white underline decoration-zenith-pink decoration-2 underline-offset-4 transition-colors hover:text-zenith-pink"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ul className="hairline-t">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="border-b border-white/12">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="group flex w-full items-start gap-4 py-5 text-left"
                      >
                        <span
                          className={`label tnum mt-1.5 shrink-0 transition-colors ${
                            isOpen ? "text-zenith-pink" : "text-white/35"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-lg leading-snug font-semibold transition-colors group-hover:text-gradient md:text-xl">
                          {f.q}
                        </span>
                        {/* plus → minus */}
                        <span
                          aria-hidden
                          className="relative mt-2 size-4 shrink-0 text-white/55"
                        >
                          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                          <span
                            className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-400 ${
                              isOpen ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={reduced ? { height: "auto" } : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? { height: "auto" } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 pl-10 text-[0.95rem] leading-relaxed text-white/70">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

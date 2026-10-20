import { links, program } from "../content/site";
import { FadeUp, GhostButton, Reveal, SectionLabel } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 04 — THE PROGRAM (ink band)
   Three event dossiers as glassmorphism stacking cards: each card sticks
   below the nav as you scroll and the next one piles over it, leaving a
   sliver of every previous card visible at the top — pure CSS sticky,
   no scroll listeners, so it stays smooth on every device.
   ────────────────────────────────────────────────────────────────────────── */

export function Program() {
  return (
    <section id="program" className="bg-ink text-white" aria-labelledby="program-heading">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-8 md:px-8 md:pt-32">
        <FadeUp>
          <SectionLabel index="04" title="The Program" />
        </FadeUp>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="program-heading" className="display text-[13vw] leading-[0.9] md:text-[5.6vw]">
            <Reveal>
              <span>Three days,</span>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="text-gradient">one summit.</span>
            </Reveal>
          </h2>
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap gap-3 pb-2">
              <GhostButton href={links.problemStatements} external>
                Problem Statements
              </GhostButton>
              <GhostButton href={links.itinerary} external>
                Itinerary
              </GhostButton>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Stacking glass cards — one per day */}
      <div className="relative mx-auto max-w-[1600px] px-5 pb-24 md:px-8 md:pb-36">
        {/* Soft brand glow behind the stack, so the blur has light to bend */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-32 mx-auto h-[46rem] max-w-5xl rounded-full bg-gradient-brand opacity-[0.18] blur-[130px]"
        />

        {program.map((p, i) => (
          <article
            key={p.title}
            style={{ top: `calc(5.25rem + ${i} * 1.4rem)`, zIndex: i + 1 }}
            className="sticky mb-6 rounded-[26px] border border-white/15 bg-white/[0.07] p-6 shadow-[0_40px_90px_-30px_rgba(6,6,11,0.9)] ring-1 ring-white/10 inset-ring-white/10 backdrop-blur-2xl md:mb-10 md:min-h-[70vh] md:rounded-[36px] md:p-12"
          >
            <div className="grid h-full gap-8 md:grid-cols-12 md:items-center md:gap-12">
              {/* Left — day chip, title, body, tags */}
              <div className="flex flex-col justify-center md:col-span-6">
                <div className="flex items-center gap-4">
                  <span className="display tnum text-gradient text-3xl md:text-5xl">
                    {p.index}
                  </span>
                  <span className="label rounded-full border border-white/25 px-3 py-1 text-white/70">
                    {p.day}
                  </span>
                </div>

                <h3 className="display mt-6 text-[10vw] leading-[0.92] md:mt-8 md:text-[3vw]">
                  {p.title}
                </h3>

                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/70 md:mt-7 md:text-lg">
                  {p.body}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 md:mt-8">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="label rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/70"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — glass visual panel with the day numeral */}
              <div className="md:col-span-5 md:col-start-8">
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-xl md:aspect-[4/3] md:rounded-[28px]">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-brand opacity-25 blur-[2px]"
                    style={{ maskImage: "radial-gradient(120% 120% at 50% 120%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(120% 120% at 50% 120%, #000 30%, transparent 75%)" }}
                  />
                  <span className="display tnum text-gradient relative text-[26vw] leading-none md:text-[11vw]">
                    {p.index}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

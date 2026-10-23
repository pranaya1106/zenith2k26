import { domains } from "../content/site";
import { FadeUp, Reveal, SectionLabel } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 03 — DOMAINS (ink band)
   Numbered editorial rows with authentic Zenith iconography.
   Hovering a row lifts it with a soft white wash — the gradient sweeps the baseline.
   ────────────────────────────────────────────────────────────────────────── */

export function Domains() {
  return (
    <section id="domains" className="bg-ink text-white" aria-labelledby="domains-heading">
      <div className="mx-auto max-w-[1600px] px-5 pt-14 pb-6 md:px-8 md:pt-14">
        <FadeUp>
          <SectionLabel index="03" title="Where You Build" />
        </FadeUp>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2
            id="domains-heading"
            className="display text-gradient text-[13vw] leading-[0.9] md:text-[5.6vw]"
          >
            <Reveal>
              <span>Hackathon</span>
            </Reveal>
            <Reveal delay={0.08}>
              <span>Domains</span>
            </Reveal>
          </h2>
          <FadeUp delay={0.1}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-white/60">
              Three tracks. One 24-hour sprint. Pick the problem space that moves you.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-14 md:px-8 md:pb-14">
        <div className="hairline-t">
          {domains.map((d, i) => (
            <FadeUp key={d.id} delay={0.05 * i}>
              <article className="group relative border-b border-white/12">
                {/* hover wash */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <div className="relative grid items-center gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="label tnum text-white/45 md:col-span-1">{d.index}</span>

                  <div className="flex items-center gap-5 md:col-span-5">
                    <img
                      src={d.image}
                      alt=""
                      aria-hidden
                      className="size-12 shrink-0 transition-all duration-500 group-hover:scale-110 md:size-14"
                      loading="lazy"
                      width={56}
                      height={56}
                    />
                    <h3 className="display text-[9vw] leading-none transition-colors duration-500 group-hover:text-gradient md:col-span-5 md:text-[3.4vw]">
                      {d.name}
                    </h3>
                  </div>

                  <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/85 md:col-span-5 md:col-start-8">
                    {d.body}
                  </p>
                </div>
                {/* gradient baseline sweep */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-brand transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

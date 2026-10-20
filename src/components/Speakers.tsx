import { Linkedin } from "lucide-react";
import { speakers } from "../content/site";
import { FadeUp, Reveal, SectionLabel } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 05 — SPEAKERS (bone band)
   One hero portrait + an asymmetric editorial grid. Portraits are
   monochrome until hover — the gradient rule ignites underneath.
   ────────────────────────────────────────────────────────────────────────── */

const [lead, ...rest] = speakers;

export function Speakers() {
  return (
    <section id="speakers" className="bg-bone text-ink" aria-labelledby="speakers-heading">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-10 md:px-8 md:pt-32">
        <FadeUp>
          <SectionLabel index="06" title="Speakers" tone="light" />
        </FadeUp>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="speakers-heading" className="display text-[13vw] leading-[0.9] md:text-[5.6vw]">
            <Reveal>
              <span>Meet the</span>
            </Reveal>
            <Reveal delay={0.08}>
              <span>experts.</span>
            </Reveal>
          </h2>
          <FadeUp delay={0.1}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-ink/60">
              Industry experts and thought leaders from the global AWS community.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-20 md:px-8 md:pb-32">
        {/* Lead speaker — 5/7 split */}
        <FadeUp>
          <article className="group grid gap-6 border-t border-ink/15 pt-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-ink/12 bg-white p-2 shadow-[0_16px_40px_rgba(6,6,11,0.08)]">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    width={800}
                    height={800}
                    loading="eager"
                    className="aspect-[4/3] w-full object-cover object-top grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0 md:aspect-square"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 md:col-span-7 md:col-start-6">
              <div>
                <span className="label text-zenith-blue">Keynote</span>
                <h3 className="display mt-3 text-[9vw] leading-[0.92] md:text-[3.6vw]">
                  {lead.name}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65 md:text-base">
                  {lead.role}
                </p>
              </div>
              <a
                href={lead.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex w-fit items-center gap-2 border border-ink/25 px-4 py-2.5 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
              >
                <Linkedin className="size-3.5" aria-hidden />
                Connect on LinkedIn
              </a>
            </div>
          </article>
        </FadeUp>

        {/* Remaining speakers — 6-col grid: three standard cells, then two wide
            cells so the final row never leaves a dead column */}
        <div className="mt-4 grid gap-x-6 gap-y-10 hairline-ink-t pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {rest.map((s, i) => {
            return (
              <FadeUp key={s.name} delay={0.05 * i}>
                <article className="group flex h-full flex-col">
                  <div className="rounded-2xl border border-ink/12 bg-white p-2 shadow-[0_16px_40px_rgba(6,6,11,0.08)]">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={s.image}
                        alt={s.name}
                        width={600}
                        height={600}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover object-top grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0 h-px w-full origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <h3 className="display mt-4 text-2xl md:text-3xl">{s.name}</h3>
                  <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-ink/55">
                    {s.role}
                  </p>
                  <a
                    href={s.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-4 inline-flex w-fit items-center gap-2 text-ink/60 underline decoration-ink/25 decoration-1 underline-offset-4 transition-colors hover:text-zenith-pink hover:decoration-zenith-pink"
                  >
                    <Linkedin className="size-3.5" aria-hidden />
                    Connect on LinkedIn
                  </a>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

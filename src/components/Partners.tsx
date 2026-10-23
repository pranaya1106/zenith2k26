import { FadeUp, SectionLabel } from "./primitives";
import { InfiniteSlider } from "./ui/infinite-slider";

/* ──────────────────────────────────────────────────────────────────────────
   SEC. 07 — PARTNERS (ink band)
   Sponsor slots stream as big "coming soon" type on an infinite loop
   (21st.dev InfiniteSlider) until Zenith'26 sponsors are announced.
   ────────────────────────────────────────────────────────────────────────── */

const SPONSOR_TEASES = Array.from({ length: 6 }, (_, i) => i);

export function Partners() {
  return (
    <section className="bg-ink text-white" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 md:py-14">
        <FadeUp>
          <SectionLabel index="07" title="Partners" />
        </FadeUp>
        <h2 id="partners-heading" className="sr-only">
          Partners and sponsors
        </h2>

        <FadeUp delay={0.08} className="mt-10 md:mt-14">
          <p className="label pb-4 text-white/45 hairline-b">Sponsors</p>

          {/* Edge-to-edge teaser stream — same infinite loop, no logo plates */}
          <div aria-hidden>
            <InfiniteSlider
              gap={48}
              duration={30}
              className="-mx-5 mt-10 md:-mx-8 md:mt-12"
            >
              {SPONSOR_TEASES.map((i) => (
                <span key={i} className="flex shrink-0 items-center gap-12">
                  <span className="display text-5xl whitespace-nowrap text-white/90 md:text-7xl lg:text-8xl">
                    Coming Soon
                  </span>
                  <span
                    className="size-3 shrink-0 rounded-full bg-gradient-brand md:size-4"
                  />
                </span>
              ))}
            </InfiniteSlider>
          </div>

          <p className="mt-10 text-xs text-white/35">
            Sponsor announcements for Zenith'26 are coming soon.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

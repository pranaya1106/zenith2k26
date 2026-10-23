import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, REGISTER_URL, event } from "../content/site";
import { RegisterButton } from "./primitives";

/* ──────────────────────────────────────────────────────────────────────────
   Navigation — thin fixed rail + full-screen mobile overlay
   ────────────────────────────────────────────────────────────────────────── */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#brief"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-ink/85 backdrop-blur-md hairline-b" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-18 md:px-8">
          {/* Identity lockup */}
          <a href="#top" className="group flex items-center gap-3" aria-label="Zenith'26 home">
            <img
              src="/img/scope-logo.png"
              alt="SCOPE Club"
              className="h-6 w-auto brightness-0 invert md:h-7"
              loading="eager"
              width={120}
              height={34}
            />
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label group relative text-white/70 transition-colors hover:text-white"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* wrapper carries the responsive display — RegisterButton's own
                `inline-flex` would otherwise out-specify a `hidden` utility */}
            <span className="hidden sm:block">
              <RegisterButton size="sm" tone="light" />
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center border border-white/25 text-white transition-colors hover:border-white lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-16 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-5">
              {nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline gap-4 border-b border-white/10 py-4 text-4xl text-white transition-colors hover:text-zenith-pink sm:text-5xl"
                >
                  <span className="label text-gradient">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-4 px-5 pb-10">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-brand px-6 py-4 text-center text-sm font-semibold tracking-widest uppercase"
              >
                Register Now
              </a>
              <p className="label text-white/40">
                {event.datesLabel} · {event.venueLine}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import "./index.css";
import App from "./App";

/* Bare `"#"` placeholders (e.g. Register CTAs while registration is closed)
   must stay inert: no top-jump, no hash change, no new tab — on every
   input path, including reduced motion where the Lenis handler is absent. */
document.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a");
  if (a && a.getAttribute("href") === "#") e.preventDefault();
});

/* ── Smooth scroll (Lenis) ────────────────────────────────────────────────
   Native-feeling inertia over the whole page; anchor links keep working
   because Lenis scrolls the real window. Skipped entirely when the user
   prefers reduced motion. */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const loop = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  /* In-page anchors (#brief, #program …) go through Lenis so they glide */
  document.addEventListener("click", (e) => {
    const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor?.hash) return;
    const target = document.querySelector(anchor.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -80 });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

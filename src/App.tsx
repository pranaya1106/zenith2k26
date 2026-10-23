import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Voyage } from "./components/ui/voyage";
import { Highlights } from "./components/Highlights";
import { Domains } from "./components/Domains";
import { Program } from "./components/Program";
import { Timeline } from "./components/Timeline";
import { Speakers } from "./components/Speakers";
import { Partners } from "./components/Partners";
import { Faq } from "./components/Faq";
import { Finale } from "./components/Finale";
import { Footer } from "./components/Footer";

/* ──────────────────────────────────────────────────────────────────────────
   ZENITH'26 — SCOPE Club, MLR Institute of Technology
   Section rhythm: one continuous ink field, closing on the brand gradient.
   ────────────────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="bg-ink">
      <Nav />
      <main>
        <Hero />
        <Voyage />
        <Highlights />
        <Domains />
        <Program />
        <Timeline />
        <Speakers />
        <Partners />
        <Faq />
        <Finale />
      </main>
      <Footer />
    </div>
  );
}

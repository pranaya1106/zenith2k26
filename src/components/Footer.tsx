import { ArrowUp, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contact, event, nav, REGISTER_URL, socials } from "../content/site";

/* ──────────────────────────────────────────────────────────────────────────
   FOOTER — compact contact ledger + oversized cropped wordmark.
   ────────────────────────────────────────────────────────────────────────── */

const iconFor = (name: string) => {
  switch (name) {
    case "instagram":
      return Instagram;
    case "linkedin":
      return Linkedin;
    case "github":
      return Github;
    default:
      return Instagram;
  }
};

/** X (formerly Twitter) — brand mark drawn inline (lucide ships no X glyph). */
function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-white" id="contact">
      {/* Contact ledger */}
      <div className="mx-auto max-w-[1600px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-10 hairline-b pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
          <div className="md:col-span-4">
            <p className="label flex items-center gap-2 text-white/45">
              <Mail className="size-3.5" aria-hidden /> Chat with us
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 block text-lg break-all transition-colors hover:text-zenith-pink md:text-xl"
            >
              {contact.email}
            </a>
            <ul className="mt-4 space-y-1.5">
              {contact.people.map((p) => (
                <li key={p.tel} className="text-sm text-white/60">
                  {p.name}:{" "}
                  <a
                    href={`tel:${p.tel}`}
                    className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    {p.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <p className="label flex items-center gap-2 text-white/45">
              <MapPin className="size-3.5" aria-hidden /> Visit us
            </p>
            <address className="mt-4 space-y-1 text-sm text-white/60 not-italic">
              <p className="font-semibold text-white/85">{contact.address.line1}</p>
              <p>{contact.address.line2}</p>
              <p>{contact.address.line3}</p>
              <p>PIN Code: {contact.address.pin}</p>
            </address>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="label text-white/45">Follow</p>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => {
                const isX = s.icon === "x";
                const Icon = iconFor(s.icon);
                return (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {isX ? <XIcon className="size-4" /> : <Icon className="size-4" aria-hidden />}
                      <span className="label">{s.name}</span>
                      <span
                        aria-hidden
                        className="h-px w-6 origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Sitemap row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 hairline-b">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="label text-white/50 transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-gradient"
            >
              Register
            </a>
          </nav>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="label flex items-center gap-2 border border-white/20 px-3 py-2 text-white/60 transition-colors hover:border-white hover:text-white"
          >
            <ArrowUp className="size-3.5" aria-hidden /> Back to top
          </button>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative overflow-hidden select-none" aria-hidden>
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <p className="display text-[19.5vw] leading-[0.8] whitespace-nowrap text-white/7">
            Zenith<span className="text-gradient opacity-35">{event.year}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-6 md:px-8">
        <p className="label text-white/35">© Scope Club. All rights reserved.</p>
        <p className="label flex items-center gap-2 text-white/35">
          <Phone className="size-3.5" aria-hidden />
          {event.instituteShort} · {event.city}
        </p>
      </div>
    </footer>
  );
}

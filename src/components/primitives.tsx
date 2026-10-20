import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { REGISTER_URL } from "../content/site";

/* ──────────────────────────────────────────────────────────────────────────
   Shared motion + typography primitives for Zenith'26
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Reveals children through an upward mask with a soft spring.
 * NOTE: the observer sits on the un-transformed wrapper — if it sat on the
 * translated child, ancestor `overflow: hidden` would clip the intersection
 * to zero and the reveal would never fire.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.div
        variants={{
          hidden: { y: "110%" },
          shown: { y: "0%" },
        }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Simple fade + rise on scroll. */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Uppercase section marker: "SEC. 01 — THE BRIEF" */
export function SectionLabel({
  index,
  title,
  tone = "dark",
}: {
  index: string;
  title: string;
  tone?: "dark" | "light";
}) {
  const sub = tone === "dark" ? "text-white/45" : "text-ink/45";
  return (
    <div className={`label flex items-center gap-3 ${sub}`}>
      <span className="text-gradient">SEC. {index}</span>
      <span aria-hidden className={`h-px w-8 ${tone === "dark" ? "bg-white/25" : "bg-ink/25"}`} />
      <span>{title}</span>
    </div>
  );
}

/** Primary registration CTA — the one gradient button in the system. */
export function RegisterButton({
  className = "",
  label = "Register Now",
  size = "md",
  tone = "brand",
}: {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  /** brand = gradient (dark surfaces); light = solid white (electric-blue surfaces). */
  tone?: "brand" | "light";
}) {
  const pad =
    size === "sm"
      ? "px-4 py-2 text-xs"
      : size === "lg"
        ? "px-9 py-5 text-base md:text-lg"
        : "px-6 py-3.5 text-sm md:text-base";
  const skin =
    tone === "light" ? "bg-white text-zenith-blue" : "bg-gradient-brand text-white";
  const sheen = tone === "light" ? "bg-zenith-blue/15" : "bg-white/25";
  return (
    <a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-3 overflow-hidden font-semibold tracking-wide uppercase transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${skin} ${pad} ${className}`}
    >
      {/* sheen sweep on hover */}
      <span
        aria-hidden
        className={`absolute inset-y-0 -left-full w-full transition-all duration-500 group-hover:left-full ${sheen}`}
        style={{ width: "60%" }}
      />
      <span className="relative">{label}</span>
      <ArrowUpRight
        className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
      />
    </a>
  );
}

/** Ghost/outline action used for secondary navigation. */
export function GhostButton({
  href,
  children,
  tone = "dark",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  external?: boolean;
  className?: string;
}) {
  const border = tone === "dark" ? "border-white/30 text-white" : "border-ink/30 text-ink";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 border px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${border} ${
        tone === "dark" ? "hover:border-white hover:bg-white hover:text-ink" : "hover:border-ink hover:bg-ink hover:text-bone"
      } ${className}`}
    >
      {children}
      {external && <ArrowUpRight className="size-4" strokeWidth={2.5} />}
    </a>
  );
}

import { Component } from "./hero";

/* Demo harness for the integrated hero component.
   NOTE: the reference demo used the "@/components/ui/hero" alias — this
   project doesn't configure path aliases, so the import is relative.
   The component is already mounted as the live hero via components/Hero;
   this file documents standalone usage (no router in this project). */
export default function Page() {
  return (
    <div className="w-full h-full min-h-screen">
      <Component />
    </div>
  );
}

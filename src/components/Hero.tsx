import { Component } from "./ui/hero";

/* Thin adapter: the hero now lives as an integrated shadcn-style
   component in /components/ui/hero — App keeps importing `Hero`. */
export const Hero = Component;

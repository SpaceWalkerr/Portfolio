import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once for the whole app.
gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The site's cinematic easing (matches the design-system recommendation).
export const EASE = "power4.out";
export const EASE_EXPO = "expo.inOut";

export { gsap, ScrollTrigger };

import type { Transition, Variants } from "motion/react";

/** Expo-out curve used across the site for a calm, premium feel. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

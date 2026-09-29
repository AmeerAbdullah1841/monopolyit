"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { EASE_OUT, fadeUp, staggerContainer } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Vertical offset in px the element travels while revealing. */
  y?: number;
};

/** Fades + lifts its children into view the first time they scroll on screen. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delay?: number;
};

/** Parent that reveals each direct `StaggerItem` in sequence. */
export function Stagger({ stagger = 0.08, delay = 0, children, ...rest }: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}

"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { EASE_OUT } from "@/lib/motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` once visible. Writes straight to the DOM node so the
 * animation doesn't re-render React on every frame.
 */
export function Counter({ value, suffix = "", duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    if (reduce) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, suffix, duration]);

  return (
    <span className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span ref={ref} aria-hidden className="tabular-nums">
        0{suffix}
      </span>
    </span>
  );
}

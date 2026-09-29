"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Transition,
} from "motion/react";
import type { PointerEvent } from "react";

import { EASE_OUT } from "@/lib/motion";

const draw = (delay: number, duration = 1.6): Transition => ({
  pathLength: { delay, duration, ease: EASE_OUT },
  opacity: { delay, duration: 0.3 },
});

const C = 200; // viewBox centre

/** Points of an equilateral triangle inscribed in a circle of radius `r`. */
function triangle(r: number, rotation: number) {
  return Array.from({ length: 3 }, (_, i) => {
    const angle = ((rotation + i * 120) * Math.PI) / 180;
    return `${C + r * Math.cos(angle)},${C + r * Math.sin(angle)}`;
  }).join(" ");
}

const nodes = [
  { cx: C, cy: C - 150 },
  { cx: C + 150, cy: C },
  { cx: C, cy: C + 150 },
  { cx: C - 150, cy: C },
];

/**
 * Animated blueprint emblem for the hero. Rings draw themselves in, the
 * dashed ring and orbit rotate, and the whole card tilts toward the pointer.
 */
export function HeroEmblem() {
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), springCfg);
  const glowX = useTransform(px, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(py, [0, 1], ["20%", "80%"]);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${glowX} ${glowY}, rgb(95 208 234 / 0.12), transparent 70%)`;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  const initial = reduce ? false : { pathLength: 0, opacity: 0 };
  const animateTo = { pathLength: 1, opacity: 1 };

  return (
    <div className="[perspective:1200px]" onPointerMove={handleMove} onPointerLeave={reset}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="surface relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-[2rem] p-6"
      >
        <motion.div aria-hidden className="absolute inset-0" style={{ background: glow }} />
        <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-60" />

        <svg viewBox="0 0 400 400" className="relative h-full w-full" fill="none" aria-hidden>
          <defs>
            <linearGradient id="emblem-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f6dc93" />
              <stop offset="100%" stopColor="#dcae3c" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="emblem-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5fd0ea" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#5fd0ea" stopOpacity="0" />
            </radialGradient>
            <filter id="emblem-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Crosshair */}
          <motion.line x1="20" y1={C} x2="380" y2={C} stroke="#5fd0ea" strokeOpacity="0.35" strokeWidth="1"
            initial={initial} animate={animateTo} transition={draw(0.3, 1.2)} />
          <motion.line x1={C} y1="20" x2={C} y2="380" stroke="#5fd0ea" strokeOpacity="0.12" strokeWidth="1"
            initial={initial} animate={animateTo} transition={draw(0.4, 1.2)} />

          {/* Outer ring */}
          <motion.circle cx={C} cy={C} r="150" stroke="#5fd0ea" strokeOpacity="0.75" strokeWidth="1.25"
            initial={initial} animate={animateTo} transition={draw(0.2, 1.8)} />

          {/* Rotating dashed ring */}
          <g className="origin-center animate-spin-slow [transform-box:view-box]">
            <circle cx={C} cy={C} r="118" stroke="#5fd0ea" strokeOpacity="0.35" strokeDasharray="3 9" />
          </g>

          {/* Interlocking triangles */}
          <motion.polygon points={triangle(170, -90)} stroke="#5fd0ea" strokeOpacity="0.4" strokeWidth="1"
            initial={initial} animate={animateTo} transition={draw(0.6, 2)} />
          <motion.polygon points={triangle(170, 90)} stroke="#5fd0ea" strokeOpacity="0.25" strokeWidth="1"
            initial={initial} animate={animateTo} transition={draw(0.8, 2)} />

          {/* Core */}
          <circle cx={C} cy={C} r="72" fill="url(#emblem-core)" />
          <motion.circle cx={C} cy={C} r="72" stroke="#5fd0ea" strokeOpacity="0.55" strokeWidth="1"
            initial={initial} animate={animateTo} transition={draw(1, 1.4)} />

          {/* Gold diamond with glow */}
          <polygon points="200,128 240,200 200,272 160,200" stroke="#f0c75e" strokeWidth="3" strokeOpacity="0.45"
            filter="url(#emblem-blur)" className="animate-pulse-soft origin-center [transform-box:fill-box]" />
          <motion.polygon points="200,128 240,200 200,272 160,200" stroke="url(#emblem-gold)" strokeWidth="1.5"
            strokeLinejoin="round" initial={initial} animate={animateTo} transition={draw(1.2, 1.6)} />
          <motion.polyline points="160,200 200,232 240,200" stroke="#f0c75e" strokeOpacity="0.6" strokeWidth="1"
            initial={initial} animate={animateTo} transition={draw(1.6, 1)} />

          {/* Cardinal nodes */}
          {nodes.map((node, i) => (
            <motion.circle
              key={i}
              {...node}
              r="3.5"
              className="fill-ink-900 stroke-cyan-400"
              strokeWidth="1.25"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4 + i * 0.12, type: "spring", stiffness: 400, damping: 18 }}
            />
          ))}

          {/* Orbiting satellite */}
          <g className="origin-center animate-spin-slower [transform-box:view-box]">
            <circle cx={C} cy={C - 150} r="5" fill="#f0c75e" />
            <circle cx={C} cy={C - 150} r="12" fill="#f0c75e" fillOpacity="0.15" />
          </g>
        </svg>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: EASE_OUT }}
          className="absolute inset-x-6 bottom-6 rounded-xl border border-line bg-ink-900/70 py-3 text-center font-mono text-[0.7rem] tracking-[0.3em] text-cyan-400 backdrop-blur"
        >
          ADVISE <span className="text-subtle">/</span> STAFF <span className="text-subtle">/</span> DELIVER
        </motion.div>
      </motion.div>
    </div>
  );
}

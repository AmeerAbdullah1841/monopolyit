"use client";

import { Clock } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { phases, type Phase } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Approach() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="approach" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          align="center"
          pill
          eyebrow="Delivery approach"
          title="How we engage with clarity"
          description="A straight-line path from first call to steady delivery—no mystery phases, no black-box hiring."
        />

        <ol ref={trackRef} className="relative mx-auto mt-20 flex max-w-5xl flex-col gap-12 md:gap-6">
          {/* Timeline rail: faint base + scroll-driven gradient fill. */}
          <div aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-cyan-400 via-cyan-300 to-gold-400 shadow-[0_0_12px] shadow-cyan-400/60 md:left-1/2 md:-translate-x-1/2"
          />

          {phases.map((phase, i) => (
            <PhaseRow key={phase.title} phase={phase} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhaseRow({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-35% 0px -35% 0px" });
  const reduce = useReducedMotion();
  const onRight = index % 2 === 1;

  return (
    <li ref={ref} className="relative grid pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
      {/* Node on the rail */}
      <span
        aria-hidden
        className="absolute top-10 left-4 z-10 flex size-4 -translate-x-1/2 items-center justify-center md:top-1/2 md:left-1/2 md:-translate-y-1/2"
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-700",
            inView ? "scale-100 border-cyan-400 bg-ink-900 shadow-[0_0_16px] shadow-cyan-400/70" : "scale-75 border-line-strong bg-ink-900",
          )}
        />
        <span
          className={cn(
            "relative size-1.5 rounded-full bg-gold-400 transition-transform duration-500",
            inView ? "scale-100" : "scale-0",
          )}
        />
        {inView && !reduce && (
          <motion.span
            className="absolute inset-0 rounded-full border border-cyan-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
      </span>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: onRight ? 48 : -48, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className={cn(onRight && "md:col-start-2", "md:py-8")}
      >
        <SpotlightCard className="p-7 md:p-9">
          <span className="inline-flex rounded-full border border-cyan-400/30 px-3.5 py-1 font-mono text-xs tracking-[0.25em] text-cyan-400">
            PHASE {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-2xl font-semibold text-white">{phase.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{phase.description}</p>

          <p className="mt-6 flex items-center gap-2 text-sm text-fg">
            <Clock className="size-4 text-cyan-400" aria-hidden />
            Duration: <span className="text-cyan-400">{phase.duration}</span>
          </p>

          <p className="eyebrow mt-7 !text-[0.7rem]">Key deliverables</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {phase.deliverables.map((d) => (
              <li key={d} className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-fg/90">
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-baseline gap-3 border-t border-line pt-6">
            <span className="text-4xl font-semibold tracking-tight text-cyan-400">{phase.metric.value}</span>
            <span className="text-sm text-muted">{phase.metric.label}</span>
          </div>
        </SpotlightCard>
      </motion.div>
    </li>
  );
}

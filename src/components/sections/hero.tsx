"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/button";
import { HeroEmblem } from "@/components/ui/hero-emblem";
import { Magnetic } from "@/components/ui/magnetic";
import { whyUs } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

type Word = { text: string; tone?: "cyan" | "gold" | "blend" };

const headline: Word[] = [
  { text: "The" },
  { text: "partner" },
  { text: "for" },
  { text: "IT", tone: "cyan" },
  { text: "strategy,", tone: "cyan" },
  { text: "expert", tone: "blend" },
  { text: "talent,", tone: "blend" },
  { text: "and", tone: "gold" },
  { text: "delivery", tone: "gold" },
  { text: "—without" },
  { text: "the" },
  { text: "guesswork." },
];

const toneClass: Record<NonNullable<Word["tone"]>, string> = {
  cyan: "text-cyan-400",
  blend: "bg-gradient-to-r from-cyan-300 to-gold-300 bg-clip-text text-transparent",
  gold: "text-gold-400",
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_OUT } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const emblemY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const initial = reduce ? false : "hidden";

  return (
    <section id="home" ref={ref} className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <HeroBackdrop />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y: contentY, opacity: fade }}>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink-800/60 px-4 py-2 !text-fg backdrop-blur"
          >
            <Sparkles className="size-3.5 text-cyan-400" aria-hidden />
            Consulting &amp; Staffing
          </motion.span>

          <motion.h1
            className="mt-7 text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.025em] text-balance text-white sm:text-6xl lg:text-[4.1rem]"
            initial={initial}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } } }}
          >
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${word.tone ? toneClass[word.tone] : ""}`}
                >
                  {word.text}
                </motion.span>
                {i < headline.length - 1 && !headline[i + 1].text.startsWith("—") && " "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.9 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted"
          >
            Senior consultants to shape the plan, vetted engineers to execute it. We help teams modernise systems
            and fill critical roles in days—with pricing and progress you can actually audit.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <ButtonLink href="/#contact" className="px-7 py-3.5">
                Start a project
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/#staffing" variant="outline" className="px-7 py-3.5">
              Hire talent
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={initial}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.25 } } }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          >
            {whyUs.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Icon className="size-4 text-cyan-400" aria-hidden />
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: emblemY }}>
          <HeroEmblem />
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid mask-radial absolute inset-0" />
      <motion.div
        className="absolute -top-40 -left-32 size-[36rem] rounded-full bg-cyan-500/[0.09] blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 size-[30rem] rounded-full bg-gold-400/[0.06] blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="divider-glow absolute inset-x-0 bottom-0" />
    </div>
  );
}

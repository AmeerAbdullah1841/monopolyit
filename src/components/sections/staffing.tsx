"use client";

import { ArrowRight, CircleCheck, Clock, Target } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { engagementModels, roles, technologies } from "@/lib/content";
import { EASE_OUT, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Staffing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const model = engagementModels[activeIndex];

  // Roving arrow-key navigation per the WAI-ARIA tabs pattern.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = (activeIndex + delta + engagementModels.length) % engagementModels.length;
    setActiveIndex(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <section id="staffing" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute top-1/4 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.05] blur-[140px]" />

      <div className="container-page">
        <SectionHeading
          align="center"
          pill
          eyebrow="Staffing models"
          title={
            <>
              The right people, on the <span className="text-gold-400">terms</span> that fit.
            </>
          }
          description="From a single specialist for a sprint to a fully managed delivery pod—every engagement comes with practitioner-led vetting and a replacement guarantee."
        />

        <Reveal delay={0.1} className="mt-16 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div
            role="tablist"
            aria-label="Engagement models"
            aria-orientation="vertical"
            onKeyDown={handleKeyDown}
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {engagementModels.map((m, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={m.id}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative isolate flex shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300",
                    selected ? "text-white" : "text-muted hover:bg-ink-800/50 hover:text-white",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="staffing-tab"
                      transition={spring}
                      className="surface absolute inset-0 -z-10 rounded-2xl !border-cyan-400/30"
                    />
                  )}
                  <span
                    className={cn(
                      "font-mono text-xs transition-colors",
                      selected ? "text-cyan-400" : "text-subtle",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-medium">{m.label}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${activeIndex}`}
            className="surface relative min-h-[22rem] overflow-hidden rounded-3xl p-8 md:p-10"
          >
            <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-50" />
            <AnimatePresence mode="wait">
              <motion.div
                key={model.id}
                initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="relative grid gap-10 md:grid-cols-[1.3fr_1fr]"
              >
                <div>
                  <p className="eyebrow">{model.label}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{model.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{model.description}</p>

                  <ul className="mt-8 flex flex-col gap-3">
                    {model.points.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: EASE_OUT }}
                        className="flex items-center gap-3 text-fg/90"
                      >
                        <CircleCheck className="size-4.5 shrink-0 text-cyan-400" aria-hidden />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <InfoTile icon={Target} label="Best for" value={model.bestFor} />
                  <InfoTile icon={Clock} label="Speed" value={model.timeline} accent />
                  <ButtonLink href="/#contact" variant="outline" className="mt-auto w-full">
                    Request talent
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </ButtonLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <div className="mt-24 flex flex-col gap-4">
        <Reveal>
          <p className="eyebrow container-page mb-4 text-center !text-subtle">Roles we place &amp; stacks we know</p>
        </Reveal>
        <Marquee duration={45}>
          {roles.map((role) => (
            <Chip key={role} tone="cyan">
              {role}
            </Chip>
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {technologies.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-subtle uppercase">
        <Icon className={cn("size-3.5", accent ? "text-gold-400" : "text-cyan-400")} aria-hidden />
        {label}
      </p>
      <p className={cn("mt-2 font-medium", accent ? "text-gold-300" : "text-white")}>{value}</p>
    </div>
  );
}

function Chip({ children, tone }: { children: string; tone?: "cyan" }) {
  return (
    <span
      className={cn(
        "rounded-full border px-5 py-2.5 text-sm whitespace-nowrap transition-colors",
        tone === "cyan"
          ? "border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-300 hover:border-cyan-400/50"
          : "border-line bg-ink-800/50 text-fg/80 hover:border-line-strong",
      )}
    >
      {children}
    </span>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services, type Practice } from "@/lib/content";
import { EASE_OUT, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = "all" | Practice;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All services" },
  { id: "consulting", label: "IT consulting" },
  { id: "staffing", label: "Staffing" },
];

export function Services() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? services : services.filter((s) => s.practice === filter);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we deliver"
            title="Two practices, one accountable partner."
            description="Consulting to decide what to build and how. Staffing to put the right people on it. Use one, or let us run both so strategy and execution never drift apart."
          />

          <Reveal delay={0.2}>
            <div role="group" aria-label="Filter services" className="surface inline-flex rounded-full p-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    filter === f.id ? "text-ink-950" : "text-muted hover:text-white",
                  )}
                >
                  {filter === f.id && (
                    <motion.span layoutId="service-filter" transition={spring} className="absolute inset-0 -z-10 rounded-full bg-cyan-400" />
                  )}
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((service, i) => (
                <motion.li
                  key={service.title}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: (i % 3) * 0.08 }}
                  className="h-full"
                >
                  <ServiceCard service={service} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const isStaffing = service.practice === "staffing";

  return (
    <SpotlightCard
      glow={isStaffing ? "rgb(240 199 94 / 0.10)" : undefined}
      className="flex h-full flex-col p-7"
    >
      <div className="flex items-start justify-between">
        <IconBadge icon={service.icon} accent={isStaffing ? "gold" : "cyan"} />
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] uppercase",
            isStaffing ? "border-gold-400/25 text-gold-400/90" : "border-cyan-400/25 text-cyan-400/90",
          )}
        >
          {service.practice}
        </span>
      </div>

      <h3 className="mt-7 text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{service.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {service.highlights.map((h) => (
          <li key={h} className="rounded-full border border-line bg-ink-900/50 px-3 py-1 text-xs text-fg/80">
            {h}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
      >
        Discuss this service
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
      </a>
    </SpotlightCard>
  );
}

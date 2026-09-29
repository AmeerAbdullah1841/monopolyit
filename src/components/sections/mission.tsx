import { Plus, Square } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { principles } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Mission() {
  return (
    <section id="mission" className="relative border-t border-line py-24 md:py-32">
      <div aria-hidden className="divider-glow absolute inset-x-0 top-0" />
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Why we exist"
          title={
            <>
              Our mission <span className="text-cyan-400">&amp;</span> operating principles
            </>
          }
          description="We optimise for outcomes you can audit: roles filled that stay filled, roadmaps that ship, and advice with no vendor strings attached."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2" stagger={0.15}>
          {principles.map((card) => {
            const gold = card.accent === "gold";
            return (
              <StaggerItem key={card.title} className="h-full">
                <SpotlightCard glow={gold ? "rgb(240 199 94 / 0.10)" : undefined} className="h-full p-8">
                  <IconBadge icon={card.icon} accent={card.accent} />
                  <h3 className="mt-7 text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{card.description}</p>
                  <ul className="mt-7 flex flex-col gap-3.5">
                    {card.points.map((point, i) => {
                      const Marker = i === 0 ? Plus : Square;
                      // Last marker flips to the opposite accent, echoing the two-tone brand.
                      const useGold = i === card.points.length - 1 ? !gold : gold;
                      return (
                        <li key={point} className="flex items-start gap-3 text-[0.95rem] text-fg/90">
                          <Marker className={cn("mt-1 size-4 shrink-0", useGold ? "text-gold-400" : "text-cyan-400")} strokeWidth={2} aria-hidden />
                          {point}
                        </li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

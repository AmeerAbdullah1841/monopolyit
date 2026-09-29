import { Counter } from "@/components/ui/counter";
import { IconBadge } from "@/components/ui/icon-badge";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section aria-label="Results in numbers" className="relative border-y border-line bg-ink-950/40 py-16 md:py-20">
      <div aria-hidden className="bg-grid mask-fade-y absolute inset-0 opacity-50" />
      <Stagger className="container-page relative grid grid-cols-2 gap-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="group/card">
            <IconBadge icon={stat.icon} shape="circle" />
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="mt-6 block text-4xl font-semibold tracking-tight text-cyan-400 md:text-5xl"
            />
            <p className="mt-2 text-sm text-muted md:text-base">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

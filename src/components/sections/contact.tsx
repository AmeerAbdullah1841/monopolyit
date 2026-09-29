import { Mail, MapPin, type LucideIcon } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/site";

import { ContactForm } from "./contact-form";

const channels: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Coverage", value: site.location },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="absolute -bottom-40 left-1/4 -z-10 size-[34rem] rounded-full bg-gold-400/[0.05] blur-[130px]" />

      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Start a conversation"
            title={
              <>
                Tell us what you’re building. <span className="text-gradient-brand">We’ll bring the people.</span>
              </>
            }
            description="Share a project, a role, or just a problem. A principal consultant—not a sales rep—will come back with options, timelines, and honest pricing."
          />

          <Stagger className="mt-10 flex flex-col gap-4" delay={0.2}>
            {channels.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="flex size-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-400 transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px] group-hover:shadow-cyan-400/50">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-[0.2em] text-subtle uppercase">{label}</span>
                    <span className="mt-0.5 block text-fg transition-colors group-hover:text-cyan-300">{value}</span>
                  </span>
                </>
              );
              return (
                <StaggerItem key={label}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-4">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4">{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

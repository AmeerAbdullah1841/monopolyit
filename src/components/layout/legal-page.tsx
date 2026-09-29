import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/** Shared shell for plain-text legal pages. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <section className="relative pt-36 pb-24">
      <div aria-hidden className="bg-grid mask-radial absolute inset-x-0 top-0 -z-10 h-96" />
      <div className="container-page max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-sm text-subtle">Last updated {updated}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 leading-relaxed text-muted [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

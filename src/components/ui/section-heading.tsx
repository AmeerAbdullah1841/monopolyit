import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Render the eyebrow as a pill with a pulsing dot. */
  pill?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  pill = false,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal>
        {pill ? (
          <span className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-1.5">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-cyan-400 shadow-[0_0_10px] shadow-cyan-400" />
            {eyebrow}
          </span>
        ) : (
          <p className="eyebrow">{eyebrow}</p>
        )}
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

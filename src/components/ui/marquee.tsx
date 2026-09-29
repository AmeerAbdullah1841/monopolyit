import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}

/**
 * Infinite horizontal ticker. The content is rendered twice in identical
 * groups so translating the track by -50% loops seamlessly.
 */
export function Marquee({ children, reverse = false, duration = 40, className }: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className={cn("group mask-fade-x flex overflow-hidden", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={style}>
        <div className="flex shrink-0 gap-4 pr-4">{children}</div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

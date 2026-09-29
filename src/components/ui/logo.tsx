import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-b from-ink-600/80 to-ink-800 shadow-[0_0_30px_-10px] shadow-cyan-400/60",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <path
          d="M4 18V7.5L12 13l8-5.5V18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <circle cx="12" cy="5" r="1.6" className="fill-gold-400" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/#home" className={cn("group flex items-center gap-3", className)} aria-label={`${site.name} home`}>
      <LogoMark className="transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105" />
      <span className="leading-tight">
        <span className="block text-[0.95rem] font-semibold text-white">{site.name}</span>
        <span className="block text-[0.65rem] font-medium tracking-[0.25em] text-muted uppercase">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}

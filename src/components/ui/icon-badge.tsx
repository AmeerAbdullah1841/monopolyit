import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  accent?: "cyan" | "gold";
  shape?: "square" | "circle";
  className?: string;
}

export function IconBadge({ icon: Icon, accent = "cyan", shape = "square", className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center border transition-[box-shadow,border-color] duration-500",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        accent === "cyan"
          ? "border-cyan-400/30 bg-cyan-400/[0.07] text-cyan-400 group-hover/card:border-cyan-400/60 group-hover/card:shadow-[0_0_24px_-4px] group-hover/card:shadow-cyan-400/50"
          : "border-gold-400/30 bg-gold-400/[0.07] text-gold-400 group-hover/card:border-gold-400/60 group-hover/card:shadow-[0_0_24px_-4px] group-hover/card:shadow-gold-400/50",
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

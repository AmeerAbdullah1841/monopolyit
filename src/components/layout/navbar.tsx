"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useActiveSection } from "@/hooks/use-active-section";
import { EASE_OUT, spring } from "@/lib/motion";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-line bg-ink-900/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo priority />

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-muted hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={spring}
                      className="absolute inset-0 -z-10 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] shadow-[0_0_20px_-6px] shadow-cyan-400/50"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ButtonLink href="/#contact" variant="outline" className="hidden px-5 py-2.5 sm:inline-flex">
            Book a consult
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-cyan-400/50 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <motion.ul
              className="container-page flex flex-col gap-1 py-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                      active === item.id ? "bg-cyan-400/[0.08] text-white" : "text-muted hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="pt-4">
                <ButtonLink href="/#contact" onClick={() => setOpen(false)} className="w-full">
                  Book a consult
                </ButtonLink>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cyan-400 via-cyan-300 to-gold-400"
      />
    </motion.header>
  );
}

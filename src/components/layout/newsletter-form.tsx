"use client";

import { Check, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";

import { subscribe } from "@/app/actions/forms";
import { buttonStyles } from "@/components/ui/button";
import { inputStyles } from "@/components/ui/form-field";
import { initialFormState, type FormState } from "@/lib/validation";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initialFormState as FormState<"email">);
  const error = state.errors?.email;

  return (
    <div>
      <p className="eyebrow !text-fg">Stay updated</p>
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] px-4 py-3 text-sm text-cyan-300"
            role="status"
          >
            <Check className="size-4" /> {state.message}
          </motion.p>
        ) : (
          <motion.form key="form" action={action} exit={{ opacity: 0, y: -8 }} className="mt-4" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Work email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Work email"
                defaultValue={state.values?.email}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "newsletter-error" : undefined}
                className={cn(inputStyles, "sm:max-w-xs", error ? "border-red-400/60" : "border-line")}
              />
              <button type="submit" disabled={pending} className={buttonStyles("solid", "rounded-xl")}>
                {pending ? <LoaderCircle className="size-4 animate-spin" aria-label="Subscribing" /> : "Subscribe"}
              </button>
            </div>
            {error && (
              <p id="newsletter-error" role="alert" className="mt-2 text-xs text-red-300">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

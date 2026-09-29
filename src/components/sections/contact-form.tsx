"use client";

import { ArrowRight, ChevronDown, CircleCheck, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";

import { submitContact } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/form-field";
import { contactInterests, type ContactField } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { initialFormState, type FormState } from "@/lib/validation";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContact,
    initialFormState as FormState<ContactField>,
  );
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <div className="surface relative overflow-hidden rounded-3xl p-7 md:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex min-h-[26rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
              className="flex size-16 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_40px_-6px] shadow-cyan-400/60"
            >
              <CircleCheck className="size-8 text-cyan-400" />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold text-white">Message received</h3>
            <p className="mt-3 max-w-sm text-muted">{state.message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={action}
            noValidate
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-name" label="Full name" error={errors.name}>
                {(p) => <input {...p} name="name" autoComplete="name" defaultValue={values.name} placeholder="Jordan Lee" />}
              </Field>
              <Field id="contact-email" label="Work email" error={errors.email}>
                {(p) => (
                  <input
                    {...p}
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={values.email}
                    placeholder="jordan@company.com"
                  />
                )}
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-company" label="Company" optional error={errors.company}>
                {(p) => (
                  <input {...p} name="company" autoComplete="organization" defaultValue={values.company} placeholder="Acme Inc." />
                )}
              </Field>
              <Field id="contact-interest" label="I need help with" error={errors.interest}>
                {(p) => (
                  <div className="relative">
                  <select {...p} name="interest" defaultValue={values.interest ?? ""} className={`${p.className} appearance-none pr-10`}>
                    <option value="" disabled>
                      Select an option
                    </option>
                    {contactInterests.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle" aria-hidden />
                  </div>
                )}
              </Field>
            </div>

            <Field id="contact-message" label="Project or role details" error={errors.message}>
              {(p) => (
                <textarea
                  {...p}
                  name="message"
                  rows={5}
                  defaultValue={values.message}
                  placeholder="What are you building, and who do you need on it?"
                  className={`${p.className} resize-none`}
                />
              )}
            </Field>

            {/* Honeypot for bots — hidden from people and assistive tech. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="mt-2 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-subtle" aria-live="polite">
                {state.status === "error" ? <span className="text-red-300">{state.message}</span> : "We reply within one business day."}
              </p>
              <Button type="submit" disabled={pending} className="min-w-44">
                <AnimatePresence mode="wait" initial={false}>
                  {pending ? (
                    <motion.span key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                      <LoaderCircle className="size-4 animate-spin" /> Sending…
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                      Send message <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

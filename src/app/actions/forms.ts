"use server";

import { contactInterests, type ContactField } from "@/lib/content";
import { isEmail, readString, type FormState } from "@/lib/validation";

/**
 * Handles the contact form. Validation runs on the server so it can't be
 * bypassed; wire `deliver` up to your CRM or email provider.
 */
export async function submitContact(
  _prev: FormState<ContactField>,
  formData: FormData,
): Promise<FormState<ContactField>> {
  // Honeypot: real users never see or fill this field.
  if (readString(formData, "website")) return { status: "success", message: "Thanks!" };

  const values = {
    name: readString(formData, "name", 120),
    email: readString(formData, "email", 200),
    company: readString(formData, "company", 160),
    interest: readString(formData, "interest", 60),
    message: readString(formData, "message", 4000),
  };

  const errors: FormState<ContactField>["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!isEmail(values.email)) errors.email = "Enter a valid work email.";
  if (!(contactInterests as readonly string[]).includes(values.interest)) errors.interest = "Pick what you need help with.";
  if (values.message.length < 10) errors.message = "A sentence or two helps us prepare (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  await deliver("contact", values);

  return {
    status: "success",
    message: `Thanks, ${values.name.split(" ")[0]}. A principal consultant will reply within one business day.`,
  };
}

export async function subscribe(_prev: FormState<"email">, formData: FormData): Promise<FormState<"email">> {
  const email = readString(formData, "email", 200);
  if (!isEmail(email)) {
    return { status: "error", errors: { email: "Enter a valid email." }, values: { email } };
  }

  await deliver("newsletter", { email });
  return { status: "success", message: "You’re subscribed. Talk soon." };
}

/** Placeholder integration point — replace with Resend, HubSpot, a database, etc. */
async function deliver(kind: string, payload: Record<string, string>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[${kind}]`, payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 600));
}

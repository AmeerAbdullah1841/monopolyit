/** Shape returned by every form Server Action so the UI can render it uniformly. */
export type FormState<Field extends string = string> = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  /** Submitted values echoed back so fields keep their content after an error. */
  values?: Partial<Record<Field, string>>;
};

export const initialFormState: FormState = { status: "idle" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string) {
  return EMAIL_RE.test(value);
}

export function readString(formData: FormData, key: string, maxLength = 2000) {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim().slice(0, maxLength) : "";
}

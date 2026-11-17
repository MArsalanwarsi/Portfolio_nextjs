"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { contactContent } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
}

interface ContactResponse {
  message?: string;
  errors?: Partial<Record<keyof FormState, string>>;
}

type SubmitStatus =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const fieldClassName =
  "min-h-12 w-full rounded-[8px] border border-tarmac-gray/40 bg-paddock-olive/40 px-4 text-sm text-chalk-cream outline-none transition placeholder:text-stone-gray/60 focus:border-signal-lime focus:ring-1 focus:ring-signal-lime disabled:cursor-not-allowed disabled:opacity-60";
const formCopy = contactContent.form;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<ContactResponse["errors"]>({});
  const [status, setStatus] = useState<SubmitStatus>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (errors?.[field]) {
        setErrors((current) => ({
          ...current,
          [field]: undefined,
        }));
      }
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as ContactResponse;

      if (!response.ok) {
        setErrors(data.errors ?? {});
        throw new Error(data.message || formCopy.errorFallback);
      }

      setForm(initialFormState);
      setStatus({
        type: "success",
        message: data.message || formCopy.successFallback,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : formCopy.errorFallback,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="order-1 flex min-w-0 flex-col rounded-[8px] border border-tarmac-gray/40 bg-visor-black/90 p-6 sm:p-8 lg:order-2 text-chalk-cream">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="mb-3 inline-flex items-center px-3 py-1 text-[9.26px] font-mono tracking-widest uppercase border border-signal-lime/40 text-signal-lime bg-paddock-olive/60">
            {formCopy.badge}
          </span>
          <h3 className="font-sans text-3xl font-bold uppercase tracking-tight text-chalk-cream">
            {formCopy.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-gray font-sans">
            {formCopy.description}
          </p>
        </div>
      </div>

      <form className="relative flex flex-1 flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="pointer-events-none absolute left-[-9999px] top-auto size-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="organization"
              value={form.company}
              onChange={updateField("company")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="contact-name"
              label={formCopy.fields.name.label}
              error={errors?.name}
            >
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={updateField("name")}
                placeholder={formCopy.fields.name.placeholder}
                className={fieldClassName}
                aria-invalid={Boolean(errors?.name)}
                disabled={isSubmitting}
              />
            </Field>

            <Field
              id="contact-email"
              label={formCopy.fields.email.label}
              error={errors?.email}
            >
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={updateField("email")}
                placeholder={formCopy.fields.email.placeholder}
                className={fieldClassName}
                aria-invalid={Boolean(errors?.email)}
                disabled={isSubmitting}
              />
            </Field>
          </div>

          <Field
            id="contact-subject"
            label={formCopy.fields.subject.label}
            error={errors?.subject}
          >
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={updateField("subject")}
              placeholder={formCopy.fields.subject.placeholder}
              className={fieldClassName}
              aria-invalid={Boolean(errors?.subject)}
              disabled={isSubmitting}
            />
          </Field>

          <Field
            id="contact-message"
            label={formCopy.fields.message.label}
            error={errors?.message}
          >
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={updateField("message")}
              placeholder={formCopy.fields.message.placeholder}
              className={cn(fieldClassName, "min-h-40 resize-y py-3 leading-7")}
              aria-invalid={Boolean(errors?.message)}
              disabled={isSubmitting}
            />
          </Field>

          <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-signal-lime px-6 text-sm font-sans font-extrabold uppercase tracking-wider text-paddock-olive transition-transform hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
              {isSubmitting ? formCopy.submitLoading : formCopy.submitIdle}
            </button>

            <AnimatePresence initial={false} mode="popLayout">
              {status.message ? (
                <m.output
                  key={`${status.type}-${status.message}`}
                  className={cn(
                    "flex items-center gap-2 text-sm font-sans font-medium",
                    status.type === "success"
                      ? "text-signal-lime"
                      : "text-red-400"
                  )}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="size-4" aria-hidden="true" />
                  )}
                  {status.message}
                </m.output>
              ) : null}
            </AnimatePresence>
          </div>
        </form>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm leading-6 text-destructive">{error}</p>
      ) : null}
    </div>
  );
}

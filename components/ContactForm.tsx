"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { contactContent } from "@/data/portfolio";

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

interface SubmitStatus {
  type: "idle" | "success" | "error";
  message: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const formCopy = contactContent.form;
const offlineMessage =
  "You’re offline. Your message is still here — reconnect to send it.";

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
      setForm((current) => ({ ...current, [field]: event.target.value }));

      if (errors?.[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }

      if (status.type === "success") {
        setStatus({ type: "idle", message: "" });
      }
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!navigator.onLine) {
      setStatus({ type: "error", message: offlineMessage });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: ContactResponse = await response.json().catch(() => ({}));

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
        message: !navigator.onLine
          ? offlineMessage
          : error instanceof Error && !(error instanceof TypeError)
            ? error.message
            : formCopy.errorFallback,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      aria-busy={isSubmitting}
    >
      <div className="form-heading">
        <span>{formCopy.badge}</span>
        <h3 id="contact-form-title">{formCopy.title}</h3>
        <p>{formCopy.description}</p>
      </div>

      <div hidden aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={updateField("company")}
        />
      </div>

      <div className="field-grid">
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
            required
            minLength={2}
            maxLength={80}
            value={form.name}
            onChange={updateField("name")}
            placeholder={formCopy.fields.name.placeholder}
            className="form-input"
            aria-invalid={Boolean(errors?.name)}
            aria-describedby={errors?.name ? "contact-name-error" : undefined}
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
            required
            maxLength={120}
            value={form.email}
            onChange={updateField("email")}
            placeholder={formCopy.fields.email.placeholder}
            className="form-input"
            aria-invalid={Boolean(errors?.email)}
            aria-describedby={errors?.email ? "contact-email-error" : undefined}
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
          required
          minLength={3}
          maxLength={120}
          value={form.subject}
          onChange={updateField("subject")}
          placeholder={formCopy.fields.subject.placeholder}
          className="form-input"
          aria-invalid={Boolean(errors?.subject)}
          aria-describedby={
            errors?.subject ? "contact-subject-error" : undefined
          }
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
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={updateField("message")}
          placeholder={formCopy.fields.message.placeholder}
          className="form-input"
          aria-invalid={Boolean(errors?.message)}
          aria-describedby={
            errors?.message ? "contact-message-error" : undefined
          }
          disabled={isSubmitting}
        />
      </Field>

      <button type="submit" disabled={isSubmitting} className="form-submit">
        <span>
          {isSubmitting ? formCopy.submitLoading : formCopy.submitIdle}
        </span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </button>

      <output
        className="form-status"
        data-status={status.type}
        aria-live="polite"
        aria-atomic="true"
      >
        {status.message}
      </output>
    </form>
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
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

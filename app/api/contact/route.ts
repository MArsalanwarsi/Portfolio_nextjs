import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CONTENT_LENGTH = 10_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
}

interface ValidationResult {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
}

function jsonResponse(
  body: { message: string; errors?: Record<string, string> },
  status: number
) {
  return Response.json(body, { status });
}

function getSingleLine(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function getMultiline(value: unknown) {
  return typeof value === "string"
    ? value.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n")
    : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: ContactPayload): {
  data?: ValidationResult;
  errors?: Record<string, string>;
} {
  const data = {
    name: getSingleLine(payload.name),
    email: getSingleLine(payload.email).toLowerCase(),
    subject: getSingleLine(payload.subject),
    message: getMultiline(payload.message),
    company: getSingleLine(payload.company),
  };
  const errors: Record<string, string> = {};

  if (data.name.length < 2) {
    errors.name = "Enter your name.";
  } else if (data.name.length > 80) {
    errors.name = "Name must be 80 characters or fewer.";
  }

  if (!isEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  } else if (data.email.length > 120) {
    errors.email = "Email must be 120 characters or fewer.";
  }

  if (data.subject.length < 3) {
    errors.subject = "Enter a subject.";
  } else if (data.subject.length > 120) {
    errors.subject = "Subject must be 120 characters or fewer.";
  }

  if (data.message.length < 20) {
    errors.message = "Message must be at least 20 characters.";
  } else if (data.message.length > 2000) {
    errors.message = "Message must be 2000 characters or fewer.";
  }

  return Object.keys(errors).length > 0 ? { errors } : { data };
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();

  for (const [entryKey, entry] of rateLimits) {
    if (entry.resetAt <= now) {
      rateLimits.delete(entryKey);
    }
  }

  const current = rateLimits.get(key);

  if (!current) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 140);
}

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);

  if (!host || !to || !from || Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    to,
    from,
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");

  if (contentLength > MAX_CONTENT_LENGTH) {
    return jsonResponse({ message: "Message is too large." }, 413);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ message: "Invalid request format." }, 415);
  }

  if (isRateLimited(getClientKey(request))) {
    return jsonResponse(
      { message: "Too many messages. Please try again later." },
      429
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ message: "Invalid request body." }, 400);
  }

  const validation = validatePayload(payload);

  if (!validation.data) {
    return jsonResponse(
      {
        message: "Please check the highlighted fields.",
        errors: validation.errors,
      },
      400
    );
  }

  if (validation.data.company) {
    return jsonResponse({ message: "Message sent successfully." }, 200);
  }

  const config = getMailConfig();

  if (!config) {
    return jsonResponse(
      {
        message:
          "Email service is not configured yet. Please set the SMTP environment variables.",
      },
      500
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth:
      config.user && config.pass
        ? {
            user: config.user,
            pass: config.pass,
          }
        : undefined,
  });

  const { name, email, subject, message } = validation.data;
  const safeName = cleanHeader(name);
  const safeSubject = cleanHeader(subject);
  const submittedAt = new Date().toISOString();
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${config.from}>`,
      to: config.to,
      replyTo: `${safeName} <${email}>`,
      subject: `Portfolio contact: ${safeSubject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Submitted: ${submittedAt}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #161016;">
          <h2 style="margin: 0 0 12px;">New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
          <hr style="border: 0; border-top: 1px solid #eadde5; margin: 20px 0;" />
          <p>${escapedMessage}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return jsonResponse(
      { message: "Message could not be sent. Please try again later." },
      500
    );
  }

  return jsonResponse({ message: "Message sent successfully." }, 200);
}

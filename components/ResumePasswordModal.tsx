"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Lock, KeyRound, ShieldCheck, AlertCircle, X, Download, Loader2 } from "lucide-react";

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("portfolio:open-resume-modal"));
  }
}

export default function ResumePasswordModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    dialogRef.current?.close();
    setStatus("idle");
    setPassword("");
    setErrorMessage("");
  };

  useEffect(() => {
    const handleOpen = () => {
      setStatus("idle");
      setPassword("");
      setErrorMessage("");
      dialogRef.current?.showModal();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    };

    window.addEventListener("portfolio:open-resume-modal", handleOpen);
    return () => window.removeEventListener("portfolio:open-resume-modal", handleOpen);
  }, []);

  const handleDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim() || status === "verifying") return;

    setStatus("verifying");
    setErrorMessage("");

    try {
      const res = await fetch("/api/resume/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data.error || "Access Denied: Invalid Passphrase");
        inputRef.current?.select();
        return;
      }

      // Stream the binary PDF directly to an in-memory blob and trigger instant download
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "M_Arsalan_Warsi_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);

      setStatus("success");
      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch {
      setStatus("error");
      setErrorMessage("Network error during verification. Please retry.");
    }
  }

  return (
    /* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    <dialog
      ref={dialogRef}
      id="resume-security-modal"
      onClick={handleDialogClick}
      onClose={closeModal}
      aria-labelledby="resume-gate-title"
      className="m-auto max-w-md rounded-[8px] border border-tarmac-gray bg-visor-black p-0 text-chalk-cream shadow-none backdrop:bg-black/80 backdrop:backdrop-blur-md"
      style={{
        boxShadow: "none",
      }}
    >
      <div className="relative overflow-hidden p-6 sm:p-8">
        {/* Topographic watermark accent */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-tarmac-gray/20 opacity-40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-tarmac-gray/20 opacity-40"
          aria-hidden="true"
        />

        {/* Header Telemetry */}
        <div className="flex items-center justify-between border-b border-tarmac-gray/30 pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-signal-lime animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-signal-lime">
              SECURITY PROTOCOL // RESTRICTED
            </span>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close credentials prompt"
            className="grid size-8 place-items-center rounded-[6px] border border-tarmac-gray/40 text-stone-gray transition-colors hover:border-signal-lime hover:text-chalk-cream"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Body Content */}
        <div className="pt-6">
          <div className="flex size-11 items-center justify-center rounded-[8px] border border-tarmac-gray/60 bg-paddock-olive text-signal-lime">
            {status === "success" ? (
              <ShieldCheck size={22} className="text-signal-lime" aria-hidden="true" />
            ) : (
              <Lock size={22} aria-hidden="true" />
            )}
          </div>

          <h2
            id="resume-gate-title"
            className="mt-4 font-sans text-xl font-extrabold uppercase tracking-tight text-chalk-cream sm:text-2xl"
          >
            AUTHENTICATE <span className="font-serif font-normal italic lowercase text-moss-lime">to</span> DOWNLOAD
          </h2>
          <p className="mt-2 font-sans text-xs text-stone-gray sm:text-sm">
            Curriculum Vitae is protected. Enter the 6-digit access passphrase to authenticate and stream credential file directly.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="resume-passphrase-input"
                className="block font-mono text-[9px] uppercase tracking-[0.16em] text-lichen-gray"
              >
                ACCESS PASSPHRASE
              </label>
              <div className="relative mt-2">
                <input
                  id="resume-passphrase-input"
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "verifying" || status === "success"}
                  placeholder="Enter passcode"
                  autoComplete="off"
                  className={`w-full rounded-[8px] border bg-paddock-olive/80 px-4 py-3 pl-11 font-mono text-sm tracking-[0.25em] text-chalk-cream outline-none transition-colors placeholder:font-sans placeholder:tracking-normal placeholder:text-stone-gray/60 ${
                    status === "error"
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-tarmac-gray focus:border-signal-lime"
                  }`}
                />
                <KeyRound
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tarmac-gray"
                  aria-hidden="true"
                />
              </div>

              {status === "error" && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "verifying" || status === "success" || !password.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-signal-lime px-6 font-sans text-xs font-extrabold uppercase tracking-wider text-paddock-olive transition-transform hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "verifying" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  <span>Verifying Credentials...</span>
                </>
              ) : status === "success" ? (
                <>
                  <Download size={16} aria-hidden="true" />
                  <span>Access Granted · Downloading...</span>
                </>
              ) : (
                <>
                  <Download size={16} aria-hidden="true" />
                  <span>Unlock & Download CV</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 border-t border-tarmac-gray/20 pt-3 text-center">
            <span className="font-mono text-[8px] uppercase tracking-widest text-tarmac-gray">
              Direct Binary Stream · No External Redirects · SHA-256 Protected
            </span>
          </div>
        </div>
      </div>
    </dialog>
  );
}

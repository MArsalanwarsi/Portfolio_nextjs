"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function CopyContact({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");

  useEffect(() => {
    if (status !== "copied") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("manual");
    }
  }

  const title = status === "copied" ? "Copied" : `Copy ${label}`;
  const Icon = status === "copied" ? Check : Copy;
  return (
    <>
      <button type="button" aria-label={`Copy ${label}`} title={title} onClick={copy}
        className="grid size-11 shrink-0 place-items-center rounded-md text-stone-gray transition-colors hover:bg-white/5 hover:text-chalk-cream focus-visible:outline-2 focus-visible:outline-current">
        <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <output className={status === "manual" ? "basis-full break-all px-3 pb-2 text-xs" : "sr-only"}>
        {status === "copied" && `${label} copied`}
        {status === "manual" && <>Select to copy: <span data-copyable>{value}</span></>}
      </output>
    </>
  );
}

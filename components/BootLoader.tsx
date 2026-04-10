"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const MIN_DISPLAY_MS = 1600;
const EXIT_DURATION_MS = 520;

export default function BootLoader() {
  const [phase, setPhase] = useState<"visible" | "closing" | "hidden">(
    "visible"
  );

  useEffect(() => {
    const body = document.body;
    const startedAt = performance.now();
    let closeTimer: number | null = null;
    let hideTimer: number | null = null;

    body.classList.add("boot-loader-active");

    const beginClose = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      closeTimer = window.setTimeout(() => {
        setPhase("closing");
        body.classList.remove("boot-loader-active");

        hideTimer = window.setTimeout(() => {
          setPhase("hidden");
        }, EXIT_DURATION_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      beginClose();
    } else {
      window.addEventListener("load", beginClose, { once: true });
    }

    return () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
      }

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }

      window.removeEventListener("load", beginClose);
      body.classList.remove("boot-loader-active");
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return <LoadingScreen exiting={phase === "closing"} />;
}

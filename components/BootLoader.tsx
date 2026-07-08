"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const MIN_DISPLAY_MS = 900;
const EXIT_DURATION_MS = 420;
const SEEN_KEY = "portfolio-loader-seen";

function hasSeenLoader() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function markLoaderSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "true");
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
}

export default function BootLoader() {
  const [phase, setPhase] = useState<"visible" | "closing" | "hidden">(
    "visible"
  );

  useEffect(() => {
    const body = document.body;
    const startedAt = performance.now();
    let closeTimer: number | null = null;
    let hideTimer: number | null = null;
    let frame = 0;

    if (hasSeenLoader()) {
      body.classList.remove("boot-loader-active");
      setPhase("hidden");
      return;
    }

    body.classList.add("boot-loader-active");

    const beginClose = () => {
      markLoaderSeen();
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

    frame = window.requestAnimationFrame(beginClose);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (closeTimer) {
        window.clearTimeout(closeTimer);
      }

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }

      body.classList.remove("boot-loader-active");
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return <LoadingScreen exiting={phase === "closing"} />;
}

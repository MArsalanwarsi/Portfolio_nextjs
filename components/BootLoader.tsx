"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const INITIAL_PROGRESS = 6;
const MIN_DISPLAY_MS = 1_800;
const PROGRESS_DURATION_MS = 1_850;
const EXIT_DURATION_MS = 460;

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export default function BootLoader() {
  const [phase, setPhase] = useState<"visible" | "closing" | "hidden">(
    "visible"
  );
  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  useEffect(() => {
    const body = document.body;
    const startedAt = performance.now();
    let closeTimer: number | null = null;
    let hideTimer: number | null = null;
    let frame = 0;

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

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const rawProgress = Math.min(1, elapsed / PROGRESS_DURATION_MS);
      const nextProgress =
        INITIAL_PROGRESS +
        easeInOutCubic(rawProgress) * (100 - INITIAL_PROGRESS);

      setProgress((current) => Math.max(current, nextProgress));

      if (rawProgress < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      beginClose();
    };

    frame = window.requestAnimationFrame(tick);

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

  return <LoadingScreen exiting={phase === "closing"} progress={progress} />;
}

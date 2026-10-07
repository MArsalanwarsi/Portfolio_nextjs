"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CoffeeCursor = dynamic(() => import("@/components/CoffeeCursor"), {
  ssr: false,
});

export default function DeferredCoffeeCursor() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    ) {
      return;
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: Window["requestIdleCallback"];
      cancelIdleCallback?: Window["cancelIdleCallback"];
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const handle = idleWindow.requestIdleCallback(() => setReady(true), {
        timeout: 1200,
      });

      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(() => setReady(true), 800);

    return () => window.clearTimeout(handle);
  }, []);

  return ready ? <CoffeeCursor /> : null;
}

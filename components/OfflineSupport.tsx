"use client";

import { useEffect, useState } from "react";

type NetworkInformation = EventTarget & { saveData?: boolean };
type NavigatorWithConnection = Navigator & { connection?: NetworkInformation };

/** Optional enhancement: no worker or downloads compete with the first render. */
export default function OfflineSupport() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const updateConnection = () => setOffline(!navigator.onLine);
    updateConnection();
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);

    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return () => {
        window.removeEventListener("online", updateConnection);
        window.removeEventListener("offline", updateConnection);
      };
    }

    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    let registration: ServiceWorkerRegistration | undefined;
    const connection = (navigator as NavigatorWithConnection).connection;

    const warmCache = () => {
      if (!disposed && navigator.onLine && !connection?.saveData) {
        registration?.active?.postMessage({ type: "WARM_OFFLINE_CACHE" });
      }
    };

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" });
        registration = await navigator.serviceWorker.ready;
        warmCache();
      } catch {
        // Private browsing, quota limits, or unsupported storage must not break the page.
      }
    };

    const schedule = () => {
      timer = setTimeout(() => {
        if (disposed) return;
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(() => void register(), { timeout: 10_000 });
        } else {
          void register();
        }
      }, 2_000);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    window.addEventListener("online", warmCache);
    connection?.addEventListener("change", warmCache);

    return () => {
      disposed = true;
      clearTimeout(timer);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      window.removeEventListener("load", schedule);
      window.removeEventListener("online", warmCache);
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
      connection?.removeEventListener("change", warmCache);
    };
  }, []);

  if (!offline) return null;

  return (
    <output className="offline-notice fixed bottom-4 left-1/2 z-50 w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/20 bg-[#121212] px-4 py-3 text-center text-xs leading-5 text-[#f5f5f5] shadow-lg">
      You’re offline. Keep exploring; sending a message and external links need a connection.
    </output>
  );
}

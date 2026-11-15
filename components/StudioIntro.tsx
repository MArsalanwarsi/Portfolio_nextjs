"use client";

import { useEffect, useState } from "react";
import styles from "./StudioIntro.module.css";

export default function StudioIntro() {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!open) return;
    const start = performance.now();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let exit = 0;
    const dismiss = () => setOpen(false);
    const update = (now: number) => {
      const elapsed = now - start;
      const settled = document.querySelector('[data-scene="ready"]') && document.fonts.status === "loaded";
      const duration = reduced ? 0 : 4600;
      if ((settled && elapsed >= duration) || elapsed > (reduced ? 1200 : 6500)) {
        setProgress(100);
        exit = window.setTimeout(dismiss, reduced ? 0 : 540);
        return;
      }
      setProgress(reduced ? 0 : Math.min(97, Math.floor(elapsed / duration * 100)));
      frame = requestAnimationFrame(update);
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Tab" || e.key === "Escape") dismiss(); };
    window.addEventListener("keydown",key);
    frame=requestAnimationFrame(update);
    return () => {cancelAnimationFrame(frame);clearTimeout(exit);window.removeEventListener("keydown",key);};
  }, [open]);
  if (!open) return null;
  return <div className={styles.overlay} data-complete={progress===100}>
    <p className={styles.status} role="presentation">Preparing portfolio</p>
    <div className={styles.center}><b aria-hidden="true">AW</b><span aria-hidden="true">{String(progress).padStart(2,"0")}<small>%</small></span></div>
    <div className={styles.rail}><span style={{scale: String(progress / 100) + " 1"}} /></div>
    <button type="button" onClick={() => setOpen(false)}>Skip intro ↗</button>
  </div>;
}

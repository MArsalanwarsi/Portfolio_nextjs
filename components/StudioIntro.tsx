"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./StudioIntro.module.css";

export default function StudioIntro() {
  const [open, setOpen] = useState(true);

  const dismiss = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") dismiss();
    };
    const timer = window.setTimeout(dismiss, motion.matches ? 0 : 5400);
    motion.addEventListener("change", dismiss);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      motion.removeEventListener("change", dismiss);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss]);

  if (!open) return null;
  return (
    <div className={styles.overlay} aria-label="Portfolio introduction">
      <div className={styles.signature} aria-hidden="true">Arsalan Warsi</div>
      <div className={styles.panel} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.line}>
          <span>A website takes shape</span><span>layer</span><span>by</span><span>layer.</span>
        </div>
        <div className={styles.resolve}>Until it all works together.</div>
        <small className={styles.credit}>Muhammad Arsalan Warsi<br />Full-stack developer</small>
      </div>
      <button type="button" onClick={dismiss}>Skip intro ↗</button>
    </div>
  );
}

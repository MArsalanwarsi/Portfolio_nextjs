"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/portfolio";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  exiting?: boolean;
}

export default function LoadingScreen({
  exiting = false,
}: LoadingScreenProps) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const duration = 2100;
    const interval = 22;
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
      }
      setCounter(Math.floor(current));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`${styles.loader}${exiting ? ` ${styles.isExiting}` : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${siteConfig.name} portfolio`}
    >
      {/* Subtle purple ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Name reveal */}
        <div className={styles.nameBlock}>
          <div className={styles.nameLineWrap}>
            <span className={styles.firstName}>ARSALAN</span>
          </div>
          <div className={styles.nameLineWrap}>
            <span className={styles.lastName}>WARSI</span>
          </div>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>Full-Stack Developer</p>
      </div>

      {/* Bottom progress */}
      <div className={styles.bottom}>
        <div className={styles.progressRow}>
          <span className={styles.loadingLabel}>Loading</span>
          <span className={styles.counter}>{counter}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ transform: `scaleX(${counter / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}

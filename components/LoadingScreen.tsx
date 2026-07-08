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
    const duration = 760;
    const interval = 16;
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
    <output
      className={`${styles.loader}${exiting ? ` ${styles.isExiting}` : ""}`}
      aria-live="polite"
      aria-label={`Loading ${siteConfig.name} portfolio`}
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.nameBlock}>
          <div className={styles.nameLineWrap}>
            <span className={styles.firstName}>ARSALAN</span>
          </div>
          <div className={styles.nameLineWrap}>
            <span className={styles.lastName}>WARSI</span>
          </div>
        </div>

        <p className={styles.tagline}>{siteConfig.role}</p>

        <div className={styles.progressArea}>
          <div className={styles.progressRow}>
            <span className={styles.loadingLabel}>Loading</span>
            <span className={styles.percent}>{counter}%</span>
          </div>
          <progress
            className={styles.progressTrack}
            value={counter}
            max={100}
            aria-label="Loading progress"
          />
        </div>
      </div>
    </output>
  );
}

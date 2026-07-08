"use client";

import { siteConfig } from "@/data/portfolio";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  exiting?: boolean;
  progress: number;
}

export default function LoadingScreen({
  exiting = false,
  progress,
}: LoadingScreenProps) {
  const counter = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <output
      className={`boot-loader ${styles.loader}${exiting ? ` ${styles.isExiting}` : ""}`}
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

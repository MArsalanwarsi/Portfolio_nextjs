import { siteConfig } from "@/data/portfolio";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  exiting?: boolean;
}

export default function LoadingScreen({
  exiting = false,
}: LoadingScreenProps) {
  return (
    <div
      className={`${styles.loader}${exiting ? ` ${styles.isExiting}` : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${siteConfig.name} portfolio`}
    >
      <div className={styles.inner}>
        <div className={styles.aura} aria-hidden="true" />

        <div className={styles.visual} aria-hidden="true">
          <svg
            className={styles.infinity}
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles.track}
              d="M160 110C131 57 74 57 74 110C74 163 131 163 160 110C189 57 246 57 246 110C246 163 189 163 160 110Z"
              pathLength="100"
            />
            <path
              className={styles.glow}
              d="M160 110C131 57 74 57 74 110C74 163 131 163 160 110C189 57 246 57 246 110C246 163 189 163 160 110Z"
              pathLength="100"
            />
            <path
              className={styles.stroke}
              d="M160 110C131 57 74 57 74 110C74 163 131 163 160 110C189 57 246 57 246 110C246 163 189 163 160 110Z"
              pathLength="100"
            />
          </svg>
        </div>

        <span className={styles.copy}>Loading...</span>
      </div>
    </div>
  );
}

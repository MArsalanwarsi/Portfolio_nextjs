import { siteConfig } from "@/data/portfolio";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  exiting?: boolean;
}

export default function LoadingScreen({
  exiting = false,
}: LoadingScreenProps) {
  const infinityPath =
    "M160 110C131 57 74 57 74 110C74 163 131 163 160 110C189 57 246 57 246 110C246 163 189 163 160 110Z";
  const loopDuration = "2.6s";
  const trailGradientId = "loader-trail-gradient";
  const trackGradientId = "loader-track-gradient";
  const flareGradientId = "loader-flare-gradient";

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
            <defs>
              <linearGradient
                id={trackGradientId}
                x1="74"
                y1="110"
                x2="246"
                y2="110"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--loader-accent-start)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--loader-accent-end)" stopOpacity="0.18" />
              </linearGradient>
              <linearGradient
                id={trailGradientId}
                x1="74"
                y1="110"
                x2="246"
                y2="110"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--loader-accent-start)" />
                <stop offset="52%" stopColor="var(--loader-stroke)" />
                <stop offset="100%" stopColor="var(--loader-accent-end)" />
              </linearGradient>
              <radialGradient
                id={flareGradientId}
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop offset="0%" stopColor="var(--loader-stroke)" stopOpacity="0.95" />
                <stop offset="36%" stopColor="var(--loader-stroke)" stopOpacity="0.84" />
                <stop offset="100%" stopColor="var(--loader-accent-start)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              className={styles.track}
              d={infinityPath}
              pathLength="100"
              stroke={`url(#${trackGradientId})`}
            />
            <path
              className={styles.trailGlow}
              d={infinityPath}
              pathLength="100"
              stroke={`url(#${trailGradientId})`}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-100"
                dur={loopDuration}
                repeatCount="indefinite"
              />
            </path>
            <path
              className={styles.trailCore}
              d={infinityPath}
              pathLength="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-100"
                dur={loopDuration}
                repeatCount="indefinite"
              />
            </path>
            <path
              className={styles.trailHighlight}
              d={infinityPath}
              pathLength="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-100"
                dur={loopDuration}
                repeatCount="indefinite"
              />
            </path>
            <ellipse
              className={styles.crossGlow}
              cx="160"
              cy="110"
              rx="22"
              ry="8"
              fill={`url(#${flareGradientId})`}
            />
            <circle className={styles.crossCore} cx="160" cy="110" r="5.6" />
          </svg>
        </div>

        <span className={styles.copy}>Loading...</span>
      </div>
    </div>
  );
}

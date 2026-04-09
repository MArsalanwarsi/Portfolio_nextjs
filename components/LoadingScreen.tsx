import { siteConfig } from "@/data/portfolio";

interface LoadingScreenProps {
  exiting?: boolean;
}

export default function LoadingScreen({
  exiting = false,
}: LoadingScreenProps) {
  return (
    <div
      className={`boot-loader${exiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${siteConfig.name} portfolio`}
    >
      <div className="boot-loader__veil" aria-hidden="true" />
      <div className="boot-loader__grid" aria-hidden="true" />
      <div className="boot-loader__orb boot-loader__orb--pink" aria-hidden="true" />
      <div className="boot-loader__orb boot-loader__orb--cyan" aria-hidden="true" />
      <div className="boot-loader__orb boot-loader__orb--amber" aria-hidden="true" />

      <div className="boot-loader__panel">
        <div className="boot-loader__meta">
          <span className="boot-loader__eyebrow">Portfolio Boot Sequence</span>

          <div className="boot-loader__signal" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="boot-loader__identity">
          <div className="boot-loader__avatar" aria-hidden="true">
            <div className="boot-loader__avatar-ring" />
            <div className="boot-loader__avatar-core">
              <span>{siteConfig.portrait.initials}</span>
            </div>
          </div>

          <div className="boot-loader__copy">
            <p>{siteConfig.name}</p>
            <h1>{siteConfig.role}</h1>
            <span>{siteConfig.specialization}</span>
          </div>
        </div>

        <div className="boot-loader__statusline">
          <span className="boot-loader__statuscopy">
            Building a premium interface layer
          </span>

          <div className="boot-loader__progress" aria-hidden="true">
            <span className="boot-loader__progress-track">
              <span className="boot-loader__progress-bar" />
            </span>
          </div>
        </div>

        <div className="boot-loader__chips" aria-hidden="true">
          {siteConfig.focusAreas.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

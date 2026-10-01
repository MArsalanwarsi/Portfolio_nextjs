"use client";
import { useEffect, useRef, useState } from "react";

export default function SignatureIntro() {
  const skipped = useRef(false);
  const [phase, setPhase] = useState<"hidden" | "visible" | "closing">(
    "hidden",
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const started = performance.now();
    let frame = 0;
    let finish = 0;
    const tick = (now: number) => {
      if (skipped.current) return;
      const fraction = Math.min(1, (now - started) / 950);
      setProgress(Math.round((1 - Math.pow(1 - fraction, 3)) * 100));
      if (fraction < 1) {
        setPhase("visible");
        frame = requestAnimationFrame(tick);
      } else {
        setPhase("closing");
        finish = window.setTimeout(() => setPhase("hidden"), 450);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(finish);
    };
  }, []);
  if (phase === "hidden") return null;
  return (
    <div
      className={`signature-intro ${phase === "closing" ? "intro-closing" : ""}`}
      aria-label="Portfolio introduction"
    >
      <div className="intro-top">
        <span>AW / PORTFOLIO</span>
        <button
          type="button"
          onClick={() => {
            skipped.current = true;
            setPhase("hidden");
          }}
        >
          Skip intro ↗
        </button>
      </div>
      <div className="intro-center">
        <div className="intro-orbit" aria-hidden="true">
          <span>
            AW<span className="intro-dot">.</span>
          </span>
        </div>
        <p className="intro-code">&lt; developer /&gt;</p>
        <div className="intro-name">
          <span>ARSALAN</span>
          <span>WARSI</span>
        </div>
        <p className="intro-role">FULL STACK DEVELOPER</p>
      </div>
      <div className="intro-bottom">
        <span>Ideas. Code. Experiences.</span>
        <span className="intro-percent" aria-hidden="true">
          {String(progress).padStart(2, "0")}
          <small>%</small>
        </span>
        <progress
          value={progress}
          max={100}
          aria-label="Introduction progress"
        />
      </div>
    </div>
  );
}

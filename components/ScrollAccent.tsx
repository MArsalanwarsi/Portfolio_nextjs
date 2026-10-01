"use client";
import { useEffect, useRef } from "react";
export default function ScrollAccent() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector<HTMLElement>(".hero-composition");
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty(
        "transform",
        `scaleX(${height > 0 ? scrollY / height : 0})`,
      );
      hero?.style.setProperty(
        "--hero-offset",
        `${Math.min(scrollY * 0.045, 24)}px`,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      hero?.style.removeProperty("--hero-offset");
    };
  }, []);
  return <div ref={bar} className="scroll-accent" aria-hidden="true" />;
}

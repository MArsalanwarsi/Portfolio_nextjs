"use client";
import { useEffect, useRef } from "react";

export default function PortfolioCursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!media.matches) return;
    const element = ring.current;
    if (!element) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      document.documentElement.classList.add("custom-pointer");
      x = event.clientX;
      y = event.clientY;
      element.dataset.interactive = String(
        Boolean(
          (event.target as HTMLElement).closest("a,button,summary,select"),
        ),
      );
      if (!frame)
        frame = requestAnimationFrame(() => {
          element.style.transform = `translate3d(${x}px,${y}px,0)`;
          element.style.opacity = "1";
          frame = 0;
        });
    };
    const hide = () => {
      element.style.opacity = "0";
      document.documentElement.classList.remove("custom-pointer");
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-pointer");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
    };
  }, []);
  return (
    <div className="portfolio-cursor" ref={ring} aria-hidden="true">
      <span className="cursor-reticle">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="cursor-core" />
    </div>
  );
}

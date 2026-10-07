"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function CoffeeCursor() {
  const cup = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const element = cup.current;
    if (!element) return;
    let frame = 0,
      x = 0,
      y = 0;
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.opacity = "0";
      document.documentElement.classList.remove("coffee-pointer");
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      element.dataset.pouring = String(
        Boolean(
          target?.closest(
            'a,button,summary,input,textarea,select,label,[role="button"],[data-coffee-hover]',
          ),
        ),
      );
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          element.style.transform = `translate3d(${x}px,${y}px,0)`;
          element.style.opacity = "1";
          document.documentElement.classList.add("coffee-pointer");
        });
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      cancelAnimationFrame(frame);
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
    };
  }, []);
  return createPortal(
    <div ref={cup} className="coffee-cursor" aria-hidden="true">
      <svg viewBox="0 0 44 50" width="27" height="31" fill="none">
        <g
          className="coffee-cursor-steam"
          stroke="#efdbbf"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M14 12c-4-4 4-5 0-9" />
          <path d="M22 12c-4-4 4-5 0-9" />
        </g>
        <g className="coffee-cursor-cup">
          <path
            d="M28 19h3c7 0 7 10 0 10h-5"
            stroke="#efdbbf"
            strokeWidth="2.4"
          />
          <path
            d="M6 18h24c0 11-4 17-12 17S6 29 6 18Z"
            fill="#382416"
            stroke="#efdbbf"
            strokeWidth="2"
          />
          <ellipse
            cx="18"
            cy="18"
            rx="12"
            ry="4"
            fill="#0a0603"
            stroke="#efdbbf"
            strokeWidth="2"
          />
          <path d="M11 17c4-1 9-1 13 0" stroke="#967353" strokeWidth="1" />
        </g>
        <path
          className="coffee-cursor-pour"
          d="M5 26C1 30 8 33 4 39"
          stroke="#c89768"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle
          className="coffee-cursor-drop"
          cx="4"
          cy="43"
          r="1.7"
          fill="#c89768"
        />
      </svg>
    </div>,
    document.body,
  );
}

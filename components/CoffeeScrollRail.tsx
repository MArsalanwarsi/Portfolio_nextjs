"use client";
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Custom scrollbar needs pointer capture on its full vertical track. */
import { useEffect, useRef } from "react";

export default function CoffeeScrollRail() {
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    let frame = 0,
      timer = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      element.style.setProperty("--brew-progress", String(progress));
      element
        .querySelector('[role="slider"]')
        ?.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
      element.dataset.brewing = "true";
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        element.dataset.brewing = "false";
      }, 180);
    };
    const resize = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(update);
    });
    resize.observe(document.body);
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      resize.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="coffee-scroll-rail" ref={rail}>
      <svg
        className="brew-machine"
        viewBox="0 0 64 82"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brew-glass">
            <stop stopColor="#f5ddba" stopOpacity=".5" />
            <stop offset=".5" stopColor="#fff1d4" stopOpacity=".1" />
            <stop offset="1" stopColor="#cfa071" stopOpacity=".4" />
          </linearGradient>
          <linearGradient id="brew-coffee" x2="0" y2="1">
            <stop stopColor="#bb7a3e" />
            <stop offset=".3" stopColor="#4b2916" />
            <stop offset="1" stopColor="#150b05" />
          </linearGradient>
        </defs>
        <g transform="translate(50 0) scale(-0.8 0.8)">
          <g className="brew-pot">
            <path
              d="M44 24h7c12 0 12 24 0 24h-5"
              stroke="#d8b58c"
              strokeWidth="5"
            />
            <path
              d="M15 20h30l3 24c2 12-3 19-19 19S8 56 10 44l3-13-21-10 23 2Z"
              fill="url(#brew-glass)"
              stroke="#e5c9a4"
              strokeWidth="1.8"
            />
            <path
              d="M12 40c9 3 20 1 35-1l1 6c1 11-5 16-19 16S9 56 11 45Z"
              fill="url(#brew-coffee)"
            />
            <path
              d="M16 28l-3 17c-1 5 0 8 3 10"
              stroke="#fff0d4"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M12 19h35l-2-6H17Z" fill="#9c714d" stroke="#e5c9a4" />
            <path
              d="M25 12V8h10v4"
              stroke="#e5c9a4"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>
        <path
          className="brew-spout-flow"
          d="M60.83 33.85C64 43 58 51 48 55S31.2 59 31.2 65.6"
          stroke="#ad733c"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {/* A custom vertical scrollbar supports pointer capture and keyboard navigation. */}
      <div
        className="brew-track"
        role="slider"
        tabIndex={0}
        aria-label="Scroll page — coffee brewing progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-orientation="vertical"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          const bounds = event.currentTarget.getBoundingClientRect();
          window.scrollTo({
            top:
              Math.max(
                0,
                Math.min(1, (event.clientY - bounds.top) / bounds.height),
              ) *
              (document.documentElement.scrollHeight - innerHeight),
            behavior: "instant",
          });
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          window.scrollTo({
            top:
              Math.max(
                0,
                Math.min(1, (event.clientY - bounds.top) / bounds.height),
              ) *
              (document.documentElement.scrollHeight - innerHeight),
            behavior: "instant",
          });
        }}
        onKeyDown={(event) => {
          if (
            ![
              "ArrowDown",
              "ArrowUp",
              "PageDown",
              "PageUp",
              "Home",
              "End",
            ].includes(event.key)
          )
            return;
          event.preventDefault();
          if (event.key === "Home" || event.key === "End")
            window.scrollTo({
              top:
                event.key === "Home"
                  ? 0
                  : document.documentElement.scrollHeight,
              behavior: "instant",
            });
          else
            window.scrollBy({
              top:
                (event.key.endsWith("Down") ? 1 : -1) *
                (event.key.startsWith("Page") ? innerHeight * 0.8 : 80),
              behavior: "instant",
            });
        }}
      >
        <span className="brew-stream" />
      </div>
      <div className="brew-cup" aria-hidden="true">
        <svg viewBox="0 0 64 58" fill="none">
          <defs>
            <clipPath id="brew-cup-clip">
              <path d="M10 20h39c-1 20-5 26-19 26S12 40 10 20Z" />
            </clipPath>
          </defs>
          <path
            className="brew-steam"
            d="M22 14c-5-6 5-6 0-12M32 14c-5-6 5-6 0-12M41 14c-5-6 5-6 0-12"
            stroke="#e9cfaa"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="51" rx="27" ry="4" fill="#a77c53" />
          <path
            d="M48 23h5c11 0 11 16 0 16h-7"
            stroke="#ead4b6"
            strokeWidth="4"
          />
          <path d="M10 20h39c-1 20-5 26-19 26S12 40 10 20Z" fill="#ead4b6" />
          <g clipPath="url(#brew-cup-clip)">
            <rect
              className="brew-cup-liquid"
              x="11"
              y="21"
              width="38"
              height="25"
              fill="#251208"
            />
          </g>
          <ellipse
            cx="29.5"
            cy="20"
            rx="19.5"
            ry="4"
            fill="#462a18"
            stroke="#f3dfc3"
            strokeWidth="2"
          />
          <path
            d="M16 27c1 9 3 12 6 14"
            stroke="#fff5e1"
            strokeOpacity=".65"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

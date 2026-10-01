"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function ProjectDeck({
  children,
  titles,
}: {
  children: ReactNode;
  titles: string[];
}) {
  const [active, setActive] = useState(0);
  const enhanced = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slides = Children.toArray(children);
  function go(index: number) {
    setActive((index + titles.length) % titles.length);
  }
  useEffect(() => {
    const followHash = () => {
      const match = window.location.hash.match(/^#project-(\d+)$/);
      if (!match) return;
      const index = Number(match[1]) - 1;
      if (index < 0 || index >= titles.length) return;
      setActive(index);
      requestAnimationFrame(() =>
        document
          .getElementById(`project-${index + 1}`)
          ?.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    };
    const initialFrame = requestAnimationFrame(followHash);
    window.addEventListener("hashchange", followHash);
    // Re-select a deep-linked project even when its hash hasn't changed.
    const followLink = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#project-"]',
      );
      if (link?.hash === window.location.hash) followHash();
    };
    document.addEventListener("click", followLink);
    const deck = root.current;
    const keyboard = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest("input,select,textarea,dialog"))
        return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setActive(
          (current) =>
            (current + (event.key === "ArrowRight" ? 1 : -1) + titles.length) %
            titles.length,
        );
      }
    };
    deck?.addEventListener("keydown", keyboard);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("hashchange", followHash);
      document.removeEventListener("click", followLink);
      deck?.removeEventListener("keydown", keyboard);
    };
  }, [titles.length]);
  return (
    <div className="project-deck" ref={root} data-enhanced={enhanced}>
      <div className="deck-toolbar">
        <div className="deck-counter" aria-live="polite" aria-atomic="true">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span>/ {String(titles.length).padStart(2, "0")} projects</span>
          <span className="sr-only"> — {titles[active]}</span>
        </div>
        <label className="deck-select">
          <span className="sr-only">Choose a project</span>
          <select
            value={active}
            onChange={(event) => go(Number(event.target.value))}
          >
            {titles.map((title, index) => (
              <option key={title} value={index}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <div className="deck-buttons">
          <button
            type="button"
            className="circle-button"
            onClick={() => go(active - 1)}
            aria-label="Previous project"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            className="circle-button"
            onClick={() => go(active + 1)}
            aria-label="Next project"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        className="deck-stage"
        onTouchStart={(event) => {
          const point = event.touches[0];
          touch.current = { x: point.clientX, y: point.clientY };
        }}
        onTouchEnd={(event) => {
          if (
            !touch.current ||
            (event.target as HTMLElement).closest(
              "dialog,select,input,textarea",
            )
          )
            return;
          const point = event.changedTouches[0];
          const x = point.clientX - touch.current.x;
          const y = point.clientY - touch.current.y;
          if (Math.abs(x) > 65 && Math.abs(x) > Math.abs(y) * 1.4)
            go(active + (x < 0 ? 1 : -1));
          touch.current = null;
        }}
      >
        {slides.map((slide, index) => (
          <div
            className="project-slide"
            key={titles[index]}
            data-active={index === active}
            inert={enhanced && index !== active}
            aria-hidden={enhanced && index !== active}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="deck-pagination" aria-label="Project pages">
        {titles.map((title, index) => (
          <button
            key={title}
            type="button"
            aria-label={`Show project ${index + 1}: ${title}`}
            aria-pressed={active === index}
            onClick={() => go(index)}
          >
            <span />
          </button>
        ))}
      </div>
      <p className="deck-hint">
        Explore at your pace <span aria-hidden="true">/</span> swipe or use the
        arrows
      </p>
    </div>
  );
}

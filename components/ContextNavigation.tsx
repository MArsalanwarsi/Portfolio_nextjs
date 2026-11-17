"use client";

import { useEffect, useRef } from "react";
import { navLinks } from "@/data/portfolio";
import styles from "./ContextNavigation.module.css";

export default function ContextNavigation() {
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const menu = panel.current;
    if (!menu) return;
    let reveal: Animation | undefined;
    function open(event: MouseEvent) {
      if (!menu || typeof menu.showPopover !== "function") return;
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, [contenteditable], [data-copyable], dialog[open]")) return;
      event.preventDefault();
      menu.showPopover();
      const anchor = target instanceof Element ? target.getBoundingClientRect() : null;
      const x = event.clientX || anchor?.left || 8;
      const y = event.clientY || anchor?.top || 8;
      menu.style.left = Math.max(8, Math.min(x, document.documentElement.clientWidth - menu.offsetWidth - 8)) + "px";
      menu.style.top = Math.max(8, Math.min(y, innerHeight - menu.offsetHeight - 8)) + "px";
      reveal?.cancel();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reveal = menu.animate(
          [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)" }],
          { duration: 460, easing: "cubic-bezier(.65,.05,0,1)" },
        );
      }
      menu.querySelector("a")?.focus({ preventScroll: true });
    }
    function key(event: KeyboardEvent) {
      const letter = event.key.toLowerCase();
      const inspector = event.key === "F12" ||
        ((event.ctrlKey && event.shiftKey || event.metaKey && event.altKey) && ["i", "j", "c", "k", "e"].includes(letter));
      if (inspector) event.preventDefault();
    }
    const close = () => menu?.hidePopover?.();
    document.addEventListener("contextmenu", open);
    window.addEventListener("keydown", key, true);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close);
    return () => {
      reveal?.cancel();
      document.removeEventListener("contextmenu", open);
      window.removeEventListener("keydown", key, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, []);

  return (
    <nav ref={panel} popover="auto" aria-label="Portfolio shortcuts" className={styles.menu}>
      {navLinks.map((link, index) => (
        <a key={link.href} href={link.href} onClick={() => panel.current?.hidePopover()}>
          <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.divider} aria-hidden="true">//</span>
          {link.label}<span className={styles.arrow} aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}

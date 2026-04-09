"use client";

import { Moon, Sun } from "lucide-react";

export type ThemeMode = "dark" | "light";

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
  expanded?: boolean;
}

export default function ThemeToggle({
  mode,
  onToggle,
  expanded = false,
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      className={`theme-toggle${expanded ? " is-expanded" : ""}`}
      onClick={onToggle}
      aria-label="Toggle theme"
      aria-pressed={mode === "light"}
      title="Toggle theme"
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <Moon size={14} />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <Sun size={14} />
        </span>
        <span className="theme-toggle__thumb">
          <span className="theme-toggle__thumb-icon theme-toggle__thumb-icon--moon">
            <Moon size={14} />
          </span>
          <span className="theme-toggle__thumb-icon theme-toggle__thumb-icon--sun">
            <Sun size={14} />
          </span>
        </span>
      </span>

      <span className="theme-toggle__copy">
        <small>Theme</small>
        <strong>Switch theme</strong>
      </span>
    </button>
  );
}

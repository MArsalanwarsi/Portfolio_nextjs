"use client";

import { Moon, Sun } from "lucide-react";

export type ThemeMode = "dark" | "light";

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  expanded?: boolean;
  ready?: boolean;
}

export default function ThemeToggle({
  mode,
  onToggle,
  expanded = false,
  ready = true,
}: ThemeToggleProps) {
  const nextTheme = mode === "dark" ? "light" : "dark";
  const buttonLabel = ready
    ? `Switch to ${nextTheme} theme`
    : "Toggle color theme";

  return (
    <button
      type="button"
      className={`theme-toggle${expanded ? " is-expanded" : ""}`}
      onClick={onToggle}
      aria-label={buttonLabel}
      aria-pressed={ready ? mode === "light" : undefined}
      title={buttonLabel}
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
    </button>
  );
}

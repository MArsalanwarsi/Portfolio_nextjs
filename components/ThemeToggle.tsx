"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function subscribeToHydration() {
  return () => {};
}

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = mounted ? resolvedTheme !== "light" : true;
  const nextTheme = isDark ? "light" : "dark";
  const label = `Switch to ${nextTheme} theme`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
      className="relative overflow-hidden rounded-full border border-border/60 bg-muted/30 text-foreground transition hover:border-primary/50 hover:bg-primary/10"
    >
      <Sun
        className={`absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 transition duration-300 ${
          isDark ? "scale-75 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 transition duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-45 opacity-0"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

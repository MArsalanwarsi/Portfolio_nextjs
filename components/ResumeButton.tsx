"use client";

import { openResumeModal } from "./ResumePasswordModal";
import type { ReactNode } from "react";

interface ResumeButtonProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function ResumeButton({
  children,
  className,
  ariaLabel = "Open restricted resume download terminal",
}: ResumeButtonProps) {
  return (
    <button
      type="button"
      onClick={openResumeModal}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}

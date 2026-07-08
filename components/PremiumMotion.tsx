"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const instantTransition = { duration: 0.01 };
type ScrollDirection = "down" | "up";

let currentDirection: ScrollDirection = "down";
let lastScrollY = 0;
let scrollFrame = 0;
let isListening = false;
const directionListeners = new Set<() => void>();

function notifyDirectionListeners() {
  directionListeners.forEach((listener) => listener());
}

function handleScrollDirection() {
  if (scrollFrame) {
    return;
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    const nextScrollY = Math.max(0, window.scrollY);
    const delta = nextScrollY - lastScrollY;

    if (Math.abs(delta) > 6) {
      const nextDirection = delta > 0 ? "down" : "up";

      if (nextDirection !== currentDirection) {
        currentDirection = nextDirection;
        notifyDirectionListeners();
      }
    }

    lastScrollY = nextScrollY;
  });
}

function subscribeToScrollDirection(listener: () => void) {
  directionListeners.add(listener);

  if (typeof window !== "undefined" && !isListening) {
    isListening = true;
    lastScrollY = Math.max(0, window.scrollY);
    window.addEventListener("scroll", handleScrollDirection, { passive: true });
  }

  return () => {
    directionListeners.delete(listener);

    if (
      typeof window !== "undefined" &&
      isListening &&
      directionListeners.size === 0
    ) {
      isListening = false;
      window.removeEventListener("scroll", handleScrollDirection);

      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
      }
    }
  };
}

function getScrollDirectionSnapshot() {
  return currentDirection;
}

function getServerScrollDirectionSnapshot(): ScrollDirection {
  return "down";
}

function useScrollDirection() {
  return useSyncExternalStore(
    subscribeToScrollDirection,
    getScrollDirectionSnapshot,
    getServerScrollDirectionSnapshot
  );
}

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);

    sync();
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  return canHover;
}

interface PremiumMotionProps {
  children: ReactNode;
}

export default function PremiumMotion({ children }: PremiumMotionProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.62, ease: premiumEase }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

type ControlledMotionDivProps = Omit<
  HTMLMotionProps<"div">,
  | "animate"
  | "initial"
  | "transition"
  | "variants"
  | "viewport"
  | "whileHover"
  | "whileInView"
>;

interface RevealProps extends ControlledMotionDivProps {
  amount?: number;
  delay?: number;
  once?: boolean;
  y?: number;
}

export function Reveal({
  amount = 0.14,
  children,
  className,
  delay = 0,
  once = false,
  y = 24,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const scrollDirection = useScrollDirection();
  const offsetY = reduceMotion ? 0 : scrollDirection === "up" ? -y : y;

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: "0px 0px -4% 0px" }}
      variants={{
        hidden: {
          opacity: 0,
          scale: reduceMotion ? 1 : 0.985,
          transition: reduceMotion
            ? instantTransition
            : { duration: 0.26, ease: premiumEase },
          y: offsetY,
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: reduceMotion
            ? instantTransition
            : { duration: 0.7, ease: premiumEase, delay },
        },
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}

interface StaggerProps extends ControlledMotionDivProps {
  amount?: number;
  delay?: number;
  once?: boolean;
  stagger?: number;
}

export function Stagger({
  amount = 0.12,
  children,
  className,
  delay = 0,
  once = false,
  stagger = 0.07,
  ...props
}: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: "0px 0px -4% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps extends ControlledMotionDivProps {
  y?: number;
}

export function StaggerItem({
  children,
  className,
  y = 16,
  ...props
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const scrollDirection = useScrollDirection();
  const offsetY = reduceMotion ? 0 : scrollDirection === "up" ? -y : y;

  return (
    <m.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          transition: reduceMotion
            ? instantTransition
            : { duration: 0.22, ease: premiumEase },
          y: offsetY,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? instantTransition
            : { duration: 0.58, ease: premiumEase },
        },
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}

interface LiftCardProps extends RevealProps {
  hoverScale?: number;
  hoverY?: number;
}

export function LiftCard({
  amount = 0.12,
  children,
  className,
  delay = 0,
  hoverScale = 1.008,
  hoverY = -6,
  once = false,
  y = 24,
  ...props
}: LiftCardProps) {
  const reduceMotion = useReducedMotion();
  const canHover = useCanHover();
  const scrollDirection = useScrollDirection();
  const offsetY = reduceMotion ? 0 : scrollDirection === "up" ? -y : y;

  return (
    <m.div
      className={cn("will-change-transform", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: "0px 0px -4% 0px" }}
      whileHover={
        reduceMotion || !canHover ? undefined : { y: hoverY, scale: hoverScale }
      }
      variants={{
        hidden: {
          opacity: 0,
          scale: reduceMotion ? 1 : 0.99,
          transition: reduceMotion
            ? instantTransition
            : { duration: 0.26, ease: premiumEase },
          y: offsetY,
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: reduceMotion
            ? instantTransition
            : { duration: 0.66, ease: premiumEase, delay },
        },
      }}
      transition={
        reduceMotion ? instantTransition : { duration: 0.3, ease: premiumEase }
      }
      {...props}
    >
      {children}
    </m.div>
  );
}

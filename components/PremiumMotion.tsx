"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const instantTransition = { duration: 0.01 };

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
  amount = 0.2,
  children,
  className,
  delay = 0,
  once = true,
  y = 24,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {
          opacity: 0,
          scale: reduceMotion ? 1 : 0.985,
          y: reduceMotion ? 0 : y,
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
  amount = 0.18,
  children,
  className,
  delay = 0,
  once = true,
  stagger = 0.07,
  ...props
}: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: "0px 0px -8% 0px" }}
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

  return (
    <m.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : y,
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
  amount = 0.18,
  children,
  className,
  delay = 0,
  hoverScale = 1.008,
  hoverY = -6,
  once = true,
  y = 24,
  ...props
}: LiftCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn("will-change-transform", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once, margin: "0px 0px -8% 0px" }}
      whileHover={
        reduceMotion ? undefined : { y: hoverY, scale: hoverScale }
      }
      variants={{
        hidden: {
          opacity: 0,
          scale: reduceMotion ? 1 : 0.99,
          y: reduceMotion ? 0 : y,
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

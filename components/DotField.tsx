"use client";

import {
  memo,
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";

import styles from "./DotField.module.css";

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface PointerState {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
}

interface SizeState {
  w: number;
  h: number;
}

interface RuntimeProps {
  dotRadius: number;
  dotSpacing: number;
  cursorRadius: number;
  cursorForce: number;
  bulgeOnly: boolean;
  bulgeStrength: number;
  sparkle: boolean;
  waveAmplitude: number;
  gradientFrom: string;
  gradientTo: string;
}

interface DotFieldProps extends ComponentPropsWithoutRef<"div"> {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

function DotFieldInner({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120f17",
  ...rest
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef<PointerState>({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    speed: 0,
  });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef<SizeState>({ w: 0, h: 0 });
  const glowOpacityRef = useRef(0);
  const engagementRef = useRef(0);
  const rebuildRef = useRef<(() => void) | null>(null);
  const gradientId = useId().replace(/:/g, "");
  const propsRef = useRef<RuntimeProps>({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });

  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      return undefined;
    }

    const canvasEl = canvas;
    const context = ctx;
    const parent = canvasEl.parentElement ?? canvasEl;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: number | undefined;
    let frameCount = 0;

    function buildDots(w: number, h: number) {
      const props = propsRef.current;
      const step = props.dotRadius + props.dotSpacing;
      const cols = Math.max(1, Math.floor(w / step));
      const rows = Math.max(1, Math.floor(h / step));
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots.push({ ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay });
        }
      }

      dotsRef.current = dots;
    }

    function drawFrame() {
      const dots = dotsRef.current;
      const pointer = pointerRef.current;
      const { w, h } = sizeRef.current;
      const props = propsRef.current;

      if (w <= 0 || h <= 0 || dots.length === 0) {
        return;
      }

      const time = prefersReducedMotion ? 0 : frameCount * 0.02;
      const targetEngagement = prefersReducedMotion
        ? 0
        : Math.min(pointer.speed / 5, 1);

      engagementRef.current += (targetEngagement - engagementRef.current) * 0.06;

      if (engagementRef.current < 0.001) {
        engagementRef.current = 0;
      }

      glowOpacityRef.current +=
        (engagementRef.current - glowOpacityRef.current) * 0.08;

      if (glowEl) {
        glowEl.setAttribute("cx", String(pointer.x));
        glowEl.setAttribute("cy", String(pointer.y));
        glowEl.style.opacity = String(glowOpacityRef.current);
      }

      context.clearRect(0, 0, w, h);

      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, props.gradientFrom);
      gradient.addColorStop(1, props.gradientTo);
      context.fillStyle = gradient;

      const cursorRadiusSq = props.cursorRadius * props.cursorRadius;
      const radius = props.dotRadius;

      context.beginPath();

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];
        const dx = pointer.x - dot.ax;
        const dy = pointer.y - dot.ay;
        const distanceSq = dx * dx + dy * dy;

        if (
          distanceSq < cursorRadiusSq &&
          engagementRef.current > 0.01 &&
          !prefersReducedMotion
        ) {
          const distance = Math.max(Math.sqrt(distanceSq), 0.001);

          if (props.bulgeOnly) {
            const force = 1 - distance / props.cursorRadius;
            const push = force * force * props.bulgeStrength * engagementRef.current;
            const angle = Math.atan2(dy, dx);
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / distance) * (pointer.speed * props.cursorForce);
            dot.vx += Math.cos(angle) * -move;
            dot.vy += Math.sin(angle) * -move;
          }
        } else if (props.bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        if (!props.bulgeOnly) {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
          dot.x = dot.ax + dot.vx;
          dot.y = dot.ay + dot.vy;
          dot.sx += (dot.x - dot.sx) * 0.1;
          dot.sy += (dot.y - dot.sy) * 0.1;
        }

        let drawX = dot.sx;
        let drawY = dot.sy;

        if (props.waveAmplitude > 0 && !prefersReducedMotion) {
          drawY += Math.sin(dot.ax * 0.03 + time) * props.waveAmplitude;
          drawX +=
            Math.cos(dot.ay * 0.03 + time * 0.7) * props.waveAmplitude * 0.5;
        }

        if (props.sparkle && !prefersReducedMotion) {
          const hash = ((index * 2654435761) ^ (frameCount >> 3)) >>> 0;
          const sparkleRadius = hash % 100 < 3 ? radius * 1.8 : radius;
          context.moveTo(drawX + sparkleRadius, drawY);
          context.arc(drawX, drawY, sparkleRadius, 0, TWO_PI);
        } else {
          context.moveTo(drawX + radius, drawY);
          context.arc(drawX, drawY, radius, 0, TWO_PI);
        }
      }

      context.fill();
    }

    function cancelLoop() {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    function startLoop() {
      if (rafRef.current === null && !prefersReducedMotion) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    }

    function tick() {
      rafRef.current = null;
      frameCount += 1;
      drawFrame();
      startLoop();
    }

    function doResize() {
      const rect = parent.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { w: width, h: height };
      buildDots(width, height);
      drawFrame();
    }

    function resize() {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(doResize, 90);
    }

    function updatePointer(event: PointerEvent) {
      const rect = parent.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
    }

    function resetPointer() {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    }

    function updatePointerSpeed() {
      const pointer = pointerRef.current;
      const dx = pointer.prevX - pointer.x;
      const dy = pointer.prevY - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      pointer.speed += (distance - pointer.speed) * 0.5;

      if (pointer.speed < 0.001) {
        pointer.speed = 0;
      }

      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
    }

    function updateMotionPreference(event: MediaQueryListEvent) {
      prefersReducedMotion = event.matches;

      if (prefersReducedMotion) {
        cancelLoop();
        drawFrame();
        return;
      }

      startLoop();
    }

    doResize();

    const speedInterval = window.setInterval(updatePointerSpeed, 20);
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(parent);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    motionQuery.addEventListener("change", updateMotionPreference);
    startLoop();

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;

      if (w > 0 && h > 0) {
        buildDots(w, h);
        drawFrame();
      }
    };

    return () => {
      cancelLoop();
      window.clearInterval(speedInterval);

      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
      motionQuery.removeEventListener("change", updateMotionPreference);
      rebuildRef.current = null;
    };
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className={styles.container} {...rest}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <svg className={styles.glow} aria-hidden="true">
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${gradientId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
}

const DotField = memo(DotFieldInner);

DotField.displayName = "DotField";

export default DotField;

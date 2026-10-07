"use client";
import { useEffect, useRef } from "react";
import styles from "./DotField.module.css";

type Bean = { x: number; y: number; dx: number; dy: number; variant: number };
export default function CoffeeBeanField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let width = 0,
      height = 0,
      frame = 0,
      previous = 0,
      phase = 0,
      px = -1000,
      py = -1000;
    let beans: Bean[] = [];
    // Rasterize the bean silhouettes once; animation only copies small sprites.
    const sprites = Array.from({ length: 8 }, (_, index) => {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 32;
      const brush = sprite.getContext("2d")!;
      brush.translate(16, 16);
      brush.rotate((index * Math.PI) / 4);
      brush.beginPath();
      brush.ellipse(0, 0, 4.5, 6.5, 0, 0, Math.PI * 2);
      brush.fillStyle = "rgba(164, 108, 62, .22)";
      brush.fill();
      brush.strokeStyle = "rgba(216, 170, 116, .2)";
      brush.lineWidth = 0.8;
      brush.stroke();
      brush.beginPath();
      brush.moveTo(0, -5);
      brush.bezierCurveTo(-3, -2, 3, 2, 0, 5);
      brush.strokeStyle = "rgba(22, 11, 5, .85)";
      brush.lineWidth = 1.4;
      brush.stroke();
      return sprite;
    });
    const animate = () => !motion.matches && !connection?.saveData;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const moving = animate();
      for (const dot of beans) {
        const dx = dot.x - px,
          dy = dot.y - py,
          distance = Math.hypot(dx, dy);
        const force =
          moving && fine.matches
            ? Math.max(0, 1 - distance / 250) ** 2 * 35
            : 0;
        dot.dx += ((distance ? (dx / distance) * force : 0) - dot.dx) * 0.16;
        dot.dy += ((distance ? (dy / distance) * force : 0) - dot.dy) * 0.16;
        const x =
            dot.x + (moving ? dot.dx + Math.cos(dot.y * 0.018 + phase) : 0),
          y =
            dot.y +
            (moving ? dot.dy + Math.sin(dot.x * 0.016 + phase) * 1.2 : 0);
        const size = dot.variant % 3 === 0 ? 25 : 32;
        context.drawImage(
          sprites[dot.variant],
          x - size / 2,
          y - size / 2,
          size,
          size,
        );
      }
    };
    const tick = (time: number) => {
      if (time - previous >= 1000 / 24) {
        phase += Math.min(time - previous, 80) * 0.0006;
        previous = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      draw();
      if (!document.hidden && animate()) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const spacing = Math.max(
        width < 700 ? 48 : 44,
        Math.sqrt((width * height) / 650),
      );
      beans = [];
      for (let y = spacing / 2; y < height; y += spacing)
        for (let x = spacing / 2; x < width; x += spacing)
          beans.push({
            x: x + Math.sin(x * 13 + y) * spacing * 0.3,
            y: y + Math.cos(y * 7 + x) * spacing * 0.3,
            dx: 0,
            dy: 0,
            variant: Math.abs(Math.round(x * 7 + y * 11)) % sprites.length,
          });
      sync();
    };
    const pointer = (e: PointerEvent) => {
      if (e.pointerType !== "touch" && fine.matches && animate()) {
        px = e.clientX;
        py = e.clientY;
      }
    };
    const leave = () => {
      px = -1000;
      py = -1000;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div className={styles.container} aria-hidden="true">
      <canvas ref={canvas} className={styles.canvas} />
    </div>
  );
}

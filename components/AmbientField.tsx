"use client";

import { useEffect, useRef } from "react";

/** Low-resolution, 24fps contour field; no animation library or React frame updates. */
export default function AmbientField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d", { alpha: true });
    if (!element || !context) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let width = 0,
      height = 0,
      frame = 0,
      previous = 0,
      phase = 0;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const rows = width < 700 ? 12 : 20;
      for (let row = 0; row < rows; row++) {
        context.beginPath();
        for (let x = -20; x <= width + 20; x += 20) {
          const y =
            height * 0.56 +
            (row - rows / 2) * 19 +
            Math.sin((x / width) * 5 + phase + row * 0.09) * height * 0.14 +
            Math.cos((x / width) * 9 - phase * 0.6) * 22;
          if (x === -20) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(190,200,210,${0.035 + (row / rows) * 0.075})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
    };
    const tick = (time: number) => {
      if (time - previous >= 1000 / 24) {
        phase += Math.min(time - previous, 80) * 0.00012;
        previous = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      draw();
      if (!document.hidden && !motion.matches && !connection?.saveData) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      // A decorative field does not need a retina-sized backing buffer.
      element.width = width;
      element.height = height;
      sync();
    };
    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);
  return <canvas ref={canvas} className="ambient-field" aria-hidden="true" />;
}

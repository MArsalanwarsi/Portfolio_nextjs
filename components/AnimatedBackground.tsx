"use client";

export default function AnimatedBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="starfield starfield--near" />
      <div className="starfield starfield--mid" />
      <div className="starfield starfield--far" />
    </div>
  );
}

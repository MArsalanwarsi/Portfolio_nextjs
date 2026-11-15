"use client";

import { useEffect } from "react";

export default function PageScrollMotion() {
  useEffect(() => {
    // Older browsers use viewport entry instead of native scroll timelines.
    if (CSS.supports("animation-timeline: view()")) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || preference.matches) continue;
        const animation = entry.target.animate(
          [{ translate: "0 20px", opacity: .68 }, { translate: "0 0", opacity: 1 }],
          { duration: 450, easing: "ease-out" }
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        observer.unobserve(entry.target);
      }
    });
    const reset = () => {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      if (!preference.matches) document.querySelectorAll(".page-shell > section h2, [data-scroll-enter], footer h2").forEach(el => observer.observe(el));
    };
    reset();
    preference.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", reset);
      for (const animation of animations) animation.cancel();
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}

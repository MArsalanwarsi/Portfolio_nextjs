"use client";
import { useEffect, useState } from "react";
import {
  Home,
  Fingerprint,
  Layers3,
  BriefcaseBusiness,
  Send,
} from "lucide-react";

const sections = [
  { id: "home", label: "Home", Icon: Home },
  { id: "about", label: "About me", Icon: Fingerprint },
  { id: "experience", label: "Experience", Icon: BriefcaseBusiness },
  { id: "projects", label: "Selected work", Icon: Layers3 },
  { id: "contact", label: "Contact", Icon: Send },
];

export default function SectionRail() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= innerHeight * 0.4)
          current = section.id;
      }
      setActive(current);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return (
    <nav className="section-rail" aria-label="Section navigation">
      {sections.map(({ id, label, Icon }, index) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={active === id ? "location" : undefined}
        >
          <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
          <span className="rail-label">
            <small>0{index + 1}</small>
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}

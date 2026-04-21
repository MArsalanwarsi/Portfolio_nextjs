"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Layers,
  FileCode,
  Database,
  Award,
  Star,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { certificates } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Globe,
  Layers,
  FileCode,
  Database,
  Award,
  Star,
};

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certificates">
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Recognition"
            title="Certificates &"
            accent="awards."
          />
        </div>

        <div ref={gridRef} className="certificates-grid">
          {certificates.map((cert) => {
            const IconComponent = iconMap[cert.icon] || Award;

            return (
              <article key={cert.title} className="certificate-card surface-card">
                <div className="certificate-card__header">
                  <span className="certificate-card__icon">
                    <IconComponent size={20} />
                  </span>
                  <span className="certificate-card__date meta-chip">
                    {cert.date}
                  </span>
                </div>

                <h3 className="certificate-card__title">{cert.title}</h3>
                <p className="certificate-card__issuer">{cert.issuer}</p>
                <p className="certificate-card__desc">{cert.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

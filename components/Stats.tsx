"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Code2, FolderGit2, Users } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { stats } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={24} />,
  Code2: <Code2 size={24} />,
  FolderGit2: <FolderGit2 size={24} />,
  Users: <Users size={24} />,
};

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(cardsRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Impact"
            title="Quick"
            accent="snapshot."
            align="center"
          />
        </div>

        <div className="impact-band">
          <div ref={cardsRef} className="impact-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="impact-card">
                <div className="impact-icon">{iconMap[stat.icon]}</div>
                <div className="impact-value">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="impact-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

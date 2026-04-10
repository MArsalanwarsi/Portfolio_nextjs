"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Layers, Palette, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { aboutHighlights, siteConfig } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={22} />,
  Layers: <Layers size={22} />,
  Palette: <Palette size={22} />,
  Zap: <Zap size={22} />,
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
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

      gsap.from(storyRef.current, {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 28,
        opacity: 0,
        duration: 0.8,
        delay: 0.08,
        ease: "power3.out",
      });

      gsap.from(cardsRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 22,
        opacity: 0,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about">
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="About"
            title="Building products with"
            accent="clarity."
            description="I focus on clean UI, readable code, and practical full-stack work."
          />
        </div>

        <div className="about-grid">
          <div ref={storyRef} className="about-story surface-card">
            <div className="about-story__lead">
              <span className="about-story__label">About me</span>
              <p>
                I&apos;m <strong>{siteConfig.name}</strong>, a full-stack
                developer focused on React, Next.js, Node.js, and MongoDB.
              </p>
            </div>

            <p>
              Teaching improved my communication and teamwork, which helps me
              build products that are easier to use and easier to maintain.
            </p>

            <div className="about-snapshot outline-card">
              <span className="section-kicker">Working style</span>
              <ul className="about-detail-list">
                <li className="about-detail-item">
                  Clean UI over visual noise.
                </li>
                <li className="about-detail-item">
                  Scalable structure over quick fixes.
                </li>
                <li className="about-detail-item">
                  Clear communication throughout the work.
                </li>
              </ul>
            </div>
          </div>

          <div ref={cardsRef} className="about-principles">
            {aboutHighlights.map((item) => (
              <article key={item.title} className="principle-card surface-card">
                <div className="principle-icon">{iconMap[item.icon]}</div>
                <h3 className="principle-title">{item.title}</h3>
                <p className="principle-copy">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

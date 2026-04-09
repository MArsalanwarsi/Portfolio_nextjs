"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { experiences } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      gsap.from(listRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 86%",
          toggleActions: "play none none none",
        },
        x: -28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience">
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Experience"
            title="Teaching and building in"
            accent="real environments."
            description="My recent work blends technical instruction with practical product development, which keeps both my communication and implementation grounded."
          />
        </div>

        <div ref={listRef} className="timeline-shell">
          {experiences.map((experience) => (
            <article key={`${experience.company}-${experience.role}`} className="timeline-item">
              <span className="timeline-marker" aria-hidden="true" />

              <div className="experience-card surface-card">
                <div className="experience-meta">
                  <div>
                    <p className="experience-role">{experience.role}</p>
                    <div className="experience-company">
                      <span>
                        <Briefcase size={14} />
                        {experience.company}
                      </span>
                      {experience.location ? (
                        <span>
                          <MapPin size={14} />
                          {experience.location}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <span className="experience-period">
                    <CalendarDays size={14} />
                    {experience.period}
                  </span>
                </div>

                <ul className="experience-list">
                  {experience.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="experience-skills">
                  {experience.skills.map((skill) => (
                    <span key={skill} className="meta-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

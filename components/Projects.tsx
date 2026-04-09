"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
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
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 34,
        opacity: 0,
        duration: 0.95,
        stagger: 0.14,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects">
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Projects"
            title="Selected work with"
            accent="real product weight."
            description="The goal in each build is the same: clear interaction, solid structure, and a visual system strong enough to feel like a product, not a practice file."
          />
        </div>

        <div ref={listRef} className="projects-list">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`project-panel surface-card${index % 2 === 1 ? " reverse" : ""}`}
            >
              <div className="project-copy">
                <div className="project-copy__meta">
                  <span className="project-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="meta-chip">{project.label}</span>
                </div>

                <div className="project-copy__body">
                  <h3>{project.title}</h3>
                  <p>{project.longDescription}</p>
                </div>

                <div className="project-chip-row">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="meta-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="project-feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary"
                  >
                    <GithubIcon size={18} />
                    Source
                  </a>

                  {project.live !== "#" ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                    >
                      Live demo
                      <ExternalLink size={18} />
                    </a>
                  ) : (
                    <span className="button-secondary is-static">
                      Case study in progress
                      <ArrowUpRight size={18} />
                    </span>
                  )}
                </div>
              </div>

              <div className="project-preview" style={{ background: project.surface }}>
                <div className="project-preview__window">
                  <div className="project-preview__bar">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="project-preview__content">
                    <span className="project-preview__label">{project.label}</span>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>

                    <div className="project-preview__stats">
                      <div>
                        <small>Focus</small>
                        <strong>UX + architecture</strong>
                      </div>
                      <div>
                        <small>Approach</small>
                        <strong>Clarity under scale</strong>
                      </div>
                    </div>

                    <div className="project-preview__footer">
                      <span className="project-preview__accent" />
                      <strong style={{ color: project.accent }}>
                        Designed to feel trustworthy on first contact
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

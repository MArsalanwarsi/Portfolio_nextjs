"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import ProfilePortrait from "@/components/ProfilePortrait";
import { siteConfig } from "@/data/portfolio";

const hasRealEmail = !siteConfig.email.includes("example.com");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.15 });

      timeline
        .from(copyRef.current?.children ?? [], {
          y: 30,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        })
        .from(
          visualRef.current,
          {
            y: 34,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .from(
          metricsRef.current?.children ?? [],
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          notesRef.current?.children ?? [],
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="home" className="hero-section">
      <div className="section-shell hero-shell">
        <div className="hero-grid">
          <div ref={copyRef} className="hero-copy">
            <span className="eyebrow-pill">{siteConfig.availability}</span>

            <div className="hero-kicker">
              <span>{siteConfig.role}</span>
              <span className="hero-kicker__dot" />
              <span>{siteConfig.specialization}</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title__name">{siteConfig.name}</span>
              <span className="hero-title__line">React and Next.js apps</span>
              <span className="hero-title__line hero-title__line--accent">
                built clean and fast.
              </span>
            </h1>

            <p className="hero-description">{siteConfig.description}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="button-primary"
                onClick={() => scrollToSection("projects")}
              >
                View projects
                <ArrowDownRight size={18} />
              </button>

              <a
                className="button-secondary"
                href={hasRealEmail ? `mailto:${siteConfig.email}` : siteConfig.linkedin}
                target={hasRealEmail ? undefined : "_blank"}
                rel={hasRealEmail ? undefined : "noopener noreferrer"}
              >
                {hasRealEmail ? "Contact me" : "Connect on LinkedIn"}
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div ref={metricsRef} className="hero-metrics">
              {siteConfig.heroMetrics.map((metric) => (
                <div key={metric.label} className="hero-metric">
                  <span className="hero-metric__value">{metric.value}</span>
                  <span className="hero-metric__label">{metric.label}</span>
                </div>
              ))}
            </div>

            <div ref={notesRef} className="hero-notes">
              {siteConfig.focusAreas.map((item) => (
                <span key={item} className="hero-note">
                  {item}
                </span>
              ))}
            </div>

            <div className="hero-socials">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="GitHub profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          <div ref={visualRef} className="hero-visual">
            <div className="hero-stage">
              <div className="hero-stage__halo hero-stage__halo--one" />
              <div className="hero-stage__halo hero-stage__halo--two" />

              <div className="hero-stage__panel">
                <div className="hero-stage__header">
                  <span className="hero-stage__status">
                    Open to work
                  </span>
                </div>

                <ProfilePortrait
                  src={siteConfig.portrait.src}
                  fallbackSrc={siteConfig.portrait.fallbackSrc}
                  alt={siteConfig.portrait.alt}
                  initials={siteConfig.portrait.initials}
                />

                <div className="hero-stage__caption">
                  <span className="section-kicker">Current focus</span>
                  <h2>Full-stack work with clean UI.</h2>
                  <p>{siteConfig.intro}</p>
                </div>
              </div>

              <div className="floating-card floating-card--top">
                <span>Current role</span>
                <strong>Teaching Intern at Aptech</strong>
              </div>

              <div className="floating-card floating-card--bottom">
                <span>Strength</span>
                <strong>Clean UI with practical engineering</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

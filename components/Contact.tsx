"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const hasRealEmail = !siteConfig.email.includes("example.com");
const hasResume = siteConfig.resumeUrl !== "#";

const contactLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: <GithubIcon size={20} />,
    description: "Browse repositories and selected code work.",
    disabled: false,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: <LinkedinIcon size={20} />,
    description: "Connect for roles, collaboration, or intros.",
    disabled: false,
  },
  {
    label: "Email",
    href: hasRealEmail ? `mailto:${siteConfig.email}` : "",
    icon: <Mail size={20} />,
    description: "Reach out directly for opportunities and freelance work.",
    disabled: !hasRealEmail,
  },
  {
    label: "Resume",
    href: hasResume ? siteConfig.resumeUrl : "",
    icon: <FileText size={20} />,
    description: "Open the latest resume and experience summary.",
    disabled: !hasResume,
  },
].filter((link) => !link.disabled);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      gsap.from(contentRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact">
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Contact"
            title="If you want the UI to"
            accent="actually hit, let’s build."
            description="I’m open to teams, founders, and collaborators who want strong frontend execution backed by clean full-stack thinking."
            align="center"
          />
        </div>

        <div ref={contentRef} className="contact-layout">
          <div className="contact-panel surface-card">
            <span className="section-kicker">Open for opportunities</span>
            <h3>{siteConfig.availability}</h3>
            <p>
              The best projects start with a clear brief, sharp taste, and a
              willingness to care about the details users actually feel.
            </p>

            <a
              className="button-primary contact-cta"
              href={hasRealEmail ? `mailto:${siteConfig.email}` : siteConfig.linkedin}
              target={hasRealEmail ? undefined : "_blank"}
              rel={hasRealEmail ? undefined : "noopener noreferrer"}
            >
              {hasRealEmail ? "Send an email" : "Message on LinkedIn"}
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="contact-link-card surface-card"
              >
                <div className="contact-link-card__icon">{link.icon}</div>
                <h3 className="contact-link-card__title">
                  {link.label}
                  <ArrowUpRight size={16} />
                </h3>
                <p className="contact-link-card__copy">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

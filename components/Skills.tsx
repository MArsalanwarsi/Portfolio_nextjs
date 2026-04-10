"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Atom,
  Bot,
  Cloud,
  Code2,
  Cookie,
  Database,
  FileCode,
  FileType,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Mail,
  Network,
  Palette,
  Server,
  Shield,
  Sparkles,
  Table,
  Wind,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import SectionHeader from "@/components/SectionHeader";
import { skills } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const iconComponents: Record<string, React.ReactNode> = {
  Atom: <Atom size={16} />,
  Bot: <Bot size={16} />,
  Cloud: <Cloud size={16} />,
  Code2: <Code2 size={16} />,
  Cookie: <Cookie size={16} />,
  Database: <Database size={16} />,
  FileCode: <FileCode size={16} />,
  FileType: <FileType size={16} />,
  GitBranch: <GitBranch size={16} />,
  Github: <GithubIcon size={16} />,
  Globe: <Globe size={16} />,
  KeyRound: <KeyRound size={16} />,
  Layers: <Layers size={16} />,
  Mail: <Mail size={16} />,
  Network: <Network size={16} />,
  Palette: <Palette size={16} />,
  Server: <Server size={16} />,
  Shield: <Shield size={16} />,
  Sparkles: <Sparkles size={16} />,
  Table: <Table size={16} />,
  Wind: <Wind size={16} />,
  Zap: <Zap size={16} />,
};

const categories = [
  {
    key: "frontend" as const,
    title: "Frontend",
    description: "React, Next.js, TypeScript, and UI work.",
  },
  {
    key: "backend" as const,
    title: "Backend",
    description: "Node.js, Express, auth, and APIs.",
  },
  {
    key: "database" as const,
    title: "Database",
    description: "MongoDB and MySQL.",
  },
  {
    key: "tools" as const,
    title: "Tools",
    description: "Git, GSAP, cloud tools, and integrations.",
  },
];

export default function Skills() {
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
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills">
      <div className="section-shell section-divider">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Skills"
            title="Core"
            accent="skills."
          />
        </div>

        <div ref={gridRef} className="skills-grid">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category.key
            );

            return (
              <article key={category.key} className="skill-cluster surface-card">
                <div className="skill-cluster__head">
                  <h3 className="skill-cluster__title">{category.title}</h3>
                  <p className="skill-cluster__copy">{category.description}</p>
                </div>

                <div className="skill-chip-list">
                  {categorySkills.map((skill) => (
                    <span key={skill.name} className="skill-chip">
                      {iconComponents[skill.icon] ?? <Code2 size={16} />}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

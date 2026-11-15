import {
  Atom,
  Blocks,
  Bot,
  Braces,
  Cloud,
  CloudUpload,
  Code2,
  Component,
  Cookie,
  Database,
  DatabaseZap,
  FileCode,
  FileType,
  Frame,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  LockKeyhole,
  Mail,
  MonitorCog,
  Network,
  Package,
  Palette,
  PanelsTopLeft,
  Plug,
  Route,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  Table,
  TestTubeDiagonal,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import styles from "./Skills.module.css";

import { skillsContent } from "@/data/portfolio";
import Skills3DOrbit from "@/components/three/Skills3DOrbit";

const iconComponents = {
  Atom,
  Blocks,
  Bot,
  Braces,
  Cloud,
  CloudUpload,
  Code2,
  Component,
  Cookie,
  Database,
  DatabaseZap,
  FileCode,
  FileType,
  Frame,
  GitBranch,
  Github: GithubIcon,
  Globe,
  KeyRound,
  Layers,
  LockKeyhole,
  Mail,
  MonitorCog,
  Network,
  Package,
  Palette,
  PanelsTopLeft,
  Plug,
  Route,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  Table,
  TestTubeDiagonal,
  Wind,
  Workflow,
  Zap,
};

export default function Skills() {
  const chapters = skillsContent.categories.map((category) => ({
    ...category,
    skills: skillsContent.items.filter((skill) => skill.category === category.key),
  }));

  return (
    <section id="skills" data-surface="dark" className={styles.section} aria-labelledby="skill-heading">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Technical index / {skillsContent.items.length} skills</p>
            <h2 id="skill-heading">{skillsContent.header.title} <em>{skillsContent.header.accent}</em></h2>
          </div>
          <p className={styles.lede}>From the interface to the data underneath. Explore the tools I use at each layer of a web application.</p>
        </header>
        <Skills3DOrbit chapters={chapters.map(({ key, title, skills }) => ({ key, title, count: skills.length }))}>
          {chapters.map((category) => (
            <div key={category.key}>
              <p className={styles.panelDescription}>{category.description}</p>
              <ul className={styles.inventory} aria-label={category.title + " skills"}>
                {category.skills.map((skill) => {
                  const Icon = iconComponents[skill.icon as keyof typeof iconComponents] ?? Code2;
                  return <li key={skill.name}><Icon className={styles.skillIcon} aria-hidden="true" />{skill.name}</li>;
                })}
              </ul>
            </div>
          ))}
        </Skills3DOrbit>
        <p data-scroll-enter className={styles.highlights}><strong>Core stack</strong> {skillsContent.stackHighlights.join("   /   ")}</p>
      </div>
    </section>
  );
}

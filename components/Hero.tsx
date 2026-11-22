import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import PhotoStage from "./three/PhotoStage";
import ResumeButton from "./ResumeButton";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" data-surface="dark" aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.meta}><span data-copyable>{siteConfig.location}</span><span>{siteConfig.availability}</span></div>
      <h1 id="hero-title" className={styles.name}><span className="sr-only">Muhammad </span><span>Arsalan</span>{" "}<span>Warsi</span></h1>
      <PhotoStage />
      <div className={styles.bottom}>
        <div><p data-copyable className={styles.role}>Full-stack developer</p><p className={styles.summary}>Custom websites and online stores for businesses.</p></div>
        <div className={styles.actions}>
          <a href="#projects">Selected work <ArrowDownRight /></a>
          <ResumeButton>Résumé <ArrowUpRight /></ResumeButton>
        </div>
      </div>
    </section>
  );
}

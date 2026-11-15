import { ArrowUpRight, ArrowUp } from "lucide-react";
import { navLinks, siteConfig } from "@/data/portfolio";
import styles from "./Chrome.module.css";

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className={styles.footerGround} data-surface="dark">
      <div className={styles.footerPanel}>
        <div className={styles.footerTab} aria-hidden="true">AW / {CURRENT_YEAR}</div>
        <div className={styles.footerTop}>
          <p className={styles.micro}>Next up / your idea</p>
          <a href="#home" className={styles.backTop}>Back to top <ArrowUp size={17} aria-hidden="true" /></a>
        </div>
        <div className={styles.footerStatement}>
          <h2>Have something<br />in <em>mind?</em></h2>
          <a href={`mailto:${siteConfig.email}`} className={styles.footerCta}>Let’s build it <ArrowUpRight size={22} aria-hidden="true" /></a>
        </div>
        <div data-scroll-enter className={styles.footerColumns}>
          <div className={styles.footerIdentity}>
            <a href="#home" className={styles.wordmark} aria-label={`${siteConfig.name}, home`}><span>Arsalan</span><strong>WARSI</strong></a>
            <p>{siteConfig.role}<br />{siteConfig.location}</p>
          </div>
          <div className={styles.footerLinkGroup}>
            <h3>Explore</h3>
            {navLinks.filter(link => ["#about", "#experience", "#projects", "#contact"].includes(link.href)).map(link => <a href={link.href} key={link.href}>{link.label}</a>)}
          </div>
          <div className={styles.footerLinkGroup}>
            <h3>Elsewhere</h3>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className={`${styles.footerLinkGroup} ${styles.footerContact}`}>
            <h3>Say hello</h3>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            {siteConfig.phone && <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {CURRENT_YEAR} {siteConfig.name}</p>
          <p>Designed with intent. Built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}


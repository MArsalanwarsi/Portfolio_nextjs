"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import styles from "./Chrome.module.css";

export const directoryLinks = [
  { number: "01", label: "PROJECTS", href: "#projects" },
  { number: "02", label: "ABOUT", href: "#about" },
  { number: "03", label: "SKILLS", href: "#skills" },
  { number: "04", label: "TIMELINE", href: "#experience" },
  { number: "05", label: "CONTACT", href: "#contact" },
] as const;

export default function Navbar() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkSurface, setDarkSurface] = useState(true);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = document
        .elementFromPoint(window.innerWidth / 2, 110)
        ?.closest<HTMLElement>("[data-surface]");
      if (section) {
        setDarkSurface(
          section.dataset.surface === "dark" || section.dataset.surface === "void"
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const openMenu = () => {
    dialog.current?.showModal();
    setMenuOpen(true);
  };

  const closeMenu = () => {
    dialog.current?.close();
  };

  const handleClose = () => {
    setMenuOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialog.current) {
      closeMenu();
    }
  };

  return (
    <>
      {/* Floating Chrome Navigation Bar */}
      <header
        className={`${styles.chrome} ${darkSurface ? styles.onDark : ""}`}
        aria-label="Site header"
      >
        {/* Top-Left Stacked Wordmark */}
        <a
          href="#home"
          className={styles.wordmark}
          aria-label={`${siteConfig.name}, back to top`}
        >
          <Image src="/ma-mark.webp" width={40} height={26} alt="" unoptimized />
          <span>Arsalan</span>
          <strong>WARSI</strong>
        </a>

        {/* Top-Right Action Controls */}
        <div className={styles.navActions}>
          <a
            href="#contact"
            className={styles.talk}
            aria-label="Let's talk, go to contact section"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            ref={trigger}
            type="button"
            className={`${styles.menuButton} w-[55.5px] h-[55.5px]`}
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-haspopup="dialog"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Full-Bleed Directory Navigation Dialog */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialog}
        id="site-navigation"
        className={styles.menu}
        onClick={handleDialogClick}
        onClose={handleClose}
        aria-labelledby="menu-title"
        aria-modal="true"
      >
        <div className={styles.menuTop}>
          <a
            href="#home"
            onClick={closeMenu}
            className={styles.wordmark}
            aria-label={`${siteConfig.name}, home`}
          >
            <Image src="/ma-mark.webp" width={40} height={26} alt="" unoptimized />
            <span>Arsalan</span>
            <strong>WARSI</strong>
          </a>
          <span className={styles.micro}>
            Independent Developer · Karachi, PK
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className={styles.close}
            aria-label="Close navigation menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.menuContent}>
          <div className={styles.menuIntro}>
            <p id="menu-title" className={styles.micro}>
              Directory
            </p>
            <p>
              Good ideas.
              <br />
              <em>Better websites.</em>
            </p>
            <a
              data-copyable draggable={false}
              href={`mailto:${siteConfig.email}`}
              className={styles.menuEmail}
            >
              {siteConfig.email} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <nav className={styles.menuLinks} aria-label="Primary navigation">
            {directoryLinks.map((link) => (
              <a
                href={link.href}
                key={link.number}
                onClick={closeMenu}
                className={styles.directoryLink}
              >
                <span className={styles.dirNumber}>{link.number}</span>
                <span className={styles.dirDivider}>//</span>
                <span className={styles.dirLabel}>{link.label}</span>
                <ArrowUpRight
                  size={26}
                  className={styles.dirArrow}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.menuBottom}>
          <span className={styles.micro}>
            {siteConfig.role} · Aptech Associate
          </span>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View résumé <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </>
  );
}




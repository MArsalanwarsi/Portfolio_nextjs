"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import type { NavLink, ProjectImage } from "@/data/portfolio";

export function MobileMenu({ links }: { links: NavLink[] }) {
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const menu = details.current;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    menu?.addEventListener("keydown", dismiss);
    return () => menu?.removeEventListener("keydown", dismiss);
  }, []);
  return (
    <details className="mobile-menu" ref={details}>
      <summary aria-label="Toggle navigation">
        <Menu size={24} />
        <X size={24} />
      </summary>
      <nav aria-label="Mobile navigation">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => {
              if (details.current) details.current.open = false;
            }}
          >
            {link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </details>
  );
}

export function ProjectGallery({
  images,
  title,
  index,
}: {
  images: ProjectImage[];
  title: string;
  index: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const galleryId = `gallery-${index}`;
  function open(imageIndex: number) {
    setActive(imageIndex);
    dialog.current?.showModal();
  }
  function move(direction: number) {
    setActive(
      (current) => (current + direction + images.length) % images.length,
    );
  }
  useEffect(() => {
    const gallery = dialog.current;
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActive(
          (current) => (current + direction + images.length) % images.length,
        );
      }
    };
    const backdrop = (event: MouseEvent) => {
      if (event.target === gallery) gallery?.close();
    };
    gallery?.addEventListener("keydown", keyboard);
    gallery?.addEventListener("click", backdrop);
    return () => {
      gallery?.removeEventListener("keydown", keyboard);
      gallery?.removeEventListener("click", backdrop);
    };
  }, [images.length]);
  return (
    <div className="project-visual">
      <div className="project-mosaic reference-mosaic">
        <svg
          className="mosaic-clip-definitions"
          aria-hidden="true"
          width="0"
          height="0"
        >
          <defs>
            <clipPath
              id={`project-cutout-${index}`}
              clipPathUnits="objectBoundingBox"
            >
              <path d="M .29 0 H .955 Q 1 0 1 .09 V .39 Q 1 .48 .955 .48 H .795 Q .75 .48 .75 .57 V .91 Q .75 1 .705 1 H .045 Q 0 1 0 .91 V .61 Q 0 .52 .045 .52 H .205 Q .25 .52 .25 .43 V .09 Q .25 0 .29 0 Z" />
            </clipPath>
          </defs>
        </svg>
        <button
          className="mosaic-floating"
          onClick={() => open(1)}
          aria-label={`View ${title}: ${images[1].caption}`}
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            sizes="(max-width: 700px) 20vw, 160px"
            unoptimized
          />
          <span className="floating-action">
            <span className="floating-symbol" aria-hidden="true">
              ↗
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={23} aria-hidden="true" />
            </span>
          </span>
        </button>
        <button
          className="mosaic-main"
          onClick={() => open(0)}
          aria-label={`Open ${title} gallery`}
          style={{ clipPath: `url(#project-cutout-${index})` }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(max-width: 700px) 90vw, 760px"
            unoptimized
          />
        </button>
        <button
          className="mosaic-side"
          onClick={() => open(1)}
          aria-label={`Enlarge ${title}: ${images[1].caption}`}
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            sizes="(max-width: 700px) 20vw, 160px"
            unoptimized
          />
        </button>
        <div className="mosaic-tall" aria-hidden="true">
          <Image
            src={images[1].src}
            alt=""
            fill
            sizes="(max-width: 700px) 20vw, 160px"
            unoptimized
          />
        </div>
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialog}
        aria-labelledby={galleryId}
      >
        <div className="gallery-header">
          <h3 id={galleryId}>{title}</h3>
          <button
            className="circle-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>
        </div>
        <div className="gallery-image">
          <Image
            src={images[active].src}
            alt={images[active].alt}
            width={1200}
            height={760}
            unoptimized
          />
        </div>
        <div className="gallery-bottom">
          <button
            className="circle-button"
            onClick={() => move(-1)}
            aria-label="Previous image"
          >
            <ArrowLeft size={20} />
          </button>
          <p aria-live="polite">
            {images[active].caption}{" "}
            <span>
              {active + 1} / {images.length}
            </span>
          </p>
          <button
            className="circle-button"
            onClick={() => move(1)}
            aria-label="Next image"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </dialog>
    </div>
  );
}

export function RevealEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((element, index) => {
        if (
          element.closest(".approach-grid,.education-grid,.certificates-grid")
        )
          element.style.transitionDelay = `${(index % 2) * 80}ms`;
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("reveal-pending");
          observer.observe(element);
        }
      });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".reveal-pending")
        .forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);
  return null;
}

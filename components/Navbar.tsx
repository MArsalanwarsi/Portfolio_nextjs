"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ThemeToggle, { type ThemeMode } from "@/components/ThemeToggle";
import { navLinks, siteConfig } from "@/data/portfolio";

const hasRealEmail = !siteConfig.email.includes("example.com");
const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    finished?: Promise<void>;
  };
};

function applyTheme(nextTheme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
  window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function primeThemeRipple(
  originX: number,
  originY: number,
  nextTheme: ThemeMode
) {
  const root = document.documentElement;
  const maxX = Math.max(originX, window.innerWidth - originX);
  const maxY = Math.max(originY, window.innerHeight - originY);
  const radius = Math.hypot(maxX, maxY) + 96;

  root.style.setProperty("--theme-ripple-x", `${originX}px`);
  root.style.setProperty("--theme-ripple-y", `${originY}px`);
  root.style.setProperty("--theme-ripple-size", `${radius}px`);
  root.dataset.themeTarget = nextTheme;
}

function readResolvedTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "dark";
  }

  if (document.documentElement.dataset.theme === "light") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return "dark";
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleThemeChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function subscribeToHydration() {
  return () => {};
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const theme = useSyncExternalStore<ThemeMode>(
    subscribeToTheme,
    readResolvedTheme,
    () => "dark"
  );
  const themeReady = useSyncExternalStore<boolean>(
    subscribeToHydration,
    () => true,
    () => false
  );
  const scrollResetRef = useRef<number | null>(null);
  const themeCleanupRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let lastY = window.scrollY;
    let lastTimestamp = performance.now();

    const clearFastScroll = () => {
      root.classList.remove("is-scrolling-fast");
      scrollResetRef.current = null;
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const timestamp = performance.now();
        const deltaY = Math.abs(currentY - lastY);
        const elapsed = Math.max(timestamp - lastTimestamp, 16);
        const velocity = deltaY / elapsed;

        setScrolled(currentY > 32);

        if (velocity > 1.4 || deltaY > 180) {
          root.classList.add("is-scrolling-fast");
        }

        if (scrollResetRef.current) {
          window.clearTimeout(scrollResetRef.current);
        }

        scrollResetRef.current = window.setTimeout(clearFastScroll, 180);
        lastY = currentY;
        lastTimestamp = timestamp;
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (scrollResetRef.current) {
        window.clearTimeout(scrollResetRef.current);
        scrollResetRef.current = null;
      }

      root.classList.remove("is-scrolling-fast");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.45,
          rootMargin: "-20% 0px -30% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (themeCleanupRef.current) {
        window.clearTimeout(themeCleanupRef.current);
      }
    };
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentTheme = readResolvedTheme();
    const nextTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const documentWithTransition = document as DocumentWithViewTransition;
    const buttonBounds = event.currentTarget.getBoundingClientRect();
    const originX =
      event.clientX === 0 && event.clientY === 0
        ? buttonBounds.left + buttonBounds.width / 2
        : event.clientX;
    const originY =
      event.clientX === 0 && event.clientY === 0
        ? buttonBounds.top + buttonBounds.height / 2
        : event.clientY;

    primeThemeRipple(originX, originY, nextTheme);
    root.classList.add("theme-animating", "theme-ripple-active");

    const cleanup = () => {
      if (themeCleanupRef.current) {
        window.clearTimeout(themeCleanupRef.current);
      }

      themeCleanupRef.current = window.setTimeout(() => {
        root.classList.remove("theme-animating", "theme-ripple-active");
        root.removeAttribute("data-theme-target");
      }, 1100);
    };

    const updateTheme = () => {
      applyTheme(nextTheme);
    };

    if (documentWithTransition.startViewTransition) {
      const transition = documentWithTransition.startViewTransition(updateTheme);

      if (transition.finished) {
        transition.finished.finally(cleanup);
      } else {
        cleanup();
      }

      return;
    }

    updateTheme();
    cleanup();
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`site-nav${scrolled ? " is-scrolled" : ""}`}
        aria-label="Primary"
      >
        <div className="site-nav__inner">
          <a
            href="#home"
            className="brand-mark"
            onClick={(event) => handleNavClick(event, "#home")}
          >
            <span className="brand-mark__monogram">AW</span>
            <span className="brand-mark__text">
              <strong>{siteConfig.name}</strong>
              <small>{siteConfig.specialization}</small>
            </span>
          </a>

          <div className="nav-links">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link${activeSection === id ? " is-active" : ""}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="nav-controls">
            <ThemeToggle mode={theme} onToggle={toggleTheme} ready={themeReady} />

            <a
              className="nav-cta"
              href={hasRealEmail ? `mailto:${siteConfig.email}` : siteConfig.linkedin}
              target={hasRealEmail ? undefined : "_blank"}
              rel={hasRealEmail ? undefined : "noopener noreferrer"}
            >
              {hasRealEmail ? "Start a project" : "Let’s connect"}
            </a>
          </div>

          <button
            type="button"
            className={`menu-toggle${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-panel${mobileOpen ? " open" : ""}`}>
        <div className="mobile-panel__content">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={(event) => handleNavClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}

          <ThemeToggle
            mode={theme}
            onToggle={toggleTheme}
            expanded
            ready={themeReady}
          />

          <a
            className="button-primary"
            href={hasRealEmail ? `mailto:${siteConfig.email}` : siteConfig.linkedin}
            target={hasRealEmail ? undefined : "_blank"}
            rel={hasRealEmail ? undefined : "noopener noreferrer"}
          >
            {hasRealEmail ? "Email me" : "Open LinkedIn"}
          </a>
        </div>
      </div>
    </>
  );
}

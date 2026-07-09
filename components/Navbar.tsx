"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Send } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
 
const hasRealEmail = !siteConfig.email.includes("example.com");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frame = 0;
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

    const findActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;

      if (viewportBottom >= pageBottom - 8) {
        return sectionIds[sectionIds.length - 1];
      }

      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (!section) {
          continue;
        }

        if (section.offsetTop <= scrollPosition) {
          currentSection = id;
        } else {
          break;
        }
      }

      return currentSection;
    };

    const syncNavState = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      setActiveSection(findActiveSection());
    };

    const requestSync = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(syncNavState);
    };

    syncNavState();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const contactHref = hasRealEmail
    ? `mailto:${siteConfig.email}`
    : siteConfig.linkedin;

  return (
    <m.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 sm:px-6",
        scrolled && "pt-3"
      )}
      aria-label="Primary"
    >
      <div
        className={cn(
          "glass-nav mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 rounded-xl border px-3 py-2 transition-all duration-300",
          scrolled && "translate-y-[-1px]"
        )}
      >
      

<a
  href="#home"
  onClick={(event) => handleNavClick(event, "#home")}
  className="group flex min-w-0 items-center gap-3"
  aria-label={`${siteConfig.name} home`}
>
  <Avatar className="size-10 border border-border bg-muted">
    <AvatarImage
      src="/icon.png"
      alt={`${siteConfig.name} logo`}
      className="object-cover"
    />

    <AvatarFallback className="bg-primary text-primary-foreground font-display text-sm font-semibold">
      AW
    </AvatarFallback>
  </Avatar>

  <span className="flex min-w-0 flex-col leading-tight max-[360px]:hidden">
    <span className="truncate text-sm font-semibold">
      {siteConfig.shortName}
    </span>

    <span className="truncate text-xs text-muted-foreground">
      {siteConfig.role}
    </span>
  </span>
</a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const active = activeSection === id;

            return (
              <Button
                key={link.href}
                nativeButton={false}
                render={
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                  />
                }
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 rounded-full px-3 text-xs text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                  active &&
                    "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary hover:text-primary-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            nativeButton={false}
            render={
              <a
                href={contactHref}
                target={hasRealEmail ? undefined : "_blank"}
                rel={hasRealEmail ? undefined : "noopener noreferrer"}
              />
            }
            size="lg"
            className="hidden rounded-full bg-primary px-4 text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 md:inline-flex"
          >
            <Send className="size-4" aria-hidden="true" />
            Connect
          </Button>

          <MobileNav
            activeSection={activeSection}
            contactHref={contactHref}
            hasRealEmail={hasRealEmail}
            onNavigate={handleNavClick}
          />
        </div>
      </div>
    </m.nav>
  );
}

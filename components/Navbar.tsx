"use client";

import { useEffect, useState } from "react";
import { Menu, Send } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const hasRealEmail = !siteConfig.email.includes("example.com");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    setMobileOpen(false);
  };

  const contactHref = hasRealEmail
    ? `mailto:${siteConfig.email}`
    : siteConfig.linkedin;

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 sm:px-6",
        scrolled && "pt-3"
      )}
      aria-label="Primary"
    >
      <div
        className={cn(
          "glass-nav mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-all duration-300",
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
            <AvatarFallback className="bg-primary text-primary-foreground font-display text-sm font-semibold">
              AW
            </AvatarFallback>
          </Avatar>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate text-sm font-semibold">
              {siteConfig.shortName}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Full-stack developer
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

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-full border border-border/60 bg-muted/30 hover:bg-primary/10 lg:hidden"
                />
              }
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="glass-nav w-[min(86vw,22rem)] gap-0 overflow-hidden border-primary/20">
              <SheetHeader className="border-b border-border/60 px-5 pb-5 pt-5 pr-14">
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 border border-border bg-muted">
                    <AvatarFallback className="bg-primary text-primary-foreground font-display text-sm font-semibold">
                      AW
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <SheetTitle className="font-display text-2xl leading-none">
                      {siteConfig.shortName}
                    </SheetTitle>
                    <SheetDescription className="mt-1 text-xs">
                      {siteConfig.role}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-3 py-4">
                {navLinks.map((link, index) => {
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
                      size="lg"
                      className={cn(
                        "h-11 justify-start gap-3 rounded-2xl px-3 text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                        active &&
                          "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary hover:text-primary-foreground"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span
                        className={cn(
                          "w-6 font-mono text-[0.68rem] text-muted-foreground",
                          active && "text-primary-foreground/70"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Button>
                  );
                })}
              </div>

              <SheetFooter className="border-t border-border/60 p-3">
                <div className="flex items-center justify-between rounded-2xl bg-muted/25 p-2">
                  <span className="px-2 text-sm text-muted-foreground">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>

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
                  className="h-11 rounded-2xl"
                >
                  <Send className="size-4" aria-hidden="true" />
                  {hasRealEmail ? "Email me" : "Open LinkedIn"}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

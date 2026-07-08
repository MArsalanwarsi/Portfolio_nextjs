"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Menu,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
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

const navIcons = {
  Home,
  About: UserRound,
  Experience: BriefcaseBusiness,
  Skills: Sparkles,
  Projects: FolderKanban,
  Certificates: Award,
  Contact: Send,
};

interface MobileNavProps {
  activeSection: string;
  contactHref: string;
  hasRealEmail: boolean;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export default function MobileNav({
  activeSection,
  contactHref,
  hasRealEmail,
  onNavigate,
}: MobileNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    onNavigate(event, href);
    setMobileOpen(false);
  };

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="size-11 rounded-full border border-border/70 bg-background/55 text-foreground shadow-sm shadow-black/10 hover:border-primary/45 hover:bg-primary/10 lg:hidden"
          />
        }
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        className="!inset-y-3 !right-3 !h-[calc(100dvh-1.5rem)] !w-[calc(100vw-1.5rem)] !max-w-[24rem] gap-0 overflow-y-auto rounded-xl border border-primary/20 bg-card/95 p-0 shadow-[0_28px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      >
        <SheetHeader className="sticky top-0 z-10 border-b border-border/60 bg-card/95 px-5 pb-5 pt-5 pr-16 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-border/70 bg-background/70 text-foreground shadow-sm transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            aria-label="Close navigation menu"
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-3">
            <Avatar className="size-12 border border-primary/25 bg-muted shadow-[0_0_34px_rgba(255,54,93,0.18)]">
              <AvatarFallback className="bg-primary text-primary-foreground font-display text-sm font-semibold">
                AW
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <SheetTitle className="font-display text-xl leading-none">
                {siteConfig.shortName}
              </SheetTitle>
              <SheetDescription className="mt-1 text-xs leading-5">
                {siteConfig.role}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-2 px-3 py-4">
          {navLinks.map((link, index) => {
            const id = link.href.replace("#", "");
            const active = activeSection === id;
            const Icon = navIcons[link.label as keyof typeof navIcons] ?? Home;

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
                  "h-12 justify-start gap-3 rounded-xl border border-transparent px-3 text-[0.95rem] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground",
                  active &&
                    "border-primary/20 bg-primary text-primary-foreground shadow-[0_14px_34px_rgba(255,54,93,0.24)] hover:bg-primary hover:text-primary-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full bg-muted/60 text-primary",
                    active && "bg-primary-foreground/16 text-primary-foreground"
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-left">{link.label}</span>
                <span
                  className={cn(
                    "font-mono text-xs text-muted-foreground",
                    active && "text-primary-foreground/70"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Button>
            );
          })}
        </div>

        <SheetFooter className="mt-auto border-t border-border/60 p-3">
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/25 p-2">
            <span className="px-2 text-sm text-muted-foreground">Theme</span>
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
            className="h-12 rounded-xl"
          >
            <Send className="size-4" aria-hidden="true" />
            {hasRealEmail ? "Email me" : "Open LinkedIn"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import ProfilePortrait from "@/components/ProfilePortrait";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/portfolio";

const hasRealEmail = !siteConfig.email.includes("example.com");

export default function Hero() {
  const contactHref = hasRealEmail
    ? `mailto:${siteConfig.email}`
    : siteConfig.linkedin;

  return (
    <section id="home" className="relative px-4 pb-14 pt-28 sm:px-6 lg:pt-32">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="relative z-10 max-w-2xl">
          <Badge
            variant="outline"
            className="glass-control mb-4 h-7 rounded-full border-primary/30 px-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary"
          >
            {siteConfig.availability}
          </Badge>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {siteConfig.role} / {siteConfig.specialization}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            I build React, Next.js, and MERN stack apps with clean UI and solid
            full-stack structure.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              nativeButton={false}
              render={<a href="#projects" />}
              size="lg"
              className="h-11 rounded-full px-4 text-sm"
            >
              View projects
              <ArrowDownRight className="size-4" aria-hidden="true" />
            </Button>

            <Button
              nativeButton={false}
              render={
                <a
                  href={contactHref}
                  target={hasRealEmail ? undefined : "_blank"}
                  rel={hasRealEmail ? undefined : "noopener noreferrer"}
                />
              }
              variant="outline"
              size="lg"
              className="glass-control h-11 rounded-full border px-4 text-sm"
            >
              {hasRealEmail ? "Contact me" : "LinkedIn"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Button
              nativeButton={false}
              render={
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                />
              }
              variant="outline"
              size="icon-lg"
              className="glass-control rounded-full border"
            >
              <GithubIcon size={18} />
            </Button>
            <Button
              nativeButton={false}
              render={
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                />
              }
              variant="outline"
              size="icon-lg"
              className="glass-control rounded-full border"
            >
              <LinkedinIcon size={18} />
            </Button>
          </div>
        </div>

        <Card className="relative z-10 mx-auto w-full max-w-[20rem] rounded-3xl border-primary/25 p-2">
          <CardContent className="p-0">
            <ProfilePortrait
              src={siteConfig.portrait.src}
              fallbackSrc={siteConfig.portrait.fallbackSrc}
              alt={siteConfig.portrait.alt}
              initials={siteConfig.portrait.initials}
            />

            <div className="p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                What I build
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold leading-tight">
                Clean MERN and Next.js apps.
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

import { ArrowDownRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LiftCard, Reveal, Stagger, StaggerItem } from "@/components/PremiumMotion";
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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <Reveal className="relative z-10 max-w-2xl" y={30}>
          <Badge
            variant="outline"
            className="glass-control mb-4 h-7 rounded-full border-primary/30 px-3 text-xs font-medium text-primary"
          >
            {siteConfig.availability}
          </Badge>

          <div
            className="mb-3 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground"
            aria-label={`${siteConfig.role}, ${siteConfig.specialization}`}
          >
            <span className="rounded-full border border-border/70 bg-background/55 px-3 py-1">
              {siteConfig.role}
            </span>
            <span className="rounded-full border border-border/70 bg-background/55 px-3 py-1">
              {siteConfig.specialization}
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {siteConfig.description}
          </p>

          <Stagger className="mt-5 flex flex-wrap gap-2" delay={0.12}>
            {siteConfig.focusAreas.map((area) => (
              <StaggerItem
                key={area}
                className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border/70 bg-background/62 px-3 py-1 text-sm text-foreground"
              >
                <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
                {area}
              </StaggerItem>
            ))}
          </Stagger>

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

          <Stagger
            className="mt-7 grid max-w-xl grid-cols-3 gap-3"
            delay={0.18}
            stagger={0.06}
          >
            {siteConfig.heroMetrics.map((metric) => (
              <StaggerItem
                key={metric.label}
                className="rounded-lg border border-border/70 bg-card/70 px-3 py-3 shadow-sm"
              >
                <strong className="block font-display text-2xl leading-none">
                  {metric.value}
                </strong>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {metric.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <LiftCard className="relative z-10 mx-auto w-full max-w-[23rem]" delay={0.16}>
          <Card className="w-full rounded-xl border-primary/25 p-2">
            <CardContent className="p-0">
              <ProfilePortrait
                src={siteConfig.portrait.src}
                alt={siteConfig.portrait.alt}
              />

              <div className="p-4">
                <p className="text-xs font-medium text-primary">
                  {siteConfig.heroCard.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold leading-tight">
                  {siteConfig.heroCard.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {siteConfig.heroCard.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </LiftCard>
      </div>
    </section>
  );
}

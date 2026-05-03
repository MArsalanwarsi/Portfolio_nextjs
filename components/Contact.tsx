import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/portfolio";

const hasRealEmail = !siteConfig.email.includes("example.com");
const hasResume = siteConfig.resumeUrl !== "#";

const contactLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubIcon,
    description: "Code and projects.",
    disabled: false,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinIcon,
    description: "Experience and updates.",
    disabled: false,
  },
  {
    label: "Email",
    href: hasRealEmail ? `mailto:${siteConfig.email}` : "",
    icon: Mail,
    description: "Direct contact.",
    disabled: !hasRealEmail,
  },
  {
    label: "Resume",
    href: hasResume ? siteConfig.resumeUrl : "",
    icon: FileText,
    description: "One-page summary.",
    disabled: !hasResume,
  },
].filter((link) => !link.disabled);

export default function Contact() {
  const contactHref = hasRealEmail
    ? `mailto:${siteConfig.email}`
    : siteConfig.linkedin;

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader
          eyebrow="Contact"
          title="Let's"
          accent="connect."
          align="center"
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Card className="rounded-3xl bg-primary text-primary-foreground">
            <CardContent className="flex h-full flex-col justify-between gap-10 p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] opacity-75">
                  Open for opportunities
                </p>
                <h3 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl">
                  {siteConfig.availability}
                </h3>
                <p className="mt-5 max-w-md text-base leading-8 opacity-80">
                  Internship, freelance, and full-time opportunities where
                  thoughtful UI and practical engineering matter.
                </p>
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
                variant="secondary"
                size="lg"
                className="h-12 w-fit rounded-full"
              >
                {hasRealEmail ? "Send an email" : "Message on LinkedIn"}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-5 sm:grid-cols-2">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const isMail = link.href.startsWith("mailto:");

              return (
                <Card key={link.label} className="rounded-3xl bg-card/75">
                  <CardContent className="flex h-full flex-col p-5">
                    <span className="mb-8 grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="flex items-center justify-between gap-4 font-display text-2xl font-semibold">
                      {link.label}
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {link.description}
                    </p>
                    <Button
                      nativeButton={false}
                      render={
                        <a
                          href={link.href}
                          target={isMail ? undefined : "_blank"}
                          rel={isMail ? undefined : "noopener noreferrer"}
                          aria-label={link.label}
                        />
                      }
                      variant="ghost"
                      className="mt-6 justify-start rounded-xl px-0 text-primary hover:bg-transparent"
                    >
                      Open
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

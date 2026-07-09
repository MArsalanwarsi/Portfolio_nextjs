import { ArrowUpRight, FileText, Globe2, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LiftCard, Reveal } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contactContent, siteConfig } from "@/data/portfolio";

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
    label: "Website",
    href: siteConfig.website,
    icon: Globe2,
    description: "Live portfolio.",
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
    label: "Phone",
    href: `tel:${siteConfig.phone}`,
    icon: Phone,
    description: "Direct call.",
    disabled: !siteConfig.phone,
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
          {...contactContent.header}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <LiftCard className="order-2 h-full lg:order-1">
            <Card className="h-full rounded-xl bg-primary text-primary-foreground">
              <CardContent className="flex h-full flex-col justify-between gap-10 p-6 sm:p-8">
                <div>
                  <p className="text-xs font-medium opacity-75">
                    {contactContent.card.eyebrow}
                  </p>
                  <h3 className="mt-5 font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl">
                    {siteConfig.availability}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-8 opacity-80">
                    {contactContent.card.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/18 bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium">
                    <MapPin className="size-4" aria-hidden="true" />
                    {siteConfig.location}
                  </p>
                </div>

                <div className="space-y-3">
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
                    className="h-12 rounded-full px-5"
                  >
                    {hasRealEmail
                      ? contactContent.card.emailButton
                      : contactContent.card.linkedinButton}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Button>

                  <div className="grid gap-2 pt-2">
                    {contactLinks.map((link) => {
                      const Icon = link.icon;
                      const isMail = link.href.startsWith("mailto:");
                      const isPhone = link.href.startsWith("tel:");

                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target={isMail || isPhone ? undefined : "_blank"}
                          rel={isMail || isPhone ? undefined : "noopener noreferrer"}
                          className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-primary-foreground/18 bg-primary-foreground/10 px-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/16"
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="size-4" aria-hidden="true" />
                            {link.label}
                          </span>
                          <ArrowUpRight className="size-4 opacity-70" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </LiftCard>

          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

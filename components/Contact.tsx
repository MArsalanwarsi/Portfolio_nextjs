import { ArrowUpRight, FileText, Globe2, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LiftCard, Reveal } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
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
    <section id="contact" className="px-4 py-20 sm:px-6 lg:py-28 bg-paddock-olive text-chalk-cream">
      <div className="mx-auto w-full max-w-6xl border-t border-tarmac-gray/30 pt-16">
        <SectionHeader
          {...contactContent.header}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <LiftCard className="order-2 h-full lg:order-1">
            <div className="h-full rounded-[8px] border border-tarmac-gray/40 bg-visor-black/90 p-6 sm:p-8 flex flex-col justify-between gap-10">
              <div>
                <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-signal-lime">
                  {contactContent.card.eyebrow}
                </span>
                <h3 className="mt-4 font-sans text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-chalk-cream">
                  {siteConfig.availability}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-stone-gray font-sans">
                  {contactContent.card.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 border border-tarmac-gray/40 bg-paddock-olive/50 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-sage-fog">
                  <MapPin className="size-3.5 text-signal-lime" aria-hidden="true" />
                  {siteConfig.location}
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={contactHref}
                  target={hasRealEmail ? undefined : "_blank"}
                  rel={hasRealEmail ? undefined : "noopener noreferrer"}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-signal-lime px-6 text-sm font-sans font-extrabold uppercase tracking-wider text-paddock-olive transition-transform hover:brightness-105 active:scale-[0.98]"
                >
                  {hasRealEmail
                    ? contactContent.card.emailButton
                    : contactContent.card.linkedinButton}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>

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
                        className="flex min-h-11 items-center justify-between gap-3 rounded-[8px] border border-tarmac-gray/30 bg-paddock-olive/40 px-3.5 text-xs font-sans uppercase tracking-wider text-sage-fog transition hover:border-signal-lime/60 hover:text-chalk-cream"
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="size-3.5 text-signal-lime" aria-hidden="true" />
                          {link.label}
                        </span>
                        <ArrowUpRight className="size-3.5 text-tarmac-gray" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </LiftCard>

          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

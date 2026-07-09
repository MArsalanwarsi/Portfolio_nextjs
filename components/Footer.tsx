import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/portfolio";

const hasRealEmail = !siteConfig.email.includes("example.com");

const socials = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Website",
    href: siteConfig.website,
    icon: Globe2,
  },
  ...(hasRealEmail
    ? [
        {
          label: "Email",
          href: `mailto:${siteConfig.email}`,
          icon: Mail,
        },
      ]
    : []),
  ...(siteConfig.phone
    ? [
        {
          label: "Phone",
          href: `tel:${siteConfig.phone}`,
          icon: Phone,
        },
      ]
    : []),
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border border-border bg-muted">
              <AvatarFallback className="bg-primary text-primary-foreground font-display font-semibold">
                AW
              </AvatarFallback>
            </Avatar>
            <div>
              <strong className="block text-sm">{siteConfig.name}</strong>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.tagline}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              const isMail = social.href.startsWith("mailto:");
              const isPhone = social.href.startsWith("tel:");

              return (
                <Button
                  key={social.label}
                  nativeButton={false}
                  render={
                    <a
                      href={social.href}
                      target={isMail || isPhone ? undefined : "_blank"}
                      rel={isMail || isPhone ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                    />
                  }
                  variant="outline"
                  size="icon-lg"
                  className="rounded-full bg-background/60"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Built with Next.js and TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}

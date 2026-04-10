"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/data/portfolio";

const hasRealEmail = !siteConfig.email.includes("example.com");

const socials = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: <GithubIcon size={18} />,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: <LinkedinIcon size={18} />,
  },
  ...(hasRealEmail
    ? [
        {
          label: "Email",
          href: `mailto:${siteConfig.email}`,
          icon: <Mail size={18} />,
        },
      ]
    : []),
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell">
        <div className="site-footer__inner">
          <div className="footer-brand">
            <span className="brand-mark__monogram">AW</span>
            <div>
              <strong>{siteConfig.name}</strong>
              <p>{siteConfig.tagline}</p>
            </div>
          </div>

          <div className="footer-socials">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="social-button"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built with Next.js and TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}

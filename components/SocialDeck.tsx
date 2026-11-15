"use client";

import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, Globe, Mail, MessageSquare, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/data/portfolio";

interface SocialCardItem {
  id: string;
  name: string;
  handle: string;
  category: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}

const SOCIAL_ITEMS: SocialCardItem[] = [
  {
    id: "github",
    name: "GITHUB",
    handle: "@MArsalanwarsi",
    category: "SOURCE CODE",
    url: siteConfig.github,
    icon: GithubIcon,
  },
  {
    id: "linkedin",
    name: "LINKEDIN",
    handle: "in/m-sheikh-arsalan",
    category: "CAREER & NETWORK",
    url: siteConfig.linkedin,
    icon: LinkedinIcon,
  },
  {
    id: "portfolio",
    name: "VERCEL LIVE",
    handle: "arsalanwarsi.vercel.app",
    category: "DEPLOYMENT",
    url: siteConfig.website,
    icon: Globe,
  },
  {
    id: "cv",
    name: "CURRICULUM VITAE",
    handle: "M_Arsalan_Warsi_CV.pdf",
    category: "CREDENTIALS",
    url: siteConfig.resumeUrl,
    icon: FileText,
  },
  {
    id: "email",
    name: "DIRECT EMAIL",
    handle: siteConfig.email,
    category: "DISPATCH",
    url: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    id: "phone",
    name: "MOBILE COMM",
    handle: siteConfig.phone,
    category: "CALL",
    url: `tel:${siteConfig.phone}`,
    icon: Phone,
  },
  {
    id: "whatsapp",
    name: "WHATSAPP",
    handle: "+92 333 0277258",
    category: "INSTANT CHAT",
    url: "https://wa.me/923330277258",
    icon: MessageSquare,
  },
];

export default function SocialDeck() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="socials"
      data-surface="dark"
      className="relative w-full py-24 sm:py-32 bg-paddock-olive text-chalk-cream overflow-hidden border-t border-tarmac-gray/30 select-none"
      aria-label="Social Communications Deck"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="font-mono text-[9.26px] tracking-[0.2em] uppercase text-signal-lime">
            SIGNAL DISPATCH // NETWORK
          </span>
          <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-chalk-cream leading-tight">
            WHAT’S UP ON <span className="font-serif font-normal italic lowercase text-moss-lime">socials</span>
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-stone-gray max-w-lg mx-auto">
            Connect across channels. Code repositories, industry network, direct lines, and credentials.
          </p>
        </div>

        {/* Fanned Arc Deck for Desktop & Grid for Mobile */}
        <div className="relative flex flex-wrap items-center justify-center gap-4 lg:gap-0 lg:py-12">
          {SOCIAL_ITEMS.map((item, index) => {
            const Icon = item.icon;
            // Arc rotation angle calculated across the 7 cards
            const total = SOCIAL_ITEMS.length;
            const mid = (total - 1) / 2;
            const offset = index - mid;
            const angle = shouldReduceMotion ? 0 : offset * 3.5;
            const offsetY = shouldReduceMotion ? 0 : Math.abs(offset) * 8;
            const isHovered = hoveredIndex === index;

            return (
              <m.div
                key={item.id}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  zIndex: isHovered ? 30 : index + 10,
                }}
                animate={{
                  rotate: isHovered ? 0 : angle,
                  y: isHovered ? -16 : offsetY,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.65, 0.05, 0, 1],
                }}
                className="w-[260px] sm:w-[280px] lg:w-[175px] shrink-0 lg:-ml-6 first:ml-0"
              >
                <a
                  href={item.url}
                  target={item.url.startsWith("http") || item.url.endsWith(".pdf") ? "_blank" : undefined}
                  rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block h-[240px] rounded-[8px] border border-tarmac-gray/50 bg-visor-black p-4 flex flex-col justify-between transition-colors hover:border-signal-lime"
                >
                  {/* Top Bar */}
                  <div>
                    <div className="flex items-center justify-between border-b border-tarmac-gray/30 pb-3">
                      <span className="font-mono text-[8px] tracking-[0.16em] uppercase text-tarmac-gray group-hover:text-signal-lime transition-colors">
                        {item.category}
                      </span>
                      <ArrowUpRight className="size-4 text-tarmac-gray group-hover:text-signal-lime transition-colors" aria-hidden="true" />
                    </div>

                    <div className="mt-4 flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-[6px] bg-paddock-olive text-signal-lime border border-tarmac-gray/40">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-chalk-cream">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Meta & Handle */}
                  <div className="border-t border-tarmac-gray/30 pt-3">
                    <p className="font-mono text-[10px] text-stone-gray truncate group-hover:text-chalk-cream transition-colors">
                      {item.handle}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-[7.5px] uppercase tracking-widest text-tarmac-gray">
                        #0{index + 1} // ACTIVE
                      </span>
                      <span className="size-1.5 rounded-full bg-signal-lime" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

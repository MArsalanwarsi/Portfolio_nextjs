import { Award, Database, FileCode, Globe, Layers, Star } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { certificates } from "@/data/portfolio";

const iconMap = {
  Award,
  Database,
  FileCode,
  Globe,
  Layers,
  Star,
};

export default function Certificates() {
  return (
    <section id="certificates" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader
          eyebrow="Recognition"
          title="Certificates &"
          accent="awards."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((cert, index) => {
            const Icon = iconMap[cert.icon as keyof typeof iconMap] ?? Award;

            return (
              <LiftCard key={cert.title} className="h-full" delay={index * 0.06}>
                <Card className="h-full rounded-xl bg-card/75">
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <Badge variant="outline" className="rounded-full">
                        {cert.date}
                      </Badge>
                    </div>

                    <h3 className="font-display text-2xl font-semibold leading-tight">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {cert.issuer}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </LiftCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

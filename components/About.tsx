import { Code2, Layers, Palette, Zap } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { aboutContent } from "@/data/portfolio";

const iconMap = {
  Code2,
  Layers,
  Palette,
  Zap,
};

export default function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader
          {...aboutContent.header}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <LiftCard className="h-full">
            <Card className="h-full rounded-xl bg-card/80">
              <CardContent className="space-y-6 p-6 sm:p-8">
                <Badge variant="secondary" className="rounded-full">
                  {aboutContent.intro.badge}
                </Badge>
                <p className="font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                  {aboutContent.intro.headline}
                </p>
                <p className="text-base leading-8 text-muted-foreground">
                  {aboutContent.intro.description}
                </p>
              </CardContent>
            </Card>
          </LiftCard>

          <div className="grid gap-5 sm:grid-cols-2">
            {aboutContent.highlights.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Code2;

              return (
                <LiftCard key={item.title} className="h-full" delay={index * 0.05}>
                  <Card className="h-full rounded-xl bg-card/70">
                    <CardContent className="flex h-full flex-col gap-4 p-5">
                      <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </LiftCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

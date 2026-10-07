import { CalendarDays, GraduationCap, Star } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { educationContent } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader {...educationContent.header} />

        <div className="grid gap-5 md:grid-cols-2">
          {educationContent.items.map((item, index) => (
            <LiftCard key={item.degree} className="h-full" delay={index * 0.06}>
              <Card className="h-full rounded-xl bg-card/75">
                <CardContent className="flex h-full flex-col p-5 sm:p-6">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="size-5" aria-hidden="true" />
                    </span>
                    <Badge
                      variant="outline"
                      className="h-8 w-fit rounded-full bg-background/60"
                    >
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {item.period}
                    </Badge>
                  </div>

                  <h3 className="font-display text-2xl font-semibold leading-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-primary">
                    {item.institution}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      <Star className="size-3.5" aria-hidden="true" />
                      {item.result}
                    </Badge>
                    {item.highlights.map((highlight) => (
                      <Badge
                        key={highlight}
                        variant="outline"
                        className="rounded-full"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </LiftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

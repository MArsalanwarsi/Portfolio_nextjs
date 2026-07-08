import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { LiftCard } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader eyebrow="Experience" title="Recent" accent="experience." />

        <div className="relative space-y-5 before:absolute before:left-4 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-border sm:before:left-6">
          {experiences.map((experience, index) => (
            <LiftCard
              key={`${experience.company}-${experience.role}`}
              className="relative pl-12 sm:pl-16"
              delay={index * 0.07}
            >
              <article>
                <span className="absolute left-[0.78rem] top-6 z-10 size-3 rounded-full bg-primary ring-8 ring-background sm:left-[1.28rem]" />

                <Card className="rounded-xl bg-card/75">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-display text-2xl font-semibold leading-tight">
                          {experience.role}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="size-4" aria-hidden="true" />
                            {experience.company}
                          </span>
                          {experience.location ? (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-4" aria-hidden="true" />
                              {experience.location}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className="h-8 w-fit rounded-full bg-background/60"
                      >
                        <CalendarDays className="size-3.5" aria-hidden="true" />
                        {experience.period}
                      </Badge>
                    </div>

                    <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                      {experience.description.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 size-1.5 rounded-full bg-primary/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </article>
            </LiftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

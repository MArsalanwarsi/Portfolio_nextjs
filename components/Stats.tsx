import { Briefcase, Code2, FolderGit2, Users } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/data/portfolio";

const iconMap = {
  Briefcase,
  Code2,
  FolderGit2,
  Users,
};

export default function Stats() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader
          eyebrow="Impact"
          title="Quick"
          accent="snapshot."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Code2;

            return (
              <Card key={stat.label} className="rounded-3xl bg-card/75">
                <CardContent className="p-5 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="mt-5 font-display text-5xl font-semibold leading-none">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

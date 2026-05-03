import {
  Atom,
  Bot,
  Cloud,
  Code2,
  Cookie,
  Database,
  FileCode,
  FileType,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Mail,
  Network,
  Palette,
  Server,
  Shield,
  Sparkles,
  Table,
  Wind,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/data/portfolio";

const iconComponents = {
  Atom,
  Bot,
  Cloud,
  Code2,
  Cookie,
  Database,
  FileCode,
  FileType,
  GitBranch,
  Github: GithubIcon,
  Globe,
  KeyRound,
  Layers,
  Mail,
  Network,
  Palette,
  Server,
  Shield,
  Sparkles,
  Table,
  Wind,
  Zap,
};

const categories = [
  {
    key: "frontend" as const,
    title: "Frontend",
    description: "React, Next.js, TypeScript, and UI work.",
  },
  {
    key: "backend" as const,
    title: "Backend",
    description: "Node.js, Express, auth, and APIs.",
  },
  {
    key: "database" as const,
    title: "Database",
    description: "MongoDB and MySQL.",
  },
  {
    key: "tools" as const,
    title: "Tools",
    description: "Git, shadcn/ui, cloud tools, and integrations.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader eyebrow="Skills" title="Core" accent="skills." />

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category.key
            );

            return (
              <Card key={category.key} className="rounded-3xl bg-card/75">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="rounded-full">
                      {String(categorySkills.length).padStart(2, "0")}
                    </Badge>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {categorySkills.map((skill) => {
                      const Icon =
                        iconComponents[
                          skill.icon as keyof typeof iconComponents
                        ] ?? Code2;

                      return (
                        <Badge
                          key={skill.name}
                          variant="secondary"
                          className="h-8 rounded-full gap-1.5 px-3"
                        >
                          <Icon className="size-3.5" aria-hidden="true" />
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

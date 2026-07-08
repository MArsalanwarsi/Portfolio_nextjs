import {
  Atom,
  Blocks,
  Bot,
  Braces,
  Cloud,
  CloudUpload,
  Code2,
  Component,
  Cookie,
  Database,
  DatabaseZap,
  FileCode,
  FileType,
  Frame,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  LockKeyhole,
  Mail,
  MonitorCog,
  Network,
  Package,
  Palette,
  PanelsTopLeft,
  Plug,
  Route,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  Table,
  TestTubeDiagonal,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { LiftCard, Stagger, StaggerItem } from "@/components/PremiumMotion";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skillsContent } from "@/data/portfolio";

const iconComponents = {
  Atom,
  Blocks,
  Bot,
  Braces,
  Cloud,
  CloudUpload,
  Code2,
  Component,
  Cookie,
  Database,
  DatabaseZap,
  FileCode,
  FileType,
  Frame,
  GitBranch,
  Github: GithubIcon,
  Globe,
  KeyRound,
  Layers,
  LockKeyhole,
  Mail,
  MonitorCog,
  Network,
  Package,
  Palette,
  PanelsTopLeft,
  Plug,
  Route,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  Table,
  TestTubeDiagonal,
  Wind,
  Workflow,
  Zap,
};

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader
          {...skillsContent.header}
        />

        <Stagger
          className="mb-5 grid gap-3 rounded-xl border border-border/70 bg-card/70 p-3 shadow-sm sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.045}
        >
          {skillsContent.stackHighlights.map((item) => (
            <StaggerItem
              key={item}
              className="rounded-lg border border-border/60 bg-background/62 px-3 py-3 text-center text-sm font-medium"
            >
              {item}
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid gap-5 md:grid-cols-2">
          {skillsContent.categories.map((category, index) => {
            const categorySkills = skillsContent.items.filter(
              (skill) => skill.category === category.key
            );

            return (
              <LiftCard key={category.key} className="h-full" delay={index * 0.06}>
                <Card className="h-full rounded-xl bg-card/75">
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
                      <Badge
                        variant="outline"
                        className="rounded-full bg-background/65"
                      >
                        {String(categorySkills.length).padStart(2, "0")}
                      </Badge>
                    </div>

                    <Stagger
                      className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3"
                      stagger={0.025}
                    >
                      {categorySkills.map((skill) => {
                        const Icon =
                          iconComponents[
                            skill.icon as keyof typeof iconComponents
                          ] ?? Code2;

                        return (
                          <StaggerItem
                            key={skill.name}
                            className="flex min-h-12 items-center gap-2 rounded-lg border border-border/65 bg-background/55 px-3 py-2 text-sm text-foreground"
                            y={10}
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                              <Icon className="size-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 leading-5">
                              {skill.name}
                            </span>
                          </StaggerItem>
                        );
                      })}
                    </Stagger>
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

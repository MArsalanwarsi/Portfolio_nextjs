import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader eyebrow="Projects" title="Selected" accent="projects." />

        <div className="space-y-5">
          {projects.map((project, index) => (
            <Card key={project.title} className="rounded-3xl bg-card/80">
              <CardContent
                className={cn(
                  "grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.78fr)]",
                  index % 2 === 1 && "lg:grid-flow-col"
                )}
              >
                <div className={cn(index % 2 === 1 && "lg:col-start-2")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full">
                      {project.label}
                    </Badge>
                  </div>

                  <h3 className="mt-5 font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="rounded-2xl bg-muted/50 p-3">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                      nativeButton={false}
                      render={
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      variant="outline"
                      size="lg"
                      className="h-11 rounded-full"
                    >
                      <GithubIcon size={18} />
                      Source
                    </Button>

                    {project.live !== "#" ? (
                      <Button
                        nativeButton={false}
                        render={
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        size="lg"
                        className="h-11 rounded-full"
                      >
                        Live demo
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </Button>
                    ) : (
                      <Badge
                        variant="outline"
                        className="h-11 rounded-full px-4 text-sm"
                      >
                        Case study in progress
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Badge>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "min-h-[22rem] overflow-hidden rounded-3xl p-4 text-white shadow-inner",
                    index % 2 === 1 && "lg:col-start-1 lg:row-start-1"
                  )}
                  style={{ background: project.surface }}
                >
                  <div className="flex h-full flex-col rounded-2xl border border-white/18 bg-black/18 p-4 backdrop-blur">
                    <div className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-white/70" />
                      <span className="size-2.5 rounded-full bg-white/35" />
                      <span className="size-2.5 rounded-full bg-white/35" />
                    </div>

                    <div className="mt-auto">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
                        {project.label}
                      </span>
                      <h4 className="mt-3 font-display text-3xl font-semibold leading-tight">
                        {project.title}
                      </h4>
                      <p className="mt-4 max-w-sm text-sm leading-7 text-white/74">
                        {project.longDescription}
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/14 bg-white/10 p-3">
                          <small className="text-white/60">Focus</small>
                          <strong className="mt-1 block text-sm">
                            UI + backend
                          </strong>
                        </div>
                        <div className="rounded-2xl border border-white/14 bg-white/10 p-3">
                          <small className="text-white/60">Goal</small>
                          <strong className="mt-1 block text-sm">
                            Clear user flows
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

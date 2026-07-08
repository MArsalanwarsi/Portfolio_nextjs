import { ArrowUpRight, CheckCircle2, ExternalLink, Wrench } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { LiftCard } from "@/components/PremiumMotion";
import ProjectMedia from "@/components/ProjectMedia";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsContent } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto w-full max-w-6xl border-t border-border/70 pt-16">
        <SectionHeader
          {...projectsContent.header}
        />

        <div className="space-y-5">
          {projectsContent.items.map((project, index) => (
            <LiftCard
              key={project.title}
              delay={index * 0.08}
              hoverScale={1.004}
              hoverY={-7}
            >
              <article
                className="group overflow-hidden rounded-xl border bg-card/84 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition-colors duration-300 hover:border-foreground/16 dark:shadow-[0_24px_90px_rgba(0,0,0,0.32)]"
                style={{
                  borderColor: `${project.accent}33`,
                  background: `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 7%, var(--card)) 0%, var(--card) 42%, color-mix(in srgb, var(--secondary) 62%, transparent) 100%)`,
                }}
              >
                <div
                  className={cn(
                    "grid gap-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(20rem,0.82fr)]",
                    index % 2 === 1 && "lg:grid-flow-col"
                  )}
                >
                  <div
                    className={cn(
                      "flex flex-col justify-between rounded-lg border border-border/65 bg-background/48 p-5 sm:p-6",
                      index % 2 === 1 && "lg:col-start-2"
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full bg-background/70"
                        >
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
                          <Badge
                            key={tech}
                            variant="outline"
                            className="rounded-full bg-background/70"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.72fr)]">
                        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
                          <p className="text-sm font-semibold text-foreground">
                            Product outcome
                          </p>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            {project.outcome}
                          </p>
                        </div>

                        <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
                          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Wrench
                              className="size-4 text-primary"
                              aria-hidden="true"
                            />
                            Tools
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.tools.map((tool) => (
                              <Badge
                                key={tool}
                                variant="secondary"
                                className="h-7 rounded-full px-2 text-[0.72rem]"
                              >
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-3">
                        {project.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex min-h-16 gap-2 rounded-lg border border-border/60 bg-background/50 p-3"
                          >
                            <CheckCircle2
                              className="mt-1 size-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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
                        className="h-11 rounded-full bg-background/70"
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
                          className="h-11 w-fit rounded-full bg-background/70 px-4 text-sm"
                        >
                          Case study in progress
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "rounded-lg p-4",
                      index % 2 === 1 && "lg:col-start-1 lg:row-start-1"
                    )}
                    style={{ background: project.surface }}
                  >
                    <ProjectMedia
                      projectTitle={project.title}
                      label={project.label}
                      accent={project.accent}
                      images={project.images}
                    />

                    <div className="mt-4 grid gap-3 text-white/82 sm:grid-cols-2">
                      {projectsContent.previewMeta.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg border border-white/12 bg-white/10 p-3 backdrop-blur"
                        >
                          <small className="text-white/58">{item.label}</small>
                          <strong className="mt-1 block text-sm">
                            {item.value}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </LiftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

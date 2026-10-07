"use client";
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- Hover and focus handlers pause the carousel; navigation uses native buttons. */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Pause,
  Play,
  X,
} from "lucide-react";
import ProjectMedia from "@/components/ProjectMedia";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ProjectCarouselProps {
  projects: Project[];
}

const AUTO_PLAY_MS = 5_000;
const deckEase = [0.22, 1, 0.36, 1] as const;
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getMotionPreference = () => matchMedia(motionQuery).matches;
const getServerMotionPreference = () => true;

function getNextIndex(current: number, total: number) {
  return (current + 1) % total;
}

function getDeckOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

function getFanPosition(offset: number) {
  const distance = Math.abs(offset);

  return {
    rotate: offset * 14,
    scale: 1 - distance * 0.1,
    x: offset * 152,
    y: distance * 28,
  };
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionPreference,
    getServerMotionPreference,
  );
  const carousel = useRef<HTMLDivElement>(null);
  const didDrag = useRef(false);
  const gesture = useRef<{ x: number; y: number; horizontal: boolean } | null>(
    null,
  );

  useEffect(() => {
    if (
      reduceMotion ||
      dragOffset !== 0 ||
      isPaused ||
      hovered ||
      focused ||
      selectedProject ||
      projects.length < 2
    ) {
      return;
    }

    let visible = false;
    let timer = 0;
    const sync = () => {
      clearInterval(timer);
      if (visible && !document.hidden)
        timer = window.setInterval(() => {
          setActiveIndex((current) => getNextIndex(current, projects.length));
        }, AUTO_PLAY_MS);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        sync();
      },
      { threshold: [0, 0.3] },
    );
    if (carousel.current) observer.observe(carousel.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [
    activeIndex,
    dragOffset,
    isPaused,
    hovered,
    focused,
    projects.length,
    reduceMotion,
    selectedProject,
  ]);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  if (projects.length === 0) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + projects.length) % projects.length,
    );
  };
  const showNext = () => {
    setActiveIndex((current) => getNextIndex(current, projects.length));
  };
  const openProject = (
    project: Project,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (didDrag.current && event.detail !== 0) {
      return;
    }

    didDrag.current = false;
    setSelectedProject(project);
  };
  const resetDeckDrag = () => {
    gesture.current = null;
    setDragOffset(0);
  };

  return (
    <>
      <section
        ref={carousel}
        className="relative"
        aria-label="Selected projects"
        aria-roledescription="carousel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Selected work</span>
            <span className="mx-2 text-border">/</span>
            Click a project to view the full case study
          </p>
          <div className="flex shrink-0 items-center gap-2">
            {!reduceMotion && projects.length > 1 ? (
              <button
                type="button"
                onClick={() => setIsPaused((value) => !value)}
                className="grid size-10 place-items-center rounded-full border border-border bg-background/70 focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={
                  isPaused ? "Start project autoplay" : "Pause project autoplay"
                }
              >
                {isPaused ? (
                  <Play className="size-4" aria-hidden="true" />
                ) : (
                  <Pause className="size-4" aria-hidden="true" />
                )}
              </button>
            ) : null}
            <button
              type="button"
              onClick={showPrevious}
              className="grid size-10 place-items-center rounded-full border border-border bg-background/70 transition hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous project"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="grid size-10 place-items-center rounded-full border border-border bg-background/70 transition hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next project"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="relative h-[25rem] touch-pan-y overflow-hidden rounded-2xl border border-border/60 bg-card/45 sm:h-[29rem]"
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0 || projects.length < 2)
              return;
            gesture.current = {
              x: event.clientX,
              y: event.clientY,
              horizontal: false,
            };
            didDrag.current = false;
          }}
          onPointerMove={(event) => {
            const start = gesture.current;
            if (!start) return;
            const dx = event.clientX - start.x,
              dy = event.clientY - start.y;
            if (!start.horizontal) {
              if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
                resetDeckDrag();
                return;
              }
              if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return;
              start.horizontal = true;
              didDrag.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            setDragOffset(Math.max(-160, Math.min(160, dx)));
          }}
          onPointerUp={(event) => {
            const start = gesture.current;
            if (start?.horizontal) {
              const dx = event.clientX - start.x;
              if (dx < -50) showNext();
              else if (dx > 50) showPrevious();
            }
            resetDeckDrag();
          }}
          onPointerCancel={resetDeckDrag}
          onLostPointerCapture={(event) => {
            if (event.target === event.currentTarget) resetDeckDrag();
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_42%)]" />
          {projects.map((project, index) => {
            const offset = getDeckOffset(index, activeIndex, projects.length);
            const distance = Math.abs(offset);
            const isVisible = distance <= 2;
            const isActive = offset === 0;
            const fanPosition = getFanPosition(offset);

            return (
              <div
                key={project.title}
                className="pointer-events-none absolute inset-0 flex justify-center pt-7 sm:pt-9"
                style={{ zIndex: isVisible ? 10 - distance : 0 }}
              >
                <m.button
                  type="button"
                  onClick={(event) => openProject(project, event)}
                  className={cn(
                    "pointer-events-auto relative flex h-[20rem] w-[min(17rem,calc(100vw-5rem))] transform-gpu select-none flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left text-white shadow-2xl outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-white sm:h-[23rem] sm:w-80 sm:p-6",
                    !isActive && "pointer-events-none",
                  )}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--secondary), var(--accent), var(--card))",
                    borderColor:
                      "color-mix(in srgb, var(--primary) 45%, transparent)",
                  }}
                  initial={false}
                  draggable={false}
                  animate={{
                    opacity: reduceMotion
                      ? isActive
                        ? 1
                        : 0
                      : isVisible
                        ? 1 - distance * 0.23
                        : 0,
                    rotate: reduceMotion ? 0 : fanPosition.rotate,
                    scale: fanPosition.scale,
                    x: (reduceMotion ? 0 : fanPosition.x) + dragOffset,
                    y: reduceMotion ? 0 : fanPosition.y,
                    zIndex: 10 - distance,
                  }}
                  transition={
                    reduceMotion || dragOffset !== 0
                      ? { duration: 0.01 }
                      : {
                          type: "spring",
                          stiffness: 410,
                          damping: 34,
                          mass: 0.55,
                        }
                  }
                  title={`Open ${project.title} case study`}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                >
                  <div className="absolute -right-16 -top-14 size-48 rounded-full bg-white/10" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.15em] backdrop-blur">
                      {project.label}
                    </span>
                    <span className="text-xs text-white/65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative">
                    <h3
                      id={`project-card-title-${index}`}
                      className="font-display text-3xl font-semibold leading-tight text-balance"
                    >
                      {project.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/18 bg-white/10 px-2.5 py-1 text-xs text-white/85 backdrop-blur"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {isActive ? (
                      <span className="mt-6 flex items-center gap-2 text-sm font-medium text-white">
                        <span className="grid size-8 place-items-center rounded-full bg-white text-black">
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </span>
                        Open project
                      </span>
                    ) : null}
                  </div>
                </m.button>
              </div>
            );
          })}
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-1"
          aria-label="Project carousel navigation"
        >
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group grid size-8 place-items-center rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Show ${project.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === activeIndex
                    ? "w-7 bg-primary"
                    : "w-2 bg-border group-hover:bg-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <m.div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/75 px-4 pb-4 pt-24 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <m.dialog
              open
              aria-labelledby="project-dialog-title"
              className="relative max-h-[calc(100dvh-7rem)] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/15 bg-background p-0 text-foreground shadow-2xl"
              initial={
                reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }
              }
              transition={{
                duration: reduceMotion ? 0.01 : 0.26,
                ease: deckEase,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <header
                className="relative overflow-hidden p-5 text-white sm:p-7"
                style={{
                  background:
                    "linear-gradient(135deg, var(--secondary), var(--accent), var(--card))",
                }}
              >
                <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/12" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="border-white/25 bg-white/10 text-white"
                    >
                      {selectedProject.label}
                    </Badge>
                    <h2
                      id="project-dialog-title"
                      className="mt-3 font-display text-3xl font-semibold sm:text-4xl"
                    >
                      {selectedProject.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                      Project case study
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/20 bg-black/15 px-4 text-sm font-medium transition hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Close project details"
                  >
                    <X className="size-4" aria-hidden="true" />
                    Close
                  </button>
                </div>
              </header>
              <div className="p-4 text-foreground sm:p-6">
                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,0.8fr)]">
                  <div>
                    <p className="text-base leading-8 text-[#d9c5ae]">
                      {selectedProject.longDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-full text-foreground"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {selectedProject.features.map((feature) => (
                        <div
                          key={feature}
                          className="rounded-xl border border-border/70 bg-muted/30 p-4 text-sm leading-6 text-[#d9c5ae]"
                        >
                          <CheckCircle2
                            className="mb-2 size-4 text-primary"
                            aria-hidden="true"
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-xl border border-border/70 bg-muted/30 p-4">
                      <p className="text-sm font-semibold text-foreground">
                        Product outcome
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#d9c5ae]">
                        {selectedProject.outcome}
                      </p>
                    </div>
                  </div>
                  <div
                    className="rounded-xl p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--secondary), var(--accent), var(--card))",
                    }}
                  >
                    <ProjectMedia
                      projectTitle={selectedProject.title}
                      label={selectedProject.label}
                      accent="var(--primary)"
                      images={selectedProject.images}
                    />
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
                  {selectedProject.github !== "#" ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition hover:bg-muted"
                    >
                      <GithubIcon size={16} />
                      View source
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Private repository
                    </span>
                  )}
                  {selectedProject.live !== "#" ? (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      Live demo
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm text-muted-foreground">
                      Live demo coming soon
                    </span>
                  )}
                </div>
              </div>
            </m.dialog>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

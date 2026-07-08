"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ProjectMediaProps {
  projectTitle: string;
  label: string;
  accent: string;
  images: ProjectImage[];
}

const mediaEase = [0.22, 1, 0.36, 1] as const;

function isSvg(src: string) {
  return src.toLowerCase().endsWith(".svg");
}

export default function ProjectMedia({
  projectTitle,
  label,
  accent,
  images,
}: ProjectMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const activeImage = images[activeIndex];
  const titleId = useMemo(
    () => `${projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-gallery`,
    [projectTitle]
  );

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, showNext, showPrevious]);

  if (!activeImage) {
    return null;
  }

  const gallery = (
    <AnimatePresence>
      {open ? (
        <m.dialog
          open
          className="fixed inset-0 z-[100] m-0 flex h-[100dvh] w-screen max-h-none max-w-[100vw] items-center justify-center border-0 bg-[#020104] px-4 py-6"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: mediaEase }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close gallery backdrop"
            title="Close gallery"
          />
          <m.div
            className="relative z-10 flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-white/14 bg-[#070a0f] text-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.965, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.34, ease: mediaEase }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/12 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-xs font-medium text-white/55">
                  <Images className="size-3.5" aria-hidden="true" />
                  Project gallery
                </p>
                <h3 id={titleId} className="mt-1 truncate text-base font-semibold sm:text-lg">
                  {projectTitle} / {activeImage.caption}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/14 bg-white/8 text-white transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close gallery"
                title="Close gallery"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative h-[min(70vh,42rem)] min-h-[18rem] w-full bg-black">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={activeImage.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.28, ease: mediaEase }}
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    unoptimized={isSvg(activeImage.src)}
                  />
                </m.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/14 bg-black/50 text-white backdrop-blur transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
                title="Previous image"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/14 bg-black/50 text-white backdrop-blur transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next image"
                title="Next image"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-white/12 p-3">
              {images.map((image, index) => (
                <m.button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border bg-white/8 outline-none transition focus-visible:ring-2 focus-visible:ring-white",
                    index === activeIndex
                      ? "border-white/70"
                      : "border-white/14 hover:border-white/36"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: mediaEase }}
                  aria-label={`Show ${image.caption}`}
                  title={image.caption}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="7rem"
                    className="object-cover"
                    unoptimized={isSvg(image.src)}
                  />
                </m.button>
              ))}
            </div>
          </m.div>
        </m.dialog>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <div
        className="relative overflow-hidden rounded-xl border border-white/15 bg-black/24 p-3 text-white shadow-2xl shadow-black/20"
        style={{ boxShadow: `0 28px 80px color-mix(in srgb, ${accent} 34%, transparent)` }}
      >
        <m.button
          type="button"
          className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/12 bg-black/30 text-left outline-none ring-offset-2 ring-offset-background transition hover:border-white/35 focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.008 }}
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.25, ease: mediaEase }}
          aria-label={`Open ${projectTitle} gallery`}
          title={`Open ${projectTitle} gallery`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={activeImage.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.28, ease: mediaEase }}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 34rem"
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
                unoptimized={isSvg(activeImage.src)}
              />
            </m.span>
          </AnimatePresence>
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4">
            <span>
              <span className="block text-xs font-medium text-white/70">
                {label}
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                {activeImage.caption}
              </span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/12 backdrop-blur transition group-hover:bg-white/20">
              <Maximize2 className="size-4" aria-hidden="true" />
            </span>
          </span>
        </m.button>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <m.button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group/thumb grid h-16 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-3 rounded-lg border bg-white/8 p-1.5 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-white",
                  isActive
                    ? "border-white/55 bg-white/16"
                    : "border-white/12 hover:border-white/35 hover:bg-white/12"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2, ease: mediaEase }}
                aria-label={`Show ${image.caption}`}
                aria-pressed={isActive}
                title={image.caption}
              >
                <span className="relative block h-full overflow-hidden rounded-md bg-black/25">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="5rem"
                    className="object-cover"
                    unoptimized={isSvg(image.src)}
                  />
                </span>
                <span className="min-w-0 text-xs font-medium leading-5 text-white/82">
                  {image.caption}
                </span>
              </m.button>
            );
          })}
        </div>
      </div>

      {typeof document !== "undefined"
        ? createPortal(gallery, document.body)
        : null}
    </>
  );
}

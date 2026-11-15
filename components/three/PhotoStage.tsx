"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/portfolio";
import styles from "../Hero.module.css";

export default function PhotoStage() {
  const frame = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const host = frame.current;
    const img = photo.current;
    if (!host || !img) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const settled = () => {
      if (disposed) return;
      host.dataset.scene = "ready";
      window.dispatchEvent(new Event("portfolio:scene-settled"));
    };
    const enhance = async () => {
      try {
        await img.decode();
        settled();
        const { mountPhoto } = await import("./photoRelief");
        if (!disposed) cleanup = mountPhoto(host, img);
      } catch { settled(); }
    };
    void enhance();
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return <div className={styles.stage} ref={frame}>
    <Image className={styles.portrait} ref={photo} src={siteConfig.portrait.src} alt={siteConfig.portrait.alt}
      width={1003} height={1254} priority sizes="(max-width: 680px) 82vw, 42vw" />
  </div>;
}

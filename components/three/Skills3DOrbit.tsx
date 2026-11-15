"use client";

import { Children, Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StackViewer } from "./stackViewer";
import styles from "../Skills.module.css";

type Chapter = { key: string; title: string; count: number };

export default function Skills3DOrbit({ chapters, children }: { chapters: Chapter[]; children: ReactNode }) {
  const surface = useRef<HTMLDivElement>(null);
  const radios = useRef<(HTMLInputElement | null)[]>([]);
  const viewer = useRef<StackViewer | null>(null);
  const currentIndex = useRef(0);
  const [selected, setSelected] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const panels = Children.toArray(children);
  const count = chapters.length;

  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    let mounted = true;
    let started = false;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      try {
        const { createStackViewer } = await import("./stackViewer");
        if (!mounted) return;
        viewer.current = createStackViewer(element, count, currentIndex.current,
          (index) => radios.current[index]?.click(), () => setInteractive(false));
        setInteractive(true);
      } catch {
        // The native category controls and diagram also work without WebGL.
      }
    });
    observer.observe(element);
    return () => {
      mounted = false;
      observer.disconnect();
      viewer.current?.dispose();
      viewer.current = null;
    };
  }, [count]);

  function select(index: number) {
    currentIndex.current = index;
    setSelected(index);
    viewer.current?.select(index);
  }

  return (
    <div className={styles.workspace}>
      <figure className={styles.figure}>
        <div className={styles.surface} ref={surface} data-interactive={interactive}>
          <svg className={styles.diagram} viewBox="0 0 300 280" aria-hidden="true">
            {chapters.map((chapter, i) => (
              <g key={chapter.key} transform={`translate(0 ${i * 36})`}>
                <path d="M44 88l111 44 103-41v8l-103 42-111-44z" fill="#464646" />
                <path d="M44 88l103-43 111 46-103 41z" stroke="#b6b6b6" fill={i === selected ? "#bcbcbc" : "#767676"} />
              </g>
            )).reverse()}
          </svg>
        </div>
        <figcaption className={styles.legend}>
          <span><i />{chapters[selected]?.title}</span>
          {interactive && <div className={styles.turns}>
            <button type="button" aria-label="Rotate model left" onClick={() => viewer.current?.turn(-1)}><ArrowLeft size={16} /></button>
            <button type="button" aria-label="Rotate model right" onClick={() => viewer.current?.turn(1)}><ArrowRight size={16} /></button>
          </div>}
        </figcaption>
      </figure>
      <fieldset className={styles.controls}>
        <legend className={styles.hidden}>Explore a technology layer</legend>
        {chapters.map((chapter, index) => (
          <Fragment key={chapter.key}>
            <input className={styles.radio} type="radio" name="technology-layer" id={`layer-${chapter.key}`}
              defaultChecked={index === 0} ref={(element) => { radios.current[index] = element; }} onChange={() => select(index)} />
            <label className={styles.choice} htmlFor={`layer-${chapter.key}`} id={`layer-name-${chapter.key}`}>
              {chapter.title}<small>{chapter.count}</small>
            </label>
            <section className={styles.panel} aria-labelledby={`layer-name-${chapter.key}`}>{panels[index]}</section>
          </Fragment>
        ))}
      </fieldset>
    </div>
  );
}

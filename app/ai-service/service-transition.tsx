"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./service-transition.module.css";

// A short, continuous bridge: social touchpoints gather into a conversation.
// No pinned slides, repeated product copy, or independently looping effects.
export function ServiceTransition() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const progress = motion.matches ? 1 : Math.min(1, Math.max(0,
        (window.innerHeight * 0.85 - bounds.top) / (window.innerHeight * 0.55 + bounds.height * 0.45),
      ));
      section.style.setProperty("--bridge-progress", progress.toFixed(4));
      section.style.setProperty("--title-progress", Math.min(1, progress * 2.15).toFixed(4));
      section.style.setProperty("--accent-progress", Math.min(1, Math.max(0, (progress - 0.18) * 2.2)).toFixed(4));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.bridge} id="service" aria-labelledby="service-transition-title">
      <div className={styles.inner}>
        <span className={styles.eyebrow}>SOCIAL GROWTH <i aria-hidden="true">↗</i> CUSTOMER SERVICE</span>
        <h2 id="service-transition-title"><span><i>打通社媒获客的</i></span><em><i>最后一公里</i></em></h2>
        <div className={styles.visual} aria-hidden="true">
          <svg className={styles.connection} viewBox="0 0 720 180" fill="none">
            <path className={styles.guide} d="M110 90 C260 90 290 132 380 90 S500 90 610 90" />
            <path className={styles.trace} pathLength="1" d="M110 90 C260 90 290 132 380 90 S500 90 610 90" />
          </svg>
          <div className={styles.touchpoints}>
            {["instagram", "youtube", "tiktok"].map((platform, index) => (
              <span className={styles.platform} key={platform} style={{ "--card": index - 1 } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/platform-color-${platform}.svg`} alt="" />
                <i /><i />
              </span>
            ))}
          </div>
          <span className={styles.packet}><i>↗</i></span>
          <div className={styles.conversation}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/platform-whatsapp.svg" alt="" />
            <span><i /><i /><i /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

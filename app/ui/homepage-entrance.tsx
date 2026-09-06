"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "../brand-homepage.module.css";

export function HomepageEntrance({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) return;

    const requestedSectionId = window.location.hash
      ? decodeURIComponent(window.location.hash.slice(1))
      : "";

    if (requestedSectionId) {
      const revealFrame = window.requestAnimationFrame(() => {
        setEntered(true);
        document.getElementById(requestedSectionId)?.scrollIntoView({ block: "start", behavior: "instant" });
      });
      return () => window.cancelAnimationFrame(revealFrame);
    }

    // A reload can restore the old scroll position after React has mounted.
    // Keep the opening at the top without changing the film's layout.
    const keepOpeningInView = () => {
      if (window.scrollX || window.scrollY) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("pageshow", keepOpeningInView);
    window.addEventListener("scroll", keepOpeningInView, { passive: true });
    keepOpeningInView();
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("pageshow", keepOpeningInView);
      window.removeEventListener("scroll", keepOpeningInView);
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, [entered]);

  const enter = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setEntered(true);
  };

  return (
    <div className={entered ? styles.enteredHomepage : styles.awaitingHomepage}>
      <div inert={!entered}>{children}</div>
      {!entered && <button className={styles.entranceTrigger} type="button" aria-label="进入灵枢 AI 首页" onClick={enter} />}
    </div>
  );
}

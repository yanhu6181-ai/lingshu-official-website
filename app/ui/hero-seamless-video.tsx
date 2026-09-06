"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand-homepage.module.css";

const crossfadeMs = 1150;

export function HeroSeamlessVideo() {
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const activeRef = useRef(0);
  const swappingRef = useRef(false);
  const cleanupTimer = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    videos.current[0]?.play().catch(() => undefined);
    return () => {
      if (cleanupTimer.current) window.clearTimeout(cleanupTimer.current);
    };
  }, []);

  const beginCrossfade = (from: number) => {
    if (swappingRef.current || from !== activeRef.current) return;
    const to = from === 0 ? 1 : 0;
    const outgoing = videos.current[from];
    const incoming = videos.current[to];
    if (!outgoing || !incoming) return;

    swappingRef.current = true;
    incoming.currentTime = 0;
    incoming.play().then(() => {
      activeRef.current = to;
      setActive(to);
      cleanupTimer.current = window.setTimeout(() => {
        outgoing.pause();
        outgoing.currentTime = 0;
        swappingRef.current = false;
      }, crossfadeMs + 80);
    }).catch(() => {
      swappingRef.current = false;
    });
  };

  const watchLoopPoint = (index: number) => {
    const video = videos.current[index];
    if (!video || index !== activeRef.current || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= 1.18) beginCrossfade(index);
  };

  return (
    <div className={styles.videoStack} aria-hidden="true">
      {[0, 1].map((index) => (
        <video
          className={`${styles.backgroundVideo} ${active === index ? styles.videoActive : styles.videoInactive}`}
          key={index}
          ref={(node) => { videos.current[index] = node; }}
          width="1470"
          height="630"
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          poster="/home-opening-poster.png"
          onTimeUpdate={() => watchLoopPoint(index)}
          onEnded={() => beginCrossfade(index)}
        >
          <source src="/home-opening.mp4" type="video/mp4" />
        </video>
      ))}
    </div>
  );
}

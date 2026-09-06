"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import styles from "../brand-homepage.module.css";

const orbitItems = [
  { image: "/product-ui/viral-discovery.png", label: "内容机会发现" },
  { image: "/industries/consumer-electronics.png", label: "行业趋势洞察" },
  { image: "/service/ai-gold-sales.webp", label: "AI 金牌销售" },
  { image: "/product-ui/ai-content-generation.png", label: "品牌内容生成" },
  { image: "/service/ai-business-assistant.webp", label: "全球资讯雷达" },
  { image: "/industries/personal-care.png", label: "多行业内容" },
  { image: "/service/ai-private-domain.webp", label: "客户持续运营" },
] as const;

export function HeroOrbitGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let lastScrollY = window.scrollY;
    let hasFlippedInView = false;
    let flipTimer: number | null = null;

    const triggerFlip = () => {
      track.classList.remove(styles.orbitFlipping);
      void track.offsetWidth;
      track.classList.add(styles.orbitFlipping);
      if (flipTimer !== null) window.clearTimeout(flipTimer);
      flipTimer = window.setTimeout(() => track.classList.remove(styles.orbitFlipping), 1400);
    };

    const updateFlip = () => {
      const viewport = track.parentElement;
      const rect = viewport?.getBoundingClientRect();
      const isInView = Boolean(rect && rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.18);
      const isScrollingDown = window.scrollY > lastScrollY;

      if (isInView && isScrollingDown && !hasFlippedInView) {
        triggerFlip();
        hasFlippedInView = true;
      } else if (!isInView) {
        hasFlippedInView = false;
      }

      lastScrollY = window.scrollY;
      frameRef.current = null;
    };

    const onScroll = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(updateFlip);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (flipTimer !== null) window.clearTimeout(flipTimer);
    };
  }, []);

  return (
    <div className={styles.orbitViewport} aria-label="灵枢 AI 产品能力展示">
      <div className={styles.orbitTrack} ref={trackRef}>
        {orbitItems.map((item, index) => (
          <figure
            className={styles.orbitSlot}
            style={{
              "--card-index": index,
            } as CSSProperties}
            key={item.label}
          >
            <div className={styles.orbitCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" />
              <figcaption>
                <span>0{index + 1}</span>
                <strong>{item.label}</strong>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

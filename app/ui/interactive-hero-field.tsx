"use client";

import { type CSSProperties, useEffect, useRef } from "react";

const hoverItems = [
  {
    x: 8,
    y: 24,
    face: 0,
    message: "你好，我是灵小枢",
    side: "left",
  },
  {
    x: 29,
    y: 15,
    face: 1,
    message: "客户意图已识别",
    side: "left",
  },
  {
    x: 43,
    y: 84,
    face: 2,
    message: "这条询盘要优先",
    side: "right",
  },
  {
    x: 74,
    y: 18,
    face: 3,
    message: "首轮接待已完成",
    side: "right",
  },
  {
    x: 91,
    y: 43,
    face: 1,
    message: "报价问题，转人工",
    side: "right",
  },
  {
    x: 79,
    y: 76,
    face: 2,
    message: "我会继续跟进",
    side: "right",
  },
] as const;

export function InteractiveHeroField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const touchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const hero = field?.closest<HTMLElement>(".home-hero");

    if (!field || !hero) return;
    const activeField = field;

    const items = Array.from(
      field.querySelectorAll<HTMLElement>(".ai-hover-item"),
    );
    let rect = hero.getBoundingClientRect();
    let pointerX = rect.width * 0.5;
    let pointerY = rect.height * 0.46;

    const paint = () => {
      const xRatio = pointerX / rect.width;
      const yRatio = pointerY / rect.height;

      field.style.setProperty("--pointer-x", `${pointerX}px`);
      field.style.setProperty("--pointer-y", `${pointerY}px`);
      field.classList.add("is-active");

      items.forEach((element, index) => {
        const item = hoverItems[index];
        const distance = Math.hypot(
          xRatio * 100 - item.x,
          (yRatio * 100 - item.y) * 0.92,
        );
        const proximity = Math.max(0, Math.min(1, 1 - distance / 42));
        const opacity = Math.pow(proximity, 1.45) * 0.46;
        const driftX = (xRatio - item.x / 100) * -14;
        const driftY = (yRatio - item.y / 100) * -10;

        element.style.opacity = opacity.toFixed(3);
        element.style.transform =
          `translate3d(-50%, -50%, 0) translate3d(${driftX.toFixed(1)}px, ${driftY.toFixed(1)}px, 0) scale(${(0.86 + proximity * 0.14).toFixed(3)})`;
      });

      frameRef.current = null;
    };

    const updatePointer = (event: PointerEvent) => {
      pointerX = Math.min(
        rect.width,
        Math.max(0, event.clientX - rect.left),
      );
      pointerY = Math.min(
        rect.height,
        Math.max(0, event.clientY - rect.top),
      );

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(paint);
      }

      if (event.pointerType === "touch") {
        if (touchTimerRef.current !== null) {
          window.clearTimeout(touchTimerRef.current);
        }
        touchTimerRef.current = window.setTimeout(hideField, 1200);
      }
    };

    const refreshRect = () => {
      rect = hero.getBoundingClientRect();
    };

    const showPointer = (event: PointerEvent) => {
      refreshRect();
      updatePointer(event);
    };

    function hideField() {
      activeField.classList.remove("is-active");
      items.forEach((element) => {
        element.style.opacity = "0";
      });
    }

    const hidePointer = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        hideField();
      }
    };

    hero.addEventListener("pointermove", updatePointer, { passive: true });
    hero.addEventListener("pointerenter", showPointer, { passive: true });
    hero.addEventListener("pointerdown", showPointer, { passive: true });
    hero.addEventListener("pointerleave", hidePointer, { passive: true });
    window.addEventListener("resize", refreshRect, { passive: true });

    return () => {
      hero.removeEventListener("pointermove", updatePointer);
      hero.removeEventListener("pointerenter", showPointer);
      hero.removeEventListener("pointerdown", showPointer);
      hero.removeEventListener("pointerleave", hidePointer);
      window.removeEventListener("resize", refreshRect);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (touchTimerRef.current !== null) {
        window.clearTimeout(touchTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="interactive-hero-field"
      ref={fieldRef}
      aria-hidden="true"
    >
      <div className="hover-distortion" />
      <div className="hover-dot-field" />

      {hoverItems.map((item) => {
        const itemStyle = {
          left: `${item.x}%`,
          top: `${item.y}%`,
        } as CSSProperties;

        return (
          <div
            className={`ai-hover-item side-${item.side}`}
            style={itemStyle}
            key={`${item.x}-${item.y}`}
          >
            <div
              className="ling-emotion"
              style={{
                backgroundImage: `url("/lingxiaoshu-emotion-${item.face}.png")`,
              }}
            />
            <span className="ai-hover-bubble">
              <i>AI</i>
              {item.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}

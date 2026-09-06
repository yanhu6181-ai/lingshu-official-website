"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type Brand = {
  id: string;
  name: string;
  family: "platform" | "model";
};

const platformBrands: Brand[] = [
  { id: "youtube", name: "YouTube", family: "platform" },
  { id: "tiktok", name: "TikTok", family: "platform" },
  { id: "instagram", name: "Instagram", family: "platform" },
  { id: "facebook", name: "Facebook", family: "platform" },
  { id: "whatsapp", name: "WhatsApp", family: "platform" },
  { id: "shopify", name: "Shopify", family: "platform" },
];

const modelBrands: Brand[] = [
  { id: "openai", name: "OpenAI", family: "model" },
  { id: "gemini", name: "Gemini", family: "model" },
  { id: "claude", name: "Claude", family: "model" },
  { id: "deepseek", name: "DeepSeek", family: "model" },
  { id: "qwen", name: "Qwen", family: "model" },
  { id: "llama", name: "Llama", family: "model" },
];

const allBrands = [...platformBrands, ...modelBrands];

const heroBrandPositions = [
  { brand: platformBrands[0], x: 10, y: 24, rotate: -8, delay: 0.1 },
  { brand: platformBrands[1], x: 39, y: 8, rotate: 6, delay: 0.3 },
  { brand: platformBrands[2], x: 79, y: 17, rotate: 8, delay: 0.5 },
  { brand: platformBrands[4], x: 91, y: 52, rotate: -5, delay: 0.7 },
  { brand: modelBrands[0], x: 16, y: 72, rotate: 5, delay: 0.9 },
  { brand: modelBrands[1], x: 56, y: 86, rotate: -8, delay: 1.1 },
  { brand: modelBrands[2], x: 82, y: 75, rotate: 7, delay: 1.3 },
  { brand: modelBrands[3], x: 14, y: 47, rotate: -3, delay: 1.5 },
] as const;

const storyScenes = [
  {
    index: "01",
    eyebrow: "DISCOVER",
    title: "看见正在发生的",
    accent: "机会",
    text: "从趋势、竞品和客户问题中识别值得跟进的主题，让每一次创作都有清晰理由。",
    brands: [platformBrands[0], platformBrands[1], platformBrands[2]],
    metric: "+37%",
    metricLabel: "高潜内容机会",
    signal: "趋势热度正在上升",
  },
  {
    index: "02",
    eyebrow: "CREATE & PUBLISH",
    title: "让一份产品资料",
    accent: "长出多平台内容",
    text: "AI 生成脚本、图文与多语言发布文案，并针对不同平台自动适配表达和节奏。",
    brands: [modelBrands[0], modelBrands[1], modelBrands[2]],
    metric: "4×",
    metricLabel: "内容生产效率",
    signal: "多模型正在协同创作",
  },
  {
    index: "03",
    eyebrow: "ATTRIBUTION & SERVICE",
    title: "让每一条内容",
    accent: "都带着客户回来",
    text: "客户从社媒进入 WhatsApp 后，来源内容、平台和意图会自动进入同一份对话上下文。",
    brands: [platformBrands[3], platformBrands[4], platformBrands[5]],
    metric: "92",
    metricLabel: "客户意向评分",
    signal: "高意向询盘已优先接待",
  },
  {
    index: "04",
    eyebrow: "BUSINESS BRAIN",
    title: "让 AI 懂客户",
    accent: "也懂你的生意",
    text: "灵枢按任务调度合适模型，再结合企业知识、经营目标和客户历史给出更可靠的下一步。",
    brands: [modelBrands[3], modelBrands[4], modelBrands[5]],
    metric: "24/7",
    metricLabel: "经营上下文在线",
    signal: "企业知识与模型已连接",
  },
] as const;

function BrandMark({ brand }: { brand: Brand }) {
  const className =
    brand.family === "platform"
      ? `platform-logo platform-${brand.id}`
      : `model-logo model-logo-${brand.id}`;

  return <span className={className} aria-hidden="true" />;
}

export function HeroBrandConstellation() {
  return (
    <div className="hero-logo-system" aria-label="灵枢连接的社媒平台与主流 AI 模型">
      <div className="hero-logo-ring hero-logo-ring-a" aria-hidden="true" />
      <div className="hero-logo-ring hero-logo-ring-b" aria-hidden="true" />
      <div className="hero-brand-core" aria-label="灵小枢 AI 助手">
        <div className="hero-mascot-image" aria-hidden="true" />
      </div>
      {heroBrandPositions.map(({ brand, x, y, rotate, delay }) => (
        <div
          className="hero-logo-chip"
          key={brand.name}
          style={
            {
              "--logo-x": `${x}%`,
              "--logo-y": `${y}%`,
              "--logo-rotate": `${rotate}deg`,
              "--logo-delay": `${delay}s`,
            } as CSSProperties
          }
        >
          <BrandMark brand={brand} />
          <span>{brand.name}</span>
        </div>
      ))}
      <div className="hero-data-flow hero-data-flow-a" aria-hidden="true" />
      <div className="hero-data-flow hero-data-flow-b" aria-hidden="true" />
    </div>
  );
}

function BrandRailTrack({ brands }: { brands: Brand[] }) {
  return (
    <div className="brand-rail-track">
      {[...brands, ...brands].map((brand, index) => (
        <div className="brand-rail-item" key={`${brand.name}-${index}`}>
          <BrandMark brand={brand} />
          <span>{brand.name}</span>
        </div>
      ))}
    </div>
  );
}

export function IntegratedBrandRail() {
  return (
    <section className="brand-rail" aria-label="平台与模型接入">
      <div className="brand-rail-label">
        <span>CONNECTED ECOSYSTEM</span>
        <strong>真实平台 × 主流模型</strong>
      </div>
      <div className="brand-rail-window">
        <BrandRailTrack brands={allBrands} />
      </div>
    </section>
  );
}

export function GrowthScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const available = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / available));
      const nextScene = Math.min(
        storyScenes.length - 1,
        Math.floor(progress * storyScenes.length),
      );

      section.style.setProperty("--story-progress", progress.toFixed(4));
      setActiveScene((current) => (current === nextScene ? current : nextScene));
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section className="scroll-story" ref={sectionRef} aria-label="灵枢增长链路">
      <div className="scroll-story-stage">
        <div className="story-background-index" aria-hidden="true">
          {storyScenes[activeScene].index}
        </div>
        <div className="story-grid-lines" aria-hidden="true" />
        <div className="container scroll-story-layout">
          <div className="story-copy-stack">
            {storyScenes.map((scene, index) => (
              <article
                className={`story-scene-copy ${index === activeScene ? "is-active" : ""}`}
                aria-hidden={index !== activeScene}
                key={scene.index}
              >
                <span className="story-eyebrow">
                  {scene.index} / {scene.eyebrow}
                </span>
                <h2>
                  <span>{scene.title}</span>
                  <strong>{scene.accent}</strong>
                </h2>
                <p>{scene.text}</p>
              </article>
            ))}
          </div>

          <div className="story-visual-stack" aria-live="polite">
            {storyScenes.map((scene, index) => (
              <div
                className={`story-visual ${index === activeScene ? "is-active" : ""}`}
                aria-hidden={index !== activeScene}
                key={scene.index}
              >
                <div className="story-visual-head">
                  <span>LINGSHU ORCHESTRATION</span>
                  <i>● LIVE</i>
                </div>
                <div className="story-brand-cluster">
                  {scene.brands.map((brand, brandIndex) => (
                    <div
                      className="story-brand-chip"
                      style={{ "--brand-index": brandIndex } as CSSProperties}
                      key={brand.name}
                    >
                      <BrandMark brand={brand} />
                      <span>{brand.name}</span>
                    </div>
                  ))}
                </div>
                <div className="story-metric">
                  <strong>{scene.metric}</strong>
                  <span>{scene.metricLabel}</span>
                </div>
                <div className="story-signal">
                  <i />
                  <span>{scene.signal}</span>
                  <b>↗</b>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export function ProductFlowShowcase() {
  return (
    <section className="product-flow-showcase">
      <div className="container product-flow-heading" data-reveal>
        <span className="eyebrow">REAL PRODUCT IN MOTION</span>
        <h2>
          从真实产品中提炼，
          <strong>让增长链路自己讲故事</strong>
        </h2>
        <p>
          经营数据发现机会，爆款分析拆解方法，AI 素材完成生产，内容排期把动作持续执行。
        </p>
      </div>
      <div className="container product-flow-stage" data-reveal>
        <div className="product-flow-aura" aria-hidden="true" />
        <div className="product-flow-frame">
          <Image
            src="/lingshu-product-flow-v1.png"
            alt="灵枢 AI 从爆款分析、经营总览到 AI 素材生成和内容排期的产品链路"
            width={1672}
            height={941}
            sizes="(max-width: 767px) 92vw, (max-width: 1200px) 88vw, 1160px"
          />
          <div className="product-flow-scan" aria-hidden="true" />
          <div className="product-flow-hotspot hotspot-analysis">
            <i />
            <span>爆款分析</span>
          </div>
          <div className="product-flow-hotspot hotspot-dashboard">
            <i />
            <span>经营总览</span>
          </div>
          <div className="product-flow-hotspot hotspot-creation">
            <i />
            <span>AI 素材</span>
          </div>
          <div className="product-flow-hotspot hotspot-calendar">
            <i />
            <span>内容排期</span>
          </div>
        </div>
      </div>
    </section>
  );
}

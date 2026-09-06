"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./social-growth.module.css";

const insightItems = [
  ["趋势与竞品洞察", "关注市场正在发生什么，也解释内容为什么会火：受众、钩子、结构和卖点一目了然。"],
  ["一键转为创作任务", "把值得跟进的内容机会直接送入创作队列，减少从研究到执行之间的断层。"],
  ["下一步动作建议", "围绕产品和目标市场给出同主题脚本、平台适配和发布时间建议。"],
] as const;

const creationItems = [
  ["短视频脚本", "开头钩子、场景结构、字幕与镜头建议"],
  ["智能配音与 BGM", "多语言语音、情绪与平台风格预设"],
  ["封面与图文", "B2B 海报、产品卡与社媒图文"],
  ["平台文案", "按渠道长度、语气与标签规则差异化生成"],
] as const;

const creationDemoConfig = {
  industry: "美妆行业 · 示例演示",
  asset: {
    src: "/viral-variation-real-scenes-v1.png",
    alt: "单人展示粉底液的横向使用场景占位素材",
  },
  status: "内容制作中",
  annotation: "使用场景",
} as const;

const publishItems = [
  "分平台标题、文案与画幅适配",
  "最佳发布时间建议与内容日历",
  "多视频发布队列与账号状态",
  "发布前检查与异常提示",
] as const;

const attributionPath = ["TikTok 视频", "WhatsApp CTA", "新询盘", "客户详情"] as const;

const steps = [
  { eyebrow: "DISCOVER", title: "看趋势，也看为什么会火", description: "不做泛化的数据大屏，只聚焦能转成下一条内容的机会。" },
  { eyebrow: "CREATE", title: "生成能发布的内容，而不只是文案", description: "围绕真实产品资料，完成短视频、图文和平台文案的连续生产。" },
  { eyebrow: "PUBLISH", title: "一次配置，多平台、多账号差异化发布", description: "统一排期，但不强行复用同一份标题和文案。每个平台都保留自己的发布逻辑。" },
  { eyebrow: "CONTENT ATTRIBUTION", title: "不只看播放量，更知道客户从哪条内容来", description: "每条发布自动附加独立 WhatsApp 追踪入口。客户发来消息后，平台、账号、视频标题与发布时间一起进入客户档案。" },
] as const;

const platformIcons = [
  ["TikTok", "/platform-color-tiktok.svg"],
  ["Instagram", "/platform-color-instagram.svg"],
  ["YouTube", "/platform-color-youtube.svg"],
  ["Facebook", "/platform-color-facebook.svg"],
] as const;

function DiscoverScene() {
  return (
    <div className={`${styles.generatedScene} ${styles.discoveryScene}`}>
      <header className={styles.sceneToolbar}><span><i />趋势与竞品洞察</span><b>近 7 天持续上升</b></header>
      <div className={styles.discoveryFocus}>
        <span>内容机会 01</span><h3>护肤成分实测</h3><p>停留信号上升 · 评论询问增加</p>
        <div className={styles.discoveryChart} aria-hidden="true"><i /><i /><i /><i /><i /><b /></div>
      </div>
      <div className={styles.insightRail}>
        {insightItems.map(([title], index) => <article key={title} style={{ "--item": index } as CSSProperties}><i>0{index + 1}</i><strong>{title}</strong><span>{index === 0 ? "机会已锁定" : index === 1 ? "可转创作" : "动作已生成"}</span></article>)}
      </div>
      <div className={styles.discoveryAction}><i />已准备转为创作任务</div>
    </div>
  );
}

function CreationDemo({ standalone = false }: { standalone?: boolean }) {
  return (
    <div
      className={`${styles.creationDemo} ${standalone ? styles.creationDemoStandalone : ""}`}
      aria-label={creationDemoConfig.asset.alt}
    >
      <header className={styles.creationDemoHeader}>
        <span>{creationDemoConfig.industry}</span>
      </header>

      <figure
        className={styles.creationMainVisual}
        style={{ backgroundImage: `url(${creationDemoConfig.asset.src})` }}
        role="img"
        aria-label={creationDemoConfig.asset.alt}
      >
        <span className={styles.visualStatus}><i />{creationDemoConfig.status}</span>
        <span className={`${styles.visualAnnotation} ${styles.staticSceneAnnotation}`}>{creationDemoConfig.annotation}</span>
      </figure>
    </div>
  );
}

function CreateScene() {
  return (
    <div className={`${styles.generatedScene} ${styles.createScene}`}>
      <header className={styles.sceneToolbar}><span><i />AI 内容生成</span><b>品牌资料已载入</b></header>
      <div className={styles.createFocus}>
        <div className={styles.createVisual}><span>9:16</span><b>品牌内容</b></div>
        <div className={styles.createBrief}><span>生成任务</span><h3>把有效表达，变成你的内容</h3><p>产品、人物与业务场景已经替换，保留经过验证的钩子和叙事结构。</p><div><b>问题前置</b><b>场景证明</b><b>结果收口</b></div></div>
      </div>
      <div className={styles.creationDock}>
        {creationItems.map(([title], index) => <span key={title}><i>0{index + 1}</i>{title}</span>)}
      </div>
    </div>
  );
}

function CreationFeatureCard() {
  const step = steps[1];

  return (
    <article className={styles.creationFeatureCard}>
      <div className={styles.creationFeatureCopy}>
        <span><i>02</i>{step.eyebrow}</span>
        <h2>生成能发布的内容，<br />而不只是文案</h2>
        <p>围绕真实产品资料，<br className={styles.creationDescriptionBreak} />完成短视频、图文和平台文案的连续生产。</p>
        <div className={styles.creationFeatureList}>
          {creationItems.map(([title, text]) => (
            <span key={title}>
              <strong>{title}</strong>
              <small>{text}</small>
            </span>
          ))}
        </div>
      </div>
      <CreationDemo standalone />
    </article>
  );
}

function PublishScene() {
  return (
    <div className={`${styles.generatedScene} ${styles.publishScene}`}>
      <div className={styles.contentSeed}><div className={styles.seedVisual} /><span>品牌内容</span><strong>多视频发布队列</strong><small>标题 · 文案 · 画幅</small></div>
      <div className={styles.publishRoutes} aria-hidden="true"><i /><i /><i /><i /></div>
      <div className={styles.platformGrid}>
        {platformIcons.map(([name, src], index) => (
          <article key={name} style={{ "--item": index } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" /><strong>{name}</strong><span>待发布</span>
          </article>
        ))}
      </div>
      <div className={styles.checklist}>{publishItems.map((item) => <span key={item}><i>✓</i>{item}</span>)}</div>
    </div>
  );
}

function AttributionScene() {
  return (
    <div className={`${styles.generatedScene} ${styles.attributionScene}`}>
      <div className={styles.attributionGlow} />
      <div className={styles.attributionFlow}>
        {attributionPath.map((item, index) => (
          <article key={item} style={{ "--item": index } as CSSProperties}>
            <span>0{index + 1}</span>
            {index === 0 && <Image src="/platform-color-tiktok.svg" alt="" width={22} height={22} />}
            {index === 1 && <Image src="/platform-whatsapp.svg" alt="" width={22} height={22} />}
            {index > 1 && <i>{index === 2 ? "+" : "◎"}</i>}
            <strong>{item}</strong>
          </article>
        ))}
      </div>
      <div className={styles.attributionRecord}><span>询盘来源已记录</span><strong>TikTok · 视频标题 · 发布账号</strong><small>内容级 WhatsApp 归因</small></div>
    </div>
  );
}

function ProductCanvas({ activeStep }: { activeStep: number }) {
  const scenes = [<DiscoverScene key="discover" />, <CreateScene key="create" />, <PublishScene key="publish" />, <AttributionScene key="attribution" />];
  return (
    <div className={styles.productCanvas} aria-live="polite">
      <header className={styles.canvasHeader}><div><i /><i /><i /></div><span>产品 → 内容 → 多平台 → 询盘</span><b>0{activeStep + 1} / 0{steps.length}</b></header>
      <div className={styles.canvasBody}>
        {scenes.map((scene, index) => <div className={`${styles.canvasScene} ${activeStep === index ? styles.activeScene : ""}`} aria-hidden={activeStep !== index} key={index}>{scene}</div>)}
      </div>
      <footer className={styles.canvasFooter}><span><i />LINGSHU AI</span><strong>{steps[activeStep].eyebrow}</strong></footer>
    </div>
  );
}

export function SocialGrowthExperience({ embedded = false }: { embedded?: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.step ?? 0));
    }, { threshold: [0.22, 0.45, 0.68], rootMargin: "-18% 0px -26% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const goToStep = (index: number) => {
    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const content = (
    <>
      {!embedded && <section className={styles.hero} aria-labelledby="social-growth-title">
        <div className={styles.heroGrid} aria-hidden="true" /><div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy} data-reveal>
            <span>SOCIAL GROWTH</span><h1 id="social-growth-title">把一个产品，变成持续增长的内容系统</h1>
            <p>从趋势与竞品中找到机会，用 AI 生成能发布的内容，统一管理多个平台与账号，并知道每一条询盘从哪里来。</p>
            <div className={styles.heroActions}><a href="#details">查看完整能力 <b>↓</b></a><Link href="/demo">预约产品演示 <b>↗</b></Link></div>
          </div>
          <div className={styles.heroProduct} data-reveal>
            <div className={styles.heroProductLabel}>产品 → 内容 → 多平台 → 询盘</div>
            <Image src="/lingshu-product-flow-v1.png" alt="灵枢 AI 社媒增长产品链路" width={1672} height={941} priority sizes="(max-width: 900px) 92vw, 54vw" />
            <div className={styles.heroScan} aria-hidden="true" />
          </div>
        </div>
      </section>}

      <section className={styles.story} id={embedded ? "growth" : "details"} aria-label="社媒增长连续工作流">
        <div className={styles.storyIntro} data-reveal>
          <span>{embedded ? "SOCIAL GROWTH · 02 / 04" : "01—04 / CONTINUOUS WORKFLOW"}</span>
          <h2>{embedded ? <>把一个产品，变成<em>持续增长</em>的内容系统</> : "从机会发现，到客户回来"}</h2>
          <p>{embedded ? "从趋势与竞品中找到机会，用 AI 生成能发布的内容，统一管理多个平台与账号，并知道每一条询盘从哪里来。" : "产品界面保持在同一个画布中，随着增长链路持续向前。"}</p>
        </div>
        {embedded ? <CreationFeatureCard /> : <div className={styles.storyLayout}>
          <div className={styles.copyColumn}>
            {steps.map((step, index) => (
              <article className={`${styles.storyStep} ${activeStep === index ? styles.activeCopy : ""}`} data-step={index} key={step.eyebrow} ref={(node) => { stepRefs.current[index] = node; }}>
                <button type="button" onClick={() => goToStep(index)} aria-label={`查看 ${step.title}`}><span>0{index + 1}</span><i /></button>
                <div>
                  <small>{step.eyebrow}</small><h2>{step.title}</h2><p>{step.description}</p>
                  {index === 0 && <div className={styles.detailList}>{insightItems.map(([title, text]) => <span key={title}><strong>{title}</strong>{text}</span>)}</div>}
                  {index === 1 && <div className={styles.detailList}>{creationItems.map(([title, text]) => <span key={title}><strong>{title}</strong>{text}</span>)}</div>}
                  {index === 2 && <div className={styles.plainList}>{publishItems.map((item) => <span key={item}>{item}</span>)}</div>}
                  {index === 3 && <div className={styles.pathList}>{attributionPath.map((item, pathIndex) => <span key={item}><i>{pathIndex + 1}</i>{item}</span>)}</div>}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.stickyCanvas}><ProductCanvas activeStep={activeStep} /></div>
        </div>}
      </section>

      {!embedded && <section className={styles.cta}>
        <div><span>READY WHEN YOU ARE</span><h2>让每一条内容，都有机会走向客户</h2><p>用你的产品资料，看看灵枢如何完成洞察、生成、发布与询盘归因。</p><Link href="/demo">预约产品演示 <b>↗</b></Link></div>
        <div className={styles.ctaOrbit} aria-hidden="true"><i /><i /><i /><i /></div>
      </section>}
    </>
  );

  return embedded ? <div className={styles.page}>{content}</div> : <main className={styles.page}>{content}</main>;
}

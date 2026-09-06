"use client";

import { useEffect, useState } from "react";
import styles from "../viral-growth-engine.module.css";

const steps = [
  {
    label: "发现",
    result: "选题更有依据",
    capability: "自动聚合同行业真实热点，减少人工刷平台和猜选题",
  },
  {
    label: "拆解",
    result: "看懂内容为何有效",
    capability: "提取钩子、痛点、卖点、人物关系、场景与情绪节奏",
  },
  {
    label: "重构",
    result: "无需从零写内容",
    capability: "保留有效表达逻辑，替换为你的产品、人物与业务场景",
  },
  {
    label: "裂变",
    result: "用更多素材测试市场",
    capability: "一次生成不同钩子、人群与卖点版本，快速验证反馈",
  },
  {
    label: "发布",
    result: "缩短内容上线时间",
    capability: "统一适配 TikTok、Instagram、YouTube 与 Facebook",
  },
];

const logicSignals = ["开头钩子", "用户痛点", "卖点表达", "人物关系", "使用场景", "情绪节奏"];

const versions = [
  { index: "A", title: "结果型开头", note: "先展示 7 天肤感变化", position: "100% 0%" },
  { index: "B", title: "人群型开头", note: "面向敏感肌通勤人群", position: "0% 100%" },
  { index: "C", title: "卖点型开头", note: "突出轻薄与快速吸收", position: "100% 100%" },
];

const platforms = ["tiktok", "instagram", "youtube", "facebook"];

function EngineScene({ activeStep }: { activeStep: number }) {
  return (
    <div className={styles.engineViewport} data-active-step={activeStep} aria-live="polite">
      <div className={`${styles.engineScene} ${activeStep === 0 ? styles.activeScene : ""}`} aria-hidden={activeStep !== 0}>
        <div className={styles.signalHeader}><span>行业内容信号</span><b>持续更新</b></div>
        <div className={styles.signalChart} aria-hidden="true"><i /><i /><i /><i /><i /><b /></div>
        <div className={styles.signalFeed}>
          {[
            ["/industries/personal-care.png", "护肤成分实测", "停留信号上升"],
            ["/industries/consumer-electronics.png", "产品功能对比", "评论询问增加"],
            ["/industries/home-furniture.png", "工艺细节演示", "收藏趋势增长"],
          ].map((item, index) => (
            <article className={index === 0 ? styles.selectedSignal : ""} key={item[1]}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item[0]} alt="" />
              <div><span>{item[1]}</span><strong>{item[2]}</strong></div>
              <b>{index === 0 ? "已选中" : ["增长中", "询问增加", "收藏增长"][index]}</b>
            </article>
          ))}
        </div>
        <div className={styles.signalLock}><i /><span>灵枢正在锁定可复用的增长信号</span></div>
      </div>

      <div className={`${styles.engineScene} ${activeStep === 1 ? styles.activeScene : ""}`} aria-hidden={activeStep !== 1}>
        <div className={styles.analysisSource}>
          <div className={styles.sourceStill} />
          <span>行业热门内容</span>
          <b>00:18</b>
          <i />
        </div>
        <div className={styles.analysisScan} aria-hidden="true" />
        <div className={styles.logicCloud}>
          {logicSignals.map((item, index) => <span data-signal={index + 1} key={item}><i>0{index + 1}</i>{item}</span>)}
        </div>
        <div className={styles.analysisStatus}><i /><span>正在对齐脚本、画面与用户反应</span></div>
      </div>

      <div className={`${styles.engineScene} ${activeStep === 2 ? styles.activeScene : ""}`} aria-hidden={activeStep !== 2}>
        <div className={styles.rebuildSource}><div /><span>市场验证结构</span><strong>问题前置 → 场景证明 → 结果收口</strong></div>
        <div className={styles.rebuildBridge} aria-hidden="true"><i /><i /><i /><b>替换中</b></div>
        <div className={styles.rebuildTarget}>
          <div />
          <span>你的品牌内容</span>
          <strong>敏感肌用户 → 通勤场景 → 轻薄卖点</strong>
        </div>
        <div className={styles.replaceTags}><span>产品</span><span>人物</span><span>场景</span></div>
      </div>

      <div className={`${styles.engineScene} ${activeStep === 3 ? styles.activeScene : ""}`} aria-hidden={activeStep !== 3}>
        <div className={styles.variantSeed}><i /><span>有效表达逻辑</span><strong>钩子 · 场景 · 证据</strong></div>
        <div className={styles.variantBranches} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.variantOutputs}>
          {versions.map((version) => (
            <article key={version.index}>
              <div style={{ backgroundPosition: version.position }} />
              <span>版本 {version.index}</span>
              <strong>{version.title}</strong>
            </article>
          ))}
        </div>
        <div className={styles.variantCounter}><span>生成队列</span><b>01 → 03 → 06</b></div>
      </div>

      <div className={`${styles.engineScene} ${activeStep === 4 ? styles.activeScene : ""}`} aria-hidden={activeStep !== 4}>
        <div className={styles.publishStack}>
          <div /><div /><div />
          <span>品牌内容已就绪</span>
          <strong>3 个版本 · 4 个平台</strong>
        </div>
        <div className={styles.publishLines} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className={styles.publishPlatforms}>
          {platforms.map((platform, index) => (
            <span data-platform={index + 1} key={platform}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/platform-color-${platform}.svg?v=1`} alt="" />
              <b>{["TikTok", "Instagram", "YouTube", "Facebook"][index]}</b>
              <i>待发布</i>
            </span>
          ))}
        </div>
        <div className={styles.publishStatus}><i /><span>统一适配尺寸、字幕与发布信息</span></div>
      </div>
    </div>
  );
}

export function ViralGrowthEngine() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setActiveStep((current) => (current + 1) % steps.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={styles.growthModule}>
      <section className={styles.growthEngine} id="growth" aria-labelledby="growth-engine-title">
        <div className={styles.engineIntro} data-reveal>
          <span>一条连续的增长链路</span>
          <h2 id="growth-engine-title">从行业热点，到你的品牌内容上线</h2>
          <p>每一步先解决一个内容增长问题，再由灵枢完成背后的分析、重构与分发。</p>
        </div>

        <div className={styles.engineShell} data-reveal>
          <div className={styles.stepTrack} role="tablist" aria-label="内容增长流程">
            {steps.map((step, index) => (
              <button
                aria-controls="growth-engine-viewport"
                aria-selected={activeStep === index}
                className={activeStep === index ? styles.activeStep : ""}
                key={step.label}
                onClick={() => setActiveStep(index)}
                role="tab"
                type="button"
              >
                <i>0{index + 1}</i>
                <span>{step.label}</span>
                <b>{step.result}</b>
              </button>
            ))}
          </div>
          <div className={styles.engineBody} id="growth-engine-viewport" role="tabpanel">
            <EngineScene activeStep={activeStep} />
            <aside className={styles.stepExplanation} key={activeStep}>
              <span>你获得的结果</span>
              <h3>{steps[activeStep].result}</h3>
              <p>{steps[activeStep].capability}</p>
              <div><i /><b>灵枢 AI 正在执行：{steps[activeStep].label}</b></div>
            </aside>
          </div>
        </div>

      </section>

      <section className={styles.transformationExample} id="growth-example" aria-labelledby="growth-example-title">
        <div className={styles.exampleIntro} data-reveal>
          <span>承接上一步 · 内容转换示例</span>
          <h2 id="growth-example-title">保留有效逻辑，内容已经变成你的</h2>
          <p>以下示例展示如何把一条护肤行业热门内容，转化为面向品牌自身产品的多个测试版本。</p>
        </div>

        <div className={styles.transformationStage} data-reveal>
          <article className={styles.originalContent}>
            <header><span>01 / 原始热门内容</span><b>市场信号已验证</b></header>
            <div className={styles.originalVisual} />
            <footer><strong>“为什么换季后，保湿越做越干？”</strong><span>问题前置 · 真人口播 · 使用过程证明</span></footer>
          </article>

          <div className={styles.logicExtraction}>
            <span>02 / AI 提取表达逻辑</span>
            <div>{logicSignals.slice(0, 4).map((item, index) => <b key={item}><i>0{index + 1}</i>{item}</b>)}</div>
            <p>只保留被验证有效的表达结构，不复制原内容。</p>
          </div>

          <div className={styles.brandVersions}>
            <header><span>03 / 生成品牌内容</span><b>产品 · 人物 · 场景已替换</b></header>
            {versions.map((version) => (
              <article key={version.index}>
                <div style={{ backgroundPosition: version.position }} />
                <i>{version.index}</i>
                <span><strong>{version.title}</strong><small>{version.note}</small></span>
                <b>9:16</b>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

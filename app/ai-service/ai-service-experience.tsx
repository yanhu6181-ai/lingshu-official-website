"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ai-service.module.css";
import { ServiceTransition } from "./service-transition";

const knowledgeItems = [
  ["01", "理解客户", "识别语言、产品、采购意图与上下文，避免只按关键词机械回复。"],
  ["02", "命中已审批知识", "从产品、FAQ、交期和服务规则中生成有依据的回答。"],
  ["03", "判断风险", "报价、议价、大单和订单条款按配置停在草稿或直接转人工。"],
] as const;

const priorityItems = [
  ["Maya · Brazil", "高意向", "询问 2,000 件采购与交期", "92"],
  ["Oliver · UK", "需人工", "要求正式报价和付款条款", "86"],
  ["Amira · UAE", "样品", "希望本周寄出样品", "74"],
  ["Leo · Chile", "标准咨询", "咨询 MOQ 与包装", "51"],
] as const;

const permissions = [
  ["只提醒", "AI 判断，不写不发", "适合刚开始使用或高风险客户。AI 只负责优先级、意图和风险提示。"],
  ["草稿需确认", "AI 先写，销售确认", "适合样品、采购与初步报价。销售保持控制，同时减少重复输入。"],
  ["低风险自动回", "只回答已审批问题", "适合标准 FAQ、产品参数与服务流程；超出边界自动升级。"],
] as const;

const contacts = [
  ["atlas", "Faisal Al-Harbi · Najd Foods Group", "14:31", "هل يمكن أن يكون الاجتماع يوم الأربعاء؟ نريد أيضًا خطة للتركيب والتدريب في الرياض.", "youtube", "大单预警"],
  ["harbor", "Omar Hassan · Gulf Precision", "14:29", "The part is about 120 mm. I can send photos today. Do you also need our current cycle time?", "tiktok", ""],
  ["forge", "Piotr Nowak · AutoForm Polska", "14:26", "Another supplier is 7% lower. Can you match it and keep the same delivery date?", "facebook", ""],
  ["solstice", "Sofía Ramírez · MedNova México", "14:17", "Perfecto. ¿Podemos revisar ese ejemplo con nuestra gerente de Calidad el jueves?", "instagram", ""],
] as const;

const realMessages = [
  ["customer", "11:33", "Hi, I saw your inspection machine on TikTok. Can it check scratches on shiny aluminium parts?", "你好，我在 TikTok 上看到你们的检测设备。它能检测反光铝件上的划伤吗？"],
  ["ai", "11:39", "Yes, shiny parts can be evaluated. What else needs checking besides scratches?", "可以先评估反光件。除了划伤，还需要检测什么？"],
  ["customer", "12:09", "Missing holes and laser codes too. The line is in Dubai and our integrator needs an English interface.", "还要检测漏孔和激光字符。产线在迪拜，本地集成商需要英文界面。"],
  ["human", "12:21", "Got it — scratches, missing holes and laser codes, with an English HMI for your Dubai integrator. Send me the part size and a few good/bad photos first, then we can judge the lighting setup.", "明白：划伤、漏孔和激光字符，并为迪拜集成商提供英文界面。先发工件尺寸和几张良品/不良品照片，我们再判断打光方案。"],
] as const;

const memoryFacts = ["工件大约 120 毫米", "我今天可以发照片", "还需要我们现在的节拍吗？"] as const;


function ChannelMark({ channel }: { channel: string }) {
  const src = channel === "whatsapp" ? "/platform-whatsapp.svg" : `/platform-color-${channel}.svg`;
  // These tiny platform marks are decorative and intentionally bypass image optimization.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" />;
}

function CustomerAvatar({ seed, name, className }: { seed: string; name: string; className?: string }) {
  const src = `https://api.dicebear.com/9.x/notionists/png?seed=${seed}&size=96&backgroundColor=e8f3ec`;
  // Avatar artwork is loaded as a small decorative profile image and intentionally bypasses image optimization.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={`${name} 头像`} loading="lazy" />;
}


function MemoryLearningDemo() {
  const [state, setState] = useState<"idle" | "sending" | "extracting" | "learned">("idle");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const run = () => {
    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("learned");
      return;
    }
    setState("sending");
    timers.current.push(window.setTimeout(() => setState("extracting"), 620));
    timers.current.push(window.setTimeout(() => setState("learned"), 1900));
  };

  const reset = () => { clearTimers(); setState("idle"); };
  const status = { idle: "等待发送", sending: "消息进入会话", extracting: "正在更新客户上下文", learned: "客户上下文已更新" }[state];

  return (
    <section className={styles.learningSection} aria-labelledby="memory-learning-title">
      <div className={styles.sectionHeader}>
        <div><span>FOLLOW UP &amp; LEARN</span><h2 id="memory-learning-title">每次人工接手，都让<span className={styles.keepTogether}>下一次</span> <span className={styles.keepTogether}>AI 接待</span><em>更懂你的业务</em></h2></div>
        <p>从报价推进到沉默客户唤醒，再到未覆盖问题沉淀，客户服务不断形成新的企业知识。</p>
      </div>
      <div className={`${styles.learningStage} ${styles[`state${state}`]}`}>
        <div className={styles.memoryOrbit} aria-hidden="true" />
        <div className={styles.memoryCard}>
          <header><i>记</i><div><span>智能体记忆</span><strong>客户上下文</strong></div><b>{state === "learned" ? "已更新" : "1 类私有记忆"}</b></header>
          <div className={styles.memoryPerson}><CustomerAvatar seed="harbor" name="Omar Hassan" className={styles.customerAvatar} /><div><strong>Omar Hassan · Gulf Precision</strong><span>新线索 · 阿联酋·迪拜 · 英语</span></div></div>
          <div className={styles.memoryFields}>
            <span><small>关注产品</small><strong>机器视觉检测工作站</strong></span><span><small>市场</small><strong>阿联酋·迪拜</strong></span>
            <span className={styles.wideField}><small>客户摘要</small><strong>迪拜精密金属件加工商，希望检测反光铝件的划伤、漏孔和字符，关心英文界面及本地集成。</strong></span>
            <span className={styles.wideField}><small>下一步</small><strong>收取三类不良样件照片、工件尺寸和当前节拍，判断打光与相机方案</strong></span>
          </div>
          <div className={styles.memoryTags}><span>来自迪拜</span><span>明确检测对象</span><span>询问本地集成</span><span>机器视觉</span></div>
          <div className={styles.newMemory} aria-hidden={state !== "learned"}><span>本轮对话新增</span>{memoryFacts.map((fact, index) => <b key={fact} style={{ "--index": index } as CSSProperties}>{fact}</b>)}</div>
          <footer><i />已记录 1 类私有记忆，可在下方编辑</footer>
        </div>
        <div className={styles.inputCard}>
          <header><span>实时对话</span><small>节点 1 · 海外首次询盘与场景澄清</small></header>
          <div className={styles.inputPerson}><CustomerAvatar seed="harbor" name="Omar Hassan" className={styles.customerAvatar} /><div><strong>Omar Hassan · Gulf Precision</strong><span><ChannelMark channel="whatsapp" /><ChannelMark channel="tiktok" />潜客 · 意向 63</span></div></div>
          <div className={styles.learningConversation}>
            <article className={styles.learningAiBubble}>
              <header><span>AI 回复</span><time>11:39</time></header>
              <p>Yes, shiny parts can be evaluated. What else needs checking besides scratches?</p>
              <small><b>中文翻译：</b>可以先评估反光件。除了划伤，还需要检测什么？</small>
            </article>
            {state !== "idle" && <article className={styles.learningCustomerBubble}>
              <header><time>14:29</time></header>
              <p>工件大约 120 毫米。我今天可以发照片。还需要我们现在的节拍吗？</p>
              <small><b>英文翻译：</b>The part is about 120 mm. I can send photos today. Do you also need our current cycle time?</small>
            </article>}
          </div>
          {state === "idle" && <div className={styles.learningComposer}>
            <textarea
              aria-label="客户中文消息"
              className={styles.composerInput}
              readOnly
              rows={2}
              value="工件大约 120 毫米。我今天可以发照片。还需要我们现在的节拍吗？"
            />
            <div className={styles.autoTranslation}><span>自动附带英文翻译</span><p>The part is about 120 mm. I can send photos today. Do you also need our current cycle time?</p></div>
          </div>}
          <div className={styles.inputActions}>{state === "learned" ? <button type="button" onClick={reset}>重新演示</button> : <button type="button" onClick={run} disabled={state !== "idle"}>发送 <span>↗</span></button>}<span><i />{status}</span></div>
        </div>
        <div className={styles.memoryPacket} aria-hidden="true">上下文</div>
        <p className={styles.srOnly} aria-live="polite">{status}</p>
      </div>
    </section>
  );
}

function RealWorkspaceDemo() {
  const [run, setRun] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  return (
    <section className={styles.realDemo} aria-labelledby="real-demo-title">
      <div className={styles.sectionHeader}>
        <div><span>真实工作演示</span><h2 id="real-demo-title">AI 不只回复消息，<span className={styles.keepTogether}>还知道</span><em>下一步</em>该做什么</h2></div>
        <p>识别语种、个性化推进、自动建档，并在敏感数据出现时守住隐私边界。</p>
      </div>
      <div className={styles.workspaceBackdrop}>
        <div className={styles.ringsImage} aria-hidden="true" />
        <div className={`${styles.workspaceShell} ${showInsights ? styles.contextOpen : ""}`}>
          <aside className={styles.inbox}>
            <header><strong><i />8 个待处理</strong><span>按最近动态排序</span></header>
            <nav><b>收件箱</b><span>潜客</span><span>成交客户</span></nav>
            {contacts.map(([avatar, name, time, message, channel, alert], index) => (
              <article className={index === 1 ? styles.selectedContact : ""} key={name}>
                <CustomerAvatar seed={avatar} name={name} className={styles.inboxAvatar} /><div><strong>{name}</strong><small>{alert && <b>{alert}</b>}<ChannelMark channel="whatsapp" /><ChannelMark channel={channel} />{message}</small></div><time>{time}</time>
              </article>
            ))}
          </aside>
          <div className={styles.chatPanel}>
            <header>
              <div><strong>Omar Hassan · Gulf Precision</strong><span>节点 1 · 海外首次询盘与场景澄清</span></div>
              <div className={styles.chatTools}>
                <small>当地时间 10:33:52</small>
                <button className={styles.contextToggle} type="button" aria-controls="real-demo-context" aria-expanded={showInsights} onClick={() => setShowInsights(true)}>客户判断</button>
                <button className={styles.replay} type="button" aria-label="重新演示对话" title="重新演示对话" onClick={() => setRun((value) => value + 1)}>↻</button>
              </div>
            </header>
            <ol className={styles.messageStream} key={run} aria-label="按时间顺序的完整对话">
              {realMessages.map(([type, time, text, translation], index) => (
                <li className={type === "customer" ? styles.incomingRow : styles.outgoingRow} key={time} style={{ "--index": index } as CSSProperties}>
                  <article className={styles[`${type}Message`]}>
                    <header>{type !== "customer" && <span>{type === "ai" ? "AI 回复" : "我的回复"}</span>}<time>{time}</time></header>
                    <p>{text}</p>
                    <small><b>中文翻译：</b>{translation}</small>
                    {type !== "customer" && <footer><span>{type === "ai" ? "AI 自动回复" : "AI 草稿 · 人工改过"}</span><span>已用学习记忆</span><span>已送达</span></footer>}
                  </article>
                </li>
              ))}
            </ol>
            <div className={styles.composer}>输入中文回复…<button>发送</button></div>
          </div>
          <aside className={styles.insightCard} id="real-demo-context" aria-label="客户判断摘要">
            <button className={styles.contextBack} type="button" onClick={() => setShowInsights(false)}>← 返回会话</button>
            <header><i>AI</i><div><span>客户判断摘要</span><strong>潜客 · 意向 63</strong></div><b>LIVE</b></header>
            <div className={styles.score}><span>继续了解需求</span><strong>63</strong><i><b /></i></div>
            <div className={styles.summary}><span>当前沟通阶段</span><strong>潜客</strong><p>迪拜精密金属件加工商，希望检测反光铝件的划伤、漏孔和字符，关心英文界面及本地集成。</p></div>
            <div className={styles.nextStep}><span>下一步推进建议</span><p>收取三类不良样件照片、工件尺寸和当前节拍，判断打光与相机方案</p></div>
            <div className={styles.signalTags}><span>来自迪拜</span><span>明确检测对象</span><span>询问本地集成</span></div>
            <button type="button">查看 AI 判断依据 <span>↗</span></button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function AiServiceExperience({ embedded = false }: { embedded?: boolean }) {
  const content = (
    <>
      {!embedded && <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" /><div className={styles.heroOrbit} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}><span>AI CUSTOMER SERVICE</span><h1>不错过客户，也不把业务交给黑箱</h1><p>AI 先理解客户、命中企业知识并判断风险。常见问题及时回复，关键业务由销售带着完整上下文接手。</p><div><Link href="/demo">预约产品演示 ↗</Link><a href="#details">查看完整能力</a></div></div>
          <div className={styles.heroConsole}>
            <header><span>LIVE CUSTOMER CONTEXT</span><i>● ONLINE</i></header>
            <div className={styles.heroQuestion}>“德国客户询问 2,000 件起订、CE 认证和 30 天交付，是否应该直接报价？”</div>
            <div className={styles.heroSignals}><span><small>客户阶段</small>高意向采购</span><span><small>知识命中</small>MOQ / CE / 产能</span><span><small>经营判断</small>交期存在风险</span></div>
            <div className={styles.heroAnswer}><span>AI 建议</span><p>先确认包装规格与目的港，再生成区间报价草稿。当前产能下 30 天交付风险较高，建议由销售确认排产后发送。</p><small>依据：客户历史 + 产品知识 + 报价规则 + 产能信息</small></div>
          </div>
        </div>
      </section>}

      {embedded && <ServiceTransition />}

      {!embedded && <section className={styles.details} id="details">
        <div className={styles.sectionHeader}><div><span>UNDERSTAND</span><h2>全天候接待，但不扩大 AI 权限</h2></div><p>夜间也能及时理解客户和处理标准问题；是否发送、何时转人工由企业规则决定。</p></div>
        <div className={styles.knowledgeGrid}>{knowledgeItems.map(([index, title, text]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{text}</p><i /></article>)}</div>
        <div className={styles.priorityBlock}>
          <div><span>PRIORITIZE</span><h2>自动判断谁最值得先回</h2><p>让高意向、未读和需人工的客户从普通咨询中浮现，并清楚展示判断依据。</p></div>
          <div className={styles.priorityList}>{priorityItems.map(([name, tag, reason, score]) => <article key={name}><i>{name.slice(0,1)}</i><div><strong>{name}</strong><span>{reason}</span></div><b>{tag}</b><em>{score}</em></article>)}</div>
        </div>
      </section>}

      {!embedded && <section className={styles.permissionSection}>
        <div className={styles.sectionHeader}><div><span>CONTROL</span><h2>分级放权，不越边界</h2></div><p>不同类型的对话可以使用不同自动化级别，不把所有问题交给同一套规则。</p></div>
        <div className={styles.permissionGrid}>{permissions.map(([tag, title, text], index) => <article key={tag}><span>{tag}</span><h3>{title}</h3><p>{text}</p><div>{[0,1,2].map((item) => <i className={item <= index ? styles.meterOn : ""} key={item} />)}</div></article>)}</div>
      </section>}

      {!embedded && <section className={styles.handoffSection}>
        <div><span>HUMAN HANDOFF</span><h2>关键时刻交给人，上下文不丢失</h2><p>风险状态从绿色变为琥珀色，回复停在草稿。销售接管后可以直接看到客户来源、意向评分、对话摘要与建议动作。</p><div><span>内容来源与发布账号</span><span>完整对话与 AI 摘要</span><span>采购信号与风险判断</span><span>下一步跟进建议</span></div></div>
        <div className={styles.handoffVisual}><header><span>AI 正在接待</span><i>风险变化</i></header><div className={styles.handoffChat}><span>Could you match a lower quote and keep the delivery date?</span><strong>报价与交期同时变化，已暂停自动发送。</strong></div><div className={styles.handoffAction}><i>!</i><div><span>需要人工确认</span><strong>完整上下文已交给销售</strong></div><b>人工接管</b></div></div>
      </section>}

      <MemoryLearningDemo />
      <RealWorkspaceDemo />

      {!embedded && <section className={styles.cta}><div><span>READY WHEN YOU ARE</span><h2>让 AI 接住常见问题，让销售专注关键客户</h2><p>带上你的产品资料和回复规则，看看灵枢如何建立可控的客户接待流程。</p><Link href="/demo">预约产品演示 ↗</Link></div><div aria-hidden="true"><i /><i /><i /></div></section>}
    </>
  );

  return embedded ? <div className={styles.page}>{content}</div> : <main className={styles.page}>{content}</main>;
}

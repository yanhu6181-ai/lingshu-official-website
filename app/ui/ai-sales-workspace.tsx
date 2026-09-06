import Image from "next/image";
import styles from "../ai-sales-workspace.module.css";
import { AiConversationDemo } from "./ai-conversation-demo";

const benefits = [
  { index: "01", title: "金牌销售", description: "百万行业销售语料，订单轻松成交", image: "/service/ai-gold-sales.webp", alt: "AI 辅助外贸销售分析行业需求并推进成交", label: "行业知识库", signal: "实时辅助成交" },
  { index: "02", title: "经营助手", description: "海外热点/资讯推荐，助力对话破冰", image: "/service/ai-business-assistant.webp", alt: "销售借助海外资讯与国际客户视频沟通", label: "全球资讯雷达", signal: "今日热点已更新" },
  { index: "03", title: "私域专家", description: "客户生命周期管理，老客批量唤醒", image: "/service/ai-private-domain.webp", alt: "客户经理通过生命周期视图唤醒高潜老客", label: "客户生命周期", signal: "高潜老客已识别" },
] as const;

const details = [
  { number: "01", title: "24h秒回", description: "智能识别客户语种", icon: "language" },
  { number: "02", title: "千人千面", description: "销售进度一目了然", icon: "profile" },
  { number: "03", title: "一键建档", description: "不错过任何一个潜客", icon: "archive" },
  { number: "04", title: "数据安全", description: "守护您的隐私边界", icon: "shield" },
] as const;

function DetailIcon({ type }: { type: (typeof details)[number]["icon"] }) {
  if (type === "language") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h10M9 3v2m3 0c-.8 4-3.4 7-7 8" /><path d="M6.5 9.5c1.2 1.5 2.6 2.7 4.4 3.5M14 19l3-8 3 8m-5-3h4" /></svg>;
  if (type === "profile") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3" /><path d="M3 19c.8-3.3 2.5-5 5-5s4.2 1.7 5 5M15 7h6m-6 5h5m-4 5h4" /></svg>;
  if (type === "archive") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h5M16 16v4m-2-2h4" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
}

export function AiSalesWorkspace() {
  return (
    <section className={styles.section} id="service">
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.eyebrow}><span className={styles.eyebrowDot} />灵枢 AI 智能客服</div>
          <div className={styles.headerRow}>
            <h2>打通社媒获客的<span>最后一公里</span></h2>
            <p>不用守着多个平台等消息。灵枢 AI 能以客户的语言秒级回应，记住每一次沟通，并把询盘持续推进到真正需要销售出场的时刻。</p>
          </div>
        </header>
        <div className={styles.benefitGrid}>
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.title}>
              <div className={styles.imageWrap}>
                <Image src={benefit.image} alt={benefit.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 390px" className={styles.cardImage} />
                <div className={styles.imageShade} />
                <span className={styles.cardIndex}>{benefit.index}</span><span className={styles.imageLabel}>{benefit.label}</span>
                <div className={styles.signalBadge}><span />{benefit.signal}</div>
              </div>
              <div className={styles.cardContent}><h3>{benefit.title}</h3><p>{benefit.description}</p><div className={styles.cardRule} aria-hidden="true"><span /></div></div>
            </article>
          ))}
        </div>
        <div className={styles.detailPanel}>
          <div className={styles.detailHeading}><div><span className={styles.detailKicker}>从回应到推进</span><h3>AI 不只回复消息，还知道下一步该做什么</h3></div><p>识别语种、个性化推进、自动建档，并在敏感数据出现时守住隐私边界。</p></div>
          <div className={styles.detailGrid}>
            {details.map((detail) => <article className={styles.detailCard} key={detail.title}><div className={styles.detailTopline}><span className={styles.iconWrap}><DetailIcon type={detail.icon} /></span><span className={styles.detailNumber}>{detail.number}</span></div><h4>{detail.title}</h4><p>{detail.description}</p></article>)}
          </div>
        </div>
        <AiConversationDemo />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import styles from "../ai-conversation-demo.module.css";

const scenarios = [
  {
    id: "instant-reply",
    number: "01",
    tab: "24h 秒回",
    label: "智能识别语种",
    score: "74",
    customer: "مرحبًا، هل يمكنني الحصول على الكتالوج؟ وما هو الحد الأدنى للطلب والتوصيل إلى دبي؟",
    reply: "مرحبًا بك! بالتأكيد. 已识别阿语并记录迪拜市场信息。请告诉我所需产品和预计数量，我会先确认库存、起订量与交付周期。",
    insight: "阿语已识别 · 秒级接待",
    evidence: ["2 秒内响应", "已识别阿语", "咨询 MOQ 与交期"],
    action: "继续确认数量与交付时间",
  },
  {
    id: "personalized-followup",
    number: "02",
    tab: "千人千面",
    label: "销售进度一目了然",
    score: "82",
    customer: "The technical fit looks good. I need the OPC UA checklist, while purchasing needs the exact scope and finance wants the payback period.",
    reply: "我会分别准备三份重点内容：给你的 OPC UA 集成清单、给采购的报价范围对照，以及给财务的回报周期摘要。当前技术评估已完成，下一节点是财务复核。",
    insight: "按角色生成不同跟进内容",
    evidence: ["技术评估已通过", "采购已阅报价", "财务待复核"],
    action: "安排周五 ROI 评审",
  },
  {
    id: "lead-archive",
    number: "03",
    tab: "一键建档",
    label: "不错过任何一个潜客",
    score: "68",
    customer: "Olá, representamos distribuidores no Brasil. Pode enviar informações sobre parceria para lucas@atlas.example?",
    reply: "谢谢你，Lucas。已提取公司、所在区域和合作意向，完成重复检查，并将潜客 LEAD-2841 分配给拉美区域团队。请问你们目前覆盖哪些品类和年度业务量？",
    insight: "跨平台线索已完成建档",
    evidence: ["Instagram 私信", "公司邮箱已提取", "已完成去重"],
    action: "15 分钟内由拉美销售跟进",
  },
  {
    id: "data-safety",
    number: "04",
    tab: "数据安全",
    label: "守护您的隐私边界",
    score: "86",
    customer: "I will upload a spreadsheet with patient names and case IDs for the test. Can you load it here?",
    reply: "请不要在普通对话中上传患者姓名或其他身份信息。我们只需要匿名样本编号、必要字段和验收标准，并会引导你通过获批的安全通道完成验证。",
    insight: "敏感字段已识别并拦截",
    evidence: ["检测到患者标识", "附件未入库", "已提示脱敏"],
    action: "改用脱敏样本与安全通道",
  },
] as const;

export function AiConversationDemo() {
  const [activeId, setActiveId] = useState<(typeof scenarios)[number]["id"]>("instant-reply");
  const active = scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];

  return (
    <section className={styles.demo} aria-labelledby="conversation-demo-title">
      <header className={styles.demoHeading}>
        <div>
          <span>真实工作演示</span>
          <h3 id="conversation-demo-title">AI 不只回复消息，还知道下一步该做什么</h3>
        </div>
        <p>选择四个功能场景，查看灵枢如何识别语种、个性化推进、自动建档，并在敏感数据出现时守住隐私边界。</p>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.scenarioRail} aria-label="询盘场景">
          <div className={styles.railTitle}>
            <span>场景演示</span>
            <small>4 个功能场景</small>
          </div>
          <div className={styles.tabs}>
            {scenarios.map((scenario) => (
              <button
                type="button"
                key={scenario.id}
                className={scenario.id === active.id ? styles.activeTab : styles.tab}
                onClick={() => setActiveId(scenario.id)}
                aria-pressed={scenario.id === active.id}
              >
                <span className={styles.tabNumber}>{scenario.number}</span>
                <span><strong>{scenario.tab}</strong><small>{scenario.label}</small></span>
              </button>
            ))}
          </div>
        </aside>

        <div className={styles.conversation}>
          <div className={styles.conversationBar}>
            <div className={styles.contact}>
              <span className={styles.avatar}>{active.tab.slice(0, 1)}</span>
              <span><strong>{active.tab}</strong><small>海外客户 · 在线</small></span>
            </div>
            <span className={styles.liveStatus}><i />AI 正在接待</span>
          </div>

          <div className={styles.messages} key={active.id}>
            <div className={styles.time}>Today · 10:24</div>
            <div className={styles.customerMessage}>
              <span className={styles.messageMeta}>客户</span>
              <p>{active.customer}</p>
            </div>
            <div className={styles.aiMessage}>
              <div className={styles.aiMeta}><span className={styles.aiMark}>AI</span>灵枢智能客服</div>
              <p>{active.reply}</p>
              <div className={styles.translation}>已按客户语种、业务上下文与安全边界生成</div>
            </div>
          </div>

          <div className={styles.composer} aria-hidden="true">
            <span>输入回复，或让 AI 继续处理…</span>
            <button type="button" tabIndex={-1}>发送</button>
          </div>
        </div>

        <aside className={styles.insightPanel}>
          <div className={styles.insightTop}>
            <span>AI 实时判断</span>
            <i>LIVE</i>
          </div>
          <div className={styles.scoreRing}><strong>{active.score}</strong><span>机会评分</span></div>
          <h4>{active.insight}</h4>
          <ul>
            {active.evidence.map((item) => <li key={item}><span />{item}</li>)}
          </ul>
          <div className={styles.nextAction}><small>下一步动作</small><strong>{active.action}</strong><span>→</span></div>
        </aside>
      </div>
    </section>
  );
}

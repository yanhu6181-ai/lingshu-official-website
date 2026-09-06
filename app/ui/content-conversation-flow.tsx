export function ContentConversationFlow() {
  return (
    <div
      className="content-conversation-flow"
      role="img"
      aria-label="一条 Instagram 内容被客户点击后，灵枢记录来源并在 WhatsApp 中完成 AI 接待、意向判断和人工交接"
    >
      <div className="conversation-flow-grid" aria-hidden="true" />
      <div className="conversation-flow-glow conversation-flow-glow-a" aria-hidden="true" />
      <div className="conversation-flow-glow conversation-flow-glow-b" aria-hidden="true" />

      <div className="conversation-flow-topbar" aria-hidden="true">
        <div>
          <span className="platform-logo platform-instagram" />
          <strong>内容到客户</strong>
        </div>
        <span className="conversation-live"><i /> LIVE ATTRIBUTION</span>
      </div>

      <div className="conversation-flow-canvas" aria-hidden="true">
        <article className="source-content-card">
          <header>
            <div className="source-avatar">LS</div>
            <div>
              <strong>lingshu.global</strong>
              <span>Instagram · 刚刚发布</span>
            </div>
            <i>•••</i>
          </header>

          <div className="source-post-visual">
            <div className="source-post-orbit" />
            <div className="source-post-product">
              <span>AI</span>
              <strong>智能识别<br />采购意图</strong>
            </div>
            <div className="source-post-metric">
              <span>询盘转化</span>
              <strong>+31.6%</strong>
            </div>
            <b>01</b>
          </div>

          <div className="source-post-copy">
            <span>新品采购指南</span>
            <strong>客户问完价格后，下一步该怎么跟进？</strong>
            <div className="source-post-cta">
              <span className="platform-logo platform-whatsapp" />
              WhatsApp 咨询
              <i>↗</i>
            </div>
          </div>
        </article>

        <div className="conversation-morph-bridge">
          <div className="conversation-route"><i /><i /><i /></div>
          <div className="conversation-source-token">
            <span className="platform-logo platform-whatsapp" />
            <strong>来源已记录</strong>
            <small>CONTENT #0827</small>
          </div>
          <div className="conversation-data-chip chip-platform">Instagram</div>
          <div className="conversation-data-chip chip-intent">采购意向</div>
        </div>

        <article className="customer-context-panel">
          <header>
            <div>
              <span className="customer-avatar">A</span>
              <div>
                <strong>Alex Morgan</strong>
                <small>WhatsApp · 印度尼西亚</small>
              </div>
            </div>
            <span className="intent-score"><i /> 高意向 92</span>
          </header>

          <div className="customer-source-strip">
            <span className="platform-logo platform-instagram" />
            <div>
              <small>来源内容</small>
              <strong>新品采购指南 · #SOC-0827</strong>
            </div>
            <i>已归因</i>
          </div>

          <div className="customer-conversation">
            <div className="message message-customer">
              我们计划采购 300 件，可以先寄样品吗？
            </div>
            <div className="message message-ai">
              <span>AI</span>
              可以。请告诉我目标市场和预计交期，我会先为你确认样品与 MOQ。
            </div>
          </div>

          <div className="ai-context-card">
            <div className="ai-context-head">
              <span><i /> AI 意图判断</span>
              <strong>已完成</strong>
            </div>
            <div className="ai-context-row">
              <span>采购需求</span>
              <b>300 件 · 样品 · MOQ</b>
            </div>
            <div className="ai-context-row">
              <span>建议动作</span>
              <b>确认交期后转销售</b>
            </div>
          </div>

          <footer>
            <span>AI 继续接待</span>
            <strong>转人工跟进 ↗</strong>
          </footer>
        </article>
      </div>

      <div className="conversation-flow-footer" aria-hidden="true">
        <span><i /> 内容来源已同步</span>
        <span>响应 1.2s</span>
        <span>完整上下文已建立</span>
      </div>
    </div>
  );
}

export function HumanHandoffFlow() {
  return (
    <div
      className="human-handoff-flow"
      role="img"
      aria-label="AI 接待客户时命中企业知识，检测到报价越权后暂停发送，并把来源、摘要和建议动作完整交给销售"
    >
      <div className="handoff-flow-grid" aria-hidden="true" />
      <div className="handoff-flow-orbit" aria-hidden="true" />

      <div className="handoff-flow-header" aria-hidden="true">
        <div>
          <span className="handoff-mascot" />
          <div>
            <strong>灵枢 AI 正在接待</strong>
            <small>WhatsApp · Alex Morgan</small>
          </div>
        </div>
        <span className="handoff-safe-mode"><i /> SAFE MODE</span>
      </div>

      <div className="handoff-chat" aria-hidden="true">
        <div className="handoff-customer-message">
          300 件先发样品，价格还能再优惠 10% 吗？
          <small>10:42</small>
        </div>
        <div className="handoff-draft-message">
          <span>AI 草稿</span>
          我可以先为你确认样品与交期。关于额外折扣……
          <i />
        </div>
      </div>

      <div className="handoff-decision-rail" aria-hidden="true">
        <article className="handoff-check is-knowledge">
          <span>01</span>
          <div>
            <small>企业知识命中</small>
            <strong>标准样品流程 · MOQ 500</strong>
          </div>
          <i>✓</i>
        </article>
        <div className="handoff-connector"><i /></div>
        <article className="handoff-check is-risk">
          <span>02</span>
          <div>
            <small>风险边界检测</small>
            <strong>折扣超出 AI 授权范围</strong>
          </div>
          <i>!</i>
        </article>
        <div className="handoff-connector"><i /></div>
        <article className="handoff-check is-paused">
          <span>03</span>
          <div>
            <small>发送动作</small>
            <strong>草稿已暂停，等待销售确认</strong>
          </div>
          <i>Ⅱ</i>
        </article>
      </div>

      <div className="sales-handoff-card" aria-hidden="true">
        <div className="sales-handoff-top">
          <span className="sales-avatar">林</span>
          <div>
            <small>交给销售负责人</small>
            <strong>Lin · 海外销售</strong>
          </div>
          <i>上下文已同步</i>
        </div>

        <div className="sales-context-summary">
          <div>
            <small>客户摘要</small>
            <strong>印尼采购商 · 300 件 · 需要样品</strong>
          </div>
          <div>
            <small>风险原因</small>
            <strong>客户要求额外 10% 折扣</strong>
          </div>
        </div>

        <div className="sales-handoff-actions">
          <span>查看完整对话</span>
          <strong>接管会话 ↗</strong>
        </div>
      </div>

      <div className="handoff-flow-footer" aria-hidden="true">
        <span><i /> AI 未发送越权内容</span>
        <span>来源 · 历史 · 摘要 · 建议动作</span>
      </div>
    </div>
  );
}

import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export function LegalDocument({
  eyebrow,
  title,
  summary,
  updated = "2026 年 8 月 24 日",
  sections,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updated?: string;
  sections: LegalSection[];
}) {
  return (
    <main className="legal-page">
      <div className="container legal-layout">
        <aside className="legal-nav" aria-label={`${title}目录`}>
          <Link className="legal-back" href="/legal">← 法律与信任中心</Link>
          <strong>本页目录</strong>
          <nav>
            {sections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-shell">
          <header className="legal-hero">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p className="legal-summary">{summary}</p>
            <div className="legal-meta">
              <span>生效及更新日期</span>
              <strong>{updated}</strong>
            </div>
          </header>

          <div className="legal-notice">
            <strong>快速说明</strong>
            <p>我们以清晰、必要和可核验为原则处理信息。本页适用于灵枢 AI 官方网站、产品服务及经授权的第三方平台接入。</p>
          </div>

          {sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <div className="legal-section-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2>{section.title}</h2>
                <div className="legal-copy">{section.content}</div>
              </div>
            </section>
          ))}

          <footer className="legal-contact-card">
            <div>
              <span>仍有问题？</span>
              <h2>联系我们</h2>
              <p>隐私、数据权利或服务条款相关请求，请在邮件主题中注明具体事项。</p>
            </div>
            <a href="mailto:19653282176@163.com?subject=灵枢 AI 法律与隐私咨询">19653282176@163.com ↗</a>
          </footer>
        </article>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "法律与信任中心", description: "查看灵枢 AI 的隐私、数据删除、服务、Cookie 与商务透明信息。" };

const cards = [
  ["隐私政策", "了解我们收集哪些信息、为何处理、保存多久，以及你如何行使数据权利。", "/privacy", "PRIVACY"],
  ["用户数据删除说明", "撤销 Meta 授权，并请求删除灵枢 AI 保存的账号、平台授权和相关数据。", "/data-deletion", "DATA"],
  ["服务条款", "了解服务范围、平台授权、AI 内容责任、知识产权、取消与退款安排。", "/terms", "TERMS"],
  ["Cookie 与追踪技术", "查看当前网站使用的必要技术，以及 Meta/TikTok 广告衡量工具的启用原则。", "/cookies", "COOKIES"],
  ["可接受使用政策", "了解创意生成、肖像声音、知识产权、欺骗性内容及平台投放的使用边界。", "/acceptable-use", "SAFETY"],
] as const;

export default function LegalCenterPage() {
  return (
    <main className="trust-page">
      <section className="container trust-grid" aria-label="法律文件">
        {cards.map(([title, description, href, label], index) => (
          <Link href={href} key={href}>
            <span>{label} · 0{index + 1}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <b>查看完整文件 ↗</b>
          </Link>
        ))}
      </section>
      <section className="container trust-disclosure">
        <div><span className="eyebrow">BUSINESS DISCLOSURE</span><h2>商务与平台声明</h2></div>
        <div><p><strong>运营主体</strong>灵小枢（杭州）科技有限公司，法定代表人：武小婕。注册地址：浙江省杭州市上城区宽桥街道水墩社区水墩北路 1 号产业区 5 幢 207-7 室。</p><p><strong>业务模式</strong>官网用于产品介绍与预约企业演示，不要求访客付费后才能访问主要内容。</p><p><strong>第三方关系</strong>Meta、TikTok、Instagram、YouTube、Facebook、WhatsApp 等名称与标识归各自权利人所有；除非明确说明，不构成赞助、隶属或背书。</p><p><strong>审核说明</strong>我们提供合规工作流与辅助能力，但不承诺广告、账号、素材或业务一定通过任何第三方平台审核。</p></div>
      </section>
    </main>
  );
}

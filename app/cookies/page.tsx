import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "../ui/legal-document";

export const metadata: Metadata = { title: "Cookie 与追踪技术说明", description: "灵枢 AI 官方网站当前使用 Cookie、日志及广告追踪技术的说明。" };

const sections: LegalSection[] = [
  { id: "current", title: "当前使用情况", content: <><p>当前公开网站未主动部署 Meta Pixel、TikTok Pixel、Google Analytics 或用于跨网站定向广告的第三方追踪 Cookie。访问网站时，托管与安全基础设施仍可能处理必要的网络请求信息，以传输页面、防止滥用和排查故障。</p><p>预约体验功能会在你的设备上生成发送至我们业务邮箱的邮件草稿。只有你在邮件客户端确认发送后，内容才会通过你的邮件服务商发送；本网站不会在生成草稿时把表单内容提交到网站数据库或第三方表单服务。</p></> },
  { id: "types", title: "技术类别", content: <ul><li><strong>严格必要技术：</strong>用于页面传输、安全、防欺诈、负载和故障诊断；</li><li><strong>偏好技术：</strong>用于记住语言或界面选择；当前网站未主动设置此类 Cookie；</li><li><strong>统计技术：</strong>用于汇总了解访问和功能表现；当前网站未部署独立统计工具；</li><li><strong>广告技术：</strong>用于归因、受众或再营销；当前网站未部署。</li></ul> },
  { id: "future", title: "未来启用广告衡量时", content: <p>如果未来启用 Meta Pixel、TikTok Pixel 或类似技术，我们会先更新本说明与隐私政策，明确提供商、目的、数据类型和保存期限，并在适用法律要求时提供同意、拒绝或撤回入口。不会在声明尚未更新时把“未使用”表述用于已经启用的技术。</p> },
  { id: "control", title: "你的控制方式", content: <p>你可以通过浏览器设置查看、限制或删除 Cookie，并使用浏览器或设备提供的追踪保护功能。阻止严格必要技术可能导致页面、表单或安全功能无法正常工作。若未来增加独立偏好中心，本页会同步提供入口。</p> },
  { id: "contact", title: "联系我们", content: <p>如需了解某次访问涉及的技术或供应商，请发送邮件至 <a href="mailto:19653282176@163.com">19653282176@163.com</a>，并提供访问时间、页面和浏览器类型；请勿发送完整 IP 地址或其他不必要的敏感信息。</p> },
];

export default function CookiesPage() {
  return <LegalDocument eyebrow="COOKIES" title="Cookie 与追踪技术" summary="透明说明当前网站用了什么、没用什么，以及未来增加广告衡量能力时会如何告知。" updated="2026 年 9 月 4 日" sections={sections} />;
}

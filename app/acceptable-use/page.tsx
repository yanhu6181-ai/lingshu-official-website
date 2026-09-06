import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "../ui/legal-document";

export const metadata: Metadata = { title: "可接受使用政策", description: "灵枢 AI 的内容安全、权利授权与平台合规使用边界。" };
const sections: LegalSection[] = [
  { id: "principles", title: "基本原则", content: <p>你应以合法、真实、尊重他人权利且符合投放平台规则的方式使用灵枢 AI。AI 生成或辅助内容在发布前必须由具备判断能力的人员审核。</p> },
  { id: "rights", title: "肖像、声音与知识产权", content: <ul><li>仅上传、改编或生成你拥有权利或已取得充分授权的素材；</li><li>使用真人肖像、声音、姓名或身份特征前取得明确、可验证的许可；</li><li>不得仿冒名人、客户、竞品或其他主体，不得误导受众认为其作出背书；</li><li>尊重商标、著作权、隐私权、名誉权及平台素材规则。</li></ul> },
  { id: "prohibited", title: "禁止内容与行为", content: <ul><li>违法、欺诈、仇恨、骚扰、剥削未成年人或鼓励暴力、自残的内容；</li><li>未经同意的深度合成、身份冒用、虚假见证或伪造新闻；</li><li>规避平台审核、隐藏真实落地页、恶意跳转或其他规避执法行为；</li><li>恶意代码、凭据窃取、大规模垃圾信息或侵犯他人数据安全的行为。</li></ul> },
  { id: "regulated", title: "敏感与受监管领域", content: <p>政治、选举、医疗、金融、就业、住房、未成年人及其他受监管领域需要额外审查。除非已确认当地法律、必要资质、披露和平台政策要求，不得使用本服务制作或投放相关内容。</p> },
  { id: "ads", title: "广告与平台责任", content: <p>客户应确保广告主身份、报价、落地页、隐私披露、追踪技术和素材表达真实一致。灵枢 AI 不保证任何广告、账户或素材通过 Meta、TikTok 或其他平台审核，也不协助规避审核。</p> },
  { id: "enforcement", title: "审查、限制与申诉", content: <p>为保护用户、第三方及平台生态，我们可对疑似违规请求进行人工复核，拒绝生成、限制功能、暂停服务或依法保存并披露必要记录。若你认为处置有误，可通过本页邮箱提交说明与权利证明。</p> },
];
export default function AcceptableUsePage() { return <LegalDocument eyebrow="SAFETY" title="可接受使用政策" summary="明确 AI 创意、真人数字形象、广告投放与平台接入的安全及权利边界。" sections={sections} />; }

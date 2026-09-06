import type { Metadata } from "next";
import "./styles/fonts.css";
import { PageChrome } from "./ui/page-chrome";
import "./globals.css";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/motion.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://official.lingshu.site"),
  title: {
    default: "灵枢 AI｜企业出海社媒增长 Agent",
    template: "%s｜灵枢 AI",
  },
  description:
    "面向品牌、工厂及各类出海企业，以企业专属知识库与 Agent 工作流贯通市场洞察、内容策划、规模化创作、多平台分发与增长复盘。",
  icons: {
    icon: "/brand-logo-v2.png",
    shortcut: "/brand-logo-v2.png",
    apple: "/brand-logo-v2.png",
  },
  openGraph: {
    title: "从追逐流量，到自带引力｜灵枢 AI",
    description:
      "企业出海社媒增长 Agent，贯通市场洞察、内容创作、多平台分发与增长复盘。",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og.png",
        width: 1732,
        height: 908,
        alt: "灵枢 AI 企业出海社媒增长 Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "从追逐流量，到自带引力｜灵枢 AI",
    description: "企业出海社媒增长 Agent，贯通市场洞察、内容创作、多平台分发与增长复盘。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className="lingshu-fonts"
    >
      <body className="lingshu-body">
        <PageChrome>{children}</PageChrome>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { DemoExperience } from "./demo-experience";

export const metadata: Metadata = {
  title: "预约演示",
  description:
    "预约灵枢 AI 产品演示，了解社媒增长、智能客服与 AI 智囊如何适配你的出海业务。",
};

export default function DemoPage() {
  return <DemoExperience />;
}

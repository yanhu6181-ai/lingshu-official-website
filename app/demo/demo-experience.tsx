"use client";

import { FormEvent, useState } from "react";

type DemoExperienceProps = {
  english?: boolean;
};

export function DemoExperience({ english = false }: DemoExperienceProps) {
  const [draftOpened, setDraftOpened] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("website")) return;
    const body = [
      `姓名 / Name: ${form.get("name")}`,
      `公司 / Company: ${form.get("company")}`,
      `邮箱 / Email: ${form.get("email")}`,
      `手机 / WhatsApp: ${form.get("phone")}`,
      `平台 / Platforms: ${form.getAll("platforms").join(", ")}`,
      `需求 / Need: ${form.get("primaryNeed")}`,
      `隐私同意 / Privacy consent: ${form.get("privacyConsent") === "yes" ? "Yes" : "No"}`,
      `产品动态 / Marketing consent: ${form.get("marketingConsent") === "yes" ? "Yes" : "No"}`,
      `来源 / Source: ${window.location.origin}${window.location.pathname}`,
    ].join("\n");
    const subject = english ? "LingShu AI demo request" : "预约灵枢 AI 产品演示";
    window.location.href = `mailto:19653282176@163.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  const privacyHref = english ? "/en/privacy" : "/privacy";
  const termsHref = english ? "/en/terms" : "/terms";

  return (
    <main className="demo-page" lang={english ? "en" : "zh-CN"}>
      <section className="section booking-section booking-section-primary" id="booking">
        <div className="container booking-grid">
          <div data-reveal>
            <span className="eyebrow">{english ? "BOOK A DEMO" : "预约演示"}</span>
            <h2>{english ? "See LingShu AI with your own workflow" : "想用你的产品试一次？"}</h2>
            <p>{english ? "Tell us about your channels, lead-handling workflow and primary challenge. We will prepare a product-specific demonstration." : "告诉我们当前的社媒平台、客户接待方式和最想解决的问题。我们会围绕你的真实业务准备演示。"}</p>
            <div className="booking-points">
              <span>01 · {english ? "A demo prepared around your product" : "根据你的产品准备演示"}</span>
              <span>02 · {english ? "Clear platform access requirements" : "明确平台接入条件"}</span>
              <span>03 · {english ? "Human-controlled AI permissions" : "共同确认 AI 权限边界"}</span>
            </div>
          </div>

            <form className="booking-form" data-reveal onSubmit={submit}>
              <input className="form-honey" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label>{english ? "Name" : "姓名"}<input name="name" required placeholder={english ? "Your name" : "如何称呼你"} autoComplete="name" maxLength={80} /></label>
              <label>{english ? "Company" : "公司"}<input name="company" required placeholder={english ? "Company or brand" : "公司或品牌名称"} autoComplete="organization" maxLength={120} /></label>
              <label>{english ? "Business email" : "联系邮箱"}<input name="email" type="email" required placeholder="name@company.com" autoComplete="email" maxLength={160} /></label>
              <label>{english ? "Phone / WhatsApp" : "手机 / WhatsApp"}<input name="phone" required placeholder="+86 / +1 ..." autoComplete="tel" maxLength={80} /></label>
              <fieldset>
                <legend>{english ? "Primary platforms" : "当前主要平台"}</legend>
                <div className="choice-grid">
                  {["TikTok", "Instagram", "YouTube", "Facebook", "WhatsApp"].map((item) => (
                    <label key={item}><input type="checkbox" name="platforms" value={item} /><span>{item}</span></label>
                  ))}
                </div>
              </fieldset>
              <label>
                {english ? "Primary challenge" : "最想解决的问题"}
                <select name="primaryNeed" required defaultValue="">
                  <option value="" disabled>{english ? "Select one" : "请选择"}</option>
                  <option value="creative">{english ? "Creative production" : "内容创作"}</option>
                  <option value="distribution">{english ? "Multi-platform distribution" : "多平台发布"}</option>
                  <option value="service">{english ? "AI lead handling" : "智能客服"}</option>
                  <option value="follow-up">{english ? "Sales follow-up" : "客户跟进"}</option>
                </select>
              </label>
              <label className="form-consent">
                <input type="checkbox" name="privacyConsent" value="yes" required />
                <span>{english ? "I have read and agree to the " : "我已阅读并同意"}<a href={privacyHref} target="_blank">{english ? "Privacy Policy" : "《隐私政策》"}</a>{english ? " and " : "和"}<a href={termsHref} target="_blank">{english ? "Terms of Service" : "《服务条款》"}</a>{english ? ". LingShu AI may process the information I submit to respond to this request." : "，同意灵枢 AI 为回复本次咨询处理我提交的信息。"}</span>
              </label>
              <label className="form-consent">
                <input type="checkbox" name="marketingConsent" value="yes" />
                <span>{english ? "Optional: I agree to receive occasional product and service updates. I may unsubscribe at any time." : "可选：我愿意接收产品与服务动态，并可随时退订。"}</span>
              </label>
              <p className="form-note">{english ? "This form opens a draft in your email app. Please send it there to complete your request. You can also email " : "填写后将打开邮件草稿，请在邮件应用中点击发送完成预约。也可直接发邮件至 "}<a href="mailto:19653282176@163.com">19653282176@163.com</a>。</p>
              {draftOpened && <p role="status">{english ? "Email draft requested. Your request has not been sent yet. If no email app opened, send your details to the address above." : "已尝试打开邮件草稿，预约尚未发送。请在邮件应用中确认并发送；如果没有打开，请使用上方邮箱直接联系。"}</p>}
              <button className="button button-primary form-submit" type="submit">
                {english ? "Open email draft ↗" : "生成预约邮件 ↗"}
              </button>
            </form>
        </div>
      </section>
    </main>
  );
}

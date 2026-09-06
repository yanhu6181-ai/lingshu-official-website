import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "../brand-homepage.module.css";
import { AiServiceExperience } from "../ai-service/ai-service-experience";
import { SocialGrowthExperience } from "../social/social-growth-experience";
import { HeroOrbitGallery } from "./hero-orbit-gallery";
import { HeroSeamlessVideo } from "./hero-seamless-video";
import { HomepageEntrance } from "./homepage-entrance";

const platformMarks = [
  ["TikTok", "/platform-color-tiktok.svg"],
  ["Instagram", "/platform-color-instagram.svg"],
  ["YouTube", "/platform-color-youtube.svg"],
  ["Facebook", "/platform-color-facebook.svg"],
  ["WhatsApp", "/platform-whatsapp.svg"],
  ["Shopify", "/platform-shopify.svg"],
] as const;

export function BrandHomepage() {
  return (
    <HomepageEntrance>
    <main className={styles.page}>
      <section className={styles.heroStage} id="home" aria-labelledby="brand-hero-title">
        <div className={styles.cinemaFrame}>
          <HeroSeamlessVideo />

          <div className={styles.videoTreatment} aria-hidden="true" />

          <header className={styles.brandBar}>
            <Link className={styles.brand} href="/" aria-label="灵枢 AI 首页">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand-logo-v2.png" alt="" width="38" height="38" />
              <span>灵枢 AI</span>
            </Link>
            <nav className={styles.heroNav} aria-label="首页导航">
              <a href="#home">首页</a>
              <a href="#growth">Agent 工作流</a>
              <a href="#service">智能客服</a>
              <a href="#product">增长链路</a>
              <a className={styles.navAction} href="mailto:19653282176@163.com?subject=预约灵枢 AI 产品演示">
                预约演示
              </a>
            </nav>
          </header>

          <div className={styles.hero}>
            <p className={styles.eyebrow}>企业出海 · 社媒增长 Agent</p>
            <h1 id="brand-hero-title" aria-label="从追逐流量，到自带引力">
              {["从追逐流量，", "到自带引力"].map((line, lineIndex) => (
                <span key={line} aria-hidden="true">
                  {Array.from(line).map((character, index) => <span className={styles.heroTitleCharacter} key={index} style={{ "--character-index": lineIndex * 6 + index } as CSSProperties}>{character}</span>)}
                </span>
              ))}
            </h1>
            <p className={styles.summary}>
              基于企业专属知识库与 Agent 工作流，贯通市场洞察、内容策划、规模化创作、多平台分发与增长复盘。
            </p>
            <div className={styles.heroActions}>
              <a className={styles.heroAction} href="mailto:19653282176@163.com?subject=预约灵枢 AI 产品演示">
                预约产品演示 <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>

        </div>
      </section>

      <section className={styles.orbitSection} id="content-ecosystem" aria-labelledby="orbit-title">
        <header className={styles.orbitSectionHeader} data-reveal>
          <span>CONTENT ECOSYSTEM</span>
          <h2 id="orbit-title">一条内容，连接每一个增长触点</h2>
          <p>从机会发现、品牌内容生成到客户持续运营，让每一个环节自然接续。</p>
        </header>
        <HeroOrbitGallery />
      </section>

      <section className={styles.ecosystemBar} aria-label="支持的平台生态" data-reveal>
        <div>
          {platformMarks.map(([name, image]) => (
            <span key={name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" />
              <b>{name}</b>
            </span>
          ))}
        </div>
      </section>

      <SocialGrowthExperience embedded />
      <AiServiceExperience embedded />

      <section className={styles.closingCover} id="contact" aria-labelledby="closing-title">
        <header className={styles.closingBrand}>
          <Link href="/" aria-label="灵枢 AI 首页">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand-logo-v2.png" alt="" width="38" height="38" />
            <span>灵枢 AI</span>
          </Link>
          <span>LINGSHU AI · 2026</span>
        </header>

        <div className={styles.closingContent} data-reveal>
          <h2 id="closing-title">
            灵枢 AI，
            <strong>助力四海生意</strong>
          </h2>
          <p>从爆款内容增长到询盘承接，体验灵枢 AI 如何连接整条海外获客链路。</p>
          <div>
            <a className={styles.closingAction} href="mailto:19653282176@163.com?subject=预约灵枢 AI 产品演示">
              预约产品演示 <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>

        <footer className={styles.closingFooter}>
          <span>© 2026 灵小枢（杭州）科技有限公司</span>
          <nav aria-label="页尾导航">
            <a href="/legal">法律与信任</a>
            <a href="/privacy">隐私政策</a>
            <a href="/data-deletion">数据删除</a>
            <a href="/terms">服务条款</a>
          </nav>
        </footer>
      </section>
    </main>
    </HomepageEntrance>
  );
}

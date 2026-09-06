"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Logo() {
  return (
    <Link className="brand" href="/" aria-label="灵枢 AI 首页">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src="/brand-logo-v2.png" alt="" width="42" height="42" />
      <span>灵枢 AI</span>
    </Link>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="主页导航">
          <Link href="/#growth">爆款增长</Link>
          <Link href="/#service">询盘承接</Link>
          <Link href="/#contact">预约演示</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Logo />
          <p>从追逐流量，到自带引力。</p>
          <span className="footer-status"><i /> 产品持续迭代中</span>
        </div>
        <div>
          <strong>产品</strong>
          <Link href="/#growth">爆款增长</Link>
          <Link href="/#service">AI 客服</Link>
          <Link href="/#contact">申请体验</Link>
        </div>
        <div>
          <strong>法律</strong>
          <Link href="/legal">法律与信任中心</Link>
          <Link href="/privacy">隐私政策</Link>
          <Link href="/data-deletion">数据删除说明</Link>
          <Link href="/terms">服务条款</Link>
          <Link href="/cookies">Cookie 说明</Link>
          <Link href="/acceptable-use">内容安全政策</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 灵小枢（杭州）科技有限公司 · 19653282176@163.com</span>
        <span>市场洞察 · 规模创作 · 多平台分发 · 增长复盘</span>
      </div>
    </footer>
  );
}

export function PageChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {!isHome && <Header />}
      <div className={"page-transition" + (isHome ? " home-page-transition" : "")} key={pathname}>
        {children}
      </div>
      {!isHome && <Footer />}
    </>
  );
}

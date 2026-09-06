import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

function readBuiltPage(name = "index") {
  return readFile(new URL(`../.next/server/app/${name}.html`, import.meta.url), "utf8");
}

test("builds the completed brand homepage", async () => {
  const html = await readBuiltPage();

  assert.match(html, /<title>灵枢 AI｜让海外内容持续变成高价值商机<\/title>/);
  assert.match(html, /让内容持续触达/);
  assert.match(html, /让高价值商机不再掉线/);
  assert.match(html, /爆款增长/);
  assert.match(html, /客户随时来/);
  assert.match(html, /商机始终有人接/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("keeps the completed homepage modules responsive and motion-accessible", async () => {
  const [homepage, homepageCss, growth, growthCss, sales, salesCss] = await Promise.all([
    readFile(new URL("../app/ui/brand-homepage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/brand-homepage.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/ui/viral-growth-engine.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/viral-growth-engine.module.css", import.meta.url), "utf8"),
    readFile(new URL("../app/ui/ai-sales-workspace.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ai-sales-workspace.module.css", import.meta.url), "utf8"),
  ]);

  assert.match(homepage, /product-ui\/viral-discovery\.png/);
  assert.match(homepage, /<ViralGrowthEngine \/>/);
  assert.match(homepage, /<AiSalesWorkspace \/>/);
  assert.match(growth, /id="discovery"/);
  assert.match(growth, /id="growth"/);
  assert.match(sales, /id="service"/);
  assert.match(homepageCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(growthCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(salesCss, /@media \(prefers-reduced-motion: reduce\)/);
});

test("builds the merged legal and privacy pages", async () => {
  const [legal, privacy, dataDeletion, terms, cookies, acceptableUse] = await Promise.all([
    readBuiltPage("legal"),
    readBuiltPage("privacy"),
    readBuiltPage("data-deletion"),
    readBuiltPage("terms"),
    readBuiltPage("cookies"),
    readBuiltPage("acceptable-use"),
  ]);

  assert.match(legal, /法律与信任中心/);
  assert.match(privacy, /隐私政策/);
  assert.match(privacy, /Meta 平台数据的使用/);
  assert.match(dataDeletion, /用户数据删除说明/);
  assert.match(dataDeletion, /撤销 Meta 授权/);
  assert.match(terms, /服务条款/);
  assert.match(cookies, /Cookie 与追踪技术/);
  assert.match(acceptableUse, /可接受使用政策/);
});

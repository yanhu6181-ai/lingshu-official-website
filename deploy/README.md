# 当前生产部署：EdgeOne Pages / Makers

- 项目：`lingshu-official-web`（`makers-yslaap8yrhnu`）
- 域名：`https://official.lingshu.site`
- 当前采用直接上传，不会随 GitHub main 推送自动更新。
- 执行 `npm run build:edgeone`，将 `out/` 的内容打包（ZIP 根目录包含 index.html）上传到现有项目的新建生产部署。
- 此构建在 `work/edgeone-static` 中隔离执行，不改变普通 Next.js 构建；不打包 API、数据库、环境变量或源码。
- 使用系统中文字体栈，构建不依赖 Google Fonts 网络连接，并减少 EdgeOne 上传文件数。
- 预约页生成发送至 `19653282176@163.com` 的邮件草稿；用户需在自己的邮件应用中确认发送。网站不会声称已收到预约。
- 发布后检查首页、`/social/`、`/ai-service/`、`/demo/`、法律页面与 `release.json`。
- 保留控制台已有部署，方便回滚。不要修改现有域名解析。

## 可选：自有服务器部署（当前未使用）

1. 将 `official.lingshu.site` 的 DNS A/AAAA 记录指向服务器。
2. 在项目根目录创建 `.env`，设置强随机值：`POSTGRES_PASSWORD=...`。
3. 将有效证书保存为 `deploy/certs/fullchain.pem` 与 `deploy/certs/privkey.pem`。
4. 执行 `docker compose up -d --build`。迁移服务会先创建/更新数据库结构，再启动应用。
5. 检查 `https://official.lingshu.site/api/health` 返回 `{"status":"ok"}`。

仅对公网开放 TCP 80/443；不要开放 3000 或 5432。生产环境应由证书自动续期工具管理证书，并配置异地加密数据库备份、日志轮转和可用性监控。

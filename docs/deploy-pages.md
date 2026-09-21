# GitHub Pages 启用指南（5 步）

本仓库已经为 Pages 部署做好配置。本指南只需要你**在 GitHub 网页上点几下**，无需任何命令行操作。

## 准备工作（已完成 ✅）

- [x] `index.html` —— 根路径自动跳转到讲义首页
- [x] `.nojekyll` —— 关闭 Jekyll，避免 KaTeX 资源被过滤
- [x] `404.html` —— 中文路径偶发 404 时回落
- [x] 仓库目录结构保持原样：`速成教材/` 子目录完整保留

## 5 步启用

1. 打开你 fork 的仓库页面，例如 `https://github.com/<你的用户名>/mathA-crash-course`
2. 顶部菜单点 **Settings**（⚙️ 图标）
3. 左侧栏找到 **Pages**
4. 在 **Build and deployment → Source** 选择：
   - **Deploy from a branch**
   - **Branch**：`main`
   - **Folder**：`/ (root)`
5. 点 **Save**

## 等待 + 验证

GitHub 会花 **30 秒 ~ 2 分钟**构建并发布。完成后页面顶部会显示一行绿色的：

> Your site is live at `https://<你的用户名>.github.io/mathA-crash-course/`

打开这个链接，应该**自动跳转到讲义首页**（`/速成教材/index.html`）。

## 常见问题

**Q：打开根 URL 后看到的是 README，不是讲义？**
A：浏览器缓存了。硬刷新（Ctrl+Shift+R / Cmd+Shift+R）。或者等待 2 分钟让 CDN 刷新。

**Q：跳转到 `/速成教材/...` 后中文路径显示乱码？**
A：现代浏览器都会自动处理。如有问题，用 URL 编码版本：
`https://<你的用户名>.github.io/mathA-crash-course/%E9%80%9F%E6%88%90%E6%95%99%E6%9D%90/index.html`

**Q：KaTeX 公式没渲染？**
A：首次访问需要联网（KaTeX 从 jsDelivr CDN 加载）。也可以 Cmd/Ctrl+S 整页保存一次，离线也能看。

**Q：进度勾选不保存？**
A：进度存在浏览器 `localStorage`，换设备/换浏览器会重置。这是设计如此，不影响内容阅读。

## 后续可选

- 想换主题色？编辑 `速成教材/assets/style.css` 顶部变量
- 想加自定义域名？Settings → Pages → Custom domain
- 想关掉 Pages？Settings → Pages → Source → None
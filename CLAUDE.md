# CLAUDE.md

> 给未来访问本仓库的 AI 助手看的项目说明。读完这一页应当能上手所有常见任务。

## 项目快览

- **是什么**：个人中文技术教程站，主题是 Claude Code、Scoop、tmux 等命令行工具的入门 / 常用操作
- **目标读者**：代码小白 / 命令行新手
- **技术栈**：VitePress 1.x + GitHub Pages + GitHub Actions 自动部署
- **线上地址**：https://12306le.github.io/notes/
- **仓库**：https://github.com/12306le/notes
- **作者本机工作目录（如果在原作者机器上）**：`C:\Users\fine8\my-docs\`

## 在新机器 / 新会话上接手（重点 ⭐）

用户的常规用法是：**换电脑或开新会话时让 AI 直接克隆仓库改完再推回去**。下面是完整流程：

```bash
# 1. 装好基础工具（如未装）
#    Node 20+、git、gh

# 2. 登录 GitHub CLI（首次）
gh auth login                              # 走浏览器授权
gh auth refresh -h github.com -s workflow  # 加上 workflow scope，否则改 .github/workflows/* 推不上去
gh auth setup-git                          # 把 gh 注册为 git 凭证 helper（避免 push 时弹 /dev/tty 卡死）

# 3. 克隆
gh repo clone 12306le/notes
cd notes

# 4. 装依赖
npm install

# 5. （仅中国大陆 / 网络受限环境需要）配 git 代理
#    举例 Clash 默认端口 7890：
git config http.proxy http://127.0.0.1:7890
git config https.proxy http://127.0.0.1:7890
#    用户用的是 Clash 系列代理，端口 7890

# 6. 之后随便改 / npm run dev 预览 / git push
```

## 目录结构

```
.
├── .vitepress/config.mts   ← 站点配置（导航/侧边栏/标题）
├── .github/workflows/
│   └── deploy.yml          ← 自动部署工作流（push 到 main 触发）
├── index.md                ← 首页（hero + 三卡片）
├── README.md               ← GitHub 仓库展示用，不会出现在站点里
├── _*.md                   ← 下划线开头的文件不会被 VitePress 渲染（个人草稿）
├── claude-code/            ← Claude Code 相关教程
├── scoop/                  ← Scoop 相关教程
└── tmux/                   ← tmux 相关教程
```

## 写作风格约定

- **视角**：代码小白，假设读者刚接触命令行
- **结构**：先讲概念 / 原理（"为什么这么做"），再给完整命令示例，最后列常见踩坑
- **命名**：入门叫 `basic.md`，命令速查叫 `commands.md`，单一主题用语义名（如 `update.md`、`migration.md`）
- **环境**：所有命令以 Windows 11 + bash（Git Bash / WSL）为准

## 加新文章的标准流程

例如要加一篇 "Git 入门"：

### 1. 新建文件

```
git/basic.md
```

按现有文章的风格写（**强烈建议先读 `tmux/basic.md` 和 `scoop/update.md` 摸清楚风格再下笔**）。

### 2. 改 `.vitepress/config.mts`——两处都要改

- **`nav` 里"教程"下拉**——增加一组：
  ```ts
  {
    text: 'Git',
    items: [
      { text: '基本操作', link: '/git/basic' }
    ]
  }
  ```
- **`sidebar`**——增加一项：
  ```ts
  '/git/': [
    {
      text: 'Git',
      items: [
        { text: '基本操作', link: '/git/basic' }
      ]
    }
  ]
  ```

### 3. 本地预览（可选）

```bash
npm run dev
# 打开 http://localhost:5173/，确认导航和侧边栏都能点到新文章
```

### 4. 提交并推送

```bash
git add .
git commit -m "feat: 加入 Git 基本操作教程"
git push
```

### 5. 验证部署

```bash
gh run list --repo 12306le/notes --limit 1
gh run watch <run-id> --exit-status
```

通常 1-2 分钟完成。完成后访问对应页面（如 https://12306le.github.io/notes/git/basic ）验证。

## 配置上的几个固定点（别乱动）

- **`base: '/notes/'`** —— 因为部署在 GitHub Pages 子路径。改仓库名时记得同步改这里。
- **`srcExclude: ['**/README.md', '**/_*.md']`** —— 屏蔽辅助文件不被当成页面。
- **GitHub Pages 已配为 "GitHub Actions" 模式**（仓库 Settings → Pages），不要改回 "Deploy from a branch"。
- **`.github/workflows/deploy.yml`** —— Node 20。2026年9月之后 Actions runner 会移除 Node 20，到时改成 22 或 24。

## 常见坑

| 现象 | 原因 | 解法 |
| --- | --- | --- |
| `git push` 一直挂着没输出 | git 想交互式让用户输用户名密码（fatal: could not read Username for ... /dev/tty） | `gh auth setup-git` |
| `refusing to allow an OAuth App to ... workflow scope` | gh token 缺 `workflow` scope | `gh auth refresh -h github.com -s workflow` |
| `git push` 久连不上 GitHub | 国内网络 | 配 git 代理（见上面"新机器接手"步骤 5） |
| 部署完页面 404 / 资源错位 | `base` 没配对 | 检查 `.vitepress/config.mts` 的 `base` 和实际仓库名一致 |
| `gh api` 报 `invalid API endpoint: D:/Apps/...` | Git Bash 把开头的 `/` 当文件路径转换 | API path 不要写开头的斜杠：`gh api repos/...` 而不是 `/repos/...` |

## 不要提交

- `node_modules/`（已在 `.gitignore`）
- `.vitepress/dist/`（已在 `.gitignore`）

## 验证清单（push 前过一遍）

- [ ] 新文章 md 文件已创建
- [ ] `config.mts` 的 `nav` 和 `sidebar` 都已更新
- [ ] `npm run dev` 本地预览正常，导航 / 侧边栏都能点到
- [ ] commit 信息有意义
- [ ] `git push` 成功
- [ ] `gh run watch` 显示部署完成
- [ ] 线上能访问对应页面

## 联系 / 元信息

- GitHub 用户：`12306le`
- 仓库：`12306le/notes`
- 站点：https://12306le.github.io/notes/

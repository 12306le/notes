# 我的技术笔记

> 一个代码小白的踩坑笔记和速查手册。如果你也在学这些工具，希望能少走点弯路。

## 内容导航

### Claude Code

[Anthropic 官方出品的命令行 AI 编程助手](https://docs.claude.com/en/docs/claude-code/overview)。可以直接在终端里和 Claude 对话，让它读代码、改代码、跑命令。

- [基本操作](./claude-code/basic.md) —— 安装、启动、常用快捷键和斜杠命令
- [第三方 API 配置](./claude-code/third-party-api.md) —— 怎么接入非官方的 API 中转服务

### Scoop

[Windows 上的命令行包管理器](https://scoop.sh/)。装软件不用再到处下载安装包，一行命令搞定。

- [更新软件](./scoop/update.md) —— 怎么把已装的软件升到最新
- [导入导出](./scoop/export-import.md) —— 把已装的软件清单备份成一个文件
- [换机迁移](./scoop/migration.md) —— 换电脑时把所有软件搬过去

### tmux

[终端复用器](https://github.com/tmux/tmux/wiki)。一个终端窗口里跑多个会话/分屏，断开 SSH 也能让程序继续在后台跑。

- [基本操作](./tmux/basic.md) —— 概念、安装、第一次使用
- [常用命令](./tmux/commands.md) —— 会话、窗口、面板的日常操作

---

## 关于本站

- 本站使用 [VitePress](https://vitepress.dev/zh/) 构建，托管在 GitHub Pages。
- 内容是个人学习笔记，难免有错漏，欢迎在 GitHub 上提 Issue 或 PR 指正。
- 所有命令都在 Windows 11 + bash（Git Bash / WSL）环境下验证过。

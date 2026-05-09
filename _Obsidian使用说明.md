# Obsidian 使用说明

> 这份配置把 `my-docs/` 调成"接近 VitePress"的阅读体验。第一次用按下面步骤操作。

## 一、装 Obsidian

**PC（推荐 Scoop）**：
```bash
scoop bucket add extras
scoop install obsidian
```

或去官网下载：https://obsidian.md

**安卓**：应用商店搜 "Obsidian"（官方免费）

## 二、打开这个 vault

1. 启动 Obsidian
2. 在欢迎界面选 **Open folder as vault**
3. 选目录 `C:\Users\fine8\my-docs\`
4. 弹窗问"是否信任 vault 作者并启用插件" → 选 **Trust author and enable plugins**

打开后默认就是阅读视图（不是编辑器），文件树左侧已经排除了 `node_modules`、`.vitepress/cache` 等无关文件。

## 三、装推荐插件

**设置（左下齿轮）→ Community plugins → Browse → 搜插件名 → Install → Enable**

| 插件 | 作用 | 必装？ |
|---|---|---|
| **Dataview** | 让首页"最近修改"列表生效 | 推荐 |
| **Omnisearch** | 模糊全文搜索带预览（最像 VitePress 的 Ctrl+K） | 推荐 |
| **Homepage** | 启动时自动打开首页 | 推荐 |
| **Iconize** | 给文件夹/文件加图标 | 可选 |
| **Style Settings** | 图形化调主题样式 | 可选 |

## 四、装主题（可选）

**设置 → Appearance → Themes → Manage** → 搜 **Minimal** → Install → Use

替代主题：**Things**、**Border**、**Prism**（都是简洁文档站风）

## 五、配置 Homepage 插件（启动直接进首页）

装好 Homepage 插件后：

**设置 → Homepage → Homepage 字段** → 选 `_首页`

以后启动 Obsidian 直接打开首页。

## 六、和 VitePress 完全共存

- 文件就是同一份 `.md`，Obsidian 和 VitePress 都能用
- VitePress 的 `srcExclude` 已经配置，`_` 开头的文件不会被发布
- Obsidian 的 `[[wiki 链接]]` 在 VitePress 里不会渲染——所以正文里**仍然用普通 markdown 链接**（`[文字](路径.md)`），首页和说明文档可以放心用 wiki 链接（反正不发布）
- 想发布给别人看：`npm run docs:dev` 本地预览，`npm run docs:build` 产出 dist

## 七、常用快捷键

| 操作 | 快捷键 |
|---|---|
| 切换阅读 / 编辑 | `Ctrl+E` |
| 全文搜索 | `Ctrl+Shift+F` |
| 快速打开文件 | `Ctrl+O` |
| 命令面板 | `Ctrl+P` |
| 切换深色 / 浅色 | `Ctrl+P` 搜 "切换深色" |
| 显示当前页大纲 | 右上角 outline 图标 |

## 八、不喜欢怎么完全卸载

直接删除以下三样即可，不影响 VitePress 工程：
- `.obsidian/` 文件夹
- `_首页.md`
- `_Obsidian使用说明.md`

并把 `.vitepress/config.mts` 里 `srcExclude` 改回 `['**/README.md']`。

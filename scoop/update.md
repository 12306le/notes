# Scoop 更新软件

Scoop 装的软件不会自动更新，需要手动 `scoop update`。这篇讲清楚每条命令到底干了什么，避免你乱跑 `scoop update *` 浪费时间或者把没必要更的也更了。

## 两种"更新"

Scoop 里的"更新"其实有两件事：

1. **更新 Scoop 本身和 bucket**（软件源仓库的清单）
2. **更新已安装的软件**

很多新手以为 `scoop update` 一条命令就更新了所有软件 —— 其实它只做了第 1 件事。

## 完整流程

### 第 1 步：更新 Scoop 自己和 bucket

```bash
scoop update
```

这条命令会：

- 更新 scoop 主程序
- 拉取所有已添加的 bucket 的最新清单（main、extras、versions 等）

之后 Scoop 才知道哪些软件有了新版本。

### 第 2 步：查看哪些软件可以更新

```bash
scoop status
```

会列出有新版本的软件，类似：

```
Name      Installed Version  Latest Version  Missing Dependencies  Info
----      -----------------  --------------  --------------------  ----
nodejs    20.10.0           22.5.1
git       2.43.0            2.45.2
```

**先看再更**，避免无脑全更。

### 第 3 步：更新指定软件

```bash
scoop update nodejs
scoop update git
```

可以一次写多个：

```bash
scoop update nodejs git python
```

### 或者：更新所有软件

```bash
scoop update *
```

> 在 PowerShell 里如果 `*` 被解释了，加引号：`scoop update '*'`

## 清理（重要）

更新后旧版本不会自动删除，会一直占着磁盘。下载的安装包也会缓存。

### 清理旧版本

```bash
scoop cleanup *
```

只保留每个软件的当前版本，其他版本删掉。

### 清理下载缓存

```bash
scoop cache rm *
```

删除所有下载过的安装包缓存（位于 `~/scoop/cache/`）。

### 一条命令搞定清理

```bash
scoop cleanup * && scoop cache rm *
```

我个人习惯每次更新后顺手跑一下，能省几个 G 空间。

## 锁定版本（不希望某个软件被更新）

```bash
scoop hold <软件名>
```

例如：

```bash
scoop hold nodejs
```

之后 `scoop update *` 会跳过它。`scoop status` 里会显示 `Held package`。

解锁：

```bash
scoop unhold nodejs
```

**用途**：某些软件新版本有 bug、或者你的项目锁死了某个版本。

## 推荐的日常流程

```bash
# 每周一次
scoop update              # 1. 更新源
scoop status              # 2. 看看有什么可以更的
scoop update <软件名>      # 3. 选择性更新（或者 scoop update *）
scoop cleanup *           # 4. 清理旧版本
scoop cache rm *          # 5. 清理缓存
```

## 常见问题

**Q：`scoop update` 卡住或报错 "fatal: unable to access ..."？**
A：拉取 bucket 走的是 git，多半是网络问题。试着配置 git 代理或者用 SSH 协议的 bucket 源。

**Q：更新后软件用不了了？**
A：用 `scoop reset <软件名>` 可以切换回某个旧版本（前提是没 cleanup）。或者：

```bash
scoop install <软件名>@<旧版本号>
```

**Q：怎么看 scoop 装的所有软件？**
A：`scoop list`

**Q：bucket 是什么？**
A：可以理解为软件源。Scoop 默认只有 `main` bucket（基础工具），常用工具大多在 `extras`。添加方式：

```bash
scoop bucket add extras
```

查看已有 bucket：`scoop bucket list`

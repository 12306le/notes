# Scoop 换机迁移

换电脑、重装系统时，怎么把 Scoop 装的所有软件搬到新机器。整个流程大概 10 分钟。

## 准备

- 旧电脑能正常运行 Scoop
- 新电脑已经装好 Windows
- 一个传文件的方式（U 盘 / 云盘 / 微信传输助手都行）

## 旧电脑：导出

### 1. 确保 Scoop 是最新版

```bash
scoop update
```

### 2. 看看当前装了什么

```bash
scoop list
```

确认没漏掉什么。如果有手动装的、没通过 scoop 装的软件，要单独记下来（scoop 管不到）。

### 3. 导出清单

```bash
scoop export > scoopfile.json
```

文件会生成在当前目录。

### 4. 把 scoopfile.json 传到新电脑

随便用什么方式，比如：

- 丢到 OneDrive / 坚果云 / 百度网盘
- 拷到 U 盘
- 微信文件传输助手发给自己

## 新电脑：导入

### 1. 装 Scoop

打开 PowerShell（不要用管理员），按 [官方文档](https://scoop.sh/) 跑：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

> ⚠️ 不要用管理员模式装 Scoop，会踩坑。

### 2. （可选）改安装位置

Scoop 默认装在 `C:\Users\你\scoop`，软件越装越多 C 盘可能不够。想换到别的盘，**在装 Scoop 之前**：

```powershell
$env:SCOOP='D:\Scoop'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
```

然后再装。

### 3. 装 git（导入需要）

```bash
scoop install git
```

没有 git，添加 bucket 会失败。

### 4. 把 scoopfile.json 放到方便的位置

比如 `C:\Users\你\Desktop\scoopfile.json`。

### 5. 导入

```bash
scoop import C:\Users\你\Desktop\scoopfile.json
```

Scoop 会：

1. 添加旧机器上的所有 bucket
2. 一个个装回所有软件

软件多的话会装挺久（每个都要下载），耐心等。

### 6. 验证

```bash
scoop list
```

对比一下数量和旧机器是否一致。

## 软件的"配置"怎么办？

`scoop import` **只装软件，不带任何配置**。常见软件的配置位置：

| 软件 | 配置位置 |
| --- | --- |
| VS Code | `%APPDATA%\Code\User\settings.json` + 插件列表 |
| Git | `~/.gitconfig` |
| Windows Terminal | `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_*\LocalState\settings.json` |
| Neovim | `~/AppData/Local/nvim/` |
| Claude Code | `~/.claude/` |

建议把这些目录也一起备份。我自己的做法是把它们都软链接到 OneDrive，自动同步。

### VS Code 插件单独同步

VS Code 自带"设置同步"功能（用 GitHub/Microsoft 账号登录），插件、快捷键、配置都能跨设备同步，比手动备份方便。

或者命令行导出/导入插件列表：

```bash
# 旧机器
code --list-extensions > vscode-extensions.txt

# 新机器
cat vscode-extensions.txt | xargs -L 1 code --install-extension
```

## 常见踩坑

**1. 导入时一直报 git 错误**

新机器没装 git 或者 git 在 PATH 里找不到。先跑 `scoop install git`。

**2. 某些 bucket 是 git@github.com 形式（SSH）**

新机器没配 SSH key，会拉不下来。两种解决：
- 手动把 scoopfile.json 里的 SSH 地址改成 HTTPS
- 或者新机器先配好 SSH key

**3. 软件名变了**

少数软件可能改名或转移到别的 bucket，import 报"找不到"。手动 `scoop search` 找新名字，单独装。

**4. 某些软件装完启动报错**

通常是缺少运行时（VC++ 运行库、.NET 等）。这些 Scoop 不一定会自动装，按报错提示补即可。

**5. 路径里中文导致问题**

Scoop 不太喜欢中文路径。`SCOOP` 环境变量、用户名都尽量用英文。

## 备份哪些东西更稳妥

建议一份完整备份包含：

```
backup/
├── scoopfile.json              # scoop 软件清单
├── vscode-extensions.txt       # VS Code 插件清单
├── .gitconfig                  # git 配置
├── .ssh/                       # SSH key（敏感，加密保存）
├── .claude/settings.json       # Claude Code 配置
├── nvim/                       # Neovim 配置
├── windows-terminal-settings.json
└── README.md                   # 写下你装了什么、有什么坑
```

整个目录扔云盘，换机基本无痛。

## 总结流程图

```
旧机器                          新机器
  │                              │
  ├─ scoop update                ├─ 装 Scoop
  ├─ scoop export > x.json       ├─ scoop install git
  ├─ 备份配置文件                  ├─ 拿到 x.json 和配置文件
  └─ 上传/拷贝 ─────────────────▶ ├─ scoop import x.json
                                 ├─ 还原配置文件
                                 └─ 验证 scoop list
```

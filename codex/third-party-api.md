# Codex 第三方 API 配置速查

这篇先给能直接照做的命令，再解释为什么。你只需要记住两个文件：

```text
C:\Users\你的用户名\.codex\config.toml
C:\Users\你的用户名\.codex\auth.json
```

`config.toml` 写 API 地址、模型名；`auth.json` 写 SK 密钥。

> 安全提醒：只要 Codex、Claude Code 或其他 AI 工具被允许读取你的用户目录，它理论上就可能读到本机明文 SK。把 SK 放环境变量或 `auth.json` 的主要意义是避免误提交到 Git、误写进文档、截图泄露。真正敏感的项目不要接入不可信第三方 API。

## 最常用操作

| 你要做什么 | 打开什么 / 运行什么 | 结果 |
| --- | --- | --- |
| 打开 Codex 配置文件夹 | 资源管理器地址栏输入 `%USERPROFILE%\.codex` | 看到 `config.toml` 和 `auth.json` |
| 改 API 地址 | 打开 `config.toml`，改 `base_url` | Codex 连接新的中转地址 |
| 改模型 | 打开 `config.toml`，改 `model` | Codex 使用新的模型 |
| 改 SK 密钥 | 打开 `auth.json`，改 `OPENAI_API_KEY` | Codex 使用新的 Key |
| 测试是否安装 | `codex --version` | 显示版本号 |
| 启动 Codex | `codex` | 进入 Codex 对话界面 |
| 查看当前状态 | 在 Codex 里输入 `/status` | 看当前模型、provider、工作目录 |

## 新电脑完整配置

### 1. 安装 Codex

先安装 Node.js LTS，然后打开 PowerShell：

```powershell
npm install -g @openai/codex
```

检查是否安装成功：

```powershell
codex --version
```

应该看到类似：

```text
codex-cli 0.130.0
```

### 2. 打开配置文件夹

资源管理器地址栏输入：

```text
%USERPROFILE%\.codex
```

如果提示找不到，就新建这个文件夹：

```text
C:\Users\你的用户名\.codex
```

### 3. 新建 config.toml

在 `.codex` 文件夹里新建：

```text
config.toml
```

写入下面内容：

```toml
model_provider = "hoikde"
model = "gpt-5.5"
model_reasoning_effort = "medium"
disable_response_storage = true
preferred_auth_method = "apikey"

[model_providers.hoikde]
name = "hoikde"
base_url = "https://cpa.hoik.de/v1"
wire_api = "responses"

[windows]
sandbox = "elevated"
```

以后主要改这两行：

```toml
model = "gpt-5.5"
base_url = "https://cpa.hoik.de/v1"
```

### 4. 新建 auth.json

在 `.codex` 文件夹里新建：

```text
auth.json
```

写入：

```json
{"OPENAI_API_KEY":"sk-你的密钥"}
```

注意：

- 必须是英文双引号
- 不要在末尾加逗号
- `sk-你的密钥` 换成中转商给你的真实 SK
- 不要把真实 SK 发到群里、截图里、GitHub 里

### 5. 重启终端并测试

关闭 PowerShell、Git Bash、VS Code 终端，再重新打开。

运行：

```powershell
codex
```

进入 Codex 后输入：

```text
/status
```

如果能看到你配置的模型和 provider，说明配置生效。

## 我该改哪里

### 换 API 地址

打开：

```text
C:\Users\你的用户名\.codex\config.toml
```

改这一行：

```toml
base_url = "https://新的API地址/v1"
```

### 换模型

改这一行：

```toml
model = "新的模型名"
```

例如：

```toml
model = "gpt-5-codex"
```

模型名必须看中转商后台，不能自己猜。

### 换 SK 密钥

打开：

```text
C:\Users\你的用户名\.codex\auth.json
```

改成：

```json
{"OPENAI_API_KEY":"新的sk密钥"}
```

## provider 名字必须一致

这两个地方必须一样：

```toml
model_provider = "hoikde"

[model_providers.hoikde]
name = "hoikde"
```

如果你想改成 `myapi`，要三个地方一起改：

```toml
model_provider = "myapi"

[model_providers.myapi]
name = "myapi"
```

名字不一致时，Codex 可能找不到配置，然后弹登录界面。

## 为什么配置了还弹登录

按这个顺序排查。

### 1. 你是不是在 WSL 里运行

Windows 配置在：

```text
C:\Users\你的用户名\.codex
```

WSL 配置在：

```text
/home/你的Linux用户名/.codex
```

如果你在 WSL 里运行 `codex`，它不会自动读取 Windows 的 `.codex` 文件夹。

### 2. 你是不是在 VS Code 插件里打开

VS Code 插件可能走自己的登录流程。先在 PowerShell 里测试：

```powershell
codex
```

命令行能用，再处理插件问题。

### 3. 你是不是没重启终端

改完 `config.toml` 或 `auth.json` 后，关闭终端重新打开。

### 4. 模型名是不是不存在

如果中转商不支持：

```toml
model = "gpt-5.5"
```

就可能报错。去中转商后台复制模型名。

### 5. SK 是不是失效或没余额

认证失败、401、一直转圈，都可能是 Key 或余额问题。

## 更安全的环境变量写法

如果你不想把 SK 写进 `auth.json`，可以把 SK 放到环境变量。

PowerShell 临时写法：

```powershell
$env:CODEX_THIRD_PARTY_API_KEY="sk-你的密钥"
```

PowerShell 永久写法：

```powershell
[Environment]::SetEnvironmentVariable("CODEX_THIRD_PARTY_API_KEY", "sk-你的密钥", "User")
```

然后 `config.toml` 写：

```toml
model_provider = "custom"
model = "gpt-5-codex"
model_reasoning_effort = "medium"

[model_providers.custom]
name = "custom"
base_url = "https://你的中转域名/v1"
env_key = "CODEX_THIRD_PARTY_API_KEY"
wire_api = "responses"
```

但要明白：如果 AI 工具能执行命令或读取环境变量，它仍然可能看到这个 SK。环境变量不是绝对隔离，只是比写进教程、脚本、仓库更不容易误泄露。

## 常见报错

### `codex` 不是内部或外部命令

Codex 没装好，重新安装：

```powershell
npm install -g @openai/codex
```

### `model not found`

模型名不对。打开 `config.toml`，改：

```toml
model = "服务商支持的模型名"
```

### 401 / Authentication failed

检查 `auth.json`：

```json
{"OPENAI_API_KEY":"sk-你的密钥"}
```

再检查 Key 是否复制完整、是否过期、是否有余额。

### 一直连不上

检查 `base_url`：

```toml
base_url = "https://你的中转域名/v1"
```

常见问题是少了 `/v1`、多了空格、域名写错。

## 参考

- OpenAI Codex 配置基础：https://developers.openai.com/codex/config-basic
- OpenAI Codex 配置参考：https://developers.openai.com/codex/config-reference
- OpenAI Codex 认证说明：https://developers.openai.com/codex/auth
- B 站教程参考：https://www.bilibili.com/opus/1165732060623536129

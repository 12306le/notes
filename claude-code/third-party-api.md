# Claude Code 第三方 API 配置

Claude Code 默认连 Anthropic 官方服务器，需要订阅 Claude Pro/Max（每月 $20/$100+）或者用官方 API Key（按 token 计费）。

很多国内用户因为支付、网络或价格原因，会选用第三方 API 中转服务。本文讲怎么配置。

> ⚠️ **风险提示**：第三方 API 意味着你的对话内容（包括代码）会经过第三方服务器。请选择信誉良好、明确承诺不留存数据的服务商，**不要在涉密项目里用**。

## 原理

Claude Code 通过两个环境变量决定连哪里：

- `ANTHROPIC_BASE_URL` —— API 服务器地址
- `ANTHROPIC_AUTH_TOKEN` —— 认证用的 Token

只要把这俩改成第三方提供的值，Claude Code 就会去连第三方。

## 配置方式一：环境变量（临时）

适合只想试试、不想改全局配置的情况。

### Git Bash / WSL / Linux / macOS

```bash
export ANTHROPIC_BASE_URL="https://你的中转地址"
export ANTHROPIC_AUTH_TOKEN="sk-xxxxxxxxxxxx"
claude
```

只对当前终端窗口生效，关掉就失效。

### Windows PowerShell

```powershell
$env:ANTHROPIC_BASE_URL="https://你的中转地址"
$env:ANTHROPIC_AUTH_TOKEN="sk-xxxxxxxxxxxx"
claude
```

### Windows CMD

```cmd
set ANTHROPIC_BASE_URL=https://你的中转地址
set ANTHROPIC_AUTH_TOKEN=sk-xxxxxxxxxxxx
claude
```

## 配置方式二：写进 settings.json（永久）

每次都设环境变量太麻烦，可以写进 Claude Code 的配置文件。

文件位置：

- **Windows**：`C:\Users\你的用户名\.claude\settings.json`
- **macOS / Linux**：`~/.claude/settings.json`

如果文件不存在就新建一个，内容如下：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://你的中转地址",
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxxxxxxx"
  }
}
```

保存后重启 Claude Code 就生效了。

## 配置方式三：项目级配置

如果你只想让某个项目用第三方 API，其他项目继续用官方，可以在该项目根目录建一个 `.claude/settings.json`，格式同上。项目级会覆盖全局级。

## 切换模型

第三方 API 通常会同时支持多个 Claude 模型。在 Claude Code 里直接：

```
/model
```

会列出可用模型，选一个即可。常见选择：

| 模型 | 适合场景 |
| --- | --- |
| **Opus** | 最聪明，适合复杂任务、架构设计、难调的 bug。慢、贵 |
| **Sonnet** | 平衡型，日常用足够，速度快很多 |
| **Haiku** | 最便宜最快，适合简单任务、批量改动 |

## 怎么验证配置成功了

启动 Claude Code 后输入：

```
/cost
```

会显示当前 API 端点。如果显示的是你配置的第三方地址，说明生效了。

或者直接问 Claude：「你现在连的是哪个 API 服务器？」它通常会告诉你。

## 常见问题

**Q：配置完启动报错 "Authentication failed"？**
A：检查 Token 是否复制完整（开头 `sk-` 别漏）、是否有多余空格、是否过期。

**Q：报错 "Connection refused" 或一直转圈？**
A：检查 `ANTHROPIC_BASE_URL` 拼写，注意：
- 必须是 `https://` 开头
- **末尾不要带斜杠**
- 不要带 `/v1` 后缀（除非中转商明确要求）

**Q：第三方 API 上 Claude Code 的某些功能不能用？**
A：有些第三方中转只代理了对话接口，没代理 Claude Code 用到的其他端点（比如管理类接口）。换一家或者反馈给中转商。

**Q：怎么切回官方？**
A：把 `settings.json` 里的 `env` 段删掉（或注释掉），重启 Claude Code 走默认登录流程即可。

## 安全建议

- Token 等同于你的账号密码，**不要发到 GitHub、群聊、截图**
- `settings.json` 不要提交到公开仓库（在 `.gitignore` 里加 `.claude/`）
- 如果泄露了，立刻去中转商后台撤销旧 Token、生成新的
- 定期看看消费记录，发现异常用量及时处理

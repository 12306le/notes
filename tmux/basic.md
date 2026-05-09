# tmux 基本操作

tmux 是终端复用器（terminal multiplexer）。通俗讲：

- **一个终端窗口里开多个会话/分屏**，不用开一堆窗口
- **断开 SSH，里面的程序继续在后台跑**，下次连上还能恢复现场
- **键盘党的 IDE**：纯键盘管理多个工作区

## 三个核心概念

理解 tmux 必须先搞清楚三个层级：

```
Session（会话）
├── Window（窗口）  ←── 像浏览器的标签页
│   └── Pane（面板）←── 一个窗口里的分屏
```

| 概念 | 类比 | 说明 |
| --- | --- | --- |
| **Session** | 浏览器的"窗口" | 一个独立的工作区，可以包含多个 Window |
| **Window** | 浏览器的"标签页" | 一个 Session 里的一个工作页面 |
| **Pane** | 分屏 | 一个 Window 内可以横竖切分成多个 Pane |

举例：你可以有一个 Session 叫 `myproject`，里面有 3 个 Window（一个跑前端、一个跑后端、一个跑数据库），后端那个 Window 又分成 2 个 Pane（一个跑服务、一个看日志）。

## 安装

### Windows

tmux 是 Linux 工具，Windows 上需要通过以下方式之一：

**方式 1：WSL（推荐）**

```bash
wsl --install                # 装 WSL2
# 然后在 WSL 里
sudo apt install tmux
```

**方式 2：Git Bash + scoop**

```bash
scoop install tmux
```

> ⚠️ 注意：Git Bash 里的 tmux 行为有时候和 Linux 原生有差异。复杂用法建议用 WSL。

### macOS

```bash
brew install tmux
```

### Linux

```bash
# Debian/Ubuntu
sudo apt install tmux

# Fedora/RHEL
sudo dnf install tmux

# Arch
sudo pacman -S tmux
```

### 验证

```bash
tmux -V
```

显示版本号即成功。

## 第一次使用

### 启动

```bash
tmux
```

会进入一个新会话，下方有一条绿色状态栏。

### 跑点东西

随便跑个长时间命令：

```bash
ping baidu.com
```

### 分离（detach）—— tmux 的精髓

按 **`Ctrl+b`** 然后松开，再按 **`d`**：

```
[detached (from session 0)]
```

回到了原来的终端，但刚才的 ping 还在 tmux 里继续跑！

### 验证还在跑

```bash
tmux ls
```

输出类似：

```
0: 1 windows (created Sat May 10 14:30:00 2026)
```

### 重新连接（attach）

```bash
tmux attach
```

回到刚才的会话，ping 还在跑。

**这就是 tmux 最大的价值**：SSH 断了、关了终端、电脑切了用户，里面的程序都还活着。

## 前缀键 Ctrl+b

tmux 所有快捷键都要先按 **`Ctrl+b`**（叫"前缀键"，prefix key），松开，然后再按命令键。

例如：

- `Ctrl+b` 然后 `d` —— 分离
- `Ctrl+b` 然后 `c` —— 创建新窗口
- `Ctrl+b` 然后 `%` —— 垂直分屏

写法约定：`Ctrl+b d` 表示先 `Ctrl+b`，松开，再按 `d`。

> 很多人会把前缀键改成 `Ctrl+a`（更顺手），见 [常用命令](./commands.md) 的"配置"小节。

## 命名会话（强烈推荐）

默认会话名是数字（0、1、2...），多了就乱。建议每次用名字：

```bash
tmux new -s myproject
```

之后：

```bash
tmux attach -t myproject     # 连上叫 myproject 的会话
tmux kill-session -t myproject  # 杀掉它
```

## 退出 vs 分离 —— 别搞混

| 操作 | 效果 |
| --- | --- |
| **分离 detach**（`Ctrl+b d`） | 离开 tmux，里面程序继续跑 ✅ |
| **退出 exit** | 关掉当前 shell（如果是会话最后一个 shell，会话也没了）❌ |
| **杀会话 kill-session** | 强行结束整个会话 ❌ |

**记住：你想"以后还能回来"，就 `Ctrl+b d`，绝对不要 `exit`。**

## 一个完整的工作流示例

假设你 SSH 到一台服务器跑训练任务：

```bash
# 1. 登上服务器
ssh user@server

# 2. 开个命名会话
tmux new -s training

# 3. 跑训练（可能要几小时）
python train.py

# 4. 分离 —— Ctrl+b d
# 现在可以安心断开 SSH，关电脑都行

# 5. 第二天连回来
ssh user@server
tmux attach -t training

# 6. 看到训练已经跑完了，处理结果
```

没有 tmux：SSH 一断，训练就死了，前面几小时白跑。

## 常见疑问

**Q：tmux 和 screen 有什么区别？**
A：screen 是更老的同类工具。tmux 更现代、配置更灵活，是现在的主流选择。

**Q：tmux 和 Windows Terminal 的"分屏"有什么区别？**
A：Windows Terminal 的分屏是它自己的 UI 概念，关闭就没了，也不能跨 SSH 持久化。tmux 的分屏在远程服务器上工作，是远程持久的。

**Q：每次 SSH 都要手动 `tmux attach`，烦。**
A：可以在 `~/.bashrc` 或 `~/.zshrc` 里加一段：登录时自动 attach 到默认会话，不存在就创建。但这是高级用法，先用熟基本操作再说。

**Q：tmux 鼠标不能用？**
A：默认不能用鼠标点击切面板、滚屏。可以在 `~/.tmux.conf` 里加 `set -g mouse on` 开启。

下一篇：[常用命令](./commands.md) —— 把所有日常用得到的快捷键讲完。

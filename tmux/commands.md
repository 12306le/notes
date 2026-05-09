# tmux 常用命令

> 所有快捷键都要先按 **`Ctrl+b`**（前缀键），松开，再按命令键。下面用 `prefix` 代表 `Ctrl+b`。

## 会话（Session）

### 命令行用法

```bash
tmux new -s 名字              # 新建命名会话
tmux ls                       # 列出所有会话
tmux attach -t 名字            # 连接到指定会话
tmux attach                   # 连接到最近的会话
tmux kill-session -t 名字      # 杀掉指定会话
tmux kill-server              # 杀掉所有会话（慎用）
```

简写：

```bash
tmux a -t 名字                 # attach 简写
tmux a                        # attach 最近一个
```

### 在 tmux 内部

| 快捷键 | 作用 |
| --- | --- |
| `prefix d` | 分离当前会话 |
| `prefix s` | 列出所有会话，可选切换 |
| `prefix $` | 重命名当前会话 |
| `prefix (` | 切换到上一个会话 |
| `prefix )` | 切换到下一个会话 |

## 窗口（Window）

类似浏览器标签页。

| 快捷键 | 作用 |
| --- | --- |
| `prefix c` | 新建窗口（**c** = create） |
| `prefix ,` | 重命名当前窗口 |
| `prefix &` | 关闭当前窗口（会问你确认） |
| `prefix n` | 切到下一个窗口（**n** = next） |
| `prefix p` | 切到上一个窗口（**p** = previous） |
| `prefix 0~9` | 切到第 N 个窗口 |
| `prefix w` | 列出所有窗口，可选 |
| `prefix l` | 切到上次用的窗口（**l** = last） |
| `prefix f` | 按名字搜索窗口 |

## 面板（Pane）—— 分屏

### 创建分屏

| 快捷键 | 作用 |
| --- | --- |
| `prefix %` | **垂直**分屏（左右） |
| `prefix "` | **水平**分屏（上下） |

记忆：`%` 像一道竖线，`"` 像两个叠起来的引号。

### 切换面板

| 快捷键 | 作用 |
| --- | --- |
| `prefix ←↑→↓` | 按方向键切换 |
| `prefix o` | 顺序切下一个 |
| `prefix ;` | 切到上次用的面板 |
| `prefix q` | 短暂显示面板编号（按数字直接跳） |

### 调整面板

| 快捷键 | 作用 |
| --- | --- |
| `prefix Ctrl+方向键` | 按方向调大/调小（每次几格） |
| `prefix Alt+方向键` | 同上但步长更大 |
| `prefix z` | **放大**当前面板（占满整个窗口），再按一次还原 |
| `prefix !` | 把当前面板**变成新窗口** |
| `prefix x` | 关闭当前面板（会确认） |
| `prefix {` | 当前面板和前一个交换 |
| `prefix }` | 当前面板和后一个交换 |
| `prefix space` | 在几种预设布局间切换 |

`prefix z`（zoom）超好用：分屏太挤想专心看一个，按一下放大；写完再按一下还原。

## 复制模式（看历史输出 / 选文字）

终端默认能滚轮看历史，但 tmux 接管了滚动。要看历史得进**复制模式**。

| 快捷键 | 作用 |
| --- | --- |
| `prefix [` | 进入复制模式 |
| `↑↓`、`PgUp/PgDn` | 滚动 |
| `q` 或 `Esc` | 退出复制模式 |
| `Space` | 开始选择 |
| `Enter` | 复制选中内容到 tmux 缓冲区 |
| `prefix ]` | 粘贴 |

> tmux 默认用 emacs 风格按键。如果你习惯 vim，可以在配置里 `setw -g mode-keys vi`，然后按 `v` 选、`y` 复制。

### 跟系统剪贴板互通

默认复制只到 tmux 自己的剪贴板，外面粘贴不到。需要配置：

- **macOS**：`set -g default-command "reattach-to-user-namespace -l zsh"`（要装 reattach-to-user-namespace）
- **Linux**：装 `xclip` 或 `xsel`，配置 copy 命令通过它
- **WSL**：装 `clip.exe`（自带），配置 copy 命令调用它

简单的话推荐用支持 OSC 52 的终端（Windows Terminal、iTerm2、WezTerm 都支持），加：

```
set -g set-clipboard on
```

复制就能直接进系统剪贴板。

## 配置文件 ~/.tmux.conf

tmux 的灵魂。下面是个新手友好的入门配置，复制粘贴到 `~/.tmux.conf` 就能用：

```bash
# 把前缀键从 Ctrl+b 改成 Ctrl+a（更顺手）
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# 鼠标支持（点击切面板、滚轮看历史）
set -g mouse on

# 历史记录长度
set -g history-limit 50000

# 窗口和面板编号从 1 开始（默认 0）
set -g base-index 1
setw -g pane-base-index 1

# 面板序号变化时自动重排
set -g renumber-windows on

# 复制模式用 vim 按键
setw -g mode-keys vi

# 跟系统剪贴板互通（需要终端支持 OSC 52）
set -g set-clipboard on

# 状态栏放底部
set -g status-position bottom

# 重载配置的快捷键
bind r source-file ~/.tmux.conf \; display "配置已重载"
```

### 让配置生效

第一次：退出 tmux 重新进，或者：

```bash
tmux kill-server
tmux
```

之后改配置：在 tmux 里按 `prefix r` 即可（上面绑定了的）。

## 速查卡片（背这一张就够日常了）

```
会话
  tmux new -s 名字 / tmux a -t 名字 / tmux ls
  prefix d   分离
  prefix s   切会话

窗口（标签页）
  prefix c   新建
  prefix ,   重命名
  prefix &   关闭
  prefix n/p 下/上一个
  prefix 0-9 跳到 N 号

面板（分屏）
  prefix %   左右分
  prefix "   上下分
  prefix ←↑→↓ 切换
  prefix z   放大/还原
  prefix x   关闭

复制
  prefix [   进入复制模式
  Space      开始选
  Enter      复制
  prefix ]   粘贴
```

打印贴在显示器边上，一周就熟了。

## 常见踩坑

**Q：按 `prefix` 没反应？**
A：检查终端有没有把 `Ctrl+b` 截胡了（少数终端会）。或者改前缀键到 `Ctrl+a`。

**Q：tmux 里颜色不对、终端能力不够？**
A：在 `~/.bashrc` 或 `~/.zshrc` 里加 `export TERM=xterm-256color`。tmux 配置里加 `set -g default-terminal "screen-256color"`。

**Q：vim 在 tmux 里光标变成大方块？**
A：vim 的 `terminal` 设置和 tmux 不匹配。在 `~/.vimrc` 里加 `set ttyfast`，或在 tmux.conf 加 `set -sg escape-time 0`。

**Q：怎么把当前窗口"挪"到另一个会话？**
A：`prefix .` 输入目标会话名即可。

**Q：tmux 占资源吗？**
A：本身极轻量。占资源的是你跑的程序，不是 tmux。

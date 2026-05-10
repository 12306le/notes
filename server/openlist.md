# OpenList 常用命令速查

OpenList 默认 Web 端口是 `5244`。如果你在 1Panel 里安装，优先去 1Panel 应用商店管理；如果是脚本或手动安装，就用下面命令。

官方文档入口：https://doc.oplist.org/guide

## 最常用操作

| 你要做什么 | 命令 | 结果 |
| --- | --- | --- |
| 打开管理脚本 | `openlist` 或 `openlist-manager` | 进入安装、更新、密码、启停菜单 |
| 查看版本 | `openlist version` | 显示 OpenList 版本 |
| 启动 | `openlist start` | 后台启动 OpenList |
| 停止 | `openlist stop` | 停止 OpenList |
| 重启 | `openlist restart` | 重启 OpenList |
| 前台运行 | `openlist server` | 当前终端运行服务 |
| 查看管理员信息 | `openlist admin` | 显示 admin 信息 |
| 随机生成管理员密码 | `openlist admin random` | 生成新密码 |
| 手动设置管理员密码 | `openlist admin set 新密码` | 把 admin 密码改成指定值 |

## 一键脚本安装

服务器需要是 Linux，并且有 systemd、root 权限、`curl`、`tar`。

官方脚本：

```bash
curl -fsSL https://res.oplist.org/script/v4.sh > install-openlist-v4.sh
sudo bash install-openlist-v4.sh
```

国内镜像：

```bash
curl -fsSL https://res.oplist.org.cn/script/v4.sh > install-openlist-v4.sh
sudo bash install-openlist-v4.sh
```

脚本打开后，按菜单提示输入数字。常见菜单里会有安装、更新、卸载、查看状态、密码管理、启动、停止、重启。

安装完成后可以运行：

```bash
openlist
```

或：

```bash
openlist-manager
```

## Ubuntu/Debian APT 安装

官方推荐的自动 GPG 配置：

```bash
curl -fsSL https://github.com/OpenListTeam/OpenList-APT/releases/latest/download/install-apt.sh | bash
sudo apt install openlist -y
```

安装完成后查看版本：

```bash
openlist version
```

## 忘记后台密码

随机生成一个新密码：

```bash
openlist admin random
```

手动设置新密码：

```bash
openlist admin set 新密码
```

如果你是手动下载二进制运行，并且当前目录里有 `openlist` 文件，可能要这样写：

```bash
./openlist admin random
./openlist admin set 新密码
```

## 启动、停止、重启

静默启动：

```bash
openlist start
```

停止：

```bash
openlist stop
```

重启：

```bash
openlist restart
```

前台运行：

```bash
openlist server
```

看到类似：

```text
start server@0.0.0.0:5244
```

说明服务启动成功。浏览器打开：

```text
http://服务器IP:5244
```

## systemd 服务管理

如果你配置了 systemd 服务，可以用：

```bash
sudo systemctl status openlist
sudo systemctl start openlist
sudo systemctl stop openlist
sudo systemctl restart openlist
sudo systemctl enable openlist
sudo systemctl disable openlist
```

查看日志：

```bash
sudo journalctl -u openlist -f
```

## 放行端口

OpenList 默认端口：

```text
5244
```

Ubuntu 防火墙放行：

```bash
sudo ufw allow 5244/tcp
sudo ufw status
```

还要去 VPS 控制台安全组里放行 `5244`。

## 1Panel 里安装 OpenList

如果你用 1Panel：

1. 打开 1Panel 后台
2. 进入应用商店
3. 搜索 `openlist`
4. 点击安装
5. 常用端口默认是 `5244`
6. 建议勾选外部端口访问

忘记密码时，如果是 1Panel 应用商店安装，先尝试在 1Panel 应用里找日志、终端或容器命令。也可以进入容器后执行 OpenList 的 `admin` 命令。

## 常见问题

### 浏览器打不开

检查：

```bash
openlist restart
sudo ss -tulpn | grep 5244
sudo ufw status
```

还要检查 VPS 安全组是否放行 `5244`。

### 命令提示找不到 openlist

可能原因：

- 没安装成功
- 用的是手动二进制，需要在程序目录运行 `./openlist`
- PATH 没配置
- 你是在另一个服务器上执行

### 反向代理到子目录

官方示例里需要设置 `site_url`，例如：

```text
/openlist
```

然后重启 OpenList。Nginx 反向代理时，要把请求转到：

```text
http://127.0.0.1:5244/openlist/
```

## 参考

- OpenList 快速开始：https://doc.oplist.org/guide
- OpenList 一键脚本：https://doc.oplist.org/guide/installation/script
- OpenList 手动安装：https://doc.oplist.org/guide/installation/manual
- OpenList FAQ：https://doc.oplist.org/faq/howto.html

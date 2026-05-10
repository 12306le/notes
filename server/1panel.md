# 1Panel 常用命令速查

1Panel 安装后会自带命令行工具 `1pctl`。忘记后台地址、账号密码、端口时，优先在服务器 SSH 里查。

官方文档入口：https://1panel.cn/docs/v1/installation/cli/

## 最常用操作

| 你要做什么 | 命令 | 结果 |
| --- | --- | --- |
| 查看 1Panel 状态 | `sudo 1pctl status` | 看服务是否运行 |
| 启动 1Panel | `sudo 1pctl start` | 启动面板 |
| 停止 1Panel | `sudo 1pctl stop` | 停止面板 |
| 重启 1Panel | `sudo 1pctl restart` | 重启面板 |
| 查看版本 | `sudo 1pctl version` | 显示版本信息 |
| 查看用户信息 | `sudo 1pctl user-info` | 显示面板地址、用户等信息 |
| 修改用户名 | `sudo 1pctl update username` | 按提示修改后台用户名 |
| 修改密码 | `sudo 1pctl update password` | 按提示修改后台密码 |
| 修改端口 | `sudo 1pctl update port` | 按提示修改后台端口 |

## 忘记后台账号密码

先 SSH 进服务器：

```bash
ssh root@服务器IP
```

查看当前面板信息：

```bash
sudo 1pctl user-info
```

如果密码忘了，改密码：

```bash
sudo 1pctl update password
```

如果用户名也想改：

```bash
sudo 1pctl update username
```

改完后重新打开 1Panel 后台登录。

## 忘记面板地址或端口

查看用户信息：

```bash
sudo 1pctl user-info
```

查看服务状态：

```bash
sudo 1pctl status
```

如果要改端口：

```bash
sudo 1pctl update port
```

改端口后，记得在 VPS 安全组和系统防火墙里放行新端口。

## 登录限制导致进不去

1Panel 支持安全入口、域名绑定、授权 IP、两步验证。忘了这些设置时，可以重置。

取消安全入口：

```bash
sudo 1pctl reset entrance
```

取消域名绑定：

```bash
sudo 1pctl reset domain
```

取消授权 IP 限制：

```bash
sudo 1pctl reset ips
```

取消两步验证：

```bash
sudo 1pctl reset mfa
```

取消 HTTPS 登录：

```bash
sudo 1pctl reset https
```

这些命令会降低登录保护。能登录后台后，建议重新设置安全入口、强密码和两步验证。

## 服务管理

启动：

```bash
sudo 1pctl start
```

停止：

```bash
sudo 1pctl stop
```

重启：

```bash
sudo 1pctl restart
```

查看状态：

```bash
sudo 1pctl status
```

## 查看帮助

```bash
sudo 1pctl help
```

查看重置相关帮助：

```bash
sudo 1pctl reset --help
```

查看修改相关帮助：

```bash
sudo 1pctl update --help
```

## 1Panel 应用商店命令

初始化应用：

```bash
sudo 1panel app init -k app_name -v v1.0.0
```

这个命令通常给开发或打包应用时使用，日常用户一般不用。

## 常见问题

### 运行 `1pctl` 提示找不到命令

可能是 1Panel 没装好，或者你不是在安装 1Panel 的服务器上执行。

先确认当前服务器：

```bash
hostname
pwd
```

再检查服务：

```bash
systemctl status 1panel
```

### 改端口后打不开后台

检查三处：

- 1Panel 是否运行：`sudo 1pctl status`
- VPS 安全组是否放行新端口
- Ubuntu 防火墙是否放行新端口：`sudo ufw status`


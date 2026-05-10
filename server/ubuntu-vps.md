# Ubuntu VPS 常用命令速查

这篇写给刚开始用服务器的人。复制命令前先确认自己连的是正确的服务器。

## 最常用操作

| 你要做什么 | 命令 | 结果 |
| --- | --- | --- |
| 查看当前目录 | `pwd` | 显示你现在在哪个文件夹 |
| 看目录文件 | `ls -la` | 显示隐藏文件和权限 |
| 进入目录 | `cd /路径` | 切换目录 |
| 返回上一级 | `cd ..` | 回到父目录 |
| 查看系统版本 | `lsb_release -a` | 显示 Ubuntu 版本 |
| 查看磁盘空间 | `df -h` | 看硬盘是否满了 |
| 查看内存 | `free -h` | 看内存使用 |
| 查看运行时间 | `uptime` | 看服务器运行多久、负载多少 |
| 重启服务器 | `sudo reboot` | 服务器重启 |
| 关机 | `sudo shutdown now` | 服务器关机 |

## 连接服务器

```bash
ssh root@服务器IP
```

如果不是 root 用户：

```bash
ssh 用户名@服务器IP
```

第一次连接会问是否信任，输入：

```text
yes
```

## 更新系统

```bash
sudo apt update
sudo apt upgrade -y
```

效果：

- `apt update`：刷新软件列表
- `apt upgrade -y`：升级已安装软件

## 安装常用工具

```bash
sudo apt install -y curl wget git vim unzip htop
```

这些工具常用于下载脚本、编辑配置、查看系统状态。

## 查看端口和服务

查看正在监听的端口：

```bash
sudo ss -tulpn
```

查某个端口，例如 80：

```bash
sudo ss -tulpn | grep ':80'
```

查看服务状态：

```bash
sudo systemctl status 服务名
```

重启服务：

```bash
sudo systemctl restart 服务名
```

启动服务：

```bash
sudo systemctl start 服务名
```

停止服务：

```bash
sudo systemctl stop 服务名
```

设置开机自启：

```bash
sudo systemctl enable 服务名
```

取消开机自启：

```bash
sudo systemctl disable 服务名
```

## 查看日志

实时看某个服务日志：

```bash
sudo journalctl -u 服务名 -f
```

看最近 100 行：

```bash
sudo journalctl -u 服务名 -n 100
```

看系统启动日志：

```bash
journalctl -xb
```

## 防火墙 ufw

查看防火墙状态：

```bash
sudo ufw status
```

放行 SSH：

```bash
sudo ufw allow 22/tcp
```

放行网站端口：

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

放行 OpenList 默认端口：

```bash
sudo ufw allow 5244/tcp
```

启用防火墙：

```bash
sudo ufw enable
```

启用前一定先放行 SSH，否则可能把自己锁在服务器外面。

## 文件操作

复制文件：

```bash
cp 源文件 目标文件
```

移动或重命名：

```bash
mv 旧名字 新名字
```

创建目录：

```bash
mkdir -p 文件夹名
```

删除文件：

```bash
rm 文件名
```

删除文件夹：

```bash
rm -r 文件夹名
```

删除命令要特别小心，不懂不要加 `-rf`。

## 编辑文件

用 nano 编辑，适合新手：

```bash
nano 文件名
```

保存：

```text
Ctrl + O
Enter
Ctrl + X
```

## 查进程

查看进程：

```bash
ps aux
```

搜索某个程序：

```bash
ps aux | grep 程序名
```

用 htop 看资源：

```bash
htop
```

退出 htop：

```text
q
```

## Docker 常用命令

查看容器：

```bash
docker ps
```

查看所有容器：

```bash
docker ps -a
```

重启容器：

```bash
docker restart 容器名
```

查看容器日志：

```bash
docker logs -f 容器名
```

停止容器：

```bash
docker stop 容器名
```

启动容器：

```bash
docker start 容器名
```

## 常见情况

### 服务器卡了

先看负载：

```bash
uptime
free -h
df -h
htop
```

如果只是某个服务卡了，优先重启服务，不要直接重启服务器。

### 磁盘满了

查看磁盘：

```bash
df -h
```

查当前目录下谁占空间：

```bash
du -sh * | sort -h
```

Docker 占空间时，先看：

```bash
docker system df
```

不要随便清理生产服务器，确认不需要旧镜像、缓存、日志后再删。

### SSH 连不上

检查：

- VPS 控制台里服务器是否开机
- 安全组是否放行 22
- 系统防火墙是否放行 22
- IP、用户名、密码或密钥是否正确


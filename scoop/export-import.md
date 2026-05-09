# Scoop 导入导出

Scoop 提供了把"已装的软件清单"导出成一个文件的功能。这个文件可以用来：

- **备份**：万一系统崩了/重装了，能快速恢复
- **换机**：新电脑一行命令把老电脑的软件都装回来（详见 [换机迁移](./migration.md)）
- **环境同步**：多台电脑保持软件列表一致
- **分享**：给朋友推荐你的工具链

## 导出

```bash
scoop export > scoopfile.json
```

这条命令会把当前 scoop 装的所有软件、所有 bucket 写到 `scoopfile.json`。

文件大概长这样（节选）：

```json
{
  "buckets": [
    { "Name": "main", "Source": "https://github.com/ScoopInstaller/Main" },
    { "Name": "extras", "Source": "https://github.com/ScoopInstaller/Extras" }
  ],
  "apps": [
    { "Name": "git", "Source": "main", "Version": "2.45.2" },
    { "Name": "nodejs", "Source": "main", "Version": "22.5.1" },
    { "Name": "vscode", "Source": "extras", "Version": "1.91.1" }
  ]
}
```

可以看到：bucket 列表 + 软件列表（带来源 bucket 和版本）都有了。

### 导出到指定位置

```bash
scoop export > D:\backup\scoopfile.json
```

### 导出后看一下

```bash
cat scoopfile.json
```

或者用编辑器打开看看，确认软件列表完整。

## 导入

在另一台电脑（或重装后），先 [装好 Scoop](https://scoop.sh/)，然后：

```bash
scoop import scoopfile.json
```

Scoop 会自动：

1. 添加文件里列出的所有 bucket
2. 安装所有软件（默认装最新版，不一定和导出时版本一致）

如果想完全一致版本，需要手动指定：

```bash
scoop install git@2.45.2
```

但通常没必要，新版本一般更好。

## 实用技巧

### 定期备份

放在云盘（OneDrive、坚果云）里自动同步：

```bash
scoop export > D:\OneDrive\backup\scoopfile.json
```

也可以扔进自己的 Git 仓库做版本管理，能看到自己装了哪些新软件、卸了哪些。

### 配合脚本一键备份

新建一个 `backup-scoop.bat`：

```bat
@echo off
scoop export > D:\backup\scoopfile-%date:~0,4%%date:~5,2%%date:~8,2%.json
echo 备份完成
pause
```

双击就能生成带日期的备份文件，比如 `scoopfile-20260510.json`。

### 只导出软件名（旧版方式）

旧版 Scoop 的 `scoop export` 输出是文本格式（每行一个软件名）。新版默认 JSON。如果你看到的是旧格式，可能是 Scoop 没更新，跑一下：

```bash
scoop update
```

## 常见问题

**Q：导出文件可以手动编辑吗？**
A：可以。删掉某些不想在新机器装的软件、加上一些想装的，都行。注意保持 JSON 格式正确。

**Q：导入会覆盖已装的软件吗？**
A：不会。已经装过的会跳过，只装没有的。

**Q：导入失败、某个软件装不上怎么办？**
A：通常是因为：
- 对应 bucket 没成功添加（网络问题）
- 软件已经从源里删掉了
- 系统版本不兼容

可以单独跑 `scoop install <软件名>` 看具体报错，跳过装不上的继续装其他的。

**Q：能导出软件的配置文件吗？**
A：不能。`scoop export` 只导出软件清单，不包含软件自己的配置（比如 VS Code 的插件、Git 的 user.name）。这些需要单独备份。

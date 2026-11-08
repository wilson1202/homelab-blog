---
title: WSL SSH 服务自启动与配置指南
createTime: 2025/11/20 15:59:49
permalink: /blog/73zyziql/
---

## 问题背景

在默认配置下，WSL (Windows Subsystem for Linux) 实例启动时不会自动拉起后台服务。导致每次打开 WSL 终端后，都必须手动运行 `sudo service ssh restart` 才能通过 SSH 连接。

## 解决方案：启用 Systemd

::: tip 推荐方案
通过开启 WSL 2 的 `systemd` 支持，可以让 SSH 服务像在标准 Linux 服务器上一样开机自启。
:::

### 第一步：修改 WSL 启动配置

在 WSL 终端中执行以下命令：

1. 编辑配置文件：

```bash
sudo nano /etc/wsl.conf
```

2. 添加（或修改）以下内容：

```ini
[boot]
systemd=true
```

3. 保存并退出（`Ctrl+O` 保存 → `Enter` 确认 → `Ctrl+X` 退出）

### 第二步：重启 WSL 实例

配置需要重启 WSL 才能生效。请**关闭所有 WSL 窗口**，然后在 Windows 的 **PowerShell** 中执行：

```powershell
wsl --shutdown
```

### 第三步：启用 SSH 服务自启

重新打开 WSL 终端，此时 Systemd 已经生效。执行以下命令将 SSH 加入自启列表：

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

::: info
如果看到 `Synchronizing state of ssh.service...` 的提示，说明设置成功。
:::

## 进阶配置：允许 Root 用户登录

::: warning 注意
由于 WSL 默认常以 Root 身份操作，而 SSH 默认配置通常禁止 Root 用户使用密码登录，因此需要修改 SSH 配置文件，否则连接时会提示"密码错误"或"Permission denied"。
:::

### 修改 SSHD 配置

1. 在 WSL 中编辑 SSH 配置文件：

```bash
sudo nano /etc/ssh/sshd_config
```

2. 找到并修改以下参数（如果被注释掉，请删除行首的 `#`）：

- **允许 Root 登录：**

```plaintext
PermitRootLogin yes
```

- **允许密码验证**（通常默认为 yes，确认一下）：

```plaintext
PasswordAuthentication yes
```

3. 重启 SSH 服务使配置生效：

```bash
sudo systemctl restart ssh
```

## 验证与测试

### 检查服务状态

在 WSL 中运行：

```bash
systemctl status ssh
```

::: success 正常状态
显示绿色的 `active (running)`
:::

### 测试连接

在 Windows PowerShell 或 CMD 中尝试连接：

```powershell
# 默认连接本地 WSL
ssh root@localhost
```

::: note
如果 Windows 也占用了 22 端口，可能需要修改 WSL 的 SSH 端口为 2222 等其他端口
:::

## 扩展阅读

如需配置端口转发，以便让局域网内的其他设备访问您的 WSL，可以查阅相关网络配置文档。
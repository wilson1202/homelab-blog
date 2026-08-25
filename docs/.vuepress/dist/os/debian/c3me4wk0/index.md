---
url: /os/debian/c3me4wk0/index.md
---
在 **Debian 12** 系统中开启允许 SSH 远程 Root 登录的步骤如下：

***

### **步骤 1：修改 SSH 服务端配置**

1. **备份原配置文件**（避免操作失误）：

   ```bash
   sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
   ```

2. **编辑 SSH 配置文件**：

   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

3. **找到并修改以下参数**：

   * 将 `PermitRootLogin` 的值改为 `yes`（如果行首有 `#` 注释符，需删除注释）：

     ```ini
     PermitRootLogin yes
     ```

   * 确保允许密码认证（如果禁用密码需同时修改）：

     ```ini
     PasswordAuthentication yes
     ```

4. **保存并退出编辑器**（Nano 快捷键：`Ctrl+O` 保存，`Ctrl+X` 退出）。

***

### **步骤 2：重启 SSH 服务**

```bash
sudo systemctl restart ssh
```

***

### **步骤 3：验证配置**

1. **检查服务状态**：

   ```bash
   sudo systemctl status ssh
   ```

   * 确保服务处于 `active (running)` 状态。

2. **测试远程 Root 登录**（从另一台机器执行）：

   ```bash
   ssh root@your_server_ip
   ```

   * 输入 Root 密码，确认能否成功登录。

***

### **步骤 4：配置防火墙放行 SSH**

如果系统启用了防火墙（如 `ufw`），需放行 SSH 端口（默认 `22`）：

```bash
sudo ufw allow 22/tcp
sudo ufw reload
```

***

### **恢复默认配置（禁止 Root 登录）**

1. 将 `PermitRootLogin` 改为 `no` 或 `prohibit-password`：

   ```ini
   PermitRootLogin prohibit-password
   ```

2. 重启 SSH 服务：

   ```bash
   sudo systemctl restart ssh
   ```

***

### **总结**

* **风险提示**：直接开放 Root 远程登录会增加服务器被暴力破解的风险，建议仅在必要时临时开启。
* **推荐替代方案**：通过普通用户登录后切换至 Root（`su -` 或 `sudo`）。

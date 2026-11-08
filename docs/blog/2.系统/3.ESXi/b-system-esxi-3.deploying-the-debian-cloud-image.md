---
title: ESXi 部署 debian cloud 镜像
createTime: 2025/11/19 21:27:25
permalink: /article/gno53kkv/
tags:
  - esxi
  - vm
  - cloud
---
## 一、下载 Debian Cloud Image

- 官方地址：[https://cloud.debian.org/images/cloud/](https://cloud.debian.org/images/cloud/)

- 下载后假设文件名为：`debian.qcow2`

## 二、转换为 ESXi 可用 VMDK

- 先转换成 raw（如果原始是 qcow2）：

    ```bash
    qemu-img convert -f qcow2 -O raw debian.qcow2 debian.raw
    ```

- 然后转换成 ESXi 可识别 VMDK：

    ```bash
    qemu-img convert -f raw -O vmdk \
      -o adapter_type=lsilogic,subformat=monolithicFlat \
      debian.raw debian.vmdk
    ```

::: note

- `adapter_type=lsilogic` → SCSI 控制器，ESXi 支持
- `subformat=monolithicFlat` → ESXi 可以直接开机

:::

## 三、创建 cloud-init 配置

- **user-data**（在 `/root/user-data`）：

```yaml
#cloud-config
users:
  - name: debian
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    lock_passwd: false

chpasswd:
  list: |
    debian:123456
  expire: false
```

- **meta-data**（在 `/root/meta-data`）：

```text
instance-id: debian-01
local-hostname: debian
```

## 四、生成 seed.iso

```bash
cloud-localds /root/seed.iso /root/user-data /root/meta-data
```

::: info 生成成功后，得到 `/root/seed.iso`，这个 ISO 用于 cloud-init 初始化用户

:::

## 五、在 ESXi 创建虚拟机

::: steps

1. 创建新 VM：
   - 类型：Linux → Debian 13 / 64-bit
   - SCSI 控制器：LSI Logic SAS
2. 上传 `debian.vmdk` 到 datastore
3. 上传 `seed.iso` 到 datastore
4. 在 VM 设置中：
   - 把 `debian.vmdk` 作为主硬盘
   - 把 `seed.iso` 挂载到 CD-ROM
5. 确保 CD-ROM 设置为 **开机启动**（optional，但第一次启动可用）

:::

## 六、启动虚拟机

- 首次启动：
  - cloud-init 会读取 `seed.iso`
  - 自动创建用户 `debian`，密码 `123456`
- 登录：

    ```text
    用户名：debian
    密码：123456
    ```

- 验证 sudo/root：

    ```bash
    sudo -i
    ```

## 七、清理（可选）

- 登录后可卸载 seed.iso
- 删除 `/root/seed.iso`，避免重复 cloud-init 修改
- 修改用户密码或创建更多用户

::: important 注意事项

1. **不要直接尝试 root 登录**，Cloud Image 默认锁定 root
2. **raw → VMDK 转换必须用 monolithicFlat**
3. **streamOptimized VMDK 只能用于 OVF/OVA 导入**，不能直接开机

:::

## 八、开启 SSH 登录

1. **备份原配置文件**（避免操作失误）：

   ```
   sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak 
   ```

2. **编辑 SSH 配置文件**：

    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

3. **找到并修改以下参数**：

   - 将 `PermitRootLogin` 的值改为 `yes`（如果行首有 `#` 注释符，需删除注释）：

        ```ini
        PermitRootLogin yes    # [!code word:yes]
        ```
        
   - 确保允许密码认证（如果禁用密码需同时修改）：

        ```ini
        PasswordAuthentication yes    # [!code word:yes]
        ```

4. **保存并退出编辑器**（Nano 快捷键：`Ctrl+O` 保存，`Ctrl+X` 退出）。

5. **重启 SSH 服务**:

    ```bash
    sudo systemctl restart ssh 
    ```


## 九、其他配置

1. 给root用户设定密码

    ```bash
    sudo passwd root 
    ```

2. 查看当前网络接口

   ```bash
   ip a
   ```



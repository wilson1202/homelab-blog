---
title: ESXi 直通 SATA 控制器
createTime: 2025/05/28 22:20:25
permalink: /article/uvr6yekg/
tags:
  - pci
  - esxi
  - vm
---

## PCI 设备直通

**VMware ESXi** 环境下的一种底层直通机制，通过手动编辑 `passthru.map` 文件来实现 PCI 设备的直通控制。这个方案适用于**将物理控制器设备（如 SATA 控制器）Passthrough 给虚拟机**，它是 **PCI Passthrough（设备直通）** 的一种方式。

------

### 🔍 详细解释：

#### 你执行的命令：

```bash
lspci -v | grep "Class 0106" -B 1
```

输出：

```ini
0000:00:17.0 Mass storage controller SATA controller: Intel Corporation Comet Lake SATA AHCI Controller 
         Class 0106: 8086:06d2
```

说明你的 ESXi 主机上有一块 **SATA AHCI 控制器（类代码 0106）**，其 PCI ID 是 `8086:06d2`。

------

#### 修改 `passthru.map` 文件：

```bash
vi /etc/vmware/passthru.map

# 添加以下内容
8086   06d2    d3d0    false
```

字段含义如下：

```
VendorID  DeviceID  SubsystemID  passthru
```

- `8086`：Intel 的厂商 ID
- `06d2`：设备 ID
- `d3d0`：子系统 ID（可任意填，常见写法）
- `false`：表示不启用 MSI/MSI-X，适用于部分直通设备需要禁用中断映射

------

### ✅ 这是哪种直通方案？

这是 **VMware ESXi 的 PCI Device Passthrough**（也称 DirectPath I/O）：

> 允许将物理主机的 PCI 设备（如网卡、SATA 控制器、NVMe 控制器等）**直接分配给虚拟机使用**，绕过 hypervisor 的抽象层，从而提升性能或实现直接硬件访问。

------

### ⚠️ 注意事项：

1. 使用这种方式直通 SATA 控制器后，该控制器下挂载的物理硬盘将**不再被 ESXi 识别**，而只能由直通到的虚拟机使用。
2. 有些主板的 SATA 控制器不支持 IOMMU 隔离，可能导致 passthrough 失败。
3. 配置完成后，需重启 ESXi 并在虚拟机设置中添加对应的 PCI 设备。

------

### 🧩 附加建议：

要检查 IOMMU 和直通可用状态，可以在 ESXi Shell 中执行：

```bash
vmkchdev -l | grep 06d2
```

要启用 passthrough：

```bash
vmkchdev -v 0000:00:17.0 -p
```

------

如你希望进一步直通硬盘本身而非控制器，也可以考虑使用 **RDM（Raw Device Mapping）**，这两者用途略有不同：

| 方案            | 用途                      | 适用场景                  |
| --------------- | ------------------------- | ------------------------- |
| PCI Passthrough | 直通整个 SATA/NVMe 控制器 | 高性能、ZFS、软 RAID 场景 |
| RDM             | 直通单块物理硬盘          | 精细控制单块磁盘映射      |

如果你告诉我你想用它来运行什么系统（如 TrueNAS、Unraid、直通给 Linux 做 ZFS 等），我可以进一步帮你判断是否适合这种 passthrough。

## RDM 原始设备映射

- 创建一个 **.vmdk 文件指向物理硬盘**（ESXi 不直通控制器，仅传递磁盘路径）。

- 通过 `vmkfstools -z` 命令建立 RDM 映射，如：

  ```bash
  vmkfstools -z /vmfs/devices/disks/t10.ATA_____Disk123456 /vmfs/volumes/datastore1/vmname/disk1.vmdk
  ```


---
url: /vm/esxi/yi854kwn/index.md
---
## 概述

把物理存储设备交给 ESXi 上的虚拟机独占使用，常见有两种层次的方案：

* **PCI 设备直通（DirectPath I/O）**：把整块 SATA/NVMe 控制器直接分配给虚拟机，绕过 hypervisor 的磁盘抽象层，性能最好，适合跑 ZFS、软 RAID 等需要直接管理磁盘的场景。
* **RDM（Raw Device Mapping）**：不碰控制器，只把单块物理硬盘以映射盘的形式挂给虚拟机，控制更精细，但虚拟机看到的是一块「磁盘」而非真实控制器。

下文分别记录两种方案的配置过程，最后给出选型对比。

## 一、PCI 设备直通（SATA 控制器）

### 1. 识别目标设备

先确认主机上的 SATA 控制器及其 PCI ID：

```bash
lspci -v | grep "Class 0106" -B 1
```

输出示例：

```ini
0000:00:17.0 Mass storage controller SATA controller: Intel Corporation Comet Lake SATA AHCI Controller
         Class 0106: 8086:06d2
```

`Class 0106` 即 SATA 存储控制器类代码，本例中厂商/设备 ID 为 `8086:06d2`。

### 2. 编辑 passthru.map

ESXi 通过 `/etc/vmware/passthru.map` 维护 PCI 设备直通名单，按 `厂商ID 设备ID 子系统ID 是否启用MSI` 的格式逐行登记：

```bash
vi /etc/vmware/passthru.map

# 追加一行
8086   06d2    d3d0    false
```

各字段含义：

```
VendorID  DeviceID  SubsystemID  passthru
```

* `8086`：Intel 厂商 ID
* `06d2`：设备 ID
* `d3d0`：子系统 ID 占位值，此处任意填写均可
* `false`：不启用 MSI/MSI-X 中断映射，部分设备直通后需要关闭才能正常工作

### 3. 验证与启用

重启前可在 ESXi Shell 中确认设备是否进入直通就绪状态：

```bash
vmkchdev -l | grep 06d2
```

对目标设备启用直通（修改 passthru.map 后需执行）：

```bash
vmkchdev -v 0000:00:17.0 -p
```

完成后重启 ESXi，在虚拟机设置的「添加 PCI 设备」中选择该控制器即可。

> \[!warning]
>
> 1. 控制器被直通后，其下挂载的所有物理硬盘将不再被 ESXi 识别，只能由对应虚拟机独占访问。
> 2. 部分主板 SATA 控制器不具备独立 IOMMU 分组，会导致直通失败或连带影响其他设备。
> 3. 直通生效依赖硬件支持 ACS/IOMMU，操作前建议在 BIOS 中确认 VT-d 已开启。

## 二、RDM 原始设备映射

RDM 不直通控制器，而是在 ESXi 层为某块物理硬盘创建一枚指向它的 `.vmdk` 映射文件，虚拟机通过这块映射盘访问真实磁盘。建立映射使用 `vmkfstools -z`：

```bash
vmkfstools -z /vmfs/devices/disks/t10.ATA_____Disk123456 /vmfs/volumes/datastore1/vmname/disk1.vmdk
```

映射盘创建后，将其作为现有硬盘添加到虚拟机即可，底层磁盘路径保持不变。

## 三、方案选型

| 方案            | 用途                      | 适用场景                  |
| --------------- | ------------------------- | ------------------------- |
| PCI Passthrough | 直通整个 SATA/NVMe 控制器 | 高性能、ZFS、软 RAID 场景 |
| RDM             | 直通单块物理硬盘          | 精细控制单块磁盘映射      |

> \[!TIP]
> 要给虚拟机整块控制器、追求性能、需要虚拟机直接管理磁盘（如 ZFS、软 RAID），选 PCI 直通；只想把某一两块盘单独交给虚拟机、又不想动控制器，选 RDM。

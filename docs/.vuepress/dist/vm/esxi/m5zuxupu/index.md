---
url: /vm/esxi/m5zuxupu/index.md
---
## PCI 设备直通

VMware ESXi 提供两种层次的硬件直通能力，其中 PCI 设备直通（又称 DirectPath I/O）是把整块物理控制器直接分配给虚拟机使用，绕过 hypervisor 的磁盘抽象层。本文以 SATA 控制器为例，记录从识别设备到启用直通的全过程。

### 识别目标设备

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

### 编辑 passthru.map

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

### 验证与启用

重启前可在 ESXi Shell 中确认设备是否进入直通就绪状态：

```bash
vmkchdev -l | grep 06d2
```

对目标设备启用直通（修改 passthru.map 后需执行）：

```bash
vmkchdev -v 0000:00:17.0 -p
```

完成后重启 ESXi，在虚拟机设置的「添加 PCI 设备」中选择该控制器即可。

### 注意事项

1. 控制器被直通后，其下挂载的所有物理硬盘将不再被 ESXi 识别，只能由对应虚拟机独占访问。
2. 部分主板 SATA 控制器不具备独立 IOMMU 分组，会导致直通失败或连带影响其他设备。
3. 直通生效依赖硬件支持 ACS/IOMMU，操作前建议在 BIOS 中确认 VT-d 已开启。

### 与 RDM 的取舍

若只想把单块硬盘交给虚拟机而非整块控制器，可考虑 RDM（Raw Device Mapping），二者定位不同：

| 方案            | 用途                      | 适用场景                  |
| --------------- | ------------------------- | ------------------------- |
| PCI Passthrough | 直通整个 SATA/NVMe 控制器 | 高性能、ZFS、软 RAID 场景 |
| RDM             | 直通单块物理硬盘          | 精细控制单块磁盘映射      |

## RDM 原始设备映射

RDM 不直通控制器，而是在 ESXi 层为某块物理硬盘创建一枚指向它的 `.vmdk` 映射文件，虚拟机通过这块映射盘访问真实磁盘。建立映射使用 `vmkfstools -z`：

```bash
vmkfstools -z /vmfs/devices/disks/t10.ATA_____Disk123456 /vmfs/volumes/datastore1/vmname/disk1.vmdk
```

映射盘创建后，将其作为现有硬盘添加到虚拟机即可，底层磁盘路径保持不变。

---
url: /router/routeros/index.md
---
# RouterOS 折腾手记

## 介绍

RouterOS 路由器的安装以及折腾手记。

* RouterOS 适用版本：7.21.5 LongTerm

* 演示机：
  * 虚拟化：Proxmox VE
  * CPU：host
  * 内存：2GB
  * 网卡：VirtIO
  * SCSI 控制器：VirtIO SCSI Single

* 外部网络：
  * 光猫：桥接模式
  * RouterOS：`PPPoE`

* 内部网络：
  * IPv4 网络
    * IP 地址：`172.16.1.1`
    * 子网掩码：`255.255.255.0` ( 即 `/24` )
    * 网关：`172.16.1.1`
    * 内网 DNS：`172.16.1.2` , `172.16.1.3`
  * IPv6 网络
    * 分配方式：`SLAAC`
    * GUA 前缀：`Prefix Delegation`
    * ULA 前缀：使用 `fdac::/64` 作为演示

### 系列章节

0. [ PVE 下安装系统](./00.PVE下安装系统.md)
1. [正版系统激活](./01.正版系统激活.md)
2. [设置网络接口](./02.设置网络接口.md)
3. [设置 DNS](./03.设置DNS.md)
4. [设置 DHCPv4](./04.设置DHCPv4.md)
5. [设置防火墙](./05.设置防火墙.md)
6. [设置流量整形](./06.设置流量整形.md)
7. [设置定时任务](./07.设置定时任务.md)
8. [设置 IPv6 ](./08.设置IPv6.md)
9. [设置系统参数](./09.设置系统参数.md)

### 附录

A.  [命令行配置脚本](./A.命令行配置脚本.md)

### 文章说明

1. 本系列文章涉及的部分参数需要手动调整来符合切实使用需求。
2. 随着 RouterOS 系统的迭代更新，截图中的内容和实际页面显示可能存在差异。
3. 此文来源于 Gitee [狐狸 Nomad](https://gitee.com/callmer/routeros_toss_notes)。

---
title: B.常用命令
createTime: 2026/08/26 20:04:46
permalink: /router/routeros/ew4jqxnm/
badge:
  text: 新增
  type: tip
---
## 1.修改静态IP

```bash
# 打印/查看所有 DHCP 租约列表（用于查找设备当前获取到的 IP 和 MAC 地址）
/ip dhcp-server lease print

# 将指定 MAC 地址的动态 DHCP 租约转换为静态绑定（锁定 MAC 与 IP 的分配关系）
/ip dhcp-server lease make-static [find where mac-address=XX:XX:XX:XX:XX:XX]

# 将指定 MAC 地址的静态租约 IP 地址修改为 10.0.0.103
/ip dhcp-server lease set [find where mac-address=XX:XX:XX:XX:XX:XX] address=10.0.0.103
```




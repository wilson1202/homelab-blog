---
title: VMware ESXi 项目导航
createTime: 2026/08/24 22:30:13
permalink: /vm/esxi/
---

## 概述

本仓库用于归纳 VMware ESXi（当前随 vSphere 9.1 发布，文档基线 2026-08-25；仍在用版本含 8.0、7.0）相关的操作记录、排查笔记与官方资料索引。

ESXi 是 VMware 的 Type-1 裸金属 hypervisor，本身只负责单机宿主（宿主安装、虚拟机运行、本地存储/网络、Host Client 管理）。注意区分：**ESXi 是 vSphere 套件中的 hypervisor 组件**，vCenter、集群、HA、vMotion、vSAN Lifecycle Manager 等属于 vSphere 平台层，不在本笔记范围。

本文档只做导航与说明，具体步骤见各子文档。

## 官方资源（ESXi 专属）

### 帮助与文档

| 用途 | 链接 |
| --- | --- |
| vSphere 技术文档（按版本 9.1/9.0/8.0/7.0 切换） | [https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1.html](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1.html) |
| ESXi 安装与设置指南 | [https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/esx-installation-and-setup.html](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/esx-installation-and-setup.html) |
| ESXi 升级指南 | [https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/esx-upgrade.html](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/esx-upgrade.html) |
| VMware Host Client（单主机管理） | [https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/vsphere-single-host-management-vmware-host-client.html](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/vsphere-single-host-management-vmware-host-client.html) |
| ESXi 安全（锁模式 / TPM / 防火墙 / 加固） | [https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/vsphere-security.html](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-1/vsphere-security.html) |

### 下载与支持

| 用途 | 链接 |
| --- | --- |
| Broadcom 支持门户（下载、许可证、工单） | [https://support.broadcom.com](https://support.broadcom.com) |
| 产品生命周期（EOL 查询） | [https://support.broadcom.com/web/ecx/productlifecycle](https://support.broadcom.com/web/ecx/productlifecycle) |

### 社区与开发者

| 用途 | 链接 |
| --- | --- |
| Broadcom 社区（VMware 讨论区） | [https://community.broadcom.com/vmware](https://community.broadcom.com/vmware) |
| 开发者中心（PowerCLI / ESXCLI / API） | [https://developer.broadcom.com](https://developer.broadcom.com) |

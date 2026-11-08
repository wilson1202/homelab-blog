---
title: 在 Debian 12 中修改 IP 地址
createTime: 2025/05/25 22:33:58
permalink: /article/tzyvq2jl/
tags:
  - ip
  - dns
  - debian
---
> 新安装的 Debian 系统，默认一般使用 DHCP 获取 IP 地址，除非在安装过程中，使用了指定的 IP 地址。本文将介绍如何在 Debian 系统中，配置使用静态 IP 地址，配置网关，以及设置 DNS 服务器。
>

这些配置通过修改配置文件，很容易实现。在 Redhat 系列的 Linux 环境中，我们一般修改网卡的网络配置文件，对应的文件名为 `/etc/sysconfig/network-scripts/ifcfg-eXX`{.filepath}，其中  <kbd>eXX</kbd> 即为网络设备名。网络设备的列表可以他通过 `ifconfig` 命令获取。同样的，在 Debian 环境下，我们只需要修改网络的配置文件便可以了。相比之下，配置过程要比 Redhat 更为方便，只需要修改 `/etc/network/interfaces`{.filepath} 文件。

::: important 以 `root` 权限打开 `/etc/network/interfaces`{.filepath}

:::

## Debian 系统设置静态 IP 地址、网关

首选备份原始的网络配置文件

```bash
sudo cp /etc/network/interfaces  /etc/network/interfacesbak
```

编辑文件 `/etc/network/interfaces`{.filepath}，内容如下：

```ini title="interface"
# The loopback network interface
auto lo
auto eth0  #设置开机自动连接网络
iface lo inet loopback

# The primary network interface
allow-hotplug eth0
iface eth0 inet static   #static表示使用固定IP地址上网，dhcp表示使用动态ip
address 192.168.9.100    #设置静态ip地址
netmask 255.255.255.0    #子网掩码
gateway 192.168.9.254    #网关
```

使用 <kbd>Ctrl + O</kbd> 保存配置，使用 <kbd>Ctrl + X</kbd> 退出 **nano** 编辑器。

## 配置 Debian 环境中的 DNS 服务器

这个配置过程与 ::devicon:redhat-wordmark =24px:: 系列的系统是相同的，只需要修改 `/etc/resolv.conf`{.filepath} 文件即可，内容如下，

```ini title="resolv.conf"
nameserver 114.114.114.114   #设置首选dns
nameserver 8.8.8.8   #设置备用dns
```

至此，IP地址、网关、DNS配置完成。

重启网络使配置生效：

```bash
sudo service networking restart
```

检查新配置是否工作：

```bash
ping www.debian.cn
```

::: warning 如果重启网络后，配置并没有生效

1. 请检查是否有书写错误，比如全角和半角字符；
2. `interfaces`{.filepath} 文件中 `auto eth0` 也很关键， `/etc/init.d/networking`{.filepath} 根据这个字段判断是否启动某个网卡的网络；

:::

## 参考

[debian 11修改ip地址的方法 - Thenext - 博客园](https://www.cnblogs.com/Thenext/p/16950850.html)

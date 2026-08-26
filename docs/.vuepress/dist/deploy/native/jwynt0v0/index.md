---
url: /deploy/native/jwynt0v0/index.md
---
## 概述

SmartDNS 是一款本地 DNS 服务器，通过多上游并发查询、测速选快等机制提升 DNS 解析速度与准确性。本文记录在 Linux（x86 及 ARM/Debian 系）上安装 SmartDNS、检查并解决 53 端口冲突、修改上游配置、启动服务，并将局域网 DNS 请求转发至 SmartDNS 的完整流程。

官网：<https://pymumu.github.io/smartdns/>

Github：<https://github.com/pymumu/smartdns>

## 一、Linux 安装

1. 标准 Linux 系统（X86 / X86\_64），下载配套安装包并上传后执行：

   ```bash
   tar zxf smartdns.1.yyyy.MM.dd-REL.x86_64-linux-all.tar.gz
   cd smartdns
   chmod +x ./install
   ./install -i
   ```

2. 树莓派或其他 Debian 系系统（ARM / ARM64），执行：

   ```bash
   dpkg -i smartdns.1.yyyy.MM.dd-REL.arm-debian-all.deb
   ```

## 二、检查 53 端口占用

```bash
# 方法1（推荐）：直接显示占用53端口的进程信息
lsof -i :53

# 方法2：使用 netstat 查看
netstat -tulpn | grep :53
```

> \[!CAUTION]
> 在 Ubuntu 系统下，`systemd-resolved` 会占用 `TCP 53` 和 `UDP 53` 端口，需手动解决端口冲突或改 SmartDNS 监听端口。SmartDNS 日志位于 `/var/log/smartdns/smartdns.log`。

**方案一：关闭 DNS 存根监听器，使其不再监听 53 端口**

1. 修改配置文件：

   ```bash
   sudo nano /etc/systemd/resolved.conf
   ```

2. 取消注释并修改以下行：

   ```ini
   DNSStubListener=no
   ```

3. 重启 `systemd-resolved` 使配置生效：

   ```bash
   sudo systemctl restart systemd-resolved
   ```

**方案二：关闭 `systemd-resolved` 服务**

1. 立即停止：

   ```bash
   sudo systemctl stop systemd-resolved
   ```

2. 永久禁用：

   ```bash
   sudo systemctl disable systemd-resolved
   ```

## 三、修改配置

安装完成后，配置 SmartDNS 的上游服务器。一般情况下只需增加 `server [IP]:port` 与 `server-tcp [IP]:port` 两项，并尽可能配置多个国内外上游。完整参数见官方配置文件说明。

编辑配置文件：

```bash
nano /etc/smartdns/smartdns.conf
```

配置包含如下基本内容：

```ini
# 指定监听的端口号
bind []:53
# 指定上游服务器
server 1.1.1.1
server-tls 8.8.8.8
# 指定域名规则
address /example.com/1.2.3.4
domain-rules /example.com/ -address 1.2.3.4
```

## 四、启动服务

```bash
systemctl enable smartdns
systemctl start smartdns
```

## 五、将 DNS 请求转发到 SmartDNS

修改本地路由器的 DNS 服务器，将其指向运行 SmartDNS 的主机（如树莓派）：

* 登录本地路由器，为运行 SmartDNS 的设备分配静态 IP。
* 将 WAN 口或 DHCP 下发的 DNS 改为该设备 IP。

> \[!WARNING]
>
> 1. 不同品牌路由器配置方式不同，请自行搜索对应方法。
> 2. 华为等部分路由器不支持将 DNS 设为本地 IP，此时可改为在电脑或手机端手动指定 DNS 为该设备 IP。

## 六、检测服务是否配置成功

执行如下命令：

```bash
nslookup -querytype=ptr smartdns
```

查看结果中的 `name` 是否为 `smartdns` 或你的主机名，若是则表示生效：

```text
$ nslookup -querytype=ptr smartdns
Server:         192.168.1.1
Address:        192.168.1.1#53

Non-authoritative answer:
smartdns        name = smartdns.
```

## 参考

* [标准 Linux 系统 / 树莓派 - SmartDNS](https://pymumu.github.io/smartdns/install/linux/)

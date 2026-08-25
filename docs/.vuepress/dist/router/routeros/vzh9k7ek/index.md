---
url: /router/routeros/vzh9k7ek/index.md
---
## 1.命令行配置 RouterOS

经过这段时间对 RouterOS 各类基础配置的整理，发现即使是熟练使用 Winbox 来配置，也需要消耗大量的时间。

因此我这里整理了一份纯命令行配置 RouterOS CHR 版本的脚本，请查阅文件 [ros\_shortcut.chr.pppoe.expert.conf](/src/router/routeros/shortcut/ros_shortcut.chr.pppoe.expert.conf) 。

对于 RouterOS 官方硬件配置脚本，例如 E50UG ，请参考文件 [ros\_shortcut.native.pppoe.advanced.conf](/src/router/routeros/shortcut/ros_shortcut.native.pppoe.advanced.conf) 。

同时，基于 E50UG 自带的初始化脚本（初级防火墙版本），请参考文件 [ros\_shortcut.native.pppoe.basic.conf](/src/router/routeros/shortcut/ros_shortcut.native.pppoe.basic.conf) 。

脚本包含了配置 RouterOS 的必要内容，其余事项在文件中有额外说明，希望能够减少大家初始化配置 RouterOS 的时间 :) 。

## 2.配置脚本说明

所有脚本文件放置路径为 [src目录](./src) ，具体说明如下：

|目录名称|文件名|说明|适用对象|
|:--:|--|--|:--:|
|[interfaces](/src/router/routeros/interfaces)|[ros\_define\_interfaces.dhcp.conf](/src/router/routeros/interfaces/ros_define_interfaces.dhcp.conf)|定义接口脚本，适用于光猫拨号场景|官方硬件 / CHR|
||[ros\_define\_interfaces.pppoe.conf](/src/router/routeros/interfaces/ros_define_interfaces.pppoe.conf)|定义接口脚本，适用于 PPPoE 拨号场景|官方硬件 / CHR|
|-|-|-|-|
|[firewall](/src/router/routeros/firewall)|[ros\_blackhole\_ipv4.conf](/src/router/routeros/firewall/ros_blackhole_ipv4.conf)|IPv4 黑洞路由脚本|官方硬件 / CHR|
||[ros\_blackhole\_ipv6.conf](/src/router/routeros/firewall/ros_blackhole_ipv6.conf)|IPv6 黑洞路由脚本|官方硬件 / CHR|
||[ros\_firewall\_ipv4.dhcp.basic.conf](/src/router/routeros/firewall/ros_firewall_ipv4.dhcp.basic.conf)|DHCP 模式，IPv4 初级防火墙|官方硬件 / CHR|
||[ros\_firewall\_ipv4.dhcp.advanced.conf](/src/router/routeros/firewall/ros_firewall_ipv4.dhcp.advanced.conf)|DHCP 模式，IPv4 高级防火墙|官方硬件 / CHR|
||[ros\_firewall\_ipv4.dhcp.expert.conf](/src/router/routeros/firewall/ros_firewall_ipv4.dhcp.expert.conf)|DHCP 模式，IPv4 高级防火墙，内网 DNS ，Fasttrack 关闭，DDoS 防御|官方硬件 / CHR|
||[ros\_firewall\_ipv4.pppoe.basic.conf](/src/router/routeros/firewall/ros_firewall_ipv4.pppoe.basic.conf)|PPPoE 模式，IPv4 初级防火墙|官方硬件 / CHR|
||[ros\_firewall\_ipv4.pppoe.advanced.conf](/src/router/routeros/firewall/ros_firewall_ipv4.pppoe.advanced.conf)|PPPoE 模式，IPv4 高级防火墙|官方硬件 / CHR|
||[ros\_firewall\_ipv4.pppoe.expert.conf](/src/router/routeros/firewall/ros_firewall_ipv4.pppoe.expert.conf)|PPPoE 模式，IPv4 高级防火墙，内网 DNS ，Fasttrack 关闭，DDoS 防御|官方硬件 / CHR|
||[ros\_firewall\_ipv6.pppoe.basic.conf](/src/router/routeros/firewall/ros_firewall_ipv6.pppoe.basic.conf)|PPPoE 模式，IPv6 初级防火墙|官方硬件 / CHR|
||[ros\_firewall\_ipv6.pppoe.advanced.conf](/src/router/routeros/firewall/ros_firewall_ipv6.pppoe.advanced.conf)|PPPoE 模式，IPv6 高级防火墙|官方硬件 / CHR|
||[ros\_firewall\_ipv6.pppoe.expert.conf](/src/router/routeros/firewall/ros_firewall_ipv6.pppoe.expert.conf)|PPPoE 模式，IPv6 高级防火墙，内网 DNS ，Fasttrack 关闭，DDoS 防御|官方硬件 / CHR|
|-|-|-|-|
|[system](/src/router/routeros/system)|[ros\_sys\_hardened.conf](/src/router/routeros/system/ros_sys_hardened.conf)|系统安全增强脚本|官方硬件 / CHR|
|-|-|-|-|
|[qos](/src/router/routeros/qos)|[ros\_qos\_cake.conf](/src/router/routeros/qos/ros_qos_cake.conf)|CAKE 算法的 QoS 配置脚本|官方硬件 / CHR|
||[ros\_qos\_fq\_codel.conf](/src/router/routeros/qos/ros_qos_fq_codel.conf)|Fq-CoDel 算法的 QoS 配置脚本|官方硬件 / CHR|
|-|-|-|-|
|[schedule](/src/router/routeros/schedule)|[ros\_schedule\_script.dhcp.conf](/src/router/routeros/schedule/ros_schedule_script.dhcp.conf)|定时任务配置脚本，定时邮件推送，DHCPv4 重播，系统自动升级|官方硬件 / CHR|
||[ros\_schedule\_script.pppoe.conf](/src/router/routeros/schedule/ros_schedule_script.pppoe.conf)|定时任务配置脚本，定时邮件推送，PPPoE 重播，系统自动升级|官方硬件 / CHR|
|-|-|-|-|
|[email](/src/router/routeros/email)|[ros\_email\_log\_worker.conf](/src/router/routeros/email/ros_email_log_worker.conf)|日志收集邮件 推送脚本|官方硬件 / CHR|
||[ros\_email\_res\_worker.native.conf](/src/router/routeros/email/ros_email_res_worker.native.conf)|资源状态邮件 推送脚本|官方硬件|
||[ros\_email\_res\_worker.chr.conf](/src/router/routeros/email/ros_email_res_worker.chr.conf)|资源状态邮件 推送脚本|CHR|
|-|-|-|-|
|[upgrade](/src/router/routeros/upgrade)|[ros\_sys\_upgrade\_worker.conf](/src/router/routeros/upgrade/ros_sys_upgrade_worker.conf)|系统自动更新脚本|官方硬件 / CHR|
|-|-|-|-|
|[shortcut](/src/router/routeros/shortcut)|[ros\_official\_init\_script.conf](/src/router/routeros/shortcut/ros_official_init_script.conf)|官方硬件自带的初始化脚本，仅供研究|官方硬件|
||[ros\_shortcut.native.dhcp.basic.conf](/src/router/routeros/shortcut/ros_shortcut.native.dhcp.basic.conf)|官方硬件配置脚本，DHCP 模式，初级防火墙，暂不支持配置 IPv6 |官方硬件|
||[ros\_shortcut.native.dhcp.advanced.conf](/src/router/routeros/shortcut/ros_shortcut.native.dhcp.advanced.conf)|与前者类似，高级防火墙，Fq-CoDel QoS|官方硬件|
||[ros\_shortcut.native.pppoe.basic.conf](/src/router/routeros/shortcut/ros_shortcut.native.pppoe.basic.conf)|官方硬件配置脚本，PPPoE 模式，初级防火墙，支持配置 IPv6 |官方硬件|
||[ros\_shortcut.native.pppoe.advanced.conf](/src/router/routeros/shortcut/ros_shortcut.native.pppoe.advanced.conf)|与前者类似，高级防火墙，Fq-CoDel QoS|官方硬件|
||[ros\_shortcut.chr.pppoe.advanced.conf](/src/router/routeros/shortcut/ros_shortcut.chr.pppoe.advanced.conf)| CHR 配置脚本，高级防火墙，CAKE QoS，邮件推送，额外日志存储等|CHR|
||[ros\_shortcut.chr.pppoe.expert.conf](/src/router/routeros/shortcut/ros_shortcut.chr.pppoe.expert.conf)|与前者类似，扩展 IPv6 ULA ，内网 DNS ，Fasttrack 关闭，DDoS 防御等|CHR|

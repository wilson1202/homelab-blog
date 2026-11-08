---
url: /vm/pve/pqqankxd/index.md
---
## 概述

Proxmox VE（PVE）默认可能未开启 IPv6 转发与代理 NDP，导致外部无法通过 IPv6 访问管理界面或虚拟机。本文记录两条主线：在 PVE 上开启 IPv6 并放行转发，再通过阿里云 DDNS 脚本，把 PVE 动态获取的全局 IPv6 地址自动绑定到指定域名，并用 crontab 定时刷新。

参考来源：[ProxmoxVE 里设置阿里云 DDNS 动态 IPv6，互联网访问家庭 PVE](https://blog.csdn.net/shyshyshy33/article/details/104440242/)。

## 一、安装依赖

```bash
apt-get install curl dnsutils -y
apt-get install net-tools
```

`net-tools` 提供 `ifconfig`，用于查看网卡已分配的 IPv6 地址。

## 二、查看 IPv6 地址

执行：

```bash
ifconfig
```

找到主网桥（默认一般为 `vmbr0`）的输出来确认全局 IPv6 地址：

```text
vmbr0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.0.2.9  netmask 255.255.255.0  broadcast 0.0.0.0
        inet6 fe80::a8bb:ccff:fedd:eeff  prefixlen 64  scopeid 0x20<link>
        inet6 2001:db8:2851:2e91:a8bb:ccff:fedd:eeff  prefixlen 64  scopeid 0x0<global>  # 全局 IPv6 地址
        ether aa:bb:cc:dd:ee:ff  txqueuelen 1000  (Ethernet)
```

其中 `scopeid 0x0<global>` 一行即为可用的公网 IPv6 地址（示例中的 `2001:db8:...` 为文档占位，实际以你环境输出为准）。后续 DDNS 脚本就是抓取这一行地址。

## 三、解决 dash 兼容性

部分脚本依赖 `bash` 特性，而 Debian 默认 `/bin/sh` 可能指向 `dash`，导致执行异常。将 `/bin/sh` 重新指向 `bash`：

```bash
dpkg-reconfigure dash
```

交互界面选择 **no**（即不把 dash 设为默认 `/bin/sh`，恢复为 bash）。

## 四、开启 IPv6 转发

编辑 sysctl 配置：

```bash
vi /etc/sysctl.conf
```

在末尾追加（如已有对应项则无需重复，`vmbr0` 改成你的主网口名称）：

```bash
# 开启 IPv6 相关参数，其中 vmbr0 改成对应的主网口名称
net.ipv6.conf.vmbr0.accept_ra=2
# IPv6 Packet Forwarding and Proxy NDP
net.ipv6.conf.default.forwarding = 1
net.ipv6.conf.all.forwarding = 1
net.ipv6.conf.default.proxy_ndp = 1
net.ipv6.conf.all.proxy_ndp = 1
```

保存后使配置生效：

```bash
sysctl -p
```

生效后即可通过 `https://[全局IPv6地址]:8006` 访问 PVE 管理界面；若仍无法访问，可尝试重启 PVE。

## 五、配置阿里云 DDNS 脚本

将以下脚本保存为 `/root/aliddns_PVE.sh`：

```bash
aliddnsipv6_ak="阿里AccessKey ID"
aliddnsipv6_sk="阿里Access Key Secret"
aliddnsipv6_name1='二级域名前缀，比如使用nas.abc.com，此处填写nas'
aliddnsipv6_domain='主域名,比如使用abc.com'
aliddnsipv6_ttl="600"

if [ "$aliddnsipv6_name1" = "@" ]
then
  aliddnsipv6_name=$aliddnsipv6_domain
else
  aliddnsipv6_name=$aliddnsipv6_name1.$aliddnsipv6_domain
fi

now=`date`

die () {
    echo $1
}

ipv6s=`ip addr show vmbr0 | grep "inet6.*global" | awk '{print $2}' | awk -F"/" '{print $1}'| tail -n1` || die "$ipv6"

for ipv6 in $ipv6s
do
  #ipv6 = $ipv6
  break
done

echo $ipv6

current_ipv6=`nslookup -query=AAAA $aliddnsipv6_name 2>&1`
#echo $current_ipv6

current_ipv6=`echo "$current_ipv6" | grep 'Address: ' | tail -n1 | awk '{print $NF}'`
echo $current_ipv6

if [ "$?" -eq "0" ]
then
    current_ipv6=`echo "$current_ipv6" | grep 'Address: ' | tail -n1 | awk '{print $NF}'`
    echo $current_ipv6

    if [ "$ipv6" = "$current_ipv6" ]
    then
        echo "skipping"
    fi
# fix when A record removed by manual dns is always update error
else
    unset aliddnsipv6_record_id
fi

timestamp=`date -u "+%Y-%m-%dT%H%%3A%M%%3A%SZ"`

urlencode() {
    # urlencode <string>
    out=""
    while read -n1 c
    do
        case $c in
            [a-zA-Z0-9._-]) out="$out$c" ;;
            *) out="$out`printf '%%%02X' "'$c"`" ;;
        esac
    done
    echo -n $out
}

enc() {
    echo -n "$1" | urlencode
}

send_request() {
    local args="AccessKeyId=$aliddnsipv6_ak&Action=$1&Format=json&$2&Version=2015-01-09"
    local hash=$(echo -n "GET&%2F&$(enc "$args")" | openssl dgst -sha1 -hmac "$aliddnsipv6_sk&" -binary | openssl base64)
    curl -s "http://alidns.aliyuncs.com/?$args&Signature=$(enc "$hash")"
}

get_recordid() {
    grep -Eo '"RecordId":"[0-9]+"' | cut -d':' -f2 | tr -d '"'
}

query_recordid() {
    send_request "DescribeSubDomainRecords" "SignatureMethod=HMAC-SHA1&SignatureNonce=$timestamp&SignatureVersion=1.0&SubDomain=$aliddnsipv6_name&Timestamp=$timestamp&Type=AAAA"
}

update_record() {
    send_request "UpdateDomainRecord" "RR=$aliddnsipv6_name1&RecordId=$1&SignatureMethod=HMAC-SHA1&SignatureNonce=$timestamp&SignatureVersion=1.0&TTL=$aliddnsipv6_ttl&Timestamp=$timestamp&Type=AAAA&Value=$(enc $ipv6)"
}

add_record() {
    send_request "AddDomainRecord&DomainName=$aliddnsipv6_domain" "RR=$aliddnsipv6_name1&SignatureMethod=HMAC-SHA1&SignatureNonce=$timestamp&SignatureVersion=1.0&TTL=$aliddnsipv6_ttl&Timestamp=$timestamp&Type=AAAA&Value=$(enc $ipv6)"
}

#add support */%2A and @/%40 record

if [ "$aliddnsipv6_record_id" = "" ]
then
    aliddnsipv6_record_id=`query_recordid | get_recordid`
    #echo '-----------------' $aliddnsipv6_record_id
fi
if [ "$aliddnsipv6_record_id" = "" ]
then
    aliddnsipv6_record_id=`add_record | get_recordid`
    echo "added record $aliddnsipv6_record_id"
else
    update_record $aliddnsipv6_record_id
    echo "updated record $aliddnsipv6_record_id"
fi
```

> \[!WARNING]
> 脚本以明文保存阿里云 **AccessKey Secret**，等同于账号凭证。务必：使用仅含 DNS 修改权限的子账号 AccessKey；将脚本权限设为 `600`（`chmod 600 /root/aliddns_PVE.sh`）；不要将脚本提交到公开仓库。

需要修改的项：

* 第 1–4 行：`aliddnsipv6_ak` / `aliddnsipv6_sk` 填阿里云 AccessKey；`aliddnsipv6_name1` 填二级域名前缀（如 `nas`）；`aliddnsipv6_domain` 填主域名（如 `abc.com`）。

* 脚本中 `vmbr0` 为网卡名称，改成你实际的主网口（非虚拟机环境一般为 `eth0`）：

  ```bash
  ipv6s=`ip addr show vmbr0 | grep "inet6.*global" | awk '{print $2}' | awk -F"/" '{print $1}'| tail -n1` || die "$ipv6"
  ```

* 如需过滤 `fd50` 开头的 ULA 地址，可在取地址那行加 `grep -v fd50`：

  ```bash
  ipv6s=`ip addr show vmbr0 | grep "inet6.*global" | grep -v fd50 | awk '{print $2}' | awk -F"/" '{print $1}'| tail -n1` || die "$ipv6"
  ```

运行脚本：

```bash
bash /root/aliddns_PVE.sh
```

## 六、添加 crontab 定时任务

编辑定时任务：

```bash
crontab -e
```

追加一行，每十分钟执行一次 DDNS 刷新：

```bash
# 每十分钟运行一次 aliddns_PVE.sh
*/10 * * * * bash /root/aliddns_PVE.sh
```

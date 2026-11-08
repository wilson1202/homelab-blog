---
url: /os/dsm/o502gujg/index.md
---
## 概述

Synology DSM 7.2 的 Web 服务默认占用 80/443 端口。若需在群晖上部署其他依赖这两个端口的服务（如反向代理、自有 Web 服务器），需先释放端口。本文通过修改 nginx 的模板文件（`.mustache`）中的端口号，将 DSM 的 Web 端口改为 12080/12443，从而让出 80/443。

参考来源：[群晖解除默认的 80/443 端口占用](https://www.cnblogs.com/zhengdaojie/p/16019318.html)

## 一、开启 SSH 与 root 权限

1. 在 DSM 控制面板开启 SSH：

   `控制面板` → `终端机和 SNMP` → `终端机` → `启动 SSH 功能`（默认端口 22）。

2. 用 PuTTY 等工具 SSH 登录，并提权为 root：

   ```bash
   sudo -i
   ```

   登录回显示例：

   ```text
   login as: qh
   qh@10.0.0.6's password:
   qh@DS918:/$ sudo -i
   Password:
   root@DS918:~#
   ```

## 二、修改 nginx 模板端口

1. 放宽模板文件权限以便编辑（修改后务必还原）：

   ```bash
   chmod -R 0777 /usr/syno/share/nginx/server.mustache
   chmod -R 0777 /usr/syno/share/nginx/DSM.mustache
   chmod -R 0777 /usr/syno/share/nginx/WWWService.mustache
   ```

   > \[!WARNING]
   > `0777` 意味着任意用户可读写执行，属临时放宽权限，仅用于编辑期间。操作完成后必须按本节第 3 步还原为 `0644`，切勿长期保留 `0777`。

2. 用 WinSCP（或 SCP）将以下三个文件下载到本地，把其中的 `80` 和 `443` 改为 `12080` 和 `12443`，再回传覆盖：

   * `/usr/syno/share/nginx/server.mustache`
   * `/usr/syno/share/nginx/DSM.mustache`
   * `/usr/syno/share/nginx/WWWService.mustache`

3. 还原文件权限：

   ```bash
   chmod -R 0644 /usr/syno/share/nginx/server.mustache
   chmod -R 0644 /usr/syno/share/nginx/DSM.mustache
   chmod -R 0644 /usr/syno/share/nginx/WWWService.mustache
   ```

## 三、重启 Web 服务生效

修改模板后需重启 Web 服务才能让新端口生效。DSM 7.2 没有直接的「重启 Web」按钮，可用以下任一方式触发：

* `控制面板` → `网络` → `代理服务器`，随便改一个端口号保存，再改回原值，系统会借此自动重启 Web 服务。
* 直接重启群晖（耗时较长，作为兜底）。

> \[!NOTE]
> 重启后访问 DSM 管理界面需带上新端口，例如 `http://10.0.0.6:12080` 与 `https://10.0.0.6:12443`。原 80/443 即释放，可供其他服务使用。

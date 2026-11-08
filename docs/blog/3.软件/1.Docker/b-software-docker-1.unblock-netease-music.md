---
title: Unblock Netease Music
createTime: 2025/03/16 18:32:05
permalink: /article/s7clk3u3/
tags:
  - music
  - compose
  - unraid
---

## 简介

<div style="text-align: center;">
  <img src="/images/b-software-docker-1.unblock-netease-music/UnblockNeteaseMusic-icon.png" 
       alt="UnblockNeteaseMusic-icon" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
</div>

> 解锁网易云音乐客户端变灰歌曲
>
> Docker Hub：[https://hub.docker.com/r/pan93412/unblock-netease-music-enhanced](https://hub.docker.com/r/pan93412/unblock-netease-music-enhanced)
>
> Github：[https://github.com/UnblockNeteaseMusic/server](https://github.com/UnblockNeteaseMusic/server)

## Compose 配置

```js
version: '3.9'
services:
    unblock-netease-music-enhanced:
        entrypoint: /bin/sh
        command: -c 'ln -sf /app/logs/app.log /app/app.log && node app.js -s'
        logging:
            options:
                max-size: 10m
        restart: unless-stopped
        environment:
            - LOG_LEVEL=debug
            - ENABLE_FLAC=true
            - NO_CACHE=true
            - ENABLE_LOCAL_VIP=true
            - LOG_FILE=app.log
        ports:
            - '18080:8080'
        volumes:
            - /docker/unblock-netease/logs:/app/logs:rw
        image: pan93412/unblock-netease-music-enhanced
        container_name: unblock-netease-music
        mem_limit: 256m
```

::: info 自定义日志位置

创建一个从 `/app/logs/app.log` 到 `/app/app.log` 的符号链接

```js:no-line-numbers
ln -sf /app/logs/app.log /app/app.log
```

:::

::: tip 指定歌曲源

```yaml:no-line-numbers
command: -c 'ln -sf /app/logs/app.log /app/app.log && node app.js -s -o migu'  # [!code word:-o migu]
```

:::

## Unraid 配置

| 项目              | 参数                                                         | 备注             |
| ----------------- | ------------------------------------------------------------ | ---------------- |
| 名称              | `Unblock-Netease-Music`                                      |                  |
| 概述              | 空                                                           |                  |
| 额外要求          | 空                                                           |                  |
| 存储库            | `pan93412/unblock-netease-music-enhanced`                    |                  |
| 图标链接          | `/mnt/user/Pictures/docker-logos/UnblockNeteaseMusic-icon.png` |                  |
| WebUI             | 空                                                           |                  |
| 额外参数          | `--memory=256m --memory-swap=0 --entrypoint /bin/sh`         |                  |
| 发布参数          | `-c "ln -sf /app/logs/app.log /app/app.log && node app.js -s"` |                  |
| CPU 绑定          | 自定义                                                       |                  |
| 网络类型          | `Bridge`                                                     |                  |
| Use Tailscale     | 关                                                           |                  |
| 控制台 shell 命令 | `Shell`                                                      |                  |
| 特权              | 关                                                           |                  |
| 变量              | 键：`LOG_FILE`；值：`app.log`                                | 日志文件         |
| 变量              | 键：`LOG_LEVEL`；值：`debug`                                 | 日志输出等级     |
| 变量              | 键：`ENABLE_FLAC`；值：`true`                                | 激活无损音质     |
| 变量              | 键：`NO_CACHE`；值：`true`                                   | 停用缓存         |
| 变量              | 键：`ENABLE_LOCAL_VIP`；值：`svip`                           | 激活本地黑胶会员 |
| 端口              | 容器端口：`8080`<br />主机端口：`18080`<br />连接类型：`TCP` | 映射端口         |
| 路径              | 容器路径：`/app/logs`<br />主机路径：`/mnt/user/appdata/unblock-netease-music/logs` | 日志路径         |

::: important 确保『日志路径』目录存在并有正确权限

```bash
mkdir -p /mnt/user/appdata/unblock-netease-music/logs
chmod 777 /mnt/user/appdata/unblock-netease-music/logs
```

:::

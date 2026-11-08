---
title: EmbyServer
createTime: 2025/04/13 12:41:23
permalink: /article/y0vhfjhc/
tags:
  - emby
  - 流媒体
  - compose
  - unraid
---
## 简介

<div style="text-align: center;">
  <img src="/images/b-software-docker-3.embyserver/EmbyServer-icon.png" 
       alt="EmbyServer-icon" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
</div>

> EmbyServer，是一个家庭媒体服务器，会自动实时转换和串流媒体，以便在任何设备上播放.
>
> Docker Hub：[https://hub.docker.com/r/emby/embyserver](https://hub.docker.com/r/emby/embyserver)
>
> Github：[https://github.com/MediaBrowser/Emby](https://github.com/MediaBrowser/Emby)
>
> 官方网站：[https://emby.media/](https://emby.media/)

## Compose 配置

```yaml
version: "2.3"
services:
  emby:
    image: emby/embyserver
    container_name: embyserver
    environment:
      - UID=1000
      - GID=100
      - GIDLIST=100
    volumes:
      - '/volume1/docker/embyserver/programdata:/config'
      - '/volume2/video:/volume2/video'
      - '/volume2/aliyun:/volume2/aliyun' // [!code ++]
    ports:
      - '8096:8096'
      - '8920:8920'
    devices:
      - /dev/dri:/dev/dri
    restart: on-failure
```

::: info 配置提示

- 获取用户的UID、GID等信息，使用 `id <用户名>`

  ```bash{2}
  sa6400@SA6400:/$ id sa6400
  uid=1000(sa6400) gid=100(users) groups=100(users)
  ```

- 播放云盘内容，需要增加挂在云盘目录，如 `/volume2/aliyun`

:::

:::  important 查看是否使用集显硬件加速

```js
docker exec -it emby /bin/sh
ls /dev/dri
card0 renderD128 // [!code warning]
```

::: 

## Unraid 配置

| 项目              | 参数                                                         | 备注       |
| ----------------- | ------------------------------------------------------------ | ---------- |
| 名称              | `EmbyServer`                                                 |            |
| 概述              | 空                                                           |            |
| 额外要求          | 空                                                           |            |
| 存储库            | `emby/embyserver`                                            |            |
| 图标链接          | `/mnt/user/Pictures/docker-logos/EmbyServer-icon.png`        |            |
| WebUI             | `http://[IP]:[PORT:8096]/`                                   |            |
| 额外参数          | 空                                                           |            |
| 发布参数          | 空                                                           |            |
| CPU 绑定          | 自定义                                                       |            |
| 网络类型          | `Bridge`                                                     |            |
| Use Tailscale     | 关                                                           |            |
| 控制台 shell 命令 | `Shell`                                                      |            |
| 特权              | 关                                                           |            |
| 端口              | 容器端口：`8096`<br />主机端口：`8096`<br />连接类型：`TCP`  | 映射端口   |
| 路径              | 容器路径：`/mnt/Downloads/`<br />主机路径：`/mnt/user/Downloads/` | 下载路径   |
| 路径              | 容器路径：`/mnt/Videos/`<br />主机路径：`/mnt/user/Videos/`  | 媒体库路径 |
| 变量              | 键：`UID`；值：`1000`                                        | UID        |
| 变量              | 键：`GID`；值：`100`                                         | GID        |
| 变量              | 键：`GIDLIST`；值：`100`                                     | GIDLIST    |
| 设备              | 值：`/dev/dri/`                                              | 硬件加速   |

:::  important Unraid『INTEL 集显』硬件加速插件

- Intel-GPU-TOP
- GPU Statistics

:::




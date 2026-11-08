---
title: MoviePilot
createTime: 2025/04/23 21:53:58
permalink: /article/vt348jz6/
tags:
  - 刮削
  - 媒体库
  - compose
  - unraid
---


## 简介

<div style="text-align: center;">
  <img src="/images/b-software-docker-4.moviepilot/MoviePilot-icon.png" 
       alt="MoviePilot-icon" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
</div>


> MoviePilot，NAS媒体库管理工具.
>
> Docker Hub：[https://hub.docker.com/r/jxxghp/moviepilot-v2](https://hub.docker.com/r/jxxghp/moviepilot-v2)
>
> Github：[https://github.com/jxxghp/MoviePilot](https://github.com/jxxghp/MoviePilot)
>
> 官方网站：[https://wiki.movie-pilot.org/](https://wiki.movie-pilot.org/)

## Compose 配置

```yaml
version: '3.3'
services:
    moviepilot:
        stdin_open: true
        container_name: moviepilot-v2
        hostname: moviepilot-v2
        networks:
            - moviepilot
        ports:
            - target: 3000  # 容器端口不可改
              published: 6003  # 宿主机端口可改
              protocol: tcp
        volumes:
            - '/volume2/video:/media'
            - '/volume1/docker/moviepilot-v2/config:/config'
            - '/volume1/docker/moviepilot-v2/core:/moviepilot/.cache/ms-playwright'
            - '/var/run/docker.sock:/var/run/docker.sock:ro'
        environment:
            #- 'NGINX_PORT=3000'
            #- 'PORT=3001'
            - 'PUID=1026'
            - 'PGID=100'
            - 'UMASK=022'
            - 'TZ=Asia/Shanghai'
            - 'SUPERUSER=admin'
            # - 'API_TOKEN=无需手动配置，系统会自动生成。如果需要自定义配置，必须为16位以上的复杂字符串'
        restart: always
        image: jxxghp/moviepilot-v2:latest

networks:
  moviepilot:
    name: moviepilot
```

::: info 配置提示

获取用户的UID、GID等信息，使用 `id <用户名>`

```bash{2}
sa6400@SA6400:/$ id sa6400
uid=1026(sa6400) gid=100(users) groups=100(users)
```

:::

## Unraid 配置

| 项目              | 参数                                                         | 备注               |
| ----------------- | ------------------------------------------------------------ | ------------------ |
| 名称              | `MoviePilot`                                                 |                    |
| 概述              | 空                                                           |                    |
| 额外要求          | 空                                                           |                    |
| 存储库            | `jxxghp/moviepilot-v2`                                       |                    |
| 图标链接          | `/mnt/user/Pictures/docker-logos/MoviePilot-icon.png`        |                    |
| WebUI             | `http://[IP]:[PORT:6003]/`                                   |                    |
| 额外参数          | 空                                                           |                    |
| 发布参数          | 空                                                           |                    |
| CPU 绑定          | 自定义                                                       |                    |
| 网络类型          | `Bridge`                                                     |                    |
| Use Tailscale     | 关                                                           |                    |
| 控制台 shell 命令 | `Shell`                                                      |                    |
| 特权              | 关                                                           |                    |
| 端口              | 容器端口：`3000`<br />主机端口：`6003`；<br />连接类型：`TCP` | 前端 UI 端口       |
| 路径              | 容器路径：`/media`<br />主机路径：`/mnt/user/Videos/`        | 媒体库路径         |
| 路径              | 容器路径：`/config`<br />主机路径：`/mnt/user/appdata/MoviePilot/config` | 配置文件路径       |
| 路径              | 容器路径：`/moviepilot/.cache/ms-playwright`<br />主机路径：`/mnt/user/appdata/MoviePilot/core` | 浏览器内核路径     |
| 路径              | 容器路径：`/var/run/docker.sock`<br />主机路径：`/var/run/docker.sock` | 宿主机docker管理权 |
| 变量              | 键：`PUID`；值：`1026`                                       | PUID               |
| 变量              | 键：`PGID`；值：`100`                                        | PGID               |
| 变量              | 键：`UMASK`；值：`022`                                       | 权限掩码           |
| 变量              | 键：`TZ`；值：`Asia/Shanghai`                                | 时区               |
| 变量              | 键：`SUPERUSER`；值：`admin`                                 | 设置超级用户       |






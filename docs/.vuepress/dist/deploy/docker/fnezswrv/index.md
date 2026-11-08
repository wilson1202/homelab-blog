---
url: /deploy/docker/fnezswrv/index.md
---
## 简介

> Portainer 社区版 (CE)，可以轻松部署并高效管理容器.
>
> Docker Hub：<https://hub.docker.com/r/portainer/portainer-ce>
>
> Github：<https://github.com/portainer/portainer>
>
> 官方网站：<http://portainer.io/>

## 安装

* 安装中文 portaer

  ```bash
  docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /docker/portainer_data:/data 6053537/portainer-ce
  ```

* 安装原版 portaer

  ```bash
  docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /docker/portainer_data:/data portainer/portainer-ce:latest
  ```

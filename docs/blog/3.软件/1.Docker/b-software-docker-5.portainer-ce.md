---
title: Portainer CE
createTime: 2025/04/28 21:08:18
permalink: /article/sqd4ritu/
tags:
  - docker
---
## 简介

<div style="text-align: center;">
  <img src="/images/b-software-docker-5.portainer-ce/portainer-ce-icon.png" 
       alt="portainer-ce-icon" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
</div>



> Portainer 社区版 (CE)，可以轻松部署并高效管理容器.
>
> Docker Hub：[https://hub.docker.com/r/portainer/portainer-ce](https://hub.docker.com/r/portainer/portainer-ce)
>
> Github：[https://github.com/portainer/portainer](https://github.com/portainer/portainer)
>
> 官方网站：[http://portainer.io/](http://portainer.io/)

## 安装

- 安装中文 portaer

  ```bash
  docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /docker/portainer_data:/data 6053537/portainer-ce
  ```

- 安装原版 portaer

  ```bash
  docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /docker/portainer_data:/data portainer/portainer-ce:latest
  ```

 
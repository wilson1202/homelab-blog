---
title: Radicale
createTime: 2025/08/20 21:08:18
permalink: /article/gb8exokf/
tags:
  - 同步
  - 通讯录
---
## 简介

<div style="text-align: center;">
  <img src="/images/b-software-docker-6.radicale/radicale.png" 
       alt="radicale.png" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
</div>

> Docker-Radicale，CalDAV/CardDAV 服务器.
>
> Docker Hub：[tomsquest/docker-radicale](https://hub.docker.com/r/tomsquest/docker-radicale)
>
> Github：[docker-radicale](https://github.com/tomsquest/docker-radicale)
>

## Compose 配置

```yaml
version: "3.9"

services:
  radicale:
    image: tomsquest/docker-radicale:latest
    container_name: radicale
    ports:
      - "5232:5232"
    init: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - SETUID
      - SETGID
      - CHOWN
      - KILL
    deploy:
      resources:
        limits:
          memory: 256M
          pids: 50
    healthcheck:
      test: curl -f http://127.0.0.1:5232 || exit 1
      interval: 30s
      retries: 3
    restart: always
    environment:
      # 禁用容器尝试 chown 数据目录  // [!code warning]
      TAKE_FILE_OWNERSHIP: "false"  // [!code warning]
      UID: 1026
      GID: 100
    volumes:
      - /volume2/Docker/radicale/data:/data
```

::: note 配置提示

- 本方案禁用容器尝试 `chown` 数据目录，自定义详细配置参照 [Custom User/Group ID for the data volume](https://github.com/tomsquest/docker-radicale?tab=readme-ov-file#custom-usergroup-id-for-the-data-volume)

- 获取用户的UID、GID等信息，使用 `id <用户名>`

  ```bash{2}
  sa6400@SA6400:/$ id sa6400
  uid=1000(sa6400) gid=100(users) groups=100(users)
  ```

:::

## 软件使用

1. 配合 vCards CN** 

    ::: info GitHub 项目地址：[metowolf/vCards](https://github.com/metowolf/vCards)

    :::

    ::: tip [添加 CardDav 服务器 Radicale 输出格式的支持](https://github.com/metowolf/vCards/pull/232)，只需运行：

    ```bash
    npm run-script radicale
    ```

    :::

2. **访问网页创建账户**

   网址：`ip:5232` ，并创建 `Username` 为 `cn` 和 `Password` 为 `cn` 的账户

   ![image-20250821184246845](/images/b-software-docker-6.radicale/image-20250821184246845.png)

3. **导入 vcard 通讯录**

    将 radicale 格式的 `.vcf` 文件批量复制到 **Docker** 文件夹

    > 路径：
    >
    > ```
    > /volume2/Docker/radicale/data/collections/collection-root/cn
    > ```

    ::: info 此处的 cn 为创建用户名后自动生成

    ::: 

4. **刷新网页查看成果**

   ![image-20250821185712576](/images/b-software-docker-6.radicale/image-20250821185712576.png)

5. **群晖反代服务地址**

   「控制面板」→「登陆门户」→「高级」→「反向代理服务器」→「新增」

   ![image-20250821190844974](/images/b-software-docker-6.radicale/image-20250821190844974.png)

6. **手动订阅 CardDAV 服务**

   - 服务器：`vcards.metowolf.com`
   - 用户名：`cn`
   - 密码：`cn` 

   ::: tabs

   @tab **iOS**
   「设置」→「通讯录」→「账户」→「添加账户」→「其他」→「添加 CardDAV 账户」

   参考：[官方文档](https://support.apple.com/zh-cn/guide/iphone/ipha0d932e96/ios)

   @tab **Mac**
   「通讯录」→「设置」→「账户」→「其他通讯录账户」

   参考：[官方文档](https://support.apple.com/zh-cn/guide/contacts/adrb7e5aaa2a/mac)

   ::: 

## 添加计划任务

- **群晖计划任务**

  「控制面板」→「任务计划」→「新增」→「计划的任务」→「用户定义的脚本」

  ::: tabs

  @tab **常规**

  任务名称：radicale

  用户账号：user

  ==注：与 docker 使用的 UID、GID 对应用户保持一致=={.important}

  @tab **计划**

  日期：重复-每天

  时间：开始时间-05:00

  @tab **任务计划**

  通知设置：空
  
  运行命令：`bash /volume2/Docker/radicale/update_radicale.sh`
  
  ::: 

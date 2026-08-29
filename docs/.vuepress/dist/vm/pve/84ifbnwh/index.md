---
url: /vm/pve/84ifbnwh/index.md
---
## 概述

cron 在执行任务时，若命令产生标准输出或标准错误，默认会通过本地邮件系统把输出发送给任务所属用户（邮件通常存放在 `/var/spool/mail`）。当任务频繁执行或脚本持续输出时，会不断产生邮件。本文记录两种禁用方式：全局关闭 cron 邮件（设置 `MAILTO` 为空），以及单条任务把输出重定向到黑洞。

参考来源：

* [禁止 cron 发送邮件及任务输出重定向](https://www.cnblogs.com/varden/p/15178582.html)
* [设置 Crontab 执行任务时不发送邮件](https://blog.csdn.net/E_Possible/article/details/108065129)

## 一、禁止 cron 发送邮件

编辑系统级 crontab 配置文件 `/etc/crontab`，将 `MAILTO` 参数设为空：

```ini
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
# 设置 MAILTO 参数为空，cron 不再发送邮件
MAILTO=""
HOME=/
```

设为空后，cron 不会将任务输出通过邮件发送。

## 二、任务输出重定向

执行 `crontab -e` 编辑用户级任务，在命令末尾重定向输出。两种写法二选一：

```bash
# 写法一：分别重定向标准输出与标准错误到 /dev/null
*/1 * * * * /shell/shell.sh >/dev/null 2>&1

# 写法二：将标准输出与标准错误一并重定向（bash 语法）
*/1 * * * * /shell/shell.sh &> /dev/null
```

> \[!NOTE]
>
> `>/dev/null 2>&1` 把标准输出（`1`）和标准错误（`2`）都导向 `/dev/null`；
>
> `&> /dev/null` 是等价的 bash 简写。
>
> 两者都能彻底抑制任务产生的邮件与日志输出。

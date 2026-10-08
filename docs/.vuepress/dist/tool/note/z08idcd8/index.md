---
url: /tool/note/z08idcd8/index.md
---
## 概述

Codex 桌面版与它自带的命令行工具共用同一份配置，默认只连 OpenAI 官方账号。本文记录把 **OpenCode Go 订阅**接进 Codex 的完整过程：接口约束、可用模型、最小配置、给模型选择器补上真名，以及实际撞到的报错与处理方式。

结论先行：可以接入，且完全不需要登录 OpenAI 账号。

实测环境：Windows 11；Codex 桌面版（商店版 26.915.4065.0）及其自带 CLI 0.155.0-alpha.9.2，另在 CLI 0.155.1 上复现。实测日期 2026-09-20。

## 一、Codex 只用 `/responses` 这一个接口

Codex 已经不吃 `chat/completions`，只走 Responses 一条路。

| 项 | 值 |
|---|---|
| base_url | `https://opencode.ai/zen/go/v1`（**带 `/v1`**，`/responses` 由 Codex 自己拼） |
| 实际请求 | `POST https://opencode.ai/zen/go/v1/responses` |
| 认证 | `Authorization: Bearer <你的 Go key>` |
| 会话头 | Codex 自带，不用手动配 |
| `wire_api` | **只能写 `"responses"`** |

有两条硬约束，任何一条写错都会直接卡在启动或认证环节：

1. `wire_api = "chat"` 已从 Codex 移除（2026-02 起），写了启动即报错：

   ```text
   Error loading config.toml: wire_api = "chat" is no longer supported.
   ```

2. 认证必须是 Bearer。Go 网关的 OpenAI 侧不认 `x-api-key`（那是 `/v1/messages` 的用法），写错会返回 `401 Missing API key`。

## 二、能用的模型

Go 订阅下的模型并非全部都能被 Codex 调用。扫描方式：对每个模型发一次**带 tools** 的 `/responses` 请求，模拟 Codex 的真实负载。

| 状态 | 模型 |
|---|---|
| 可用 | `deepseek-v4.1-flash`、`deepseek-v4-flash`、`deepseek-v4-pro`、`deepseek-flash`、`deepseek-v4-flash-vision-exp`、`gpt-5.6-luna` |
| 接口能通但 Codex 用不了 | `grok-4.6`（裸请求 200，走真实 Codex 请求必 `422 Upstream request failed`，重试 5 次后失败） |
| 不可用 | GLM 全系（`glm-5.3` / `5.3-flash` / `5.2` / `5.1` / `5`）、`kimi-k3` / `k2.7-code` / `k2.6` / `k2.5`、`qwen3.5`~`3.8` 全系、`minimax-m3` / `m2.7` / `m2.5`、`hy3` / `hy3-preview` / `hy4-preview`、`mimo-v2-pro` / `v2-omni` / `v2.5` / `v2.5-pro`、`longcat-2.0`、`omen-alpha`、`muse-spark-1.x-contributor` |

不可用分两类原因：

* `Model not supported for format openai` —— 这些模型在 Go 上只暴露 `/chat/completions`（或只暴露 `/v1/messages`），而 Codex 已经不吃 chat。想让它们跑 Codex，必须在本地加一层 **Responses→Chat 转换代理**。
* `500 Internal server error` —— 该模型在 `/responses` 上没有可用的上游通道。

上下文长度为 deepseek 全系 **1,048,576（1 MiB）**，官方目录里 `context_window` / `max_context_window` 就是 `1048576`；输出上限 384K（OpenCode 数据页）。

## 三、最小可用配置

配置文件：`%USERPROFILE%\.codex\config.toml`，桌面版 app 与 CLI 共用这一份。

> \[!WARNING]
> 顶层键必须写在所有 `[表]` 之前
> TOML 里，表头之后的一切都归那个表。把 `[model_providers.opencode-go]` 插到 `notify` 前面，会导致 `model`、`model_provider`、`notify` 全被并进那个表——**不报错，但完全不生效**。`codex doctor` 会点名：`model_providers.opencode-go.notify is ignored`。

配置本体是三行顶层键 + 一张 provider 表：

```toml
model = "deepseek-v4.1-flash"
model_provider = "opencode-go"
model_reasoning_effort = "medium"
model_catalog_json = 'C:\Users\<用户名>\.codex\go-models.json'   # 可选，见第四节

notify = [ "……你原有的内容原样保留……" ]                          # 顶层键

# …… app 自己生成的部分（marketplaces / plugins / mcp_servers / windows / projects）全部原样保留 ……

[model_providers.opencode-go]
name = "OpenCode Go"
base_url = "https://opencode.ai/zen/go/v1"
experimental_bearer_token = "sk-...你的Go key"
wire_api = "responses"
```

三个要点：

1. **三行顶层键缺一不可，且都放在文件最前面。** 实测最坑的一种：只加 `model_catalog_json` 而漏掉或被覆盖了 `model_provider`，配置不报错，但 provider 掉回内置 `openai`，请求直接打 `wss://api.openai.com/v1/responses` 报 401。
2. **用 `experimental_bearer_token`，不要用 `env_key`。** `env_key` 需要 `setx` 设环境变量，而已经在运行的 app、从开始菜单启动的进程继承不到，必须重启才生效；provider 里写 `api_key = "..."` 则不生效（实测 401）。代价是 key 明文存在配置里，别把文件传 git / 网盘 / 截图。

   Provider 表里三行就能跑通，其中 `base_url` 一定要带 `/v1`。

### 保留官方账号的两全方案（可选）

只想让终端 CLI 走 Go、app 继续走官方账号：`config.toml` 里**不加** `model` / `model_provider`，只加 provider 表，再建一个独立的 profile 文件。

`%USERPROFILE%\.codex\opencode-go.config.toml`：

```toml
model = "deepseek-v4.1-flash"
model_provider = "opencode-go"
```

用法：

```bash
codex --profile opencode-go
```

> \[!NOTE]
> 老写法 `[profiles.opencode-go]` 表塞进 `config.toml` 已经失效，实测报错要求改成独立 profile 文件。

## 四、让模型选择器显示真名

装好 provider 后，app 里模型那一栏显示的是「自定义 / 轻度」，看不到 `deepseek-v4.1-flash`。

原因是 Codex 内置模型目录里没有 DeepSeek 系，UI 找不到 slug，只能给通用标签，推理档位也回落官方默认（low = 轻度）。这**纯属显示层问题**，路由不受影响。

修法是给 Codex 一份自定义目录，顶层加一行 `model_catalog_json = '<路径>'`（TOML 单引号包路径，反斜杠不用转义），目录文件用同一份《Codex 模型目录（仅 OpenCode Go）.json》。

| slug | 显示名 |
|---|---|
| `deepseek-v4.1-flash` | DeepSeek V4.1 Flash |
| `deepseek-v4-flash` | DeepSeek V4 Flash |
| `deepseek-v4-pro` | DeepSeek V4 Pro |
| `deepseek-flash` | DeepSeek Flash |
| `deepseek-v4-flash-vision-exp` | DeepSeek V4 Flash Vision (实验) |
| `gpt-5.6-luna` | GPT-5.6 Luna (OpenCode Go) |

> \[!CAUTION]
>
> **是替换，不是合并**，自定义目录会把内置目录整体换掉。上面这份不含官方模型，所以选择器里也不会出现它们。想恢复原状，删掉 `model_catalog_json` 那一行并重启即可，provider 配置不受影响。

### 目录文件的字段要求

首选做法是**直接用 DeepSeek 官方给的 `models.json` 当模板**——官方在 Codex 接入文档里提供了完整目录（两个条目 `deepseek-flash` / `deepseek-v4-pro`），字段和取值都是权威的。这份目录即以它为基底，再补上 Go 订阅里其余可用的模型 id（官方目录只覆盖 DeepSeek 自家两个 id）。

官方条目的关键值，照抄即可：

| 字段 | 官方值 |
|---|---|
| `shell_type` | `"shell_command"` |
| `apply_patch_tool_type` | `"freeform"` |
| `tool_mode` | `null` |
| `use_responses_lite` | `false` |
| `prefer_websockets` | `false` |
| `context_window` / `max_context_window` | `1048576` |
| `default_reasoning_level` | `"high"` |
| `supported_reasoning_levels` | 官方 `low` / `high` / `max` → 改成 `low` / `medium` / `high`（原因见下） |
| `effective_context_window_percent` | `95` |
| `truncation_policy` | `{mode:"tokens", limit:10000}` |
| `minimal_client_version` | `"0.144.0"` |
| `base_instructions` + `model_messages.instructions_template` | 官方提示词全文，两个都要给 |

schema 严格校验，报错会点名缺哪个字段（`failed to parse model_catalog_json ... missing field 'xxx'`）。**必须给 `base_instructions` 或 `model_messages.instructions_template`**，否则报 `missing both base_instructions and model_messages.instructions_template`。

### 曾经踩的坑：工具调用退化成纯文本

一开始拿 Codex 内置的 GPT 条目当模板，继承了两个值：`tool_mode: "code_mode_only"` 和 `use_responses_lite: true`。结果 DeepSeek 的工具调用退化成把 DSML 标记当纯文本吐出：

```text
<|DSML| invoke name="apply_patch">
```

文件根本建不出来。换回官方值（`tool_mode: null`、`use_responses_lite: false`）后，`apply_patch_tool_type: "freeform"` 可以正常保留，实测走 apply_patch 建文件成功。问题不在 freeform，而在这两个「代码模式 / 精简响应」开关。

这份目录相对官方做了两处有意偏离：

1. **`supported_reasoning_levels` 用 `low` / `medium` / `high`，而不是官方的 `low` / `high` / `max`。** 客户端本身支持的档位是 `minimal | low | medium | high | xhigh`（官方配置参考里写死），`max` 渲染不出来——照抄官方会只剩两档（轻度 / 高度）；换成这三档就能显示三档，默认 `high`。实测三档请求全部 200。
2. **`supports_search_tool` 一律 `false`**（官方 flash 是 `true`）。Go 网关不提供托管联网搜索工具，设 true 只会让客户端发一个跑不通的工具。

顺带一个实测结论：Go 侧对 `reasoning.effort` 几乎来者不拒——`minimal` / `low` / `medium` / `high` / `xhigh` / `max` / `none` 全部 200，只有 `ultra` 会 422。

不想折腾目录，也可以只控制推理档位（显示层仍是「自定义」）：

```toml
model_reasoning_effort = "medium"     # low / medium / high，实测 Go 网关接受这个参数
```

## 五、验证与生效

### 先找到 CLI 的真实路径

`codex` 不在 PATH 时，桌面版自带的 CLI 藏在 `%LOCALAPPDATA%\OpenAI\Codex\bin\<一串哈希>\codex.exe`，哈希随版本变，别写死：

```powershell
Get-Process | Where-Object { $_.Path -like "*odex*" } | Select-Object Name,Path -Unique
```

取 `Path` 的目录部分，临时加进 PATH：

```powershell
$env:Path += ";C:\Users\<用户名>\AppData\Local\OpenAI\Codex\bin\<哈希>"
```

### 三步验证

```powershell
# 1) 配置自检：期望 opencode-go，且不应出现 "ignored" 字样
codex doctor | Select-String -Pattern "provider","model","ignored"

# 2) 端到端发一次真请求：期望 provider: opencode-go + 结尾 OK
codex exec --skip-git-repo-check "reply with the single word OK"

# 3) 换模型也通
codex exec --skip-git-repo-check -c model='"deepseek-v4-pro"' "say OK"
```

> \[!IMPORTANT]\
> **验证必须用 `codex exec`**，实测 `codex debug models` 校验更宽松（14 个字段它也放行），看不出一部分 `missing field` 错误。

### 生效需要完全重启 app

配置只在 app 启动时读一次，且 app 是**按「线程创建时」定 provider** 的：

```powershell
Get-Process ChatGPT,Codex -ErrorAction SilentlyContinue | Stop-Process -Force
```

`-Force` 的官方含义只是「不再询问确认」，自己启动的进程本来就不会问，可省。这是硬杀，app 里正在跑的任务会丢；温柔点就用托盘右键退出。重启后**新开任务**。

### 使用注意

* **别在 app 的模型选择器里手动切模型**：选择器不认 provider，只改模型名不改 provider，会直接把会话打坏，报 `the model is not supported when using Codex with a ChatGPT account`。模型由 `config.toml` 的 `model` 决定。
* 项目级 `.codex/config.toml` 只能改 `model`，**不能改 provider**（官方限制：provider 设置只能放用户级）。
* 终端直接干活要给沙箱权限，默认 `read-only`：

  ```bash
  codex exec --sandbox workspace-write "..."
  ```

## 六、排障对照表

| 报错 / 现象 | 原因 | 处理 |
|---|---|---|
| `401 Incorrect API key provided` / `failed to connect to websocket: 401`，url 是 `api.openai.com`（或 `wss://api.openai.com/v1/responses`） | provider 仍是内置 `openai`：要么顶层键不在文件最前面，要么 `model_provider` 漏写 / 被覆盖（加 `model_catalog_json` 时最容易发生，配置不报错） | 确认 `model` / `model_provider` / `model_catalog_json` 三行都在最前面；`codex logout` 清掉用 Go key 做的登录；用 `codex exec` 验 `provider: opencode-go` |
| `codex doctor` 显示 `model_providers.opencode-go.notify is ignored` | `[model_providers...]` 表插到了顶层键前面 | 顶层键在上、表在下，provider 表放文件末尾 |
| `401 Missing API key`（打 `opencode.ai`） | 认证方式用反了 | Go 的 OpenAI 侧（含 `/responses`）= Bearer；`x-api-key` 是 `/v1/messages` 的用法 |
| `Error loading config.toml: wire_api = "chat" is no longer supported` | Codex 已移除 chat 支持 | 改成 `wire_api = "responses"` |
| `Model not supported for format openai` / `500 Internal server error` | 该模型没在 `/responses` 上暴露 | 查「二、能用的模型」换模型，或加本地转换代理 |
| `422 Upstream request failed`（`grok-4.6`） | 该模型在 `/responses` 上跑不了 Codex 的真实负载 | 换模型 |
| `failed to parse model_catalog_json ... missing field 'xxx'` | 目录文件字段不全 | 缺什么补什么，优先照 DeepSeek 官方 `models.json` 的字段与取值；`base_instructions` 常被漏 |
| 工具调用输出 `<\|DSML\| invoke ...>` 纯文本、文件建不出来 | 目录条目继承了 GPT 模板的 `tool_mode: "code_mode_only"` / `use_responses_lite: true` | 改成官方值 `tool_mode: null`、`use_responses_lite: false`（别的字段照官方保留，`apply_patch_tool_type: "freeform"` 没问题） |
| `cannot be used while config.toml contains legacy [profiles.x] config` | 用了老式 profile 写法 | 挪到独立的 `<名字>.config.toml` 文件 |
| `codex` 不是可识别的命令 | app 自带 CLI 不在 PATH | 按「五、」第一步找真实路径，或 `npm i -g @openai/codex` 装一份稳定 CLI |
| app 里推理档位只剩两档（少了中间那档） | 目录里写了客户端渲染不出来的档位（如官方 DeepSeek 目录的 `max`）——客户端只认 `minimal\|low\|medium\|high\|xhigh` | 把 `supported_reasoning_levels` 改成 `low` / `medium` / `high`，默认 `default_reasoning_level = "high"` |
| app 里模型名显示「自定义 / 轻度」 | 内置目录里没有该 slug | 加 `model_catalog_json`（注意是整体替换），或只设 `model_reasoning_effort` |
| app 里手动选模型后报 `model is not supported ... ChatGPT account` | 选择器不认 provider | 别手动切；必要时用官方 ChatGPT 账号登录一次让门禁放行 |

## 结语

整件事的关键只有三点：`wire_api` 必须是 `responses`、认证走 Bearer、顶层键必须在所有表头之前。模型选择上，六个可用模型里对 Codex 最省事的是 `deepseek-v4.1-flash` 与 `deepseek-v4-pro`；如果只需要一个能跑通的默认项，`deepseek-v4.1-flash` 足够。

参考来源：

* DeepSeek 官方 Codex 接入文档（含官方 `models.json` 完整内容）：`https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex`
* Codex 配置参考：`https://developers.openai.com/codex/config-reference`

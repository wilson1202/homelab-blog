---
title: Markdown
tags:
  - markdown
createTime: 2025/03/15 11:18:33
permalink: /article/b7vupd2z/
---

## 标题 2

### 标题 3

#### 标题 4

##### 标题 5

###### 标题 6

加粗：**加粗文字**

斜体： _斜体文字_

~~删除文字~~

内容 ==标记==

数学表达式： $-(2^{n-1})$ ~ $2^{n-1} -1$

$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}$

19^th^

H~2~O

::: center
内容居中
:::

::: right
内容右对齐
:::

- 无序列表1
- 无序列表2
- 无序列表3

1. 有序列表1
2. 有序列表2
3. 有序列表3

- [ ] 任务列表1
- [ ] 任务列表2
- [x] 任务列表3
- [x] 任务列表4

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

> 引用内容
>
> 引用内容

[链接](/)

[外部链接](https://github.com/pengzhanbo)

**Badge：**

- <Badge type="info" text="info badge" />
- <Badge type="tip" text="tip badge" />
- <Badge type="warning" text="warning badge" />
- <Badge type="danger" text="danger badge" />

**图标：**

- home - <Icon name="material-symbols:home" color="currentColor" size="1em" />
- vscode - <Icon name="skill-icons:vscode-dark" size="2em" />
- twitter - <Icon name="skill-icons:twitter" size="2em" />

**demo wrapper：**

::: window title="示例" no-padding height="200px"
<style scoped>
.open-door {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.open-door .main {
  background: #ccc;
}
</style>

<div class="open-door">
  <div class="main">main</div>
  <div class="aside">aside</div>
</div>

:::

**代码：**

```js whitespace
const a = 1
const b = 2
const c = a + b

// [!code word:obj]
const obj = {
  toLong: {
    deep: {
      deep: {
        deep: {
          value: 'this is to long text. this is to long text. this is to long text. this is to long text.', // [!code highlight]
        }
      }
    }
  }
}
```

**代码分组：**

::: code-tabs
@tab tab1

```js
const a = 1
const b = 2
const c = a + b
```

@tab tab2

```ts
const a: number = 1
const b: number = 2
const c: number = a + b
```

:::

**代码块高亮：**

```ts
function foo() {
  const a = 1 // [!code highlight]

  console.log(a)

  const b = 2 // [!code ++]
  const c = 3 // [!code --]

  console.log(a + b + c) // [!code error]
  console.log(a + b) // [!code warning]
}
```

**代码块聚焦：**

```ts
function foo() {
  const a = 1 // [!code focus]
}
```

::: note 注释
文本写作时更加关注==横向内容==或==扩充联想==。

```markdown
note
```

:::

::: info 信息
强调用户在快速浏览文档时也不应忽略的重要信息。
文本写作时更加关注==纵向内容==或==名词解释==。

```markdown
info
```

:::

::: tip 提示
有助于用户更顺利达成目标的建议性信息。
文本写作时更加关注==小技巧==或==小建议==。

```markdown
tip
```

:::

::: warning 警告
因为可能存在风险，所以需要用户立即关注的关键内容。
文本写作时更加关注==风险事项==或==待办事项==。

```markdown
warning
```

:::

::: caution 错误
行为可能带来的负面影响。
文本写作时更加关注==警报==或==红线==。

```markdown
caution
```

:::

::: important 重要
对用户达成目标至关重要的信息。
文本写作时更加关注==关键步骤==或==关键信息==。

```markdown
important
```

:::

**GFM alert：**

> [!note]
> 文本写作时更加关注==横向内容==或==扩充联想==。

> [!info]
> 强调用户在快速浏览文档时也不应忽略的重要信息。
> 文本写作时更加关注==纵向内容==或==名词解释==。
> 

> [!tip]
> 有助于用户更顺利达成目标的建议性信息。
> 文本写作时更加关注==小技巧==或==小建议==。

> [!warning]
> 因为可能存在风险，所以需要用户立即关注的关键内容。
> 文本写作时更加关注==风险事项==或==待办事项==。

> [!caution]
> 行为可能带来的负面影响。
> 文本写作时更加关注==警报==或==红线==。

> [!important]
> 对用户达成目标至关重要的信息。
> 文本写作时更加关注==关键步骤==或==关键信息==。

**代码演示：**

:::: demo title="常规示例" desc="一个常规示例"

::: code-tabs
@tab HTML

```html
<div id="app">
  <h3>vuepress-theme-plume</h3>
</div>
```

@tab Javascript

```js
const a = 'So Awesome!'
const app = document.querySelector('#app')
app.appendChild(window.document.createElement('small')).textContent = a
```

@tab CSS

```css
#app {
  font-size: 2em;
  text-align: center;
}
```

:::
::::

**选项卡：**

::: tabs
@tab 标题1
内容区块

@tab 标题2
内容区块
:::

:::: warning
::: tabs
@tab 标题1
内容区块

@tab 标题2
内容区块
:::
::::



```json title="package.json"
{
  "name": "vuepress-theme-plume"
}
```



::: details 
This is a details block. 
:::


::: collapse
- 标题 1

  正文内容

- 标题 2

  正文内容
:::




::: tabs
@tab 【单选题】

1. 小明同学去摘苹果（  ）。   
   A.    
   B.   
   C.   
   D.         
   
	**解析**：点击时可见 
	

---

2. 小红同学去跑步（  ）。   
   A.   
   B.  
   C.  
   D.  

@tab 【判断题】  

1. 一去二三里（  ）  

:::



假定无风险收益率为 $R_f$，市场平均收益率为 $R_m$，某股票贝塔系数为 $\beta$，则普通股资本成本为：$K_s = R_f + \beta \times (R_m - R_f)$



- **default**: `==Default==` - ==Default==
- **info**: `==Info=={.info}` - ==Info=={.info}
- **note**: `==Note=={.note}` - ==Note=={.note}
- **tip**: `==Tip=={.tip}` - ==Tip=={.tip}
- **warning**: `==Warning=={.warning}` - ==Warning=={.warning}
- **danger**: `==Danger=={.danger}` - ==Danger=={.danger}
- **caution**: `==Caution=={.caution}` - ==Caution=={.caution}
- **important**: `==Important=={.important}` - ==Important=={.important}



在对话窗口输入: <kbd>cmd</kbd>然后点击 OK 按钮。
 
保存文件请使用快捷键 <kbd>Ctrl</kbd>+<kbd>S</kbd>

`interfaces`{.filepath} 

**脚注：**

脚注 1 链接[^first]。

脚注 2 链接[^second]。

行内的脚注^[行内脚注文本] 定义。

重复的页脚定义[^second]。

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。

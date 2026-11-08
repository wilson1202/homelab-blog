---
title: 折腾的硬件
createTime: 2025/03/16 18:27:02
permalink: /article/kirgdq6u/
---



## 折腾的硬件

````markmap
---
markmap:
  colorFreezeLevel: 2
---

# markmap

## 链接

- <https://markmap.js.org/>
- [GitHub](https://github.com/markmap/markmap)

## 功能

- 链接
- **强调** ~~删除线~~ *斜体* ==高亮==
- 多行
  文字
- `行内代码`
-
    ```js
    console.log('code block');
    ```
- Katex
  - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
- 现在我们可以通过 `maxWidth` 选项自动换行非常非常非常非常非常非常非常非常非常非常长的内容
````

```git-graph
commit
branch hotfix
checkout hotfix
commit
branch develop
checkout develop
commit id:"ash" tag:"abc"
branch featureB
checkout featureB
commit type:HIGHLIGHT
checkout main
checkout hotfix
commit type:NORMAL
checkout develop
commit type:REVERSE
checkout featureB
commit
checkout main
merge hotfix
checkout featureB
commit
checkout develop
branch featureA
commit
checkout develop
merge hotfix
checkout featureA
commit
checkout featureB
commit
checkout develop
merge featureA
branch release
checkout release
commit
checkout main
commit
checkout release
merge main
checkout develop
merge release
```

```gantt
dateFormat  YYYY-MM-DD
title       Adding GANTT diagram functionality to mermaid
excludes    weekends
%% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d

section Critical tasks
Completed task in the critical line :crit, done, 2014-01-06,24h
Implement parser                    :crit, done, after des1, 2d
Create tests for parser             :crit, active, 3d
Future task in critical line        :crit, 5d
Create tests for renderer           :2d
Add to mermaid                      :1d

section Documentation
Describe gantt syntax               :active, a1, after des1, 3d
Add gantt diagram to demo page      :after a1  , 20h
Add another diagram to demo page    :doc1, after a1  , 48h

section Last section
Describe gantt syntax               :after doc1, 3d
Add gantt diagram to demo page      :20h
Add another diagram to demo page    :48h
```

```pie
title What Voldemort doesn't have?
  "FRIENDS" : 2
  "FAMILY" : 3
  "NOSE" : 45
```

==vuepress-theme-plume== 是一个基于 ==VuePress 的主题==，无论您是想写 **生活类博客**、**技术类博客**、 或者是 **产品文档**、**知识库**、**系列文档** 等，主题都可以满足您的需求。

:::: card-masonry

::: card title=""
<div style="text-align: center;">
  <img src="https://assets.hnr1.xyz/images/s29398116.jpg" 
       alt="中华帝国的衰落" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
    <div style="font-weight: bold;">
      <a href="https://book.douban.com/subject/26954784/" 
         target="_blank" 
         rel="noopener noreferrer"
         style="color: inherit; text-decoration: none;">
        《中华帝国的衰落》
      </a>
    </div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">作者: 魏斐德</div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">出版社: 民主与建设出版社</div>
    <div style="color: #007bff;">在读</div>
</div>


:::

::: card title=""

<div style="text-align: center;">
  <img src="https://assets.hnr1.xyz/images/s29398116.jpg" 
       alt="中华帝国的衰落" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
    <div style="font-weight: bold;">
      <a href="https://book.douban.com/subject/26954784/" 
         target="_blank" 
         rel="noopener noreferrer"
         style="color: inherit; text-decoration: none;">
        《中华帝国的衰落》
      </a>
    </div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">作者: 魏斐德</div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">出版社: 民主与建设出版社</div>
    <div style="color: #007bff;">在读</div>
</div>


:::

::: card title=""
<div style="text-align: center;">
  <img src="https://assets.hnr1.xyz/images/s29398116.jpg" 
       alt="中华帝国的衰落" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
    <div style="font-weight: bold;">
      <a href="https://book.douban.com/subject/26954784/" 
         target="_blank" 
         rel="noopener noreferrer"
         style="color: inherit; text-decoration: none;">
        《中华帝国的衰落》
      </a>
    </div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">作者: 魏斐德</div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">出版社: 民主与建设出版社</div>
    <div style="color: #007bff;">在读</div>
</div>

:::

::: card title=""
<div style="text-align: center;">
  <img src="https://assets.hnr1.xyz/images/s29398116.jpg" 
       alt="中华帝国的衰落" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
    <div style="font-weight: bold;">
      <a href="https://book.douban.com/subject/26954784/" 
         target="_blank" 
         rel="noopener noreferrer"
         style="color: inherit; text-decoration: none;">
        《中华帝国的衰落》
      </a>
    </div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">作者: 魏斐德</div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">出版社: 民主与建设出版社</div>
    <div style="color: #007bff;">在读</div>
</div>

:::

::: card title=""
<div style="text-align: center;">
  <img src="https://assets.hnr1.xyz/images/s29398116.jpg" 
       alt="中华帝国的衰落" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
    <div style="font-weight: bold;">
      <a href="https://book.douban.com/subject/26954784/" 
         target="_blank" 
         rel="noopener noreferrer"
         style="color: inherit; text-decoration: none;">
        《中华帝国的衰落》
      </a>
    </div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">作者: 魏斐德</div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">出版社: 民主与建设出版社</div>
    <div style="color: #007bff;">在读</div>
</div>

:::

::: card title=""
<div style="text-align: center;">
  <img src="https://assets.hnr1.xyz/images/s29398116.jpg" 
       alt="中华帝国的衰落" 
       style="height: 100px; width: auto; max-width: 100%; object-fit: contain;">
    <div style="font-weight: bold;">
      <a href="https://book.douban.com/subject/26954784/" 
         target="_blank" 
         rel="noopener noreferrer"
         style="color: inherit; text-decoration: none;">
        《中华帝国的衰落》
      </a>
    </div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">作者: 魏斐德</div>
    <div style="color: #666; font-size: 0.9em; text-align: left;">出版社: 民主与建设出版社</div>
    <div style="color: #007bff;">在读</div>
</div>

:::

::::



# 个人页面

个人展示页面，采用响应式布局的设计，同时使用了 HTML5 和 CSS3 的新特性。
[预览](https://gordon8.github.io/project/resume)

## 制作过程

### HTML结构部分

整体结构主要有两部分，分别是：nav 和 main，其中main部分包括四个section，分别为：about、skills、projects和contact。页面整体结构主要使用HTML5新标签构成。

### CSS样式部分

1. 整体布局
   采用响应式布局的设计，盒模型均采用了```box-sizing: border-box;```,各section的高度与浏览器窗口大小一致均为100%。
2. nav部分
   采用```position: fixed;```,当浏览器窗口小于900px时，隐藏主导航栏，显示导航栏图标。
3. main部分
   当浏览器窗口大于900px时，主要采用flex布局，使浏览器窗口大小发生改变时保持元素的相对位置和大小不变，同时减少了依赖浮动布局来实现元素位置的定义以及重置元素大小。同时使用transform、transition等属性实现部分动画特效。
   当浏览器窗口小于900px时，将各部分的```display```属性改为```block```;同时设置```height:auto```，使文档自上而下以正常文档流形式布局。

### javaScript部分

主要包含两个功能：

1. nav部分
   通过切换导航栏```class:open```属性实现导航栏显示隐藏。同时，点击导航栏时， document 以指定速度滚动到目标位置。
2. main部分
   通过监听滚动事件，使各```section```的class在```current```和```leave```之间切换，来实现动画切换。

详细实现过程可查看源代码。



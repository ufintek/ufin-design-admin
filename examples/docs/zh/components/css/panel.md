# Panel

---

面板

## 基础类型

默认的.panel 所做的只是提供基本的边界和内部，来包含内容。

:::demo

```html
<template>
  <div class="ufin-panel ufin-panel--bordered">
    <div class="ufin-panel-body">
      默认的.panel所做的只是提供基本的边界和内部，来包含内容。
    </div>
  </div>
</template>
```

:::

## 带标题的面板

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        面板标题
      </h3>
    </div>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
      <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

      <p>
        对于带链接的标题，必须添加 .panel-title 类。
      </p>
    </div>
  </div>
</template>
```

:::

## 带脚注的面板

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        面板标题
      </h3>
    </div>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
    </div>
    <div class="ufin-panel-footer">
      面板脚注(
      <strong>.ufin-panel-heading</strong>
      )
    </div>
  </div>
</template>
```

:::

## 标题带描述信息的面板

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        面板标题
        <span class="panel-desc">这个是标题的描述信息</span>
      </h3>
    </div>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
      <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

      <p>
        对于带链接的标题，必须添加 .panel-title 类。
      </p>
    </div>
  </div>
</template>
```

:::

## 标题带描述信息的面板

:::demo

```html
<template>
<div class="ufin-panel">
  <div class="ufin-panel-heading">
    <h3 class="panel-title">
      面板标题
      <span class="panel-desc is-horizontal">这个是标题的描述信息</spam>
    </h3>
  </div>
  <div class="ufin-panel-body">
    <h4>内容标题</h4>
    <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

    <p>
      对于带链接的标题，必须添加 .panel-title 类。
    </p>
  </div>
</div>
</template>
```

:::

## 含标签的标题栏

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        <ufin-icon name="el-icon-eleme"></ufin-icon>
        面板标题
        <el-tag class="ufin-badge" type="primary" size="mini">标签1</el-tag>
      </h3>
    </div>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
      <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

      <p>
        对于带链接的标题，必须添加 .panel-title 类。
      </p>
    </div>
  </div>
</template>
```

:::

## 含链接的面板

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        含链接的面板
      </h3>
      <ul class="panel-actions">
        <li>
          <a>链接1</a>
        </li>
        <li>
          <a>链接1</a>
        </li>
      </ul>
    </div>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
      <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

      <p>
        对于带链接的标题，必须添加 .panel-title 类。
      </p>
    </div>
  </div>
</template>
```

:::

## 含操作的面板

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        含链接的面板
      </h3>
      <div class="panel-actions">
        <el-button type="text">操作1</el-button>
        <el-button type="text">操作2</el-button>
        <el-dropdown>
          <el-button type="text" icon="el-icon-more"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
      <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

      <p>
        对于带链接的标题，必须添加 .panel-title 类。
      </p>
    </div>
  </div>
</template>
```

:::

## 含提示信息的面板

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        含链接的面板
      </h3>
    </div>
    <el-alert class="panel-tips">这是提示信息</el-alert>
    <div class="ufin-panel-body">
      <h4>内容标题</h4>
      <p>您可以通过 .panel-heading 来为面板轻松添加标题。标题 .panel-title 可以通过 h1- h6 使用预设格式。</p>

      <p>
        对于带链接的标题，必须添加 .panel-title 类。
      </p>
    </div>
  </div>
</template>
```

:::

## 表格面板

:::demo

```html
<template>
  <template>
    <div class="ufin-panel">
      <div class="ufin-panel-heading">
        <h3 class="panel-title">
          含链接的面板
        </h3>
      </div>
      <div class="panel-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </div>
  </template>
</template>
<script>
  export default {
    data() {
      return {
        tabsValue: 'second',
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
      }
    },
    methods: {
      handleClickTab(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>
```

:::

## 带 block

:::demo

```html
<template>
  <div class="ufin-panel">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        面板标题
      </h3>
    </div>
    <div class="ufin-panel-body">
      面板内容
    </div>
    <el-tabs v-model="tabsValue" @tab-click="handleClickTab" class="ufin-panel-tabs">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
    <div class="ufin-panel-block">
      block1
    </div>
    <div class="ufin-panel-block">
      block2
    </div>
  </div>
</template>
```

:::

## 主题

:::demo

```html
<template>
  <div class="ufin-panel is-primary">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        is-primary类型
      </h3>
    </div>
    <div class="ufin-panel-body">
      面板内容
    </div>
  </div>
  <div class="ufin-panel is-success">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        is-success类型
      </h3>
    </div>
    <div class="ufin-panel-body">
      面板内容
    </div>
  </div>
  <div class="ufin-panel is-info">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        is-info类型
      </h3>
    </div>
    <div class="ufin-panel-body">
      面板内容
    </div>
  </div>
  <div class="ufin-panel is-warning">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        is-warning类型
      </h3>
    </div>
    <div class="ufin-panel-body">
      面板内容
    </div>
  </div>
  <div class="ufin-panel is-danger">
    <div class="ufin-panel-heading">
      <h3 class="panel-title">
        is-danger类型
      </h3>
    </div>
    <div class="ufin-panel-body">
      面板内容
    </div>
  </div>
</template>
```

:::

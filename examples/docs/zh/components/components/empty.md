# Empty

---

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 默认

::: demo

```html
<template>
  <div>
    <ufin-empty></ufin-empty>
  </div>
</template>
```

:::

## 自定义

::: demo

```html
<template>
  <div>
    <ufin-empty
      :image="image"
      :image-style="{
      height: '200px',
    }"
    >
      <div slot="description">这是自定义的描述信息</div>
      <el-button type="primary">首页</el-button>
    </ufin-empty>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        image: require('../../../assets/aotu.png'),
      }
    },
  }
</script>
```

:::

## Empty 参数

| 参数        | 说明                                           | 类型          | 可选值 | 默认值     |
| ----------- | ---------------------------------------------- | ------------- | ------ | ---------- |
| image       | 设置显示图片，为 string 时表示自定义图片地址。 | String        | -      | -          |
| description | 自定义描述内容                                 | String        | -      | "暂无数据" |
| imageStyle  | 图片样式                                       | CSSProperties | -      | -          |

## slot

| 参数        | 说明            |
| ----------- | --------------- |
| description | 自定义描述信息  |
| default     | footer 尾部内容 |

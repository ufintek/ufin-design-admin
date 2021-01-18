# CheckTreePicker

---

状态展示组件。

## 何时使用

- 展示某一条数据的状态的时候

## 默认

::: demo

```html
<template>
  <div>
    <div class="ufin-padding">
      <ufin-check-tree-picker></ufin-check-tree-picker>
    </div>
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

## BageStatus 参数

| 参数 | 说明 | 类型   | 可选值                   | 默认值 |
| ---- | ---- | ------ | ------------------------ | ------ |
| text | 说明 | String | ''                       | -      |
| type | 类型 | String | success/processing/error | -      |

## slot

| 参数        | 说明            |
| ----------- | --------------- |
| description | 自定义描述信息  |
| default     | footer 尾部内容 |

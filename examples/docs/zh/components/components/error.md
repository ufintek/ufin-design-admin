# Error

---

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 403

::: demo

```html
<template>
  <div>
    <ufin-error code="403" description="抱歉，你无权访问此页面。" :img="image403"></ufin-error>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        image403: require('../../../../src/assets/images/403/403.jpg'),
        image500: require('../../../../src/assets/images/500/500.jpg'),
        image404: require('../../../../src/assets/images/404/404.jpg'),
      }
    },
  }
</script>
```

:::

## 500

::: demo

```html
<template>
  <div>
    <ufin-error code="500" description="服务器内部错误，不能执行该请求，请点击下面按钮返回首页...." :img="image500">
      <el-button size="small" type="primary">
        返回首页
      </el-button>
    </ufin-error>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        image403: require('../../../../src/assets/images/403/403.jpg'),
        image500: require('../../../../src/assets/images/500/500.jpg'),
        image404: require('../../../../src/assets/images/404/404.jpg'),
      }
    },
  }
</script>
```

:::

## 404

::: demo

```html
<template>
  <div>
    <ufin-error code="404" description="服务器内部错误，不能执行该请求，请点击下面按钮返回首页...." :img="image404">
      <el-button size="small" type="primary">
        返回首页
      </el-button>
    </ufin-error>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        image403: require('../../../../src/assets/images/403/403.jpg'),
        image500: require('../../../../src/assets/images/500/500.jpg'),
        image404: require('../../../../src/assets/images/404/404.jpg'),
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

| 参数        | 说明           |
| ----------- | -------------- |
| description | 自定义描述信息 |
| default     | 默认           |

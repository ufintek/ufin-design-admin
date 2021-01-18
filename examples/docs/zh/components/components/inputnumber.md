# InputNumber

---

通过鼠标或键盘，输入范围内的数值。。

## 何时使用

- 当需要获取标准数值时。

## 基础

数字输入框。

::: demo

```html
<template>
  <div class="ufin-row">
    <div class="ufin-col-12 ufin-form-group">
      <label>格式化：</label>
      <ufin-input-number
        v-model="form.val1"
        mode="decimal"
        :min-fraction-digits="2"
        :max-fraction-digits="5"
      ></ufin-input-number>
    </div>
    <div class="ufin-col-12 ufin-form-group">
      <label>不格式化：</label>
      <ufin-input-number v-model="form.val1" :format="false"></ufin-input-number>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          val1: 100000.01,
          val2: 100000.01,
          val3: 0.0001,
          val4: 1,
        },
      }
    },
  }
</script>
```

:::

## 货币输入(Currency)

货币输入框。通过 `mode='currency'`决定以货币格式展示数据，需要配合 currency 和 locale 一起使用。

::: demo

```html
<template>
  <div class="ufin-row">
    <div class="ufin-col-8 ufin-form-group">
      <label>人民币：</label>
      <div>
        <ufin-input-number v-model="form.val2" mode="currency" currency="CNY" locale="zh-CN"></ufin-input-number>
      </div>
    </div>
    <div class="ufin-col-8 ufin-form-group">
      <label>美元：</label>
      <div>
        <ufin-input-number v-model="form.val2" mode="currency" currency="USD" locale="en-US"></ufin-input-number>
      </div>
    </div>
    <div class="ufin-col-8 ufin-form-group">
      <label>欧元：</label>
      <div>
        <ufin-input-number v-model="form.val2" mode="currency" currency="EUR" locale="de-DE"></ufin-input-number>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          val1: 100000.01,
          val2: 100000.01,
          val3: 0.0001,
          val4: 1,
        },
      }
    },
  }
</script>
```

:::

## 其他

::: demo

```html
<template>
  <div class="ufin-row">
    <div class="ufin-col-24 ufin-form-group">
      <label>百分比：</label>
      <ufin-input-number
        v-model="form.val3"
        mode="percent"
        :step="0.0001"
        :min-fraction-digits="2"
        :min="0"
      ></ufin-input-number>
    </div>
    <div class="ufin-col-24 ufin-form-group">
      <label>Prefix：</label>
      <ufin-input-number v-model="form.val4" disabled prefix="$"></ufin-input-number>
    </div>
    <div class="ufin-col-24 ufin-form-group">
      <label>suffix：</label>
      <ufin-input-number v-model="form.val2" suffix="%%%%"></ufin-input-number>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          val1: 100000.01,
          val2: 100000.01,
          val3: 0.0001,
          val4: 1,
        },
      }
    },
  }
</script>
```

:::

#### 注意：

InputNumber 组件借助于 [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)方法

## InputNumber 参数

| 参数              | 说明                                                                                                                                                                                                                                                                                                                                                         | 类型    | 可选值 | 默认值     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ---------- |
| format            | 是否格式化                                                                                                                                                                                                                                                                                                                                                   | Boolean | false  | true       |
| mode              | 表示格式转换使用的样式。默认值是`'decimal'`，表示就是数字，值还可以是`'currency'`，表示使用货币格式，也可以是`'percent'`，表示百分比格式。                                                                                                                                                                                                                   | String  | -      | -          |
| currency          | 使用货币格式时候使用的货币类型。值需要是[ISO 4217 货币代码](https://baike.baidu.com/item/ISO 4217)（三个字母）。常见的有：人民币 China Yuan Renminbi (CNY)、港元 Hong Kong Dollar (HKD)、新台币 New Taiwan Dollar (TWD)、欧元 Euro(EUR)、美元 US Dollar (USD)、英镑 Great British Pound(GBP)、日元 Japanese Yen (JPY)。                                      | String  | -      | "暂无数据" |
| currencyDisplay   | 如何显示设置的货币。默认值是`'symbol'`表示用图形显示，例如人民币是`'￥'`，其他可选值有`'code'`，表示使用 ISO 货币代码，人民币就是`'CNY'`；值也可以是`'name'`，使用当地该货币的名称，例如美元是`'dollar'`，人民币则是`'人民币'`。                                                                                                                             | String  | -      | -          |
| useGrouping       | 表示是否使用分组分隔符，例如千位分隔符或千/十万/千万分隔符。默认值是`true`                                                                                                                                                                                                                                                                                   | Boolean |        | true       |
| locale            | 就是`'zh-Hans'`或者`'en-US'`这些[BCP 47 语言标签字符](https://tools.ietf.org/html/bcp47)                                                                                                                                                                                                                                                                     | String  |        | undefined  |
| localeMatcher     | 要使用的区域设置匹配算法。值可以是`'lookup'`和`'best fit'`，其中`'best fit'`是默认值，这个算法可以让匹配器运行时提供的区域设置尽可能适合请求而不是基于查找算法的结果，例如设置`'zh'`，简体中文地区会认为是简体中文，繁体中文地区会认为是繁体中文，而不是指定匹配 ①。`'lookup'`算法则与之不同，遵循 BCP 47 中指定的查找算法。我们平时开发而不太用到这个参数。 | String  |        | undefind   |
| prefix            | 前缀                                                                                                                                                                                                                                                                                                                                                         | String  |        | undefind   |
| suffix            | 后缀                                                                                                                                                                                                                                                                                                                                                         | String  |        | undefind   |
| minFractionDigits | 要使用的最小小数位数                                                                                                                                                                                                                                                                                                                                         | Number  |        | undefind   |
| maxFractionDigits | 要使用的最大小数位数                                                                                                                                                                                                                                                                                                                                         | Number  |        | undefind   |
| step              | 步频                                                                                                                                                                                                                                                                                                                                                         | Number  |        | 1          |
| min               | 最小值                                                                                                                                                                                                                                                                                                                                                       | Number  |        | undefind   |
| max               | 最大值                                                                                                                                                                                                                                                                                                                                                       | Number  |        | undefind   |
| pattern           |                                                                                                                                                                                                                                                                                                                                                              |         |        |            |
|                   |                                                                                                                                                                                                                                                                                                                                                              |         |        |            |

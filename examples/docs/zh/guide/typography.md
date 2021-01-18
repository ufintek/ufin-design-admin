# Typography 字体

---

统一字体规范，力求在各个操作系统上都有最佳的展示效果

## 字体家族

css 代码如下：

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, 'PingFang SC',
  'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
```

## 中文字体

<div class="ufin-row">
  <div class="at-component__container ufin-col-sm-24 ufin-col-md-8">
    <div class="at-component-typo typo-pingfang">
      <div class="at-component-typo__show">优飞数科</div>
      <div class="at-component-typo__detail">
        <p>苹方 / PingFang SC</p>
        <p class="note">MacOS, IOS 优选字体</p>
      </div>
    </div>
  </div>

  <div class="at-component__container ufin-col-sm-24 ufin-col-md-8">
    <div class="at-component-typo typo-dongqing">
      <div class="at-component-typo__show">优飞数科</div>
      <div class="at-component-typo__detail">
        <p>冬青黑体 / Hiragino Sans GB</p>
        <p class="note">MacOS 备选字体</p>
      </div>
    </div>
  </div>

  <div class="at-component__container ufin-col-sm-24 ufin-col-md-8">
    <div class="at-component-typo typo-yahei">
      <div class="at-component-typo__show">优飞数科</div>
      <div class="at-component-typo__detail">
        <p>微软雅黑 / Microsoft YaHei</p>
        <p class="note">次级备选字体</p>
      </div>
    </div>
  </div>
</div>

<div class="type-demo-container">
  <div class="ufin-row flex-middle typo-pingfang">
    <div class="ufin-col-md-5 type">苹方 / PingFang SC</div>
    <div class=" content">重新组织社会生产力!</div>
  </div>
  <div class="ufin-row flex-middle typo-dongqing">
    <div class="ufin-col-md-5 type">冬青黑体 / Hiragino Sans GB</div>
    <div class=" content">重新组织社会生产力!</div>
  </div>
  <div class="ufin-row flex-middle typo-yahei">
    <div class="ufin-col-md-5 type">微软雅黑 / Microsoft YaHei</div>
    <div class=" content">重新组织社会生产力!</div>
  </div>
</div>


## 字体使用规范

西文字体的行高通常是字号的 `1.2em` 以上，而中文字体由于字符密实而且高度一致，所以需要更大的行高。通常中文字体的行高在 `1.5em` 和 `1.8em` 之间可以保证比较良好的阅读体验。`UFIN-DESIGN` 统一使用 `1.5em` 的行高。

对于字号，默认使用 `14px`

<div class="at-component__container">
  <div class="at-component-typo-list">
    <div class="at-component-typo-list__item text-larger ufin-row flex-middle">
      <span class="label ufin-col-md-4">主标题</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Main Head</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">20px Extra Large</span>
    </div>
    <div class="at-component-typo-list__item text-large ufin-row flex-middle">
      <span class="label ufin-col-md-4">标题</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Sub Head</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">18px Large</span>
    </div>
    <div class="at-component-typo-list__item text-normal ufin-row flex-middle">
      <span class="label ufin-col-md-4">小标题</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Head</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">16px Normal</span>
    </div>
    <div class="at-component-typo-list__item text-base ufin-row flex-middle">
      <span class="label ufin-col-md-4">正文</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Text</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">14px Base</span>
    </div>
    <div class="at-component-typo-list__item text-small ufin-row flex-middle">
      <span class="label ufin-col-md-4">正文（小）</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Small Text</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">13px Small</span>
    </div>
    <div class="at-component-typo-list__item text-smaller ufin-row flex-middle">
      <span class="label ufin-col-md-4">辅助文字</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Help Text</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">12px Extra Small</span>
    </div>
    <div class="at-component-typo-list__item text-smallest ufin-row flex-middle">
      <span class="label ufin-col-md-4">辅助文字（小）</span>
      <span class="ufin-col-md-6">优飞科技信息技术有限公司</span>
      <span class="label ufin-col-md-4">Help Text</span>
      <span class="ufin-col-md-6">重新组织社会生产力!</span>
      <span class="note ufin-col-md-4">11px Extra Extra Small</span>
    </div>
  </div>
</div>

<!-- <style lang="scss" scoped>
  .type-demo-container {
    .ufin-row {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .type {
      color: #7E95A7;
      font-size: 13px;
      text-align: right;
    }
    .content {
      font-size: 15px;
      padding-left: 24px;
      word-break: break-all;
    }
  }
</style> -->

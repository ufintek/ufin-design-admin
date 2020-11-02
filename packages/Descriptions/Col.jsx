import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import './index.scss'

export const ufinDescriptionItemProps = {
  label: PropTypes.string,

  content: PropTypes.string,

  list: PropTypes.array.def([]),

  layout: PropTypes.string.def('horizontal'),

  col: PropTypes.number.def(3),

  gutter: PropTypes.number.def(20)
}

const ufinDescriptionItem = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}DescriptionItem`,
  props: ufinDescriptionItemProps,
  inject: {
    descriptionsContext: {
      default: () => null
    }
  },
  data() {
    return {
      localGutter: this.gutter,

      localSpan: this.span
    }
  },

  render() {
    const {
      label,
      content,
      localGutter,
      layout,
      localSpan,
      componentSize,
      descriptionsContext
    } = this

    const ufinDescriptionItemPrefixCls = `${ufinComponentPrefixCls}-description-item`

    const componentCls = classNames(ufinDescriptionItemPrefixCls)

    if (descriptionsContext) {
      const gutter = descriptionsContext.gutter
      if (gutter) this.localGutter = gutter

      const col = descriptionsContext.col
      this.localSpan = this.localSpan || 24 / col
    }

    return (
      <el-col span={localSpan} class={classNames(`${componentCls}`)}>
        <span class={classNames(`${ufinDescriptionItemPrefixCls}-label`)}>
          {label}：
        </span>
        <span class={classNames(`${ufinDescriptionItemPrefixCls}-content`)}>
          {this.$scopedSlots.default && this.$scopedSlots.default()}
        </span>
      </el-col>
    )
  }
})

/* istanbul ignore next */
ufinDescriptionItem.install = function(Vue) {
  Vue.component(ufinDescriptionItem.name, ufinDescriptionItem)
}

export default ufinDescriptionItem

import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import './index.scss'

export const ufinDescriptionsProps = {
  title: PropTypes.string,

  list: PropTypes.array.def([]),

  layout: PropTypes.string.def('horizontal'),

  col: PropTypes.number.def(3),

  gutter: PropTypes.number.def(20)
}

const ufinDescriptions = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Descriptions`,
  props: ufinDescriptionsProps,
  provide() {
    return {
      descriptionsContext: this
    }
  },
  data() {
    return {}
  },

  render() {
    const { title, col, gutter, layout, componentSize } = this

    const ufinDescriptionsPrefixCls = `${ufinComponentPrefixCls}-descriptions`

    const componentCls = classNames(ufinDescriptionsPrefixCls)

    const Title = (
      <el-row gutter={gutter}>
        <el-col span="24">
          <slot name="title" title={title}>
            {title}
          </slot>
        </el-col>
      </el-row>
    )

    return (
      <div
        class={[
          componentCls,
          {
            [`${componentCls}-${componentSize}`]: componentSize !== 'default'
          }
        ]}>
        {title && Title}
        <el-row gutter={gutter}>
          { this.$scopedSlots.default && this.$scopedSlots.default()}
        </el-row>
      </div>
    )
  }
})

/* istanbul ignore next */
ufinDescriptions.install = function(Vue) {
  Vue.component(ufinDescriptions.name, ufinDescriptions)
}

export default ufinDescriptions

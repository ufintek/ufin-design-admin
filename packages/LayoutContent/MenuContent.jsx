import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import ufinContentMenu from '../LayoutMenuTabs/ContentMenu'
// 样式文件
import './index.scss'
import { LayoutAsideProps, LayoutHeaderProps } from '../Layout/BasicLayoutProps'

export const ufinLayoutContentProps = {
  ...LayoutAsideProps,
  ...LayoutHeaderProps
}

const ufinLayoutContentHasMenu = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutContent`,
  props: ufinLayoutContentProps,
  data() {
    return {}
  },

  render(h) {
    const { $slots } = this

    const layoutContentCls = classNames(
      `${ufinComponentPrefixCls}-layout-content`
    )
    return (
      <div class={layoutContentCls}>
        {/* 页面主体内容 */}
        {$slots.default}
      </div>
    )
  }
})

export default ufinLayoutContentHasMenu

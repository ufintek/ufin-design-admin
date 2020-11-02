import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'

import classNames from 'classnames'

import { isNumber } from 'lodash'

import { LayoutBaseProps, LayoutAsideProps } from '../Layout/BasicLayoutProps'

export const AsideWrapperProps = {
  ...LayoutBaseProps,
  ...LayoutAsideProps
}

const ufinAsideWrapper = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}AsideWrapper`,

  props: AsideWrapperProps,
  render(h) {
    const {
      // 侧边栏展开的宽度
      asideWidth,
      // 侧边栏收起的宽度
      asideCollapsedWidth,
      //  是否是展开
      collapsed,
      // 主题
      theme,

      asideFixed
    } = this
    // 先判断当前侧边栏是展开还是收起状态
    const isCollapsed = !!collapsed
    // 获取侧边栏是展开或者收起状态下的宽度
    const originAsideWidth = isCollapsed ? asideCollapsedWidth : asideWidth

    const unitAsideWidth = isNumber(originAsideWidth)
      ? `${originAsideWidth}px`
      : originAsideWidth

    // 生成在展开或者收起状态下侧边栏的style
    const asideStyle = {
      flex: `0 0 ${unitAsideWidth}`,
      minWidth: unitAsideWidth,
      maxWidth: unitAsideWidth,
      width: unitAsideWidth
    }

    const layoutSiderCls = classNames(
      `${ufinComponentPrefixCls}-aside`,
      `${ufinComponentPrefixCls}-aside-${theme}`,
      {
        [`${ufinComponentPrefixCls}-aside--collapsed`]: this.collapsed,
        [`${ufinComponentPrefixCls}-aside--fixed`]: asideFixed,


      }
    )

    return (
      <aside style={asideStyle} class={layoutSiderCls}>
        <div> {this.$slots.default}</div>
      </aside>
    )
  }
})

export default ufinAsideWrapper

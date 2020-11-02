import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import ufinIcon from '../Icon/index'
import { ufinLayoutHeader } from '../Layout/Layout'

import ufinHeaderTrigger, {
  ufinHeaderTriggerProps
} from '../HeaderTrigger/index'

import { LayoutAsideProps, LayoutHeaderProps } from '../Layout/BasicLayoutProps'

import './Header.scss'

const ufinHeaderProps = {
  handleCollapse: PropTypes.func,
  ...LayoutAsideProps,
  ...LayoutHeaderProps,
  ...ufinHeaderTriggerProps
}

const ufinHeader = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Header`,

  props: ufinHeaderProps,

  render(h, content) {
    const {
      collapsed,
      asideCollapseText,
      asideExpansionText,
      headerFixed,
      asideWidth,
      asideCollapsedWidth
    } = this

    const handleCollapse = (_) => {
      if (this.handleCollapse) this.handleCollapse(!collapsed)
    }
    const layoutHeaderStyle = {
      left: `${collapsed ? asideCollapsedWidth : asideWidth}px`
    }

    return (
      <ufinLayoutHeader
        class={classNames({
          [`${ufinComponentPrefixCls}-header--fixed`]: headerFixed
        })}
        style={headerFixed && layoutHeaderStyle}>
        <div class={`${ufinComponentPrefixCls}-header`}>
          <div class={`${ufinComponentPrefixCls}-header__left`}>
            {/* trigger 菜单栏展开收缩按钮 */}
            <ufinHeaderTrigger
              class={`${ufinComponentPrefixCls}-header__action`}
              collapsed={collapsed}
              toggleAside={handleCollapse}
              asideCollapseText={asideCollapseText}
              asideExpansionText={asideExpansionText}
            />
            {this.$scopedSlots.headerleft && this.$scopedSlots.headerleft()}
          </div>
          {/* 右边的 */}
          <div class={`${ufinComponentPrefixCls}-header__right`}>
            {/* trigger 菜单栏展开收缩按钮 */}
            {this.$scopedSlots.headerright && this.$scopedSlots.headerright()}
          </div>
        </div>
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </ufinLayoutHeader>
    )
  }
})

export default ufinHeader

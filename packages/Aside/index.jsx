import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'

import BasicLayoutProps from '../Layout/BasicLayoutProps'
import ufinAsideWrapper from './AsideWrapper'
import ufinMenuBase from '../AsideMenu/index'
import ufinSiderMenuLogo from '../AsideLogo/index'

import './index.scss'

import {
  LayoutBaseProps,
  LayoutAsideProps,
  LayoutAsideLogoProps,
  LayoutAsideMenuProps
} from '../Layout/BasicLayoutProps'

export const AsideProps = {
  ...LayoutBaseProps,
  ...LayoutAsideProps,
  ...LayoutAsideLogoProps,
  ...LayoutAsideMenuProps
}

const ufinAside = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Aside`,
  props: AsideProps,
  render(h) {
    const {
      isMobile,
      asideWidth,
      asideCollapsedWidth,
      mode,
      menus,
      menusProps,
      menuIconRender,
      theme,
      collapsed,
      title,
      logo,
      backgroundColor,
      handleToggleCollapse
    } = this
    // 根据是否是手机模式 会收起展开侧边栏
    const currentCollapsed = isMobile ? false : collapsed

    const logoComponentProps = {
      props: {
        collapsed: currentCollapsed,
        mode: mode,
        theme,
        title,
        logo
      }
    }

    const asideLayout = (
      <ufinAsideWrapper {...{ props: this._props }}>
        {/* logo */}
        <ufinSiderMenuLogo {...logoComponentProps} />
        {/* 菜单 */}
        <ufinMenuBase {...{ props: this._props }} />
      </ufinAsideWrapper>
    )

    return isMobile ? (
      <el-drawer
        direction="ltr"
        visible={collapsed}
        show-close={false}
        size="100%"
        class={classNames(`${ufinComponentPrefixCls}-aside-drawer`)}
        onClose={handleToggleCollapse}>
        {asideLayout}
      </el-drawer>
    ) : (
      asideLayout
    )
  }
})

export default ufinAside

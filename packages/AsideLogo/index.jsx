import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'

import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import './index.scss'

import ufinSiderMenuTransition from '../Aside/SiderMenuTransition'

import {
  LayoutBaseProps,
  LayoutAsideProps,
  LayoutAsideLogoProps
} from '../Layout/BasicLayoutProps'

export const AsideLogoProps = {
  ...LayoutBaseProps,
  ...LayoutAsideProps,
  ...LayoutAsideLogoProps
}

const ufinAideLogo = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}AideLogo`,
  props: AsideLogoProps,
  render(h) {
    let {
      logo,
      isMobile,
      siderWidth,
      mode,
      menus,
      theme,
      collapsed,
      homePath,
      title
    } = this
    //  logo 点击跳转的地址
    const homePathRoute = {
      path: homePath || '/'
    }

    return (
      <ufinSiderMenuTransition>
        <div
          class={classNames('ufin-sider-menu-logo', {
            'el-menu--collapse': collapsed
          })}
          id="logo">
          <router-link tag="a" to={homePathRoute}>
            {/* logo */}
            {logo && <img src={logo} />}
            {/* 标题 */}
            {title ? <h1>{title}</h1> : ''}
          </router-link>
        </div>
      </ufinSiderMenuTransition>
    )
  }
})

export default ufinAideLogo

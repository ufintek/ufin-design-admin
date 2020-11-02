import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import ufinContentMenu from '../LayoutMenuTabs/ContentMenu'
// 样式文件
import './index.scss'
import { LayoutAsideProps, LayoutHeaderProps } from '../Layout/BasicLayoutProps'

export const ufinLayoutContentProps = {
  ...LayoutAsideProps,
  ...LayoutHeaderProps,
  includes: PropTypes.array.def([])
}

const ufinLayoutContent = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutContent`,
  props: ufinLayoutContentProps,
  data() {
    return {}
  },

  render(h) {
    const { $slots, includes, $route } = this

    const layoutContentCls = classNames(
      `${ufinComponentPrefixCls}-layout-content`
    )
    return (
      <div class={layoutContentCls}>
        <div class={classNames(`${layoutContentCls}--container`)}>
          {/* 页面主体内容 */}
          <div class={classNames(`${layoutContentCls}--main`)}>
            <KeepAlive include={includes} style="height: 100%">
              {includes.includes($route.name) && <RouterView />}
            </KeepAlive>
            {!includes.includes($route.name) && <RouterView />}
          </div>
          {$slots.default}
        </div>
      </div>
    )
  }
})

export default ufinLayoutContent

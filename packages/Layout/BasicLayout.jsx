import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'

import { ContainerQuery } from 'vue-container-query'
import classNames from 'classnames'

import ufinLayout from './Layout'
import ufinHeader from '../Header/Header'
import ufinLayoutMenuTabs from '../LayoutMenuTabs/index'
import ufinLayoutContent from '../LayoutContent/index'
import ufinPageSierMenu from '../Aside/index'

import BasicLayoutProps from './BasicLayoutProps'

const MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

const ufinBasicLayoutClsPrefix = `${ufinComponentPrefixCls}-layout`

const getPaddingLeft = (
  hasLeftPadding,
  collapsed = undefined,
  siderWidth,
  asideCollapsedWidth
) => {
  if (hasLeftPadding) {
    return collapsed ? asideCollapsedWidth : siderWidth
  }
  return 0
}

const BasicLayout = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}BasicLayout`,
  props: BasicLayoutProps,
  functional: true,
  render(h, content) {
    const { props, children, scopedSlots } = content
    const {
      theme,
      collapsed,
      asideWidth,
      asideCollapsedWidth,
      asideFixed,
      headerFixed,
      includes
    } = props

    let hasLeftPadding = true

    let hasSiderMenu = true
    //
    const onContainerQueryChange = (params) => {
      if (props.handleMediaQuery) {
        props.handleMediaQuery(params)
      }
    }

    return (
      <ContainerQuery query={MediaQueryEnum} onChange={onContainerQueryChange}>
        <ufinLayout
          class={classNames(
            `${ufinBasicLayoutClsPrefix}-has-aside`,
            `${ufinBasicLayoutClsPrefix}--aside-${theme}`,
            {
              [`${ufinBasicLayoutClsPrefix}--aside-fixed`]: asideFixed,
              [`${ufinBasicLayoutClsPrefix}--aside-collapsed`]: collapsed,
              [`${ufinBasicLayoutClsPrefix}--header-fixed`]: headerFixed
            }
          )}>
          {/* 侧边菜单栏 */}
          <ufinPageSierMenu {...{ props: props }} />
          {/* 主体 */}
          <ufinLayout
            style={{
              paddingLeft: hasSiderMenu
                ? `${getPaddingLeft(
                    !!hasLeftPadding,
                    collapsed,
                    asideWidth,
                    asideCollapsedWidth
                  )}px`
                : undefined,
              minHeight: '100vh'
            }}>
            {/* header 部分 */}
            <ufinHeader
              {...{ props, scopedSlots: { ...scopedSlots } }}
              handleCollapse={props.handleToggleCollapse}>
              <ufinLayoutMenuTabs {...{ props: props }} />
            </ufinHeader>

            {/* 主体部分 */}
            <ufinLayoutContent includes={includes}>
              {/* 页脚 */}
              {scopedSlots.footer && scopedSlots.footer()}
            </ufinLayoutContent>
          </ufinLayout>
        </ufinLayout>
      </ContainerQuery>
    )
  }
})

export default BasicLayout

import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import BasicLayout from './BasicLayout'

import './Layout.scss'

export const ufinLayoutProps = {
  class: PropTypes.string
}

const ufinLayout = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Layout`,
  functional: true,
  props: ufinLayoutProps,
  render(h, content) {
    const { props, children, data } = content

    const layoutClses = classNames(
      `${ufinComponentPrefixCls}-layout`,
      data.class
    )
    return (
      <div class={layoutClses} style={data.style}>
        {children}
      </div>
    )
  }
})

export const ufinLayoutHeader = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutHeader`,
  functional: true,
  render(h, content) {
    const { props, children, data } = content
    const layoutClses = classNames(
      `${ufinComponentPrefixCls}-layout-header`,
      data.class
    )
    return <header class={layoutClses} style={data.style}>{children}</header>
  }
})
/*
  页面侧边栏组件
*/
export const ufinLayoutAside = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutAside`,
  functional: true,
  render(h, content) {
    const { children } = content
    const layoutClses = classNames(`${ufinComponentPrefixCls}-layout-aside`)
    return <aside class={layoutClses}>{children}</aside>
  }
})

/*
  页面侧边栏组件
*/
export const ufinLayoutFooter = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutFooter`,
  functional: true,
  render(h, content) {
    const { children } = content
    const layoutClses = classNames(`${ufinComponentPrefixCls}-layout-footer`)
    return <footer class={layoutClses}>{children}</footer>
  }
})

export default ufinLayout

import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import { isFunction } from '../utils/prop-types/utils'
import classNames from 'classnames'

import './index.scss'

import {
  LayoutBaseProps,
  LayoutAsideProps,
  LayoutAsideMenuProps
} from '../Layout/BasicLayoutProps'

export const MenuBaseProps = {
  ...LayoutBaseProps,
  ...LayoutAsideProps,
  ...LayoutAsideMenuProps
}

const elMenuTheme = {
  dark: {
    backgroundColor: '#002d57',
    textColor: '#ffffff'
  }
}

const ufinMenuBase = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}AsideMenu`,
  props: MenuBaseProps,

  render() {
    const {
      mode,
      menus,
      theme,
      collapsed,
      router,
      route,
      // 根据menus 生成 菜单,要求菜单为数组类型的
      menusProps,
      menuIconRender,
      asideCollapsedWidth,
      handleClickMenuItem,
      defaultActive
    } = this

    const currentElMenuTheme = elMenuTheme[theme || 'dark']

    /**
     *  点击菜单路由跳转方法
     * @param {*} route
     */
    const handleClickElMenuItem = (route) => {
      // 在非路由模式 且自定义了跳转事件的时候 调用用户的自定义方法
      if (!router && isFunction(handleClickMenuItem)) {
        handleClickMenuItem(route)
      } else {
        this.$router.push({
          path: route[menusProps.route],
          query: {
            ...this.$route.query
          }
        })
      }
    }

    const elMenuTitleIcon = (icon) => {
      // 类型判断
      if (!icon) {
        return ''
      } else if (/.[(png)|(jpg)|(jpeg)]$/.test(icon)) {
        console.log(isFunction(menuIconRender))
        // 图片地址类型的
        return (
          <div
            class={classNames(
              `${ufinComponentPrefixCls}-asidemenu__title-image-wrapper`
            )}
            style={{
              width: `${asideCollapsedWidth - 40}px`
            }}>
            <img
              class={classNames(
                `${ufinComponentPrefixCls}-asidemenu__title-image`
              )}
              src={isFunction(menuIconRender) ? menuIconRender(icon) : icon}
              alt=""
            />
          </div>
        )
      } else {
        return (
          <i
            class={classNames(
              `${ufinComponentPrefixCls}-asidemenu__title-icon`,
              icon
            )}
          />
        )
      }
    }
    // el-menu-item 类型的菜单
    const elMenuItemNode = (index, title, icon, routePath, routeItem) => {
      let elMenuItemProps = {
        key: index,
        props: {}
      }
      //  路由模式
      if (router) {
        elMenuItemProps.props.index = routePath
        elMenuItemProps.props.route = route ? route(routeItem) : routeItem
      } else {
        elMenuItemProps.props.index = index
        elMenuItemProps.on = {
          click: handleClickElMenuItem.bind(this, routeItem)
        }
      }

      // 菜单栏 图标
      const menuItemIcon = icon && elMenuTitleIcon(icon)

      // 菜单栏的 标题
      const menuItemTitle = (
        <span
          slot="title"
          class={classNames(`${ufinComponentPrefixCls}-asidemenu__title`)}>
          {title}
        </span>
      )
      return (
        <el-menu-item {...elMenuItemProps}>
          {menuItemIcon}
          {menuItemTitle}
        </el-menu-item>
      )
    }

    // subMenu类型的
    const renderElSubMenu = (
      index,
      title,
      icon,
      routePath,
      routeItem,
      children
    ) => {
      return (
        <el-submenu
          index={index}
          class={classNames(`${ufinComponentPrefixCls}-asidemenu__submenu`)}>
          <template slot="title">
            {elMenuTitleIcon(icon)}
            <span
              class={classNames(`${ufinComponentPrefixCls}-asidemenu__title`)}>
              {title}
            </span>
          </template>
          {children}
        </el-submenu>
      )
    }

    // 当前菜单的层级
    let menuLevel = 1
    //  处理菜单数据
    const subMenusNodes = (asideMenus) => {
      return asideMenus.map((item) => {
        // 这是下级菜单类型的
        if (item[menusProps.children] && item[menusProps.children].length) {
          const parentItem = item
          return renderElSubMenu(
            item[menusProps.id],
            item[menusProps.title],
            item[menusProps.icon],
            item[menusProps.route],
            item,
            subMenusNodes(item[menusProps.children])
          )
        } else {
          return elMenuItemNode(
            item[menusProps.id],
            item[menusProps.title],
            item[menusProps.icon],
            item[menusProps.route],
            item
          )
        }
      })
    }

    return (
      <el-menu
        class={classNames(`${ufinComponentPrefixCls}-asidemenu`)}
        mode={mode}
        router={router}
        default-active={defaultActive || this.$route.path}
        collapse={collapsed}
        background-color={currentElMenuTheme.backgroundColor}
        text-color={currentElMenuTheme.textColor}>
        {subMenusNodes(menus)}
      </el-menu>
    )
  }
})

export default ufinMenuBase

import PropTypes from '../utils/prop-types'

/**
 * Layout布局所有的组件和模式都支持的props
 */
export const LayoutBaseProps = {
  theme: PropTypes.string.def('dark'),
  //  是否是展开
  collapsed: PropTypes.bool,

  isMobile: PropTypes.bool
}

/**
 * Layout布局Aside需要的props
 */
export const LayoutHeaderProps = {
  headerFixed: PropTypes.bool.def(true)
}
/**
 * Layout布局Aside需要的props
 */
export const LayoutMenuTabsProps = {
  // 侧边栏展开的宽度
  includes: PropTypes.array.def([])
}

/**
 * Layout布局Aside需要的props
 */
export const LayoutAsideProps = {
  // 侧边栏展开的宽度
  asideWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).def(
    256
  ),
  // 侧边栏收起的宽度
  asideCollapsedWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).def(80),

  asideFixed: PropTypes.bool.def(true)
}

/**
 * Layout布局AsideLogo的props
 */
export const LayoutAsideLogoProps = {
  // LOGO
  logo: PropTypes.any,
  // 侧边栏 LOGO 的标题
  title: PropTypes.string.def('')
}

/**
 * Layout布局AsideMenu的props
 */
export const LayoutAsideMenuProps = {
  // 菜单数据
  menus: PropTypes.array,
  // 菜单数据 配置选项
  menusProps: PropTypes.object.def({
    // 唯一主键
    id: 'id',
    // 菜单路由的路径
    route: 'controller',
    // 菜单的标题
    title: 'itemName',
    // 菜单的图标(只有一级菜单才展示)
    icon: 'icon',
    // 下级菜单
    children: 'children'
  }),
  menuIconRender: PropTypes.func,
  // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
  router: PropTypes.bool.def(true),
  // 自定义route
  route: PropTypes.func,
  // 点击了菜单栏
  handleClickMenuItem: PropTypes.func,
  // 主题
  theme: PropTypes.string.def('dark'),
  // 模式  	horizontal / vertical
  mode: PropTypes.string.def('vertical'),
  // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
  collapsed: PropTypes.bool.def(false)
}

export default {
  ...LayoutBaseProps,

  ...LayoutHeaderProps,

  ...LayoutMenuTabsProps,

  ...LayoutAsideProps,

  ...LayoutAsideLogoProps,

  ...LayoutAsideMenuProps,

  // 切换媒体类型
  handleMediaQuery: PropTypes.func,

  handleToggleCollapse: PropTypes.func
}

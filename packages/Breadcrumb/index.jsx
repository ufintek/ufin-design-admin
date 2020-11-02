import ufinCreateComponent, { componentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'
import { compile } from 'path-to-regexp'

/**
 * 通用面包屑处理组件
 *
 *  注意点：
 *   1. 此组件跟 src/routers/modules/xx.js 路由文件息息相关， 会根据路由配置文件的层级关系 ，meta.title ， name等字段有关系
 *   2.
 *
 *
 *
 */

const HOME_CONFIG = {
  name: 'home',
  path: '/home',
  meta: {
    title: '首页'
  }
}

// 样式文件
import './index.scss'

export const ufinBreadcrumbProps = {}

const ufinBreadcrumb = ufinCreateComponent({
  name: `${componentPrefixCls}Breadcrumb`,
  props: ufinBreadcrumbProps,
  data() {
    return {
      levelList: null,
      isShowBreadCrumb: true
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // 如果当前页面 meta.breadcrumb设置为 false 那么说明不展示breadcrumb
      if (this.$route.meta && this.$route.meta.breadcrumb === false) {
        this.isShowBreadCrumb = false
        return
      }
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]

      if (!this.isDashboard(first)) {
        // 如果没有添加首页，那么默认将首页作为顶一个面包屑
        matched = [{ ...HOME_CONFIG }].concat(matched)
      }
      // 如果路由配置中 meta.breadcrumb 或者 meta.title不存在那么就不会生成面包屑
      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },

    /**
     * 判断第一个路由组件是不是首页，如果不是首页,那么添加首页进入
     */
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      // 用路由的 name与首页的 name 比较判断是否是首页
      return (
        name.trim().toLocaleLowerCase() === HOME_CONFIG.name.toLocaleLowerCase()
      )
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = compile(path)
      return toPath(params)
    }
  },
  render() {
    const { levelList } = this
    /**
     * 点击跳转到对应的页面
     */
    const handleLink = (item) => {
      // 是否定义了 redirect 如果此router定义了 redirect 那么就会直接跳转到对应的页面
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      //   如果没有定义重定向地址，那么就跳转到对应的页面
      this.$router.push(this.pathCompile(path))
    }
    return (
      <el-breadcrumb class="base-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          {levelList.map((item, index) => {
            return (
              <el-breadcrumb-item key={item.path}>
                {item.redirect === 'noRedirect' ||
                index == levelList.length - 1 ? (
                  <span class="no-redirect">{item.meta.title}</span>
                ) : (
                  <a click={handleLink.bind(this, item)}>{item.meta.title}</a>
                )}
              </el-breadcrumb-item>
            )
          })}
        </transition-group>
      </el-breadcrumb>
    )
  }
})

/* istanbul ignore next */
ufinBreadcrumb.install = function(Vue) {
  Vue.component(ufinBreadcrumb.name, ufinBreadcrumb)
}

export default ufinBreadcrumb

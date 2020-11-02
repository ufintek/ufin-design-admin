import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import ufinContentMenu from './ContentMenu'
// 样式文件
import './index.scss'
import {
  LayoutAsideProps,
  LayoutHeaderProps,
  LayoutMenuTabsProps
} from '../Layout/BasicLayoutProps'
import { isObj } from '@/utils/validate/data'

export const ufinLayoutMenuTabsProps = {
  ...LayoutAsideProps,
  ...LayoutHeaderProps,
  ...LayoutMenuTabsProps,
  // 首页
  homePageName: PropTypes.string.def('Home')
}

const homePagtFullPath = '/home'

const ufinLayoutMenuTabsHasMenu = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutMenuTabs`,
  props: ufinLayoutMenuTabsProps,
  data() {
    return {
      // 当前显示的页面 route
      pageList: [],
      // 当前显示的页面 $route.fullPath
      fullPathList: [],
      // 当前的页面的 fullPath
      activePage: '',
      // 是否显示 下拉选项菜单
      menuVisible: false,
      // 下拉选项菜单的位置
      contextMenu: {
        left: 0,
        top: 0,
        target: null
      },

      menuItemList: [
        { key: '1', text: '刷新' },
        { key: '2', text: '关闭' },
        { key: '3', text: '关闭其他' },
        { key: '4', text: '关闭所有' }
      ]
    }
  },
  created() {
    // 初始化获取当前页面的全路径
    const currentPagefullPath = this.$route.fullPath
    if (currentPagefullPath !== '/') {
      this.pageList.push(this.$route)
      this.fullPathList.push(currentPagefullPath)
      this.activePage = this.$route
    }
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      if (newRoute.path !== '/') {
        this.activePage = newRoute
        // 将fullPage转成path，如果存在表示重复，需要进行替换
        const fullPathList = this.fullPathList.map((p) => p.split('?')[0])
        const index = fullPathList.indexOf(newRoute.path)
        if (index < 0) {
          this.fullPathList.push(newRoute.fullPath)
          this.pageList.push(newRoute)
        } else {
          this.fullPathList.splice(index, 1, newRoute.fullPath)
          this.pageList.splice(index, 1, newRoute)
        }
      }
    },
    // 通过activePage 去切换页面
    activePage: function(key) {
      if (key) this.$router.push(key)
    }

    // pageList(newData, oldData) {
    //   let pageList = []
    //   newData.forEach((d) => {
    //     const { fullPath, name, meta, params, path, query } = d
    //     pageList.push({
    //       fullPath,
    //       name,
    //       meta,
    //       params,
    //       path,
    //       query
    //     })
    //   })
    //   window.localStorage.setItem('pageList', JSON.stringify({ pageList }))
    //   // this.AsyncIncludes(newData.map((d) => d.name))
    //   // console.log('newData', newData)
    //   window.onbeforeunload = newData.find(
    //     (item) => item.name === 'interactSmartDetail'
    //   )
    //     ? (e) => {
    //         e.preventDefault()
    //         e.returnValue = ''
    //       }
    //     : null
    // }
  },
  render(h) {
    const {
      activePage,
      pageList,
      menuVisible,
      contextMenu,
      menuItemList,
      // 首页的 name 属性
      homePageName
    } = this

    const LayoutMenuTabsCls = classNames(`${ufinComponentPrefixCls}-menutabs`)

    const skipPage = () => {}

    /**
     * 刷新当前页签
     * @param {*} pageKey
     */
    const reflushCurrentPage = (pageKey) => {
      const page = this.pageList.find((p) => p.fullPath === pageKey)
      if (page) {
        const that = this
        const pageName = page.name
        this.includes.filter((fullPath) => fullPath !== pageKey)
        this.$nextTick(() => {
          setTimeout(() => {
            // that.AddIncludes(pageName)
            this.includes.push(pageKey)
          }, 100)
        })
        // this.AddExcludes(pageName)
        // this.$nextTick(() => {
        //   setTimeout(() => {
        //     that.DelExcludes(pageName)
        //   }, 100)
        // })
      }
    }
    /**
     * 关闭其他的页面
     * @param {*} pageKey
     */
    const closeOthersPage = (pageKey) => {
      // 获取当前页面的下标
      let index = this.fullPathList.indexOf(pageKey)
      // this.pageList.forEach((d, i) => {
      //   if (i !== index) this.AddExcludes(d.name)
      // })
      // 获取首页的下标
      const homePage = this.pageList.find((d) => d.name === homePageName)
      // 移除其他页面
      this.fullPathList = this.fullPathList.slice(index, index + 1)
      this.pageList = this.pageList.slice(index, index + 1)

      // 从开始插入一个首页
      let idx = 0
      if (homePage && !this.pageList.find((d) => d.name === homePageName)) {
        this.fullPathList.splice(0, 0, homePage.fullPath)
        this.pageList.splice(0, 0, homePage)
        idx = 1
      }
      // 设置激活的页面为当前页面
      this.activePage = this.pageList[idx]
    }
    /**
     * 关闭所有的页面
     * @param {*} pageKey
     */
    const closeAllPage = (pageKey) => {
      // 获取首页页面
      const homePage = this.pageList.find((d) => d.name === homePageName)
      this.fullPathList = homePage ? [homePage.fullPath] : []
      this.pageList = homePage ? [homePage] : []
      this.activePage = homePage ? homePage : homePagtFullPath
    }

    // 点击 tab页签 切换页面
    const changePage = (tab) => {
      // 获取 tab fullPath
      const fullPath = tab.name
      const page = this.pageList.find((d) => d.fullPath === fullPath)
      this.activePage = page
    }

    /**
     * 移除当前页面
     * @param {*} key  页面的 key 即页面的全路径 fullPath
     */
    const removeTab = (key) => {
      // 获取首页页面
      const homePage = this.pageList.find((d) => d.name === homePageName)
      let index = this.fullPathList.indexOf(key)
      const removePage = this.fullPathList[index]
      this.fullPathList = this.fullPathList.filter((item) => item !== key)
      this.pageList = this.pageList.filter((item) => item.fullPath !== key)
      // 如果关闭的是最后一个 那么显示的下标就位最后一个，不然就是当前下标
      index =
        index >= this.fullPathList.length ? this.fullPathList.length - 1 : index
      // 如果还存在其他的页面
      if (index >= 0) {
        if (
          removePage ===
          (isObj(this.activePage) ? this.activePage.fullPath : this.activePage)
        ) {
          this.activePage = this.pageList[index]
        }
      } else {
        // 不然显示首页
        this.activePage = homePage ? homePage : homePagtFullPath
      }
    }

    /**
     * 点击右键显示菜单
     * @param {*} e
     */
    const onContextMenu = (e) => {
      e.preventDefault()
      const id = e.target.id
      if (id) {
        this.menuVisible = true
        // 菜单显示的左边距
        this.contextMenu.left = e.clientX
        this.contextMenu.top = e.clientY
        // 页面的全路径
        this.contextMenu.target = e.target.id.substr(4)
      }
    }

    /**
     * 点击了菜单
     * @param {*} key     点击的菜单的 key
     * @param {*} pageKey 当前页签的全路径
     */
    const onMenuSelect = (key, pageKey) => {
      switch (key) {
        // 刷新
        case '1':
          reflushCurrentPage(pageKey)
          break
        // 移除
        case '2':
          removeTab(pageKey)
          break
        // 关闭其他
        case '3':
          closeOthersPage(pageKey)
          break
        // 关闭所有
        case '4':
          closeAllPage(pageKey)
          break
        default:
          break
      }
    }

    return (
      <div class={LayoutMenuTabsCls}>
        {/* 标签上的右键菜单 */}
        <ufinContentMenu
          class={classNames(`${LayoutMenuTabsCls}__menu`)}
          ref="contextMenu"
          itemList={menuItemList}
          visible={menuVisible}
          onSelect={onMenuSelect}
          left={contextMenu.left}
          top={contextMenu.top}
          target={contextMenu.target}
          {...{
            on: {
              'update:visible': (val) => (this.menuVisible = val)
            }
          }}
        />
        {/* 标签页tabs */}
        <el-tabs
          class={classNames(`${LayoutMenuTabsCls}__menu-tabs`)}
          type="card"
          value={activePage.fullPath}
          {...{
            on: {
              'tab-click': changePage,
              'tab-remove': ($event) => {
                removeTab.call(this, $event)
              }
            },
            nativeOn: {
              contextmenu: onContextMenu
            }
          }}>
          {pageList.map((page) => {
            return (
              <el-tab-pane
                closable={page.name !== homePageName}
                key={page.fullPath}
                name={page.fullPath}
                label={page.meta.title}
              />
            )
          })}
        </el-tabs>
      </div>
    )
  }
})

export default ufinLayoutMenuTabsHasMenu

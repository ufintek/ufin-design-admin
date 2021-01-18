// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'

import hljs from 'highlight.js'
import routes from './config'
import title from '../i18n/title'


Vue.use(VueRouter)
const router = new VueRouter({
  base: 'ufin-design',
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    }

    return { x: 0, y: 0 }
  },
})

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  const data = title[route.meta.lang]
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val]
      return
    }
  }
  document.title = 'Element'
})

export default router

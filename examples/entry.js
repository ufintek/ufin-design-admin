import Vue from 'vue'
import App from './app'
import Element from 'main/index.js'

import router from './routers/index.js'

import demoBlock from './components/demo-block'
import MainFooter from './components/footer'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'

import 'packages/theme-chalk/src/index.scss'

import './demo-styles/index.scss'
import './assets/styles/common.css'
import './assets/styles/fonts/style.css'
import icon from './icon.json'

Vue.use(Element)
Vue.component('demo-block', demoBlock)
Vue.component('main-footer', MainFooter)
Vue.component('main-header', MainHeader)
Vue.component('side-nav', SideNav)
Vue.component('footer-nav', FooterNav)

const globalEle = new Vue({
  data: { $isEle: false }, // 是否 ele 用户
})

Vue.mixin({
  computed: {
    $isEle: {
      get: () => globalEle.$data.$isEle,
      set: data => {
        globalEle.$data.$isEle = data
      },
    },
  },
})

Vue.prototype.$icon = icon // Icon 列表页用


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

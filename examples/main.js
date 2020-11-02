/**
 * Created by aresn on 16/6/20.
 */
// import "babel-polyfill";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import ufinUI from "../packages/index";
// import locale from '../src/locale/lang/en-US';
import locale from "../src/locale/lang/zh-CN";

import ElementUi from "element-ui";
Vue.use(ElementUi);

Vue.use(VueRouter);

Vue.use(ufinUI, {
    locale,
    capture: true
});

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
    mode: "history",
    routes: [
        {
            path: "/icon",
            component: resolve => require(["./routers/icon.vue"], resolve)
        },
        {
            path: "/alert",
            component: resolve => require(["./routers/alert.vue"], resolve)
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");

import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App.vue'
import store from './store'
import router, { addRouter } from '@/router/index.ts'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { Component } from "vue-property-decorator";
import moment from 'moment'//导入moment
import '@/icons' // icon
import '@/permission' // permission control
import { downloadUrl, uploadUrl, showStatus } from '@/config'

const USER_ROUTER: string | null = window.sessionStorage.getItem(
    'USER_ROUTER'
)
if (USER_ROUTER) {
    try {
        addRouter(JSON.parse(USER_ROUTER) as any)
    } catch (error) {
        addRouter([])
        throw error
    }
}
Vue.prototype.$downloadUrl = downloadUrl
Vue.prototype.$uploadUrl = uploadUrl
Component.registerHooks([
    "beforeRouteEnter",
    "beforeRouteLeave",
    "beforeRouteUpdate"
]);

// import 'echarts-gl'
Vue.component('vue-echarts', ECharts)

if (process.env.NODE_ENV === 'production') {
    // mockXHR()
}

Vue.filter('date-filter', (value: any) => {
    return value.substr(0, 19).split('T').join(' ')
})
Vue.filter('discount', (value: any) => {
    value = 1 - Number(value)
    return (value * 100).toFixed(2)
})
Vue.filter('previewFilter', (list: any[]) => {
    return list.map((item: any) => {
        return downloadUrl + item.imagePath
    })
})
Vue.filter('showStatusFilter', (str: string) => {
    return showStatus[str]
})
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

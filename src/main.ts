import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App.vue'
import store from './store'
import router from './router'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import moment from 'moment'//导入moment
import '@/icons' // icon
import '@/permission' // permission control
// import 'echarts-gl'
Vue.component('vue-echarts', ECharts)

if (process.env.NODE_ENV === 'production') {
    // mockXHR()
}

Vue.filter('date-filter', (value: any) => {
    return moment(new Date(value).valueOf()).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('upload', (value: string) => {
    return 'http://localhost:5000/api/upload'
})
Vue.filter('download', (value: string) => {
    return 'http://localhost:5000' + value
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

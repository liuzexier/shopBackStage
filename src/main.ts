import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
if (process.env.NODE_ENV === 'production') {
    // mockXHR()
}
import moment from 'moment'//导入moment

// Vue.prototype.$moment = moment;//赋值使用

Vue.filter('date-filter', (value: any) => {
    return moment(new Date(value).valueOf()).format('YYYY-MM-DD HH:mm:ss')
})

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

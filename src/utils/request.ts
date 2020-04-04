import axios from 'axios'
import Qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 600000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        config.data = Qs.stringify(config.data)
        let token = window.sessionStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.resultCode !== 'Success') {
            Message.error(res.msg)
        }
        if (response.status == 200) {
            return res
        } else if (response.status == 401) {
            console.log('未登录')
            Message.error('未登录')
            return res
        }
        return res
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service

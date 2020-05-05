import request from '@/utils/request'
import { addRouter } from '@/router/index.ts'
export function login(data: any) {
    return request({
        url: '/user/',
        method: 'post',
        data
    })
}

export function getInfo(token?: any) {
    return new Promise((resolve: Function, reject: Function) => {
        request({
            url: '/user/',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            // addRouter([
            //     {
            //         path: '/table',
            //         component: 'Layout',
            //         meta: { title: '表格' },
            //         redirect: '/table/index',
            //         children: [{
            //             path: 'index',
            //             name: 'table',
            //             component: 'table',
            //             meta: { title: '表格', icon: '' }
            //         }]
            //     }
            // ])
            resolve(res)
        }).catch((err: any) => {
            reject(err)
        })
    })
}

export function register(data: any) {
    return request({
        url: '/user/',
        method: 'put',
        data
    })
}

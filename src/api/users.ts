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
    // const USER_ROUTER: string | null = window.sessionStorage.getItem('USER_ROUTER')
    // if (USER_ROUTER) {
    //     try {
    //         addRouter(JSON.parse(USER_ROUTER) as any)
    //     } catch (error) {
    //         addRouter([])
    //         throw error
    //     }
    // }
    return new Promise((resolve: Function, reject: Function) => {
        request({
            url: '/user/',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res: any) => {
            // if (!USER_ROUTER) {
            //     window.sessionStorage.setItem('USER_ROUTER', JSON.stringify(res.dataSet.routers))
            //     addRouter(res.dataSet.routers || [])
            // }
            resolve(res)
        }).catch((err: any) => {
            reject(err)
        })
    })
}

export function getAllUser(params: any) {
    return request({
        url: `/user/getall/${params.page}/${params.pageSize}?userName=${params.userName}&userAccount=${params.userAccount}&userStatus=${params.userStatus}`,
        method: 'get'
    })
}

export function register(data: any) {
    return request({
        url: '/user/',
        method: 'put',
        data
    })
}
export function updateOther(data: any) {
    return request({
        url: `/user/updateother`,
        method: 'post',
        data
    })
}
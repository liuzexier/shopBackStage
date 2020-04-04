import request from '@/utils/request'
export function login(data: any) {
    return request({
        url: '/user/',
        method: 'post',
        data
    })
}

export function getInfo(token: any) {
    return request({
        url: '/user/',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // params: { token }
    })
}

export function register(data: any) {
    return request({
        url: '/user/',
        method: 'put',
        data
    })
}

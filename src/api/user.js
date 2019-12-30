import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/admins/signin',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/admins/getInfo',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // params: { token }
    })
}

export function findAllUser(data) {
    return request({
        url: '/users/findall',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function register(data) {
    return request({
        url: '/admins/signup',
        method: 'post',
        data
    })
}

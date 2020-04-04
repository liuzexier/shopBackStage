// /orders/user/findorderbypage

import request from '@/utils/request'

export function findOrderByPage(params: any) {
    return request({
        url: 'orders/admin/findorderbypage',
        method: 'get',
        params
    })
}
export function updateOrderStatus(data: any) {
    return request({
        url: 'orders/admin/updateorderstatus',
        method: 'post',
        data
    })
}
export function findOrderByUsername(params: any) {
    return request({
        url: 'orders/admin/findorderbyusername',
        method: 'get',
        params
    })
}
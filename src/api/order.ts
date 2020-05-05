// /orders/user/findorderbypage

import request from '@/utils/request'

export function findOrderByPage(params: any) {
    return request({
        url: `order/getorderlist/${params.page}/${params.pageSize}`,
        method: 'get'
    })
}
export function changeOrderStatus(data: any) {
    return request({
        url: `order/changeorder/${data.status}`,
        method: 'post',
        data: {
            orderId: data.orderId
        }
    })
}

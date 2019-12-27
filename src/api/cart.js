import request from '@/utils/request'

export function findCartByName(data) {
    return request({
        url: 'carts/findcartbyname',
        method: 'post',
        data
    })
}
export function findAllCartByPage(params) {
    return request({
        url: 'carts/findallcartbypage',
        method: 'get',
        params
    })
}
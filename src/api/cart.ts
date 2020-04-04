import request from '@/utils/request'

export function findCartByName(data:any) {
    return request({
        url: 'carts/findcartbyname',
        method: 'post',
        data
    })
}
export function findAllCartByPage(params:any) {
    return request({
        url: 'carts/findallcartbypage',
        method: 'get',
        params
    })
}
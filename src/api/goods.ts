import request from '@/utils/request'

export function getTypeList(params: any) {
    return request({
        url: 'types/findall',
        method: 'get',
        params
    })
}
export function deleteTypeById(data: any) {
    return request({
        url: 'types/deletebyid',
        method: 'post',
        data
    })
}
export function updateTypeById(data: any) {
    return request({
        url: 'types/updatetypebyid',
        method: 'post',
        data
    })
}
export function addType(data: any) {
    return request({
        url: 'types/addtype',
        method: 'post',
        data
    })
}
export function addGoods(data: any) {
    return request({
        url: 'goods/addgoods',
        method: 'post',
        data
    })
}
export function findGoodsByPage(params: any) {
    return request({
        url: 'goods/findbypage',
        method: 'get',
        params
    })
}
export function deleteGoodsById(data: any) {
    return request({
        url: 'goods/deletegoodsbyid',
        method: 'post',
        data
    })
}
export function getGoodsById(params: any) {
    return request({
        url: 'goods/getgoodsbyid',
        method: 'get',
        params
    })
}
export function updateGoods(data: any) {
    return request({
        url: 'goods/updategoods',
        method: 'post',
        data
    })
}
export function getGoodsByType(params: any) {
    return request({
        url: 'goods/getgoodsbytype',
        method: 'get',
        params
    })
}
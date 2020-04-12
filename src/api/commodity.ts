import request from '@/utils/request'

export function createCommodity(data: any) {
    return request({
        url: 'commodity/add',
        method: 'post',
        data
    })
}
export function deleteCommoditys(data: any) {
    return request({
        url: 'commodity/delete',
        method: 'delete',
        data
    })
}
export function updateCommoditys(data: any) {
    return request({
        url: 'commodity/update',
        method: 'put',
        data
    })
}
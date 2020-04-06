
import request from '@/utils/request'
export function findMyStoresByPage(params: any) {
    return request({
        url: `store/${params.page}/${params.pageSize}`,
        method: 'get'
    })
}
export function createStore(data: any) {
    return request({
        url: `store/`,
        method: 'post',
        data
    })
}
export function updateStore(data: any) {
    return request({
        url: `store/`,
        method: 'put',
        data
    })
}
export function deleteStores(data: any) {
    return request({
        url: `store/`,
        method: 'delete',
        data
    })
}
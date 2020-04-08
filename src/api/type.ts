import request from '@/utils/request'
export function getAllType() {
    return request({
        url: `type/getalltype`,
        method: 'get'
    })
}
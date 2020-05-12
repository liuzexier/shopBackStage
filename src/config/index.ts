export const downloadUrl = 'http://localhost:5000'
export const uploadUrl = 'http://localhost:5000/api/upload'
export const statusMap = {
    DEFAULT: 'DEFAULT',
    DELEATED: 'DELEATED'
}
export const showStatusMap: any = {
    DEFAULT: '正常',
    DELEATED: '已删除'
}
export const orderStatusMap = {
    ALL: '',
    INIT: 'INIT',
    PAYED: 'PAYED',
    TOBEDELIVERED: 'TOBEDELIVERED',
    WAITTING: 'WAITTING',
    COMPLETE: 'COMPLETE',
    CANCELED: 'CANCELED'
}
export const showStatus: any = {
    INIT: '待付款',
    PAYED: '已付款',
    TOBEDELIVERED: '待发货',
    WAITTING: '待收货',
    COMPLETE: '已完成',
    CANCELED: '已取消'
}
export function userStatus(): Array<any> {
    const arr: any[] = [{
        label: '全部',
        value: ''
    }]
    for (const key in showStatusMap) {
        // eslint-disable-next-line no-prototype-builtins
        if (showStatusMap.hasOwnProperty(key)) {
            arr.push({
                label: showStatusMap[key],
                value: key
            })
        }
    }
    return arr
}
export function orderStatus(): Array<any> {
    const arr: any[] = [{
        label: '全部',
        value: ''
    }]
    for (const key in showStatus) {
        // eslint-disable-next-line no-prototype-builtins
        if (showStatus.hasOwnProperty(key)) {
            arr.push({
                label: showStatus[key],
                value: key
            })
        }
    }
    return arr
}
export const userType: Array<string> = ['', '管理员', '商家', '用户']
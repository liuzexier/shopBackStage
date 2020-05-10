export const downloadUrl = 'http://localhost:5000'
export const uploadUrl = 'http://localhost:5000/api/upload'
export const statusMap = {
    DEFAULT: 'DEFAULT',
    DELEATED: 'DELEATED'
}
export const showStatusMap = {
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
export const userType: Array<string> = ['', '管理员', '商家', '用户']
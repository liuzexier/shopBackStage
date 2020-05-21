import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/**
 *注意：子菜单仅在路由children.length> = 1时出现
 *详细信息请参见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 *隐藏：如果设置为true，则为true，则项目不会显示在边栏中（默认为false）
 *alwaysShow：如果设置为true，则将始终显示根菜单
 *如果未设置alwaysShow，则当项有多个子路线时，
 *它将变为嵌套模式，否则不显示根菜单
 *redirect：noRedirect如果设置了noRedirect将不会在面包屑中重定向
 *name：“路由器名称”，该名称由<keep-alive>使用（必须设置！！！）
 *meta：{
    角色：['admin'，'editor']控制页面角色（您可以设置多个角色）
    title：“ title”名称显示在侧边栏和面包屑中（推荐设置）
    图标：'svg-name'图标显示在侧栏中
    面包屑：如果设置为false，则该项将隐藏在面包屑中（默认值为true）
    activeMenu：如果设置了路径，则为“ /example /list”，边栏将突出显示您设置的路径
  }
 */

/**
 *constantRoutes
 *没有权限要求的基本页面
 *可以访问所有角色
 */
import { storeRouter } from '@/views/store/store.router.ts'
import { orderRouter } from '@/views/order/order.router.ts'
import { usersRouter } from '@/views/users/users.router.ts'

const asyncRouterMap: any = {
    UserList: require('@/views/users/list/index.vue').default,
    StoreList: require('@/views/store/list/index.vue').default,
    StoreDesc: require('@/views/store/desc/index.vue').default,
    AllStoreList: require('@/views/store/all/index.vue').default,
    OrderList: require('@/views/order/list/index.vue').default
}

Vue.use(Router)
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/store/list'
        // children: [{
        //     path: 'dashboard',
        //     name: 'Dashboard',
        //     component: () => import('@/views/dashboard/index.vue'),
        //     meta: { title: '仪表盘', icon: 'dashboard' }
        // }]
    },
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/index',
    //     children: [{
    //         path: 'index',
    //         name: 'table',
    //         component: () => import('@/views/table/index.vue'),
    //         meta: { title: 'table' }
    //     }]
    // },
    // ...storeRouter,
    // ...orderRouter,
    // ...usersRouter,
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]
const option: any = {
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
}
const createRouter: any = () => new Router(option)

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export function addRouter(syncRouter: any[]) {
    const syncRouterMap: any[] = syncRouter.map((item: any) => {
        return {
            ...item,
            component: Layout,
            children: item.children.map((subitem: any) => {
                return {
                    ...subitem,
                    component: asyncRouterMap[subitem.component]
                }
            })
        }
    })
    router.options.routes = [...constantRoutes, ...syncRouterMap]
    router.addRoutes(syncRouterMap)
}
export default router

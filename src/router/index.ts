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
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: { title: '仪表盘', icon: 'dashboard' }
        }]
    },
    ...storeRouter,
    {
        path: '/goodsmanage',
        component: Layout,
        redirect: '/goodsmanage/table',
        name: 'Goodsmanage',
        meta: { title: '商品', icon: 'form' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/goods/index.vue'),
                meta: { title: '商品管理', icon: '' }
            },
            {
                path: 'type',
                name: 'Type',
                component: () => import('@/views/goodstype/index.vue'),
                meta: { title: '商品类别管理', icon: '' }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        name: 'User',
        meta: { title: '用户', icon: 'user' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/user/index.vue'),
                meta: { title: '用户管理', icon: '' }
            },
            {
                path: 'cart',
                name: 'Cart',
                component: () => import('@/views/cart/index.vue'),
                meta: { title: '购物车管理', icon: '' }
            }
        ]
    },
    {
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        name: 'Order',
        meta: { title: '订单', icon: 'nested' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/order/index.vue'),
                meta: { title: '订单管理', icon: '' }
            }
        ]
    },
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

export default router

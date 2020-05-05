import Layout from '@/layout/index.vue'
export const orderRouter = [
    {
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        name: 'order',
        meta: { title: '订单' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/order/list/index.vue'),
                meta: { title: '订单列表', icon: '' }
            }
        ]
    }
]
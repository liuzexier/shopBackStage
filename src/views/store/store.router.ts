import Layout from '@/layout/index.vue'
export const storeRouter = [
    {
        path: '/store',
        component: Layout,
        redirect: '/store/list',
        name: 'Store',
        meta: { title: '店铺', icon: 'nested' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/store/list/index.vue'),
                meta: { title: '店铺列表', icon: '' }
            },
            {
                path: 'desc/:id',
                name: 'desc',
                component: () => import('@/views/store/desc/index.vue'),
                meta: { title: '店铺详情', icon: '' },
                hidden: true
            }
        ]
    }
]
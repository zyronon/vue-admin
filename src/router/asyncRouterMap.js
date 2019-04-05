import _import from '@/utils/import'
const Layout = _import('layout/Layout')

export const asyncRouterMap = [
    // 个人中心
    {
        path: '/profile',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'index',
                component: _import('profile/index'),
                name: 'profile',
                meta: {
                    title: 'profile',
                    icon: 'test'
                }
            }
        ]
    },
    // 文章
    {
        path: '/article',
        component: Layout,
        // hidden: true,
        meta: {
            title: 'ArticleManager',
            icon: 'widgets'
        },
        children: [
            {
                path: 'list',
                component: _import('article/List'),
                name: 'ArticleList',
                meta: {
                    title: 'ArticleList',
                    icon: 'widgets'
                }
            },
            {
                path: 'create',
                component: _import('article/Create'),
                name: 'CreateArticle',
                meta: {
                    title: 'CreateArticle',
                    icon: 'widgets'
                }
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]

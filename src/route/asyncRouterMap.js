import _import from '@/utils/import'
const Layout = _import('layout/layout')

//动态路由表，全部的。服务返回的json结构与此判断，生成该用户对应的路由表
export const asyncRouterMap = [
    {
        path: '/article',
        name: 'article',
        component: Layout,
        hidden:false,
        meta: {
            title: '文章',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'index',
                component: _import('article/index'),
                hidden:false,
                meta: {
                    title: '列表',
                    icon: 'comp',
                }
            },
            {
                path: 'create',
                name: 'create',
                component: _import('article/create'),
                hidden:false,
                meta: {
                    title: ' 创建',
                    icon: 'comp',
                }
            },
        ]
    },{
        path: '/profile',
        name: 'profile',
        component: Layout,
        hidden:true,
        meta: {
            title: '首页',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'index',
                component: _import('profile/index'),
                hidden:false,
                meta: {
                    title: '个人中心',
                    icon: 'comp',
                }
            }
        ]
    },
]

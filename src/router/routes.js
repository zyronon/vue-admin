export const route = [
    // 项目管理
    {
        path: '/project',
        redirect: 'project/list',
        component: Layout,
        name: 'ProjectManager',
        meta: {
            title: 'ProjectManager',
            icon: 'widgets'
        },
        children: [
            {
                path: 'list',
                component: _import('project/List'),
                name: 'ProjectList',
                meta: {
                    title: 'ProjectList',
                    icon: 'widgets'
                }
            },
            {
                path: 'detail',
                hidden: true,
                component: _import('project/Detail'),
                name: 'ProjectDetail',
                meta: {
                    title: 'ProjectDetail',
                    icon: 'widgets'
                }
            },
            {
                path: 'project-change',
                hidden: true,
                component: _import('project/ProjectChange'),
                name: 'ProjectChange',
                meta: {
                    title: 'ProjectChange',
                    icon: 'widgets'
                }
            }
        ]
    },
    // 公告通知管理
    {
        path: '/notify',
        component: Layout,
        name: 'NotifyManager',
        meta: {
            title: 'NotifyManager',
            icon: 'widgets'
        },
        children: [
            {
                path: 'list',
                component: _import('notify/List'),
                name: 'NotifyList',
                meta: {
                    title: 'NotifyList',
                    icon: 'widgets'
                }
            }, {
                path: 'create',
                component: _import('notify/Create'),
                name: 'CreateNotify',
                hidden: true,
                meta: {
                    title: 'CreateNotify',
                    icon: 'widgets'
                }
            }, {
                path: 'detail',
                component: _import('notify/Detail'),
                name: 'NotifyDetail',
                hidden: true,
                meta: {
                    title: 'NotifyDetail',
                    icon: 'widgets'
                }
            }
        ]
    },
]

export default {
    REDIRECT: 'redirect',
    
    // 请求方法
    POST: 'post',
    GET: 'get',
    PATCH: 'patch',
    DELETE: 'delete',
    PUT: 'put',
    
    // 静态常量
    PICKEROPTIONS: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            },
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            },
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            },
        }],
    },
    PAGENUMBER: 1,
    PAGESIZE: 10,
    DELAYTIME: 250,
    SUCCESS: '000000',
}

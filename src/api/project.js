import http from '@/utils/http'


export default {
    list(data) {
        return http({
            url: '/project/list',
            method: 'post',
            data
        })
    }
}
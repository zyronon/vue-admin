import Mock from 'mockjs'


!function notReadMessages() {
    let data = Mock.mock({
        'data|3-10': [{
            'id|1': '@id',
            'title|1': '@ctitle',
            'content|1': '@csentence',
            // 'createTime|1': Random.date('T')
            'createTime|1': "@date('T')"
        }],
        'code|1': '000000',
        'msg': '',
    })
    Mock.mock(/user\/notReadMessages/, data)
    Mock.mock(/user\/hasReadMessage/, data)
}()

!function notReadMessages() {
    let data = Mock.mock({
        'data|0': [{
            'id|1': '@id',
            'title|1': '@ctitle',
            'content|1': '@csentence',
            // 'createTime|1': Random.date('T')
            'createTime|1': "@date('T')"
        }],
        'code|1': '000000',
        'msg': '',
    })
    Mock.mock(/user\/hasReadAllMessage/, data)
}()

export default {}

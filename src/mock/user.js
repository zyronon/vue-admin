import Mock from 'mockjs'

!(function notReadMessages() {
  const data = Mock.mock({
    'data|3-10': [{
      'id|1': '@id',
      'title|1': '@ctitle',
      'content|1': '@csentence',
      'createTime|1': "@date('T')",
    }],
    'code|1': '000000',
    msg: '',
  })
  Mock.mock(/user\/notReadMessages/, data)
}())

!(function hasReadAllMessage() {
  const data = Mock.mock({
    'data|0': [{
      'id|1': '@id',
      'title|1': '@ctitle',
      'content|1': '@csentence',
      'createTime|1': "@date('T')",
    }],
    'code|1': '000000',
    msg: '',
  })
  Mock.mock(/user\/hasReadAllMessage/, data)
}())

import dayjs from 'dayjs'

export default {
  // 时间转换器
  date(v) {
    if (!v) return ''
    if (typeof v === 'number') {
      const temp = `${v}`
      if (temp.length === 10) {
        return dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss')
      }
      return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
    }
    if (typeof v === 'string') {
      if (v.length === 10) {
        return dayjs.unix(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
      }
      return dayjs(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
    }
    return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
  },
  // 为空判断
  $(v) {
    if (!v) return ''
    if (v === null) return ''
    if (v === undefined) return ''
    return ''
  },

  // 处理身份证信息，中间隐藏掉
  processIdNumber(v) {
    if (!v) return ''
    const start = v.substr(0, 6)
    const end = v.substr(14, 4)
    return `${start} **** **** ${end}`
  },
}

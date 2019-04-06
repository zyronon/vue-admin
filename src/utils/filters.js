export default {
    //时间转换器
    date(v) {
        if (!v) return ''
        return new Date(v).toLocaleString()
    },
    //为空判断
    $(v) {
        if (!v) return ''
        if (v === null) return ''
        if (v === undefined) return ''
    },

    //处理身份证信息，中间隐藏掉
    processIdNumber(v) {
        if (!v) return ''
        let start = v.substr(0, 6)
        let end = v.substr(14, 4)
        return start + ' **** **** ' + end
    }
}


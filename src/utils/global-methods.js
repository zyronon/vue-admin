import { Message, MessageBox } from 'element-ui'

export default {
    // 解析url
    $parseURL(url) {
        const a = document.createElement('a')
        a.href = url
        return {
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                const ret = {}
                const seg = a.search.replace(/^\?/, '').split('&')
                const len = seg.length
                let i = 0
                let s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            }()),
            hash: a.hash.replace('#', ''),
        }
    },
    $jsonParse(v) {
        console.log(v)
        if (v !== undefined && v !== null && v !== '') {
            let temp
            try {
                temp = JSON.parse(`${v}`)
                console.log('json解析正常：', temp)
                if (typeof (temp) === 'number') {
                    return [temp]
                }
                return temp
            } catch (e) {
                console.log('json解析出错：', e)
                temp = [v]
                return temp
            }
        } else {
            return []
        }
    },
    // 递归执行网络请求，强行同步！！！
    // list，数据列表
    // i 下标
    // call 执行网络请求的回调
    // cb  请求完成的回调
    async $callApi(list, i, call, cb) {
        if (i < list.length) {
            await call(list[i])
            // console.log('第', i, '次调')
            this.$callApi(list, i + 1, call, cb)
        } else {
            cb()
        }
    },
    // 遍厉后端返回的数组，生成树状的json结构
    $getJsonTree(data, parentCode) {
        const itemArr = []
        for (const item of data) {
            if (item.resourceInfo.parentCode === parentCode) {
                const newNode = {
                    id: item.resourceCode,
                    type: item.resourceInfo.type,
                    path: item.resourceInfo.path,
                    label: item.resourceInfo.label,
                    sort: item.resourceInfo.sort,
                    disabled: item.resourceInfo.disabled,
                    parentCode: item.resourceInfo.parentCode,
                    children: this.$getJsonTree(data, item.resourceCode),
                }
                itemArr.push(newNode)
            }
        }
        return itemArr
    },
    
    $mConfirm(type, msg, onConfirm) {
        MessageBox.confirm(msg === '' ? '确定删除这条数据？' : msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type === '' ? 'warning' : type,
        }).then(() => {
            onConfirm()
        }).catch(() => {
        })
    },
    
    $success(msg) {
        Message({
            type: 'success', message: msg, duration: 1500, showClose: true,
        })
    },
    $warning(msg) {
        Message({
            type: 'warning', message: msg, duration: 1500, showClose: true,
        })
    },
    $error(msg) {
        Message({
            type: 'error', message: msg, duration: 1500, showClose: true,
        })
    },
    $checkPlatform() {
        // const isWechat = /micromessenger/i.test(navigator.userAgent)
        // const isWeibo = /weibo/i.test(navigator.userAgent)
        // const isQQ = /qq\//i.test(navigator.userAgent)
        // const isIOS = /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent)
        // const isAndroid = /android/i.test(navigator.userAgent)
    },
    
    // 倒计时时间格式化
    $countdownFormatTime(timeStamp) {
        const day = Math.floor(timeStamp / (24 * 3600 * 1000))
        const leave1 = timeStamp % (24 * 3600 * 1000)
        const hours = Math.floor(leave1 / (3600 * 1000))
        const leave2 = leave1 % (3600 * 1000)
        const minutes = Math.floor(leave2 / (60 * 1000))
        const leave3 = leave2 % (60 * 1000)
        const seconds = Math.floor(leave3 / 1000)
        if (day) return `${day}天${hours}小时${minutes}分`
        if (hours) return `${hours}小时${minutes}分${seconds}秒`
        if (minutes) return `${minutes}分${seconds}秒`
        if (seconds) return `${seconds}秒`
        return '时间到！'
    },
}

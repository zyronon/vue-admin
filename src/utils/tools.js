import {Message, MessageBox} from 'element-ui'
import {CONSTANT} from '@/utils/const_var'
import Config from '@/config'

export default {

    $config: Config,
    $CONSTANT: CONSTANT,

    $jsonParse(v) {
        console.log(v)
        if (v !== undefined && v !== null && v !== '') {
            let temp
            try {
                temp = JSON.parse(v + '')
                console.log('json解析正常：', temp)
                if (typeof (temp) === 'number') {
                    return [temp]
                }
                return temp
            } catch (e) {
                console.log('json解析出错：', e)
                return temp = [v]
            }
        } else {
            return []
        }
    },
    //递归执行网络请求，强行同步！！！
    //list，数据列表
    //i 下标
    //call 执行网络请求的回调
    //cb  请求完成的回调
    async $callApi(list, i, call, cb) {
        if (i < list.length) {
            await call(list[i])
            // console.log('第', i, '次调')
            this.$callApi(list, i + 1, call, cb)
        } else {
            cb()
        }
    },
    //遍厉后端返回的数组，生成树状的json结构
    $getJsonTree(data, parentCode) {
        let itemArr = []
        for (let item of data) {
            if (item.resourceInfo.parentCode === parentCode) {
                let newNode = {
                    id: item.resourceCode,
                    type: item.resourceInfo.type,
                    path: item.resourceInfo.path,
                    label: item.resourceInfo.label,
                    sort: item.resourceInfo.sort,
                    disabled: item.resourceInfo.disabled,
                    parentCode: item.resourceInfo.parentCode,
                    children: this.$getJsonTree(data, item.resourceCode)
                }
                itemArr.push(newNode)
            }
        }
        return itemArr
    },
    //合并json，主要用于dialog。dialog日期不能完成覆盖掉，必须保留其引用。否则修改日期不生效
    $concatJson(oldJson, newJson) {
        for (const newElement in newJson) {
            oldJson[newElement] = newJson[newElement]
        }
    },

    $mConfirm(type, msg, onConfirm) {
        MessageBox.confirm(msg === null ? '确定删除这条数据？' : msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type === null ? 'warning' : type
        }).then(() => {
            onConfirm()
            // this.$message({
            //     type: 'success',
            //     message: '操作成功!'
            // })
        }).catch(() => {
        })
    },

    $success(msg) {
        Message({type: 'success', message: msg, duration: 1500, showClose: true})
    },
    $warning(msg) {
        Message({type: 'warning', message: msg, duration: 1500, showClose: true})
    },
    $error(msg) {
        Message({type: 'error', message: msg, duration: 1500, showClose: true})
    }
}

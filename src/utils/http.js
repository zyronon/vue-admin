import axios from 'axios'
import globalMethods from './global-methods'
import Config from '../config/index'
import CONSTANT from '../utils/const_var'
import store from '@/store'


const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? Config.PRODUCT_API_URL : Config.API_URL,
    timeout: 15000,
})

// request 拦截器
instance.interceptors.request.use(
    config => {
        // if (Cookies.get('token')) {
        //     config.headers['access_token'] = Cookies.get('token')
        //     if (config.method === 'post') {
        //         config.headers['access_token'] = Cookies.get('token')
        //     }
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// respone 拦截器
instance.interceptors.response.use(
    //响应正常的处理
    response => {
        // console.log(response)
        // console.log(response.data)
        const data = response.data
        if (response.status !== 200) {
            globalMethods.$warning(response.statusText)
            if (data.code === '000000') {
                // 接口自定义错误代码
                // 移除登陆token 显示接口错误消息
            }
            return Promise.reject(data)
        } else {
            if (data === null) {
                return Promise.resolve({
                    code: '009900',
                    msg: '系统出现错误',
                    data: {}
                })
            }
            // console.log(data.resultCode)
            if (data.code === undefined) {
                if (data.msg !== undefined) {
                    return Promise.resolve({
                        code: '009900',
                        msg: data.msg,
                        data: null
                    })
                } else {
                    return Promise.resolve({
                        code: '009900',
                        msg: data.message !== null ? data.message : '',
                        data: null
                    })
                }
            }
        }
        return Promise.resolve(data)
    },
    //请求出错的处理
    error => {
        // console.log(error.response.data)
        if (error.response === undefined && error.status === undefined) {
            return Promise.resolve({
                code: '009900',
                msg: '服务器响应超时',
                data: null
            })
        }
        if (error.response.status >= 500) {
            return Promise.resolve({
                code: '009900',
                msg: '服务器出现错误',
                data: null
            })
        } else if (error.response.status === 401) {
            return Promise.resolve({
                code: '009900',
                msg: '用户名或密码不正确',
                data: null
            })
        } else {
            let data = error.response.data
            if (data.code !== undefined) {
                return Promise.resolve({
                    code: data.code,
                    msg: data.msg
                })
            }
            return Promise.resolve({
                code: '009900',
                msg: data.msg,
                data: null
            })
        }
    }
)


/**
 * @apiDescription 封装的网络请求方法
 * @apiGroup
 * @apiName request
 * @apiParam  url 地址
 * @apiParam  data 请求数据
 * @apiParam  params 请求参数
 * @apiParam  method 方法类型：get或者post
 * @apiParam  auth 是否认证
 * @apiParam  version 接口版本号
 * @apiParam  headers 请求header
 * @apiParamExample
 *       request('Appointment/appointmentList', data, params, CONSTANT.GET)
 * @apiReturn Promise
 */
async function request(url, data = {}, params = {}, method = CONSTANT.POST, version = Config.API_VERSION) {
    if (method === CONSTANT.POST) {
        data.userId = store.state.user.userInfo === null ? '' : store.state.user.userInfo.id
    } else {
        params.userId = store.state.user.userInfo === null ? '' : store.state.user.userInfo.id
    }
    return await instance({
        url: version + url,
        method: method,
        data: data,
        params: params
    })
}

export default request

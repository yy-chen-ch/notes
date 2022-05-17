// 封装请求
import axios from 'axios'
import { ElMessage } from 'element-plus'
const baseURL = ''
// 请求
const http = axios.create({ timeout: 6000, baseURL })
// 请求拦截
http.interceptors.request.use(config => {
    //请求头设置
    let token = localStorage.getItem('token') || ''
    config.headers.Authorization = token
    return config
}, err => {
    console.log(err);
})
// 响应拦截
http.interceptors.response.use(arr => {
    // 对响应码的处理
    switch (arr.data.meta.status) {
        case 200:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'success',
            })
            break;
        case 201:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'success',
            })
            break;
        case 204:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'success',
            })
            break;
        case 400:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 401:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 403:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 404:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 422:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'warning',
            })
            break;
        case 500:
            ElMessage({
                message: arr.data.meta.msg,
                type: 'error',
            })
            break;
    }
    return arr.data.data
}, err => {
    console.log(err);
})

// 封装请求参数
function request({ method = "get", url, data = {}, params = {} }) {
    return http({
        method,
        url,
        data,
        params,
    })
}

// 具体api
const API = {
    upFile: (data) => { request({ url: '/upFile', method: 'post', data })},
    get: (params) => { request({ url: '/upFile', method: 'post', params })},
}
export default API
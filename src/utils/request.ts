import Taro from '@tarojs/taro'
import crypto from 'crypto'
import appConfig from '../config/index'
import store from '../store/index'

// const crypto = require('crypto')

function service (options) {
    switch (options.type) {
    case 'AUTH':
        options.url = appConfig.API_AUTH + options.url
        break;
    case 'QR':
        options.url = appConfig.API_QR + options.url
        options.data = {
            ...options.data,
            uuid: 1,
            appid: '10001',
            platform: 'web',
            _timestamp: parseInt(((new Date()).getTime() / 1000) + ''),
            v: '1.0'
        }
        options.data.sign = md5(Object.keys(options.data).sort().map((key) => { return `${key}${options.data[key]}` }).join('') + 'dd2595bd5c0f9c72dc98540b8b3f1e8c') // 加密方法
        break;
    default:
        const { 'user': {  tokenInfo  }} = store.getState()
        options.header = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenInfo.access_token}`
        }
        options.url = appConfig.API_ROOT + options.url
        break;
    }
    // console.log(options)
    return Taro.request(options)
}
function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex')
}
export default service

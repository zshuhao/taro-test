import Taro from '@tarojs/taro'
import appConfig from '../config/index'
import store from '../store/index'

function service (options) {
    if (options.type === 'AUTH') {
        options.url = appConfig.API_AUTH + options.url
    } else {
        const { 'user': {  tokenInfo  }} = store.getState()
        options.header = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenInfo.access_token}`
        }
        options.url = appConfig.API_ROOT + options.url
    }
    // console.log(options)
    return Taro.request(options)
}

export default service

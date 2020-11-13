import Taro from '@tarojs/taro'
import appConfig from '../config/index'

function service (options) {
    options.url = appConfig.api + options.url
    return Taro.request(options)
}

export default service

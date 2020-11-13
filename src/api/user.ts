import request from '../utils/request'

export function test (res) {
    return request({
        url: '/eps/login',
        method: 'post',
        data: res
    })
}
import request from '../utils/request'

export function test (res) {
    return request({
        url: '/eps/login',
        method: 'post',
        data: res
    })
}

export function login (code) {
    return request({
        url: '/dingding/getAccessTokenByCode',
        method: 'get',
        data: {
            code: code
        }
    })
}
import request from '../utils/request'

export function login (code) {
    return request({
        url: '/dingding/getAccessTokenByCode',
        method: 'get',
        data: {
            code: code,
            agentId: '971052009'
        },
        type: 'AUTH'
    })
}

export function getUserInfo () {
    return request({
        url: '/auth/user/getUserPermissions',
        method: 'get',
        data: {},
        type: 'ROOT'
    })
}
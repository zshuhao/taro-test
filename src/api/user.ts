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
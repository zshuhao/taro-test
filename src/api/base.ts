import request from '../utils/request'

export function getShopByInput (res) {
    return request({
        url: '/crm/computer/queryCustomerByShopId',
        method: 'post',
        data: JSON.stringify({
            type: 2, // 1 品牌， 2 门店
            name: res
        }),
        type: 'ROOT'
    })
}
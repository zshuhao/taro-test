import request from '../utils/request'

export function getShopByInput (res) {
    return request({
        url: '/crm/computer/queryCustomerByShopId',
        method: 'POST',
        data: JSON.stringify({
            type: 2, // 1 品牌， 2 门店
            name: res
        }),
        type: 'ROOT'
    })
}

export function getShopById (res) {
    return request({
        url: '/crm/shops/detail',
        method: 'POST',
        data: JSON.stringify({
            shopId: res
        }),
        type: 'ROOT'
    })
}
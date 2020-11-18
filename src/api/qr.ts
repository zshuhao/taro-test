import request from '../utils/request'

export function getJkQrCodeInfo (code) {
    return request({
        url: '/platManager/platManager/getReservedQrByQrCode',
        method: 'post',
        data: JSON.stringify({
            data: {
                qrCode: code
            }
        }),
        type: 'ROOT'
    })
}

export function updateJkQrCode (res) {
    return request({
        url: '/platManager/platManager/updateReservedQr',
        method: 'post',
        data: JSON.stringify({
            data: {
                ...res
            }
        }),
        type: 'ROOT'
    })
}
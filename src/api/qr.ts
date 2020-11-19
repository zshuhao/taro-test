import request from '../utils/request'

export function getJkQrCodeInfo (code) {
    return request({
        url: '/platManager/platManager/getReservedQrByQrCode',
        method: 'POST',
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
        method: 'POST',
        data: JSON.stringify({
            data: {
                ...res
            }
        }),
        type: 'ROOT'
    })
}

export function getMfQrInfo (res) {
    return request({
        url: '',
        method: 'GET',
        data: {
            ...res
        },
        type: 'QR'
    })
}

export function updateMfQrCode (res) {
    return request({
        url: '',
        method: 'GET',
        data: {
            ...res
        },
        type: 'QR'
    })
}

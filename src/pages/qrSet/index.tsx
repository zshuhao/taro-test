import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { getMfQrInfo } from '../../api/qr'
import { getShopById } from '../../api/base'
import { setMfQrInfo } from '../../store/qr/action'
import { setSearch } from '../../store/search/action'
import './index.less'

interface State {
    qrCode: string;
}
@connect()
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            qrCode: ''
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    onMfSet () {
        Taro.navigateTo({ url: '/pages/mfSet/index' })
    }
    onJkSet () {
        Taro.navigateTo({ url: '/pages/jkSet/index' })
    }
    onMfEdit () {
        Taro.scanCode({
            success: (res) => {
                const result = res.result.split('/')
                const code = result[result.length - 1]
                this.setState({
                    qrCode: code
                })
                this.fetchQrInfo()
            },
            fail: () => {}
        })
    }

    async fetchQrInfo () {
        Taro.showLoading()
        const { qrCode } = this.state
        const params = {
            method: 'qr.code.codeInfo',
            code: qrCode
        }
        const res = await getMfQrInfo(params)
        if (res.data.status === 0) {
            const shop = await getShopById(res.data.data.shop_id)
            if (shop.data.success) {
                const info = res.data.data
                info.shopName = shop.data.data.detail.customerName
                this.props.dispatch(setMfQrInfo(info))
                const search = {
                    id: info.shop_id,
                    name: info.shopName
                }
                this.props.dispatch(setSearch(search))
                Taro.navigateTo({ url: '/pages/mfEdit/index' })
            } else {
                Taro.showToast({ title: shop.data.sysErrDesc || shop.data.data.err.errMsg || '未知错误' })
            }
        } else {
            Taro.showToast({ title: res.data.msg || '未知错误' })
        }
        Taro.hideLoading()
    }

    render () {
        return (
            <View className='index'>
                <View className='title'>秒付配置</View>
                <AtButton className='btn' type='primary' onClick={this.onMfSet.bind(this)}>配置</AtButton>
                <AtButton className='btn-edit' onClick={this.onMfEdit.bind(this)}>修改</AtButton>
                <View className='title'>聚客版二维码配置</View>
                <AtButton type='primary' onClick={this.onJkSet.bind(this)}>配置/修改</AtButton>
            </View>
        )
    }
}

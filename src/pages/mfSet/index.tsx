import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { clearSearch } from '../../store/search/action'
import { setMfQrInfo } from '../../store/qr/action'
import { getMfQrInfo } from '../../api/qr'
import './index.less'

interface State {
    result: string;
    qrCode: string;
}
@connect(({ search }) => ({
    shopInfo: search.search
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            result: '',
            qrCode: ''
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () {
        this.onDeleteSearchInfo()
    }

    componentDidShow () { }

    componentDidHide () { }

    onSearchShop () {
        Taro.navigateTo({ url: '/pages/search/index' })
    }
    onScanQr () {
        const { shopInfo } = this.props
        if (shopInfo.id === '' || shopInfo.id === undefined) {
            Taro.showModal({
                title: '提示',
                content: '配置店铺不能为空！',
                success: function () {}
            })
            return
        }
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
            const info = res.data.data
            this.props.dispatch(setMfQrInfo(info))
            Taro.navigateTo({ url: '/pages/mfMsg/index' })
        } else {
            Taro.showToast({ title: res.data.msg || '未知错误' })
        }
        Taro.hideLoading()
    }

    onDeleteSearchInfo () {
        this.props.dispatch(clearSearch())
    }

    render () {
        const { result } = this.state
        const { shopInfo } = this.props
        console.log(result)

        return (
            <View className='index'>
                <View className='title'>秒付配置</View>
                <View className='step'>
                    <View>第一步：输入要配置的商家店铺名称</View>
                    <View>第二步：扫描二维码</View>
                    <View>第三步：选择配置类型，按需输入绑定桌号</View>
                    <View>第四步：绑定完成</View>
                    <View className='at-row'>
                        <View className='label at-col at-col-1 at-col--auto'>配置店铺：</View>
                        <View className='content at-col'>
                            <View className='input' onClick={this.onSearchShop.bind(this)}>
                                { shopInfo.name || '店铺名称' }
                            </View>
                            {
                                shopInfo.id && <View className='delete' onClick={this.onDeleteSearchInfo.bind(this)}>
                                    <View className='at-icon at-icon-close'></View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                

                <AtButton className='btn' type='primary' onClick={this.onScanQr.bind(this)}>[-] 扫描二维码</AtButton>
            </View>
        )
    }
}

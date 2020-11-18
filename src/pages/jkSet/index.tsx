import React, { Component } from 'react'
import { View, Picker } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import moment from 'moment'
import { connect } from 'react-redux'
import { getJkQrCodeInfo, updateJkQrCode } from '../../api/qr'
import { clearSearch } from '../../store/search/action'

import './index.less'

interface State {
    selector: string[];
    qrCode: string;
    showQrResult: boolean;
    qrCodeInfo: any;
    pickerIndex: number;
}

const appIds = 'wx8624eb15102147c6'
const typePicker = {
    5: '智慧餐厅聚客版（取号需要手机号）',
    7: '智慧餐厅聚客版（取号不需要手机号）'
}
const TypeArr = (function() {
    const arr: { statusName: string; statusValue: number; }[] = []
    for (let i in typePicker) {
        arr.push({
            statusName: typePicker[i],
            statusValue: parseInt(i) // 状态值为整数
        })
    }
    return arr
})()

@connect(({ search }) => ({
    shopInfo: search.search
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            selector: TypeArr.map(item => item.statusName),
            qrCode: '',
            showQrResult: false,
            qrCodeInfo: {},
            pickerIndex: 0
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () {
        this.props.dispatch(clearSearch())
    }

    componentDidShow () { }

    componentDidHide () { }

    onPickerChange (e) {
        this.setState({
            pickerIndex: e.detail.value
        })
    }

    onSearchShop () {
        Taro.navigateTo({ url: '/pages/search/index' })
    }

    onDeleteSearchInfo (e) {
        this.props.dispatch(clearSearch())
    }

    onScanQr () {
        this.setState({
            qrCode: '',
            showQrResult: false
        })
        Taro.scanCode({
            success: (res) => {
                this.setState({
                    qrCode: res.result
                })
                this.fetchQrInfo()
            },
            fail: () => {}
        })
    }

    async fetchQrInfo () {
        Taro.showLoading()
        const { qrCode } = this.state
        // const qrInfo = await getJkQrCodeInfo(qrCode || 'http://weixin.qq.com/q/02DPfrsM2ec5m10000g03N')
        const qrInfo = await getJkQrCodeInfo(qrCode)
        const res = qrInfo.data
        if (res.success === false && res.data.errNo === '000000') {
            if (!this.isPolyGuestCode(res.data.data.appId, res.data.data.service)) {
                Taro.showToast({ title: '扫描失败: 该二维码不属于聚客版，请扫描聚客版取号物料上的二维码' })
            } else if (!this.canBind(res.data.data.branchShopId, res.data.data.updateTime)) {
                Taro.showToast({ title: '扫描失败: 该二维码已绑定其他门店超过24小时，无法修改。' })
            } else {
                this.setState({
                    showQrResult: true
                })
            }
            this.setState({
                qrCodeInfo: res.data.data
            })
            if (res.data.data.serviceQrType) {
                const index = TypeArr.findIndex(item => item.statusValue === res.data.data.serviceQrType)
                this.setState({
                    pickerIndex: index
                })
            }
        } else {
            Taro.showToast({ title: res.data.errMsg || '未知错误' })
        }
        Taro.hideLoading()
    }

    // 判断是否聚客版二维码
    isPolyGuestCode(appId, service) {
        if (service === 4 || (service === 0 && appIds.indexOf(appId) !== -1)) {
            return true
        }
        return false
    }

    // 是否可以绑定
    canBind(branchShopId, updateTime) {
        if (!branchShopId) {
            return true
        }
        if (typeof updateTime !== 'undefined' && moment(updateTime).unix() + 86400 > moment().unix()) {
            return true
        }
        return false
    }

    async onConfirm () {
        Taro.showLoading({
            title: '加载中...',
            mask: true
        })
        const { qrCodeInfo, pickerIndex } = this.state
        const { shopInfo } = this.props
        const params = {
            id: qrCodeInfo.id,
            branchShopId: shopInfo.id,
            // branchShopId: '111578',
            serviceQrType: TypeArr[pickerIndex].statusValue,
            appId: qrCodeInfo.appId
        }
        const res = await updateJkQrCode(params)
        Taro.hideLoading()
        if (res.data.success) {
            Taro.showToast({ title: '修改成功' })
            setTimeout(() => {
                Taro.navigateBack({ delta: 1 })
            }, 200)
        } else {
            Taro.showToast({ title: res.data.msg || '未知错误' })
        }
    }

    render () {
        const { qrCode, showQrResult, selector, pickerIndex } = this.state
        const { shopInfo } = this.props
        /* eslint-disable react/jsx-indent-props */
        return (
            <View className='index'>
                <View className='title'>秒付配置</View>
                <View className='step'>
                    <View>第一步：扫描物料上的二维码</View>
                    <View>第二步：选择要配置的门店</View>
                    <View>第三步：选择配置功能</View>
                </View>

                <AtButton className='btn' type='primary' onClick={this.onScanQr.bind(this)}>扫描</AtButton>

                { showQrResult && <View className='qr-result'>扫描成功：{qrCode}</View> }

                {
                    showQrResult && <View className='form-item at-row'>
                        <View className='label at-col at-col-1 at-col--auto'>店铺：</View>
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
                }
                {
                    shopInfo.id && <View>
                        <View className='form-item at-row'>
                            <View className='label at-col at-col-1 at-col--auto'>类型：</View>
                            <View className='at-col'>
                                <Picker value={pickerIndex} mode='selector' range={selector} onChange={this.onPickerChange.bind(this)}>
                                    <View className='cont'>
                                        { selector[pickerIndex] }
                                        <View className='right at-icon at-icon-chevron-right'></View>
                                    </View>
                                </Picker>
                            </View>
                        </View>
                        <View className='tips'>提示：1.默认请选择“智慧餐厅聚客版（取号需要手机号）2.如餐厅不想要手机号，请选择“智慧餐厅聚客版（取号不需要手机号）3.如餐厅需要同时开通预点，请找客服配置</View>

                        <AtButton className='btn' type='primary' onClick={this.onConfirm.bind(this)}>提交</AtButton>
                    </View>
                }
                
                
            </View>
        )
    }
}

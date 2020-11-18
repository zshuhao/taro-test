import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { getShopById } from '../../api/base'
import './index.less'

interface State {
    canEdit: boolean;
    shopName: string;
}
const dataType = {
    1: '餐桌收银',
    2: '预订短信',
    3: '纯收银',
    6: '会员纯收银'
}
@connect(({ qr, search, user }) => ({
    mfQrInfo: qr.mfQrInfo,
    shopInfo: search.search,
    userInfo: user.userInfo
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            canEdit: false,
            shopName: ''
        }
    }

    componentWillMount () {
        this.initData()
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    initData () {
        const { mfQrInfo, shopInfo } = this.props
        const table = JSON.parse(mfQrInfo.property)
        // 未配置桌号，可再配置
        if (table.table_no === '') {
            this.setState({
                canEdit: true
            })
        } else if (shopInfo.id !== mfQrInfo.shop_id) {
            this.fetchShopInfo(mfQrInfo.shop_id)
        }
        
    }

    async fetchShopInfo (id) {
        const shop = await getShopById(id)
        if (shop.data.success) {
            this.setState({
                shopName: shop.data.data.detail.customerName
            })
        } else {
            Taro.showToast({ title: shop.data.sysErrDesc || shop.data.data.err.errMsg || '未知错误' })
        }
    }

    onSearchShop () {
        Taro.navigateTo({ url: '/pages/search/index' })
    }

    onAnother () {
        Taro.navigateBack()
    }

    onClose () {
        Taro.navigateBack({
            delta: 2
        })
    }

    onUpdate () {
        Taro.navigateTo({
            url: '/pages/mfEdit/index?type=edit'
        })
    }

    render () {
        const { canEdit, shopName } = this.state
        const { mfQrInfo, shopInfo } = this.props
        const table = JSON.parse(mfQrInfo.property)
        /* eslint-disable react/jsx-indent-props */
        return (
            <View className='index'>
                {
                    !canEdit && shopInfo.id === mfQrInfo.shop_id
                        ? <View className='title red'>此二维码已绑定本店的桌号</View>
                        : <View className='title red'>该码已配置在其他门店！</View>
                }
                
                {
                    canEdit &&  <View>
                        <View className='title'>{shopInfo.name}</View>
                        <View className='content'>
                            <View>--类型--</View>
                            <View>{dataType[mfQrInfo.type]}</View>
                        </View>
                    </View>
                }
                
                
                <AtList>
                    {
                        shopName === ''
                            ? <AtListItem title={shopInfo.name} />
                            : <AtListItem title={shopName} />
                    }
                    <AtListItem title='类型' extraText={dataType[mfQrInfo.type]} />
                    <AtListItem title='桌号' extraText={table.table_no} />
                    <AtListItem title='桌ID' extraText={table.table_id} />
                </AtList>

                <View className='btn-group'>
                    {
                        canEdit && <AtButton className='btn' type='primary' onClick={this.onUpdate.bind(this)}>编辑</AtButton>
                    }
                    <AtButton className='btn' type='primary' onClick={this.onUpdate.bind(this)}>编辑</AtButton>
                    
                    <AtButton className='btn' type='primary' onClick={this.onAnother.bind(this)}>换一张</AtButton>
                    <AtButton className='btn' type='primary' onClick={this.onClose.bind(this)}>关闭页面</AtButton>
                </View>
            </View>
        )
    }
}

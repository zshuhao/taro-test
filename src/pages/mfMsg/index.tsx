import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.less'

interface State {
    value: string;
}

export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    onSearchShop () {
        Taro.navigateTo({ url: '/pages/search/index' })
    }

    handleChange () {}

    onDateChange () {}

    render () {
        const { value } = this.state
        console.log(value)
        /* eslint-disable react/jsx-indent-props */
        return (
            <View className='index'>
                {/* <View className='title red'>此二维码已绑定本店的桌号</View>
                <View className='title red'>该码已配置在其他门店！</View> */}
                <View className='title'>美味体验店</View>
                <View className='content'>
                    <View>--类型--</View>
                    <View>十三水</View>
                </View>
                <AtList>
                    <AtListItem title='美味体验店' />
                    <AtListItem title='类型' extraText='详细信息' />
                    <AtListItem title='桌号' extraText='详细信息' />
                    <AtListItem title='桌ID' extraText='详细信息' />
                </AtList>

                <View className='btn-group'>
                    <AtButton className='btn' type='primary'>编辑</AtButton>
                    <AtButton className='btn' type='primary'>换一张</AtButton>
                    <AtButton className='btn' type='primary'>关闭页面</AtButton>
                </View>
            </View>
        )
    }
}

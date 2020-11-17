import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import { test } from '../../api/user'
// import Taro from '@tarojs/taro'

import './index.less'

interface State {
    result: string;
}

export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            result: '111'
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    async onTest () {

    }

    render () {
        const { result } = this.state
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
                        <View className='at-col'>
                            <View className='input'>
                                店铺名称
                                <View className='delete at-icon at-icon-close'></View>
                            </View>
                        </View>
                    </View>
                </View>
                

                <AtButton className='btn' type='primary'>[-] 扫描二维码</AtButton>
            </View>
        )
    }
}

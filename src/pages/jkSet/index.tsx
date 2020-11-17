import React, { Component } from 'react'
import { View, Picker } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.less'

interface State {
    value: string;
    selector: string[];
}

export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            value: '',
            selector: ['智慧餐厅聚客版（取号需要手机号）', '智慧餐厅聚客版（取号不需要手机号）']
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    onChange (e) {
        console.log(e)
        // this.setState({
        //     value: e
        // })
    }
    onAction () {
        console.log(this.state)
    }
    onItemClick () {
        console.log(1)
    }

    handleChange () {
        
    }

    onSearchShop () {
        Taro.navigateTo({ url: '/pages/search/index' })
    }

    render () {
        const { value } = this.state
        /* eslint-disable react/jsx-indent-props */
        return (
            <View className='index'>
                <View className='title'>秒付配置</View>
                <View className='step'>
                    <View>第一步：扫描物料上的二维码</View>
                    <View>第二步：选择要配置的门店</View>
                    <View>第三步：选择配置功能</View>
                </View>

                <AtButton className='btn' type='primary'>扫描</AtButton>

                <View className='qr-result'>扫描成功：</View>

                <View className='form-item at-row'>
                    <View className='label at-col at-col-1 at-col--auto'>店铺：</View>
                    <View className='at-col'>
                        <View className='input' onClick={this.onSearchShop.bind(this)}>
                            店铺名称
                            <View className='delete at-icon at-icon-close'></View>
                        </View>
                    </View>
                </View>
                <View className='form-item at-row'>
                    <View className='label at-col at-col-1 at-col--auto'>类型：</View>
                    <View className='at-col'>
                        <Picker value={0} mode='selector' range={this.state.selector} onChange={this.onChange}>
                            <View className='cont'>
                                sss
                                <View className='right at-icon at-icon-chevron-right'></View>
                            </View>
                        </Picker>
                    </View>
                </View>
                <View className='tips'>提示：1.默认请选择“智慧餐厅聚客版（取号需要手机号）2.如餐厅不想要手机号，请选择“智慧餐厅聚客版（取号不需要手机号）3.如餐厅需要同时开通预点，请找客服配置</View>

                <AtButton className='btn' type='primary'>提交</AtButton>
            </View>
        )
    }
}

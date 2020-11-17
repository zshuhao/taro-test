import React, { Component } from 'react'
import { View, Picker } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtForm, AtInput } from 'taro-ui'
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
                <View className='title'>配置信息</View>
                <AtList>
                    <AtListItem title='美味体验店' />
                    <AtListItem title='类型' extraText='详细信息' />
                    <AtListItem title='桌号' extraText='详细信息' />
                    <AtListItem title='桌ID' extraText='详细信息' />
                </AtList>

                <AtForm className='form'>
                    <Picker value={0} mode='selector' range={this.state.selector} onChange={this.onDateChange}>
                        <AtList className='list' hasBorder={false}>
                            <AtListItem className='list-item' title='类型' extraText={value} />
                        </AtList>
                    </Picker>
                    <View className='shop'>
                        <View className='label'>店铺</View>
                        <View className='content'>
                            <View className='input' onClick={this.onSearchShop.bind(this)}>
                                店铺名称
                                <View className='delete at-icon at-icon-close'></View>
                            </View>
                        </View>
                    </View>
                    <AtInput
                        name='tableNo'
                        title='桌号'
                        type='text'
                        placeholder='请输入桌号'
                        value={value}
                        onChange={this.handleChange.bind(this)}
                    />
                    <AtInput
                        name='tableId'
                        title='桌ID'
                        type='text'
                        placeholder='请输入餐桌ID（可选）'
                        value={value}
                        onChange={this.handleChange.bind(this)}
                    />
                </AtForm>
                
                <View className='btn-group'>
                    <AtButton className='btn' type='primary'>修改</AtButton>
                    <AtButton className='btn' type='primary'>关闭</AtButton>
                </View>
                {/* <View className='btn-group'>
                    <AtButton className='btn' type='primary'>确定</AtButton>
                    <AtButton className='btn' type='primary'>清除</AtButton>
                </View> */}
            </View>
        )
    }
}

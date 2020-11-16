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
                <AtButton className='btn' type='primary'>配置</AtButton>
                <AtButton className='btn-edit'>修改</AtButton>
                <View className='title'>聚客版二维码配置</View>
                <AtButton type='primary'>配置/修改</AtButton>
            </View>
        )
    }
}

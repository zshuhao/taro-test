import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.less'

export default class Index extends Component {

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    render () {
        return (
            <View className='index'>
                <Text>Hello world!</Text>
                <AtButton type='primary'>测试按钮</AtButton>
            </View>
        )
    }
}

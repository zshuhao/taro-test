import React, { Component } from 'react'
import { View, WebView } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
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
        // const a = await test({})
        // console.log(a)
        // Taro.scanCode({
        //     success: (res) => {
        //         console.log(res)
        //         // console.log(this)
        //         this.setState({
        //             result: JSON.stringify(res)
        //         })
        //     }
        // })
        // dd.scan({
        //     type: 'qr',
        //     success: (res) => {
        //         dd.alert({ title: res.code });
        //     },
        // })
    }

    render () {
        const { result } = this.state
        console.log(result)

        return (
            // <WebView src='https://cn.bing.com/' />
            <View>sddd</View>
            // <View className='index'>
            //     <Text>Hello ya~!</Text>
            //     <Text>{ result }</Text>
            //     <AtButton type='primary' onClick={this.onTest.bind(this)}>测试按钮</AtButton>
            // </View>
        )
    }
}

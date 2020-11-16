import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classNames from "classnames"
import Taro from '@tarojs/taro'
import { login } from '../../api/user'

import './index.less'

interface Iobject {
    [key: string]: any;
}

interface State {
    result: string;
    list: Iobject[];
}

export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            result: '111',
            list: [
                {
                    id: 1,
                    name: '二维码配置',
                    icon: 'at-icon-camera',
                    page: '/pages/qrSet/index'
                },
                {
                    id: 2,
                    name: '在线客服',
                    icon: 'at-icon-message',
                    page: '/pages/Hello/index'
                }
            ]
        }
    }

    componentWillMount () { }

    componentDidMount () {
        this.fetchDdCode()
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    fetchDdCode () {
        dd.getAuthCode({
            success: res => {
                console.log(res)
                // login(res.authCode)
            },
            fail: err => {}
        })
    }

    async onTest () {
        // const a = await test({})
        // console.log(a)
        Taro.scanCode({
            success: (res) => {
                console.log(res)
                // console.log(this)
                this.setState({
                    result: JSON.stringify(res)
                })
            }
        })
        // dd.scan({
        //     type: 'qr',
        //     success: (res) => {
        //         dd.alert({ title: res.code });
        //     },
        // })
    }

    goPage (item) {
        const { page } = item
        Taro.navigateTo({ url: page })
    }

    render () {
        const { result, list } = this.state

        console.log(result)

        return (
            <View className='index'>
                {
                    list.map(item => {
                        const iconClass = classNames(
                            'at-icon',
                            item.icon
                        )
                        return ( 
                            <View className='item' key={item.id} onClick={this.goPage.bind(this, item)}>
                                <View className='text'>{item.name}</View>
                                <View className='icon'>
                                    <View className={iconClass}></View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

import React, { Component } from 'react'
import { View } from '@tarojs/components'
import classNames from "classnames"
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { setToken, setUserInfo } from '../../store/user/action'
import { login, getUserInfo } from '../../api/user'

import './index.less'

interface Iobject {
    [key: string]: any;
}

interface State {
    list: Iobject[];
}
@connect(({ user }) => ({
    tokenInfo: user.tokenInfo
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
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
                // console.log(res)
                Taro.showLoading()
                this.getUser(res.authCode)
            },
            fail: () => {
                Taro.showModal({
                    title: '提示',
                    content: '获取授权失败！',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        })
    }

    async getUser (code) {
        const tokenInfo = await login(code)
        const { data } = tokenInfo
        if (data.success) {
            this.props.dispatch(setToken(data.data))
            const user = await getUserInfo()
            if (user.data.success) {
                this.props.dispatch(setUserInfo(user.data.data))
            } else {
                Taro.showToast({ title: '获取用户信息失败' })
            }
        } else {
            Taro.showToast({ title: '获取用户Token失败' })
        }
        
        Taro.hideLoading()
    }

    goPage (item) {
        const { page } = item
        Taro.navigateTo({ url: page })
    }

    render () {
        const { list } = this.state

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

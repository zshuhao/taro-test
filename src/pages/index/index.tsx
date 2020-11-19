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
    authCode: string;
    list: Iobject[];
}
@connect(({ user }) => ({
    tokenInfo: user.tokenInfo
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            authCode: '',
            list: [
                {
                    id: 1,
                    name: '二维码配置',
                    icon: 'at-icon-camera',
                    page: '/pages/qrSet/index'
                },
                {
                    id: 2,
                    name: '拓客宝',
                    icon: 'at-icon-streaming',
                    page: '/pages/webView/index?page=tk'
                    // page: '/pages/native/dd'
                },
                {
                    id: 3,
                    name: '在线客服',
                    icon: 'at-icon-message',
                    page: '/pages/webView/index?page=kf'
                }

            ]
        }
    }

    componentWillMount () { }

    componentDidMount () {
        this.fetchDdCode()
        this.checkUpdate()
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    checkUpdate () {
        const updateManager = dd.getUpdateManager()

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log('版本信息', res)
        })

        updateManager.onUpdateReady(function (ret) {
            console.log(ret.version) // 更新版本号
            Taro.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function (err) {
            // 新版本下载失败
            console.log(err)
        })
    }

    fetchDdCode () {
        dd.getAuthCode({
            success: res => {
                // console.log(res)
                Taro.showLoading()
                this.setState({
                    authCode: res.authCode
                })
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
        console.log('code', code)
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
        const { page, id } = item
        const { authCode } = this.state
        let url = page
        if (id === 2) {
            url = page + `&code=${authCode}`
        }

        Taro.navigateTo({ url })
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

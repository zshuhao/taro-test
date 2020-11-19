import React, { Component } from 'react'
import { WebView } from '@tarojs/components'
import { connect } from 'react-redux'
import { urlParse } from '../../utils/tools'
import appConfig from '../../config/index'
import './index.less'

interface State {
    url: string;
}

@connect(({ user }) => ({
    userInfo: user.userInfo
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            url: ''
        }
    }

    componentWillMount () {
        this.initData()
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    initData () {
        const { tid } = this.props
        const params: any = urlParse(tid)
        console.log(params)
        let url = ''
        if (params.page === 'tk') {
            url = `${appConfig.TKB_URL}/mw_tuokebao/tkb?AuthCode=${params.code}`
        } else {
            const { userInfo } = this.props
            const user = {
                nickName: userInfo.userName
            }
            url = `https://webchat.7moor.com/wapchat.html?accessId=5e652bc0-49f3-11e9-a226-37c6814d8bc3&urlTitle=美味联盟&clientId=${userInfo.userId}&otherParams=${JSON.stringify(user)}`
        }
        url = encodeURIComponent(url)
        this.setState({ url })
    }

    render () {
        const { url } = this.state
        console.log(url)
        return (
            <WebView src={url}></WebView>
        )
    }
}

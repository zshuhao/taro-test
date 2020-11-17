import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.less'

interface State {
    value: string;
}

export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    onChange (e) {
        this.setState({
            value: e
        })
    }
    onAction () {
        console.log(this.state)
    }
    onItemClick () {
        console.log(1)
    }

    render () {
        const { value } = this.state
        /* eslint-disable react/jsx-indent-props */
        return (
            <View>
                <AtSearchBar
                    value={value}
                    onChange={this.onChange.bind(this)}
                    onActionClick={this.onAction.bind(this)}
                />
                <AtList hasBorder={false}>
                    <AtListItem title='标题文字1' onClick={this.onItemClick.bind(this)} />
                    <AtListItem title='标题文字2' />
                    <AtListItem title='标题文字3' />
                    <AtListItem title='禁用状态4' />
                </AtList>
            </View>
        )
    }
}

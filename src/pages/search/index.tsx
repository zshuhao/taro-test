import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { getShopByInput } from '../../api/base'
import { setSearch } from '../../store/search/action'
import './index.less'

interface ShopItem {
    id: string;
    name: string;
}

interface State {
    value: string;
    list: ShopItem[];
}

@connect()
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            value: '',
            list: []
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
    async onAction () {
        const { value } = this.state
        Taro.showLoading({
            title: '加载中...',
            mask: true
        })
        const res = await getShopByInput(value)
        if (res.data.success && res.data.data) {
            const list = (res.data.data.list || []).map(item => {
                return { id: item.shopId, name: item.shopName }
            })
            this.setState({
                list
            })
        } else {
            this.setState({
                list: []
            })
            Taro.showToast({ title: res.data.sysErrDesc || res.data.data.err.errMsg || '未知错误' })
        }
        Taro.hideLoading()
    }
    onItemClick (item) {
        this.props.dispatch(setSearch(item))
        Taro.navigateBack()
    }

    render () {
        const { value, list } = this.state
        /* eslint-disable react/jsx-indent-props */
        return (
            <View>
                <AtSearchBar
                    value={value}
                    onChange={this.onChange.bind(this)}
                    onActionClick={this.onAction.bind(this)}
                />
                <AtList hasBorder={false}>
                    {
                        list.map(item => {
                            return <AtListItem key={item.id} title={item.name} onClick={this.onItemClick.bind(this, item)} />
                        })
                    }
                </AtList>
            </View>
        )
    }
}

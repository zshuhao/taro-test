import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface State {
    result: string;
}

export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            result: 'Hello'
        }
    }

    componentWillMount () { }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    render () {
        const { result } = this.state
        return (
            <View>{result}</View>
        )
    }
}

import React, { Component } from 'react'
import { View, Picker } from '@tarojs/components'
import { AtButton, AtList, AtListItem, AtForm, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { clearSearch } from '../../store/search/action'
import { updateMfQrCode } from '../../api/qr'
import { urlParse } from '../../utils/tools'
import './index.less'

interface State {
    selector: string[];
    isEdit: boolean;
    tableNo: string;
    tableId: string;
    pickerIndex: number;
    delta: number
}

const dataType = {
    1: '餐桌收银',
    2: '预订短信',
    3: '纯收银',
    6: '会员纯收银'
}
const dataTypeArr = (function() {
    const arr: { statusName: string; statusValue: number; }[] = []
    for (let i in dataType) {
        arr.push({
            statusName: dataType[i],
            statusValue: parseInt(i) // 状态值为整数
        })
    }
    return arr
})()
@connect(({ qr, search, user }) => ({
    mfQrInfo: qr.mfQrInfo,
    shopInfo: search.search,
    userInfo: user.userInfo
}))
export default class Index extends Component<any, State> {
    constructor (props) {
        super(props)
        this.state = {
            selector: dataTypeArr.map(item => item.statusName),
            isEdit: false,
            tableNo: '',
            tableId: '',
            pickerIndex: 0,
            delta: 1
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
        const { mfQrInfo } = this.props
        const table = JSON.parse(mfQrInfo.property)
        const typeIndex = dataTypeArr.findIndex(item => item.statusValue === parseInt(mfQrInfo.type))
        const params: any = urlParse(tid)
        let delta = 1
        if (params.type === 'edit') {
            delta = 2
        }
        this.setState({
            tableNo: table.table_no,
            tableId: table.table_id,
            pickerIndex: typeIndex,
            delta
        })
    }

    onSearchShop () {
        Taro.navigateTo({ url: '/pages/search/index' })
    }

    onPickerChange (e) {
        this.setState({
            pickerIndex: e.detail.value
        })
    }

    onEdit () {
        this.setState({
            isEdit: true
        })
    }
    onDeleteSearchInfo () {
        this.props.dispatch(clearSearch())
    }

    onTableNo (e) {
        this.setState({
            tableNo: e
        })
    }

    onTableId (e) {
        this.setState({
            tableId: e
        })
    }

    async onConfirm () {
        const { tableNo, tableId, pickerIndex } = this.state
        const { mfQrInfo, shopInfo, userInfo } = this.props
        if (tableNo === '') {
            Taro.showModal({
                title: '提示',
                content: '请输入桌号'
            })
            return
        }
        if (shopInfo.id === '') {
            Taro.showModal({
                title: '提示',
                content: '请输入店铺'
            })
            return
        }
        const property = {
            table_id: tableId,
            table_no: tableNo
        }
        const params = {
            qr: mfQrInfo.code,
            shopid: shopInfo.id,
            type: dataTypeArr[pickerIndex].statusValue,
            property: JSON.stringify(property),
            mobile: userInfo.mobile,
            method: 'qr.qr.update'
        }
        console.log(params)
        const res = await updateMfQrCode(params)
        if (res.data.status === 0) {
            Taro.showToast({ title: '修改成功' })
            setTimeout(() => {
                this.close()
            }, 200)
        } else {
            Taro.showToast({ title: res.data.msg || '未知错误' })
        }
    }

    close () {
        const { delta } = this.state
        this.onDeleteSearchInfo()
        Taro.navigateBack({
            delta
        })
    }
    onClear () {
        this.setState({
            tableNo: '',
            tableId: ''
        })
    }

    render () {
        const { isEdit, tableNo, tableId, pickerIndex, selector } = this.state
        const { mfQrInfo, shopInfo } = this.props
        /* eslint-disable react/jsx-indent-props */
        return (
            <View className='index'>
                <View className='title'>配置信息</View>
                {
                    !isEdit && <AtList>
                        <AtListItem title={shopInfo.name} />
                        <AtListItem title='类型' extraText={dataType[mfQrInfo.type]} />
                        <AtListItem title='桌号' extraText={tableNo} />
                        <AtListItem title='桌ID' extraText={tableId} />
                    </AtList>
                }
                {
                    isEdit && <AtForm className='form'>
                        <Picker value={pickerIndex} mode='selector' range={selector} onChange={this.onPickerChange.bind(this)}>
                            <AtList className='list' hasBorder={false}>
                                <AtListItem className='list-item' title='类型' extraText={dataType[pickerIndex]} />
                            </AtList>
                        </Picker>
                        <View className='shop'>
                            <View className='label'>店铺</View>
                            <View className='content'>
                                <View className='input' onClick={this.onSearchShop.bind(this)}>
                                    { shopInfo.name || '店铺名称' }
                                </View>
                                {
                                    shopInfo.id && <View className='delete' onClick={this.onDeleteSearchInfo.bind(this)}>
                                        <View className='at-icon at-icon-close'></View>
                                    </View>
                                }
                            </View>
                        </View>
                        <AtInput
                            name='tableNo'
                            title='桌号'
                            type='text'
                            placeholder='请输入桌号'
                            value={tableNo}
                            onChange={this.onTableNo.bind(this)}
                        />
                        <AtInput
                            name='tableId'
                            title='桌ID'
                            type='text'
                            placeholder='请输入餐桌ID（可选）'
                            value={tableId}
                            onChange={this.onTableId.bind(this)}
                        />
                    </AtForm>
                }

                {
                    !isEdit && <View className='btn-group'>
                        <AtButton className='btn' type='primary' onClick={this.onEdit.bind(this)}>修改</AtButton>
                        <AtButton className='btn' type='primary' onClick={this.close.bind(this)}>关闭</AtButton>
                    </View>
                }
                {
                    isEdit && <View className='btn-group'>
                        <AtButton className='btn' type='primary' onClick={this.onConfirm.bind(this)}>确定</AtButton>
                        <AtButton className='btn' type='primary' onClick={this.onClear.bind(this)}>清除</AtButton>
                    </View>
                }
                
                
            </View>
        )
    }
}

import React from 'react'
import { Modal, Input, Button, message } from 'antd'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import './idcard.less'

class idcard extends React.Component {
  state = { visible: false, idcvalue: '', copied: false }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  handleChange = ({ target: { value } }) => {
    this.setState({ idcvalue: value })

    // this.setState({value: event.target.value});
  }
  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  randomNO() {
    let province = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    let rdm = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
    let rdmdate = new Date(rdm(new Date('1950-01-01') / 1, new Date() / 1))
      .toISOString()
      .replace(/(T[\d\:\.]+Z)|\-/g, '') // 随机生日
    let rdmsex = rdm(0, 9) // 随机性别 奇数男 偶数女
    let v17 = ''
    let endNum = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2][
      v17
        .split('')
        .map((x, i) => x * (Math.pow(2, 17 - i) % 11))
        // .map((x, i) => x * (2 ** (17 - i) % 11))
        .reduce((x, y) => x + y) % 11
    ]
  }
  generateIDCardNO = () => {
    this.setState({ idcvalue: '3333' })
  }
  render() {
    return (
      <div>
        <div className="idc-block">
          <div className="line">
            <Button
              type="primary"
              icon="search"
              onClick={this.generateIDCardNO}>
              生成身份证号码
            </Button>
          </div>
          <div className="line">
            <Input
              className="idcinput"
              placeholder="输入身份证号码"
              value={this.state.idcvalue}
              onChange={this.handleChange}
            />
            <CopyToClipboard
              text={this.state.idcvalue}
              onCopy={() => message.success('复制成功！')}>
              <Button type="primary">复制</Button>
            </CopyToClipboard>
          </div>
        </div>

        {/*

         <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard> 

        {this.state.copied ? (
          <span style={{ color: 'red' }}>Copied.</span>
        ) : null}

         <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>  */}

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
export default idcard

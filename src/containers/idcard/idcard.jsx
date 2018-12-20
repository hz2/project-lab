import React from 'react'
import { Modal, Input, Button, message } from 'antd'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import './idcard.less'
import { out as xzqh, keysArr } from './xzqh'

class idcard extends React.Component {
  state = {
    visible: false,
    idcvalue: '',
    copied: false,
    resultArea: '',
    resultBirth: '',
    resultSex: '',
    resultAstrology: '',
    resultZodiac: ''
  }

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
  } //
  setResult = val => {
    let area = ''
    let birth = ''
    let sex = ''
    let astrology = ''
    let astrologyList = [
      { txt: '白羊座', val: [3.21, 4.19], en: 'Aries', icon: '♈' },
      { txt: '金牛座', val: [4.2, 5.2], en: 'Taurus', icon: '♉' },
      { txt: '双子座', val: [5.21, 6.21], en: 'Gemini', icon: '♊' },
      { txt: '巨蟹座', val: [6.22, 7.22], en: 'Cancer', icon: '♋' },
      { txt: '狮子座', val: [7.23, 8.22], en: 'Leo', icon: '♌' },
      { txt: '处女座', val: [8.23, 9.22], en: 'Virgo', icon: '♍' },
      { txt: '天秤座', val: [9.23, 10.23], en: 'Libra', icon: '♎' },
      { txt: '天蝎座', val: [10.24, 11.22], en: 'Scorpio', icon: '♏' },
      { txt: '射手座', val: [11.23, 12.21], en: 'Sagittarius', icon: '♐' },
      { txt: '山羊座', val: [12.22, 12.31], en: 'Capricorn', icon: '♑' },
      { txt: '山羊座', val: [0, 1.19], en: 'Capricorn', icon: '♑' },
      { txt: '水瓶座', val: [1.2, 2.18], en: 'Aquarius', icon: '♒' },
      { txt: '双鱼座', val: [2.19, 3.2], en: 'Pisces', icon: '♓' }
    ]
    let zodiac = ''
    let zodiacList = [
      { zh: '鼠', icon: '🐀', branch: '子' },
      { zh: '牛', icon: '🐂', branch: '丑' },
      { zh: '虎', icon: '🐅', branch: '寅' },
      { zh: '兔', icon: '🐇', branch: '卯' },
      { zh: '龙', icon: '🐉', branch: '辰' },
      { zh: '蛇', icon: '🐍', branch: '巳' },
      { zh: '马', icon: '🐎', branch: '午' },
      { zh: '羊', icon: '🐑', branch: '未' },
      { zh: '猴', icon: '🐒', branch: '申' },
      { zh: '鸡', icon: '🐓', branch: '酉' },
      { zh: '狗', icon: '🐕', branch: '戌' },
      { zh: '猪', icon: '🐗', branch: '亥' }
      // { zh: '猫', icon: '🐈', branch: ' ' }
    ]
    let tianArr = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
    if (val) {
      area =
        xzqh[val.substr(0, 6)] && [...new Set(xzqh[val.substr(0, 6)])].join(' ')
      birth =
        val.substr(6, 4) +
        '年' +
        val.substr(10, 2) +
        '月' +
        val.substr(12, 2) +
        '日'
      sex =
        ['女', '男'][val.substr(16, 1) % 2] +
        ' ' +
        (new Date().getFullYear() - val.substr(6, 4) * 1) +
        '岁'
      let digi = val.substr(10, 2) * 1 + val.substr(10, 2) / 100
      let current = astrologyList.filter(
        x => x.val[0] <= digi && digi <= x.val[1]
      )[0]
      let currentYear = zodiacList[(val.substr(6, 4) - 4) % 12]
      astrology = current.txt + ' ' + current.en + ' ' + current.icon
      zodiac = `${tianArr[(val.substr(6, 4) - 4) % 10]}${currentYear.branch} ${
        currentYear.zh
      }年 ${currentYear.icon}`
    }
    this.setState({
      resultArea: area,
      resultBirth: birth,
      resultSex: sex,
      resultAstrology: astrology,
      resultZodiac: zodiac
    })
  }
  handleChange = ({ target: { value } }) => {
    console.log('value', value)
    this.setState({
      idcvalue: value
    })
    this.setResult(value)
    // this.setState({value: event.target.value});
  }
  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  randomNO() {
    // let province = {
    //   11: '北京',
    //   12: '天津',
    //   13: '河北',
    //   14: '山西',
    //   15: '内蒙古',
    //   21: '辽宁',
    //   22: '吉林',
    //   23: '黑龙江',
    //   31: '上海',
    //   32: '江苏',
    //   33: '浙江',
    //   34: '安徽',
    //   35: '福建',
    //   36: '江西',
    //   37: '山东',
    //   41: '河南',
    //   42: '湖北',
    //   43: '湖南',
    //   44: '广东',
    //   45: '广西',
    //   46: '海南',
    //   50: '重庆',
    //   51: '四川',
    //   52: '贵州',
    //   53: '云南',
    //   54: '西藏',
    //   61: '陕西',
    //   62: '甘肃',
    //   63: '青海',
    //   64: '宁夏',
    //   65: '新疆',
    //   71: '台湾',
    //   81: '香港',
    //   82: '澳门',
    //   91: '国外'
    // }
    let rdm = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
    let rdmarea = keysArr[rdm(0, keysArr.length)]
    let rdmdate = new Date(rdm(new Date('1950-01-01') / 1, new Date() / 1))
      .toISOString()
      .replace(/(T[\d:.]+Z)|-/g, '') // 随机生日
    let rdmorder = ('0' + rdm(0, 99)).substr(-2)
    let rdmsex = rdm(0, 9) // 随机性别 奇数男 偶数女
    let b17 = `${rdmarea}${rdmdate}${rdmorder}${rdmsex}`
    let endNum = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2][
      b17
        .split('')
        .map((x, i) => x * (Math.pow(2, 17 - i) % 11))
        // .map((x, i) => x * (2 ** (17 - i) % 11))
        .reduce((x, y) => x + y) % 11
    ]
    return `${b17}${endNum}`
  }
  generateIDCardNO = () => {
    let out = this.randomNO()
    this.setState({ idcvalue: out })
    this.setResult(out)
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
          <div className="line">
            <p>{this.state.resultArea}</p>
            <p>{this.state.resultBirth}</p>
            <p>{this.state.resultSex}</p>
            <p>{this.state.resultAstrology}</p>
            <p>{this.state.resultZodiac}</p>
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

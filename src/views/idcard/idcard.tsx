
import { SearchOutlined } from '@ant-design/icons'
import { Input, Button, Spin } from 'antd'

import { copyText } from '@libs/common'

import { calendar } from './calendar'
import './idcard.less'
import { gql } from '@/libs/req'
import React from 'react'

type TValid = 'valid' | 'invalid' | null
interface TXzsq {
  [key: string]: string[]
}
interface IPhoneObj {
  province?: string
  city?: string
  tel_prefix?: string
  postcode?: string
  sp?: string
}
interface State {
  [key: string]: string | boolean | TValid | TXzsq | IPhoneObj | string[]
  isValidate: TValid
  idcvalue: string
  telvalue: string
  xzqh: TXzsq
  keysArr: string[]
  phoneobj: IPhoneObj
  loading: boolean
  visible: boolean
}

const rdm = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}


class idcard extends React.Component {
  state: State = {
    visible: false,
    idcvalue: '',
    telvalue: '',
    copied: false,
    resultArea: '',
    resultBirth: '',
    resultBirthCn: '',
    resultBirthGZ: '',
    resultSex: '',
    resultAstrology: '',
    resultZodiac: '',
    icon1: '',
    icon2: '',
    phoneobj: {},
    loading: false,
    keysArr: [],
    xzqh: {},
    isValidate: null
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  } //

  idcardCalc = (b17: string) =>
    [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2][
      b17
        .split('')
        .map((x: string, i: number) => Number(x) * (Math.pow(2, 17 - i) % 11))
        // .map((x, i) => x * (2 ** (17 - i) % 11))
        .reduce((x: any, y: any) => x + y) % 11
    ] + ''
  setResult = async (val: string) => {
    let birth = ''
    let sex = ''
    let astrology = ''
    const astrologyList = [
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
    const zodiacList = [
      { zh: '鼠', icon: '🐀', icon2: '🐭', branch: '子' },
      { zh: '牛', icon: '🐂', icon2: '🐮', branch: '丑' },
      { zh: '虎', icon: '🐅', icon2: '🐯', branch: '寅' },
      { zh: '兔', icon: '🐇', icon2: '🐰', branch: '卯' },
      { zh: '龙', icon: '🐉', icon2: '🐲', branch: '辰' },
      { zh: '蛇', icon: '🐍', icon2: '🐍', branch: '巳' },
      { zh: '马', icon: '🐎', icon2: '🐴', branch: '午' },
      { zh: '羊', icon: '🐐', icon2: '🐑', branch: '未' },
      { zh: '猴', icon: '🐒', icon2: '🐵', branch: '申' },
      { zh: '鸡', icon: '🐓', icon2: '🐔', branch: '酉' },
      { zh: '狗', icon: '🐕', icon2: '🐶', branch: '戌' },
      { zh: '猪', icon: '🐖', icon2: '🐷', branch: '亥' }
      // { zh: '猫', icon: '🐈', branch: ' ' }
    ]
    const tianArr = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
    let icon1 = ''
    let icon2 = ''
    let isValidate = null
    if (val && val.length >= 14) {
      // area = xzqh[val.substr(0, 6)] && [...new Set(xzqh[val.substr(0, 6)])].join(' ')
      birth =
        val.substr(6, 4) +
        '年' +
        val.substr(10, 2) +
        '月' +
        val.substr(12, 2) +
        '日'
      sex =
        ['女', '男'][Number(val.substring(16, 17)) % 2] +
        ' ' +
        (new Date().getFullYear() - Number(val.substring(6, 10)) * 1) +
        '岁'
      const digi =
        Number(val.substring(10, 12)) * 1 + Number(val.substring(12, 14)) / 100
      const current = astrologyList.filter(
        x => x.val[0] <= digi && digi <= x.val[1]
      )[0]
      icon1 = current.icon
      const currentYear = zodiacList[(Number(val.substring(6, 10)) - 4) % 12]
      astrology = current.txt + ' ' + current.en + ' ' + current.icon
      zodiac = `${tianArr[(Number(val.substring(6, 10)) - 4) % 10]}${
        currentYear.branch
      } ${currentYear.zh}年 ${currentYear.icon2}`
      icon2 = currentYear.icon

      const [y, m, d] = birth
        .split(/\D/)
        .filter(x => x)
        .map(x => Number(x))

      const json: any = calendar.solar2lunar(y, m, d)
      this.setState({
        resultBirth: `${json.cYear}年 ${json.cMonth}月 ${json.cDay}日 ${
          json.ncWeek
        } ${json.festival || ''}`,
        resultBirthCn: `${json.IMonthCn}${json.IDayCn} ${json.lunarFestival ||
          json.Term ||
          ''}`,
        resultBirthGZ: `${json.gzYear}年 ${json.gzMonth}月 ${json.gzDay}日`
      })

      if (val && val.length === 18) {
        const b17 = val.substring(0, 17)
        const end = val.substring(17, 18)
        isValidate = this.idcardCalc(b17) === end ? 'valid' : 'invalid'
      }
      const area = await this.queryArea(val.substring(0, 6))
      this.setState({
        resultArea: area
      })
    }
    this.setState({
      resultSex: sex,
      resultAstrology: astrology,
      resultZodiac: zodiac,
      icon1: icon1,
      icon2: icon2,
      isValidate: isValidate
    })
  }

  queryArea = async (code: string) => {
    const { area } = await gql(`query {  area(code:"${code}") }`)
    return area.join(' ')
  }
  handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('value', value)
    this.setState({
      idcvalue: value
    })
    this.setResult(value)
    // this.setState({value: event.target.value});
  }
  handleCancel = (e: any) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  randomNO() {
    const keysArr = this.state.keysArr
    const rdmarea = keysArr[rdm(0, keysArr.length)]
    const rdmdate = new Date(
      rdm(new Date('1950-01-01').getTime(), new Date().getTime())
    )
      .toISOString()
      .replace(/(T[\d:.]+Z)|-/g, '') // 随机生日
    const rdmorder = ('0' + rdm(0, 99)).substr(-2)
    const rdmsex = rdm(0, 9) // 随机性别 奇数男 偶数女
    const b17 = `${rdmarea}${rdmdate}${rdmorder}${rdmsex}`
    const endNum = this.idcardCalc(b17).toUpperCase()
    return `${b17}${endNum}`
  }
  generateIDCardNO = () => {
    const out = this.randomNO()
    this.setState({ idcvalue: out })
    this.setResult(out)
  }
  generateMobile = () => {
    const list = [
      '130',
      '131',
      '132',
      '133',
      '134',
      '135',
      '136',
      '137',
      '138',
      '139',
      '150',
      '151',
      '152',
      '153',
      '155',
      '156',
      '157',
      '158',
      '159',
      // '162',
      '165',
      '166',
      '167',
      '170',
      '171',
      // '172',
      '173',
      '175',
      '176',
      '177',
      '178',
      '180',
      '181',
      '182',
      '183',
      '184',
      '185',
      '186',
      '187',
      '188',
      '189',
      // '190',
      '191',
      // '193',
      // '195',
      // '196',
      // '197',
      '198',
      '199'
    ]
    const prefix = list[Math.floor(Math.random() * list.length)]
    const phone =
      prefix +
      Math.random()
        .toString()
        .substr(3, 8)
    this.setState({
      telvalue: phone
    })
    if (phone) {
      this.queryPhoneNo(phone)
    }
  }
  handleTelChange = ({
    target: { value: phone }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (phone && phone.length === 11) {
      this.queryPhoneNo(phone)
    }
    this.setState({
      telvalue: phone
    })
  }

  cityList = () => {
    const res2Key = (res: {}) => Object.keys(res).filter(x => !x.endsWith('00'))
    const xzqhLoc = window.localStorage.getItem('xzqh')
    if (xzqhLoc) {
      const json = JSON.parse(xzqhLoc)
      const keysArr = res2Key(json)
      this.setState({
        keysArr: keysArr,
        xzqh: json
      })
      return
    }
    fetch('https://cf.hx.fyi/all', { mode: 'cors' })
      .then(response => response.json())
      .then(res => {
        const keysArr = res2Key(res)
        window.localStorage.setItem('xzqh', JSON.stringify(res))
        this.setState({
          keysArr: keysArr,
          xzqh: res
        })
      })
      .catch(_err => {})
  }
  genPerson = () => {
    // this.generateIDCardNO()
    // this.generateMobile()
  }
  componentDidMount() {
    // this.cityList()
    // todo
    this.cityList()
    this.genPerson()
  }
  queryPhoneNo = (num: string) => {
    this.setState({
      loading: true
    })
    fetch('https://respok.com/phonenum.php?' + num, { mode: 'cors' })
      .then(response => response.json())
      .then(r =>
        this.setState({
          phoneobj: r,
          loading: false
        })
      )
      .catch(e => {
        console.error('error', e)
        this.setState({
          loading: false
        })
      })
  }
  render() {
    const { phoneobj } = this.state
    return (
      <>
        <div className="item-block">
          <div className="line">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={this.generateIDCardNO}>
              身份证号码
            </Button>
          </div>
          <div className="line">
            <Input
              className="item-input"
              placeholder="输入身份证号码"
              value={this.state.idcvalue}
              onChange={this.handleChange}
              maxLength={18}
            />
            <Button
              type="primary"
              onClick={() => copyText(this.state.idcvalue, '复制成功！')}>
              复制
            </Button>
          </div>
          <div className="line">
            {/* <p>姓名：todo</p> */}
            <p>
              {this.state.isValidate
                ? {
                    valid: '校验通过 ✔️',
                    invalid: '校验未通过 ❌'
                  }[this.state.isValidate]
                : ''}
            </p>
            <p>{this.state.resultArea as string}</p>
            <p>{this.state.resultSex as string}</p>
            <p>{this.state.resultBirth as string}</p>
            <p>
              {this.state.resultZodiac  as string} {this.state.resultBirthCn  as string}
            </p>
            <p>{this.state.resultAstrology as string}</p>
            <p>{this.state.resultBirthGZ as string}</p>

            <div className="addition icon1">{this.state.icon1 as string}</div>
            <div className="addition icon2">{this.state.icon2 as string}</div>
          </div>
        </div>

        <div className="item-block">
          <div className="line">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={this.generateMobile}>
              手机号码
            </Button>
          </div>
          <div className="line">
            <Input
              className="item-input"
              placeholder="生成输入手机号码"
              value={this.state.telvalue}
              maxLength={11}
              onChange={this.handleTelChange}
            />
            <Button
              type="primary"
              onClick={() => copyText(this.state.telvalue, '复制成功！')}>
              复制
            </Button>
          </div>
          <div className="line">
            <Spin spinning={this.state.loading}>
              {phoneobj.province && (
                <p>
                  {phoneobj.province || '未知'} {phoneobj.city || ''}
                </p>
              )}
              {phoneobj.sp && <p>归属地：{phoneobj.sp}</p>}
              {phoneobj.tel_prefix && <p>区号：{phoneobj.tel_prefix}</p>}
              {phoneobj.postcode && <p>邮政编码：{phoneobj.postcode}</p>}
            </Spin>
          </div>
        </div>

        {/* <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal> */}
      </>
    )
  }
}
export default idcard

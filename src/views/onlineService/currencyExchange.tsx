import { useEffect, useState } from 'react'
import { Input, Select, Statistic, Card, Tooltip, Space } from 'antd'
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'

// import Currency from './currency.json'
import './currency-page.less'

import { gql } from "@/libs/req"


const digitUppercase = function (n: number) {
  const fraction = ['毛', '分']
  // var fraction = ['角', '分'];
  const digit = [
    // '零', '壹', '贰', '叁', '肆',
    // '伍', '陆', '柒', '捌', '玖'
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九'
  ]
  const unit = [
    ['块', '万', '亿'],
    ['', '十', '百', '千']
    // ['元', '万', '亿'],
    // ['', '拾', '佰', '仟']
  ]
  const head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(
      /零./,
      ''
    )
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(shiftLeft(n, 1))
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}

// 向右移位
function shiftRight(number: number, digit: string | number) {
  if (typeof digit === 'string') {
    digit = parseInt(digit, 10)
  }
  const value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] + digit : digit))
}
// 向左移位
function shiftLeft(number: number, digit: string | number) {
  if (typeof digit === 'string') {
    digit = parseInt(digit, 10)
  }
  const value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] - digit : -digit))
}
interface ICurrency {
  label: string
  currency: string
  value: string
  country: string
  text: string
  num: number
}

type CurrencyList = ICurrency[]

interface IRates {
  [key: string]: number
}

const getFullList = async () => {
  const r = await gql(`query {
    currency {
      currency
      value: country
      country: country
      text: currency_name
    }
  }`)
  const list = (r.currency || []).map((x: ICurrency) => ({
    ...x,
    num: 0,
    label: `${x.country} ${x.text} ${x.currency} `,
  }))
  return list
}
const getFullRate = async () => {
  const r = await fetch('https://serv.respok.com/fixer_io', { mode: 'cors' })
    .then(response => response.json())
  if (r && r.rates) {
    return r.rates
  } else {
    return {}
  }
}

const Page = () => {
  const [bindVal, SetBindVal] = useState({
    input: 1,
    key1: 'USD',
    key2: 'CNY',
    unit1: '',
    unit2: '',
    value: 0
  })

  const [ratesVal, SetRatesVal] = useState<IRates>({})

  const [newList, SetNewList] = useState<CurrencyList>([])
  const [fullList, SetFullList] = useState<CurrencyList>([])
  const calc = (obj: {
    key1?: string
    key2?: string
    input?: string | number
  }) => {
    const { input, key1, key2 } = Object.assign({}, bindVal, obj)
    setBindValFn(ratesVal, fullList, input, key1, key2)
    genTable(ratesVal, fullList, input, key1)
  }

  useEffect(() => {
    const init = async () => {
      const [ratesVal, fullList] = await Promise.all([getFullRate(), getFullList()])
      SetRatesVal(ratesVal)
      SetFullList(fullList)
      setBindValFn(ratesVal, fullList)
      genTable(ratesVal, fullList, 1, "USD")
    }
    init()
  }, [])


  const setBindValFn = (ratesVal: IRates, fullList: CurrencyList, input = 1, key1 = 'USD', key2 = 'CNY') => {
    const [unit1, unit2] = fullList.filter(x => [key1, key2].includes(x.currency)).map(x => x.text)
    const obj = {
      input, key1, key2, unit1, unit2,
      value: (input / ratesVal[key1]) * ratesVal[key2]
    }
    SetBindVal(obj)
  }

  const genTable = (ratesVal: IRates, fullList: CurrencyList, input: number, key1: string) => {
    const newList: CurrencyList = [
      "CNY",
      "BTC",
      "USD",
      "EUR",
      "GBP",
      "MOP",
      "HKD",
      "TWD",
      "JPY",
      "KRW",
      "AUD",
      "CAD",
      "CHF",
      "XAG",
      "XAU",
    ].filter(x => x !== key1).map(currency => {
      const item = fullList.filter(x => x.currency === currency)[0]
      return { ...item, num: (input / ratesVal[key1]) * ratesVal[currency] }
    })
    SetNewList(newList)
  }

  const currencyChange = (currency: string) => calc({ key1: currency })
  const rightChange = (currency: string) => calc({ key2: currency })

  const filterOption = (input: string, option: ICurrency | undefined): boolean => {
    const label = option?.label + ''
    return label.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  const currencyValInput = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(value)
    if (!isNaN(val)) {
      calc({ input: val })
    }
  }

  return (
    <div className="common-box currency-page">
      <div className="flex start">
        <div className="left">
          <Space.Compact block >
            <Input
              className="w120"
              value={bindVal.input}
              placeholder="请输入金额"
              maxLength={9}
              onChange={currencyValInput}
              allowClear
            />
            <Select
              showSearch
              className="w160"
              placeholder="选择货币"
              value={bindVal.key1}
              onChange={val => calc({ key1: val })}
              filterOption={filterOption}
              options={fullList}></Select>
          </Space.Compact>
          <div className="numText mt10 center">
            <span className="num">{bindVal.input}</span>
            <span className="unit">{bindVal.unit1}</span>
          </div>
        </div>
        <div className="mx15 py20">
          <div
            className="exchange"
            onClick={() => calc({ key2: bindVal.key1, key1: bindVal.key2 })}>
            <span>💱</span>
          </div>
          <div className="center eq">等于</div>
        </div>
        <div className="w300 right">
          <Select
            showSearch
            className="w250"
            placeholder="选择货币"
            value={bindVal.key2}
            onChange={val => calc({ key2: val })}
            filterOption={filterOption}
            options={fullList}></Select>
          <div className="numText mt10 flex center">
            <Statistic value={bindVal.value} precision={5} />
            <span className="ml10 unit">{bindVal.unit2}</span>
          </div>
        </div>
      </div>

      <div className="table ">
        {newList.map((x, i) => (
          <Card
            title={x.country + ' ' + x.currency}
            className="item pointer"
            key={i}
            actions={[
              <Tooltip
                placement="top"
                title={`${bindVal.input} ${x.text}等于 ? ${bindVal.unit2}`}>
                <CaretLeftFilled onClick={() => currencyChange(x.currency)} />
              </Tooltip>,
              <Tooltip
                placement="top"
                title={`${bindVal.input} ${bindVal.unit1}等于 ? ${x.text}`}>
                <CaretRightFilled onClick={() => rightChange(x.currency)} />
              </Tooltip>
            ]}>
            <>
              <span className="num">{x.num.toFixed(5)}</span>
              <span className="text ml5">{x.text}</span>
            </>

            <div className="text gray12 my10">{digitUppercase(x.num)}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page

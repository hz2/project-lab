import React, { useEffect, useState } from 'react'
import { Input, Select, Statistic, Card, Tooltip } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import Currency from './currency.json'
import './currency-page.less'

import { FilterFunc } from 'rc-select/es/interface/generator.d'
import { OptionsType } from 'rc-select/es/interface'

var digitUppercase = function (n: number) {
  var fraction = ['毛', '分']
  // var fraction = ['角', '分'];
  var digit = [
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
  var unit = [
    ['块', '万', '亿'],
    ['', '十', '百', '千']
    // ['元', '万', '亿'],
    // ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  var s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(
      /零./,
      ''
    )
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
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
  var value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] + digit : digit))
}
// 向左移位
function shiftLeft(number: number, digit: string | number) {
  if (typeof digit === 'string') {
    digit = parseInt(digit, 10)
  }
  var value = number.toString().split('e')
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

const list: CurrencyList = Currency.list.map(
  (x: { country: string; text: string; currency: string }) => ({
    ...x,
    num: 0,
    label: `${x.country} ${x.text} ${x.currency} `,
    currency: x.currency,
    value: x.currency
  })
)

const tranCurrency = (currency: string) =>
  list.filter(x => x.currency === currency)[0]
const genNewList = (
  ratesVal: { [x: string]: number },
  input: number,
  key1: string
): CurrencyList =>
  list
    .filter((x, i) => i < 15 && x.value !== key1)
    .map(x => ({ ...x, num: (input / ratesVal[key1]) * ratesVal[x.value] }))

const Page = () => {
  const [bindVal, SetBindVal] = useState({
    input: 1,
    key1: 'USD',
    key2: 'CNY',
    value: 0
  })

  const [ratesVal, SetRatesVal] = useState<IRates>({})

  const [newList, SetNewList] = useState<CurrencyList>([])
  const calc = (obj: {
    key1?: string
    key2?: string
    input?: string | number
  }) => {
    const { input, key1, key2 } = Object.assign({}, bindVal, obj)
    const r1 = ratesVal[key1]
    const r2 = ratesVal[key1]
    const val = (input / r1) * r2
    SetBindVal({
      input,
      key1,
      key2,
      value: val
    })
    genTable({
      input,
      key1
    })
  }

  useEffect(() => {
    fetch('https://respok.com/fixer_io', { mode: 'cors' })
      .then(response => response.json())
      .then(r => {
        if (r && r.rates) {
          const ratesVal = r.rates
          SetRatesVal(ratesVal)
          const key1 = 'USD',
            key2 = 'CNY'
          const obj = {
            input: 1,
            key1,
            key2,
            value: (1 / ratesVal[key1]) * ratesVal[key2]
          }
          SetBindVal(obj)
          const newList = genNewList(ratesVal, 1, key1)
          SetNewList(newList)
        }
      })
      .catch(err => console.error(new Error(err)))
  }, [])

  const genTable = ({ input, key1 }: { input: number; key1: string }) => {
    const newList = genNewList(ratesVal, input, key1)
    SetNewList(newList)
  }

  const currencyChange = (currency: string) => calc({ key1: currency })
  const rightChange = (currency: string) => calc({ key2: currency })

  const filterOption: FilterFunc<OptionsType[number]>  = (input: string, option ): boolean => {
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
        <Input.Group className="left">
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
            options={list}></Select>
          <div className="numText mt10 center">
            <span className="num">{bindVal.input}</span>
            <span className="unit">{tranCurrency(bindVal.key1).text}</span>
          </div>
        </Input.Group>
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
            options={list}></Select>
          <div className="numText mt10 flex center">
            <Statistic value={bindVal.value} precision={5} />
            <span className="ml10 unit">{tranCurrency(bindVal.key2).text}</span>
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
                title={`${bindVal.input} ${x.text}等于 ? ${tranCurrency(bindVal.key2).text
                  }`}>
                <LeftOutlined onClick={() => currencyChange(x.currency)} />
              </Tooltip>,
              <Tooltip
                placement="top"
                title={`${bindVal.input} ${tranCurrency(bindVal.key1).text
                  }等于 ? ${x.text}`}>
                <RightOutlined onClick={() => rightChange(x.currency)} />
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

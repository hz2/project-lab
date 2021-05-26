import React, { useEffect, useState } from 'react'
import { Input, Select, Statistic, Card } from 'antd'
import { list as Currency } from './currency'
import './currency-page.less'

var digitUppercase = function(n) {
  var fraction = ['毛', '分']
  // var fraction = ['角', '分'];
  var digit = [
    // '零', '壹', '贰', '叁', '肆',
    // '伍', '陆', '柒', '捌', '玖'
    '〇',
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
    // ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  var s = ''
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(
      /零./,
      ''
    )
  }
  s = s || '整'
  n = Math.floor(n)
  for (var i = 0; i < unit[0].length && n > 0; i++) {
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
function shiftRight(number, digit) {
  digit = parseInt(digit, 10)
  var value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] + digit : digit))
}
// 向左移位
function shiftLeft(number, digit) {
  digit = parseInt(digit, 10)
  var value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] - digit : -digit))
}

const list = Currency.map(x => ({
  ...x,
  label: `${x.country} ${x.text} ${x.currency} `,
  currency: x.currency,
  value: x.currency
}))

const genNewList = (ratesVal, input, key1) =>
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

  const [ratesVal, SetRatesVal] = useState({})

  const [newList, SetNewList] = useState([])
  const calc = obj => {
    const { input, key1, key2 } = Object.assign({}, bindVal, obj)
    const val = (input / ratesVal[key1]) * ratesVal[key2]
    SetBindVal({
      input,
      key1,
      key2,
      value: val
    })
    genTable({
      input,
      key1,
      key2
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

  const genTable = ({ input, key1 }) => {
    const newList = genNewList(ratesVal, input, key1)
    SetNewList(newList)
  }

  const currencyChange = currency => calc({ key1: currency })

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0

  return (
    <div className="common-box currency-page">
      <div className="flex start">
        <Input.Group className="left">
          <Input
            className="w120"
            value={bindVal.input}
            placeholder="请输入金额"
            onChange={({ target: { value } }) => calc({ input: value / 1 })}
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
        </Input.Group>
        <div
          className="exchange mx15 py20"
          onClick={() => calc({ key2: bindVal.key1, key1: bindVal.key2 })}>
          💱
        </div>
        <div className="w200 right">
          <Select
            showSearch
            className="w160"
            placeholder="选择货币"
            value={bindVal.key2}
            onChange={val => calc({ key2: val })}
            filterOption={filterOption}
            options={list}></Select>

          <Statistic
            className="mt10 center"
            value={bindVal.value}
            precision={5}
          />
        </div>
      </div>
      <div className="table ">
        {newList.map((x, i) => (
          <Card
            title={x.country + ' ' + x.currency}
            className="item pointer"
            key={i}
            onClick={() => currencyChange(x.currency)}>
            <div>
              <span className="num">{x.num.toFixed(5)}</span>
              <span className="text ml5">{x.text}</span>
            </div>
            <div className="text gray12 my10">{digitUppercase(x.num)}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page

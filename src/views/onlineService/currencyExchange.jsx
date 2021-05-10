import React, { useEffect, useState } from 'react'
import { Input, Select, Statistic, Card } from 'antd'
import { list as Currency } from './currency'
import './currency-page.less'

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
          SetRatesVal(r.rates)
          const key1 = 'USD',
            key2 = 'CNY'
          const val = (1 / r.rates[key1]) * r.rates[key2]
          SetBindVal({
            input: 1,
            key1,
            key2,
            value: val
          })
        }
      })
      .catch(err => console.error(new Error(err)))
  }, [])

  const list = Currency.map(x => ({
    label: `${x.country} ${x.text} ${x.currency} `,
    value: x.currency
  }))

  const genTable = ({ input, key1, key2 }) => {
    const newList = list
      .filter((x, i) => i < 15 && x.value !== key1)
      .map(x => ({ ...x, num: (input / ratesVal[key1]) * ratesVal[x.value] }))
    SetNewList(newList)
  }

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0

  return (
    <div className="common-box currency-page">
      <div className="flex start ">
        <Input.Group compact className="w320">
          <Input
            className="w120"
            value={bindVal.input}
            placeholder="请输入金额"
            onChange={({ target: { value } }) => calc({ input: value / 1 })}
            allowClear
          />
          <Select
            showSearch
            className="w200"
            placeholder="选择货币"
            value={bindVal.key1}
            onChange={val => calc({ key1: val })}
            filterOption={filterOption}
            options={list}></Select>
        </Input.Group>
        <div
          className="exchange mx15"
          onClick={() => calc({ key2: bindVal.key1, key1: bindVal.key2 })}>
          💱
        </div>
        <div className="w200">
          <Select
            showSearch
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
          <Card title={x.label} className="item" key={i}>
            <div className="num">{x.num.toFixed(5)}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page

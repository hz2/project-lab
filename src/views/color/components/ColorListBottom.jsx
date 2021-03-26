import React, { useState } from 'react'

import { Radio, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { hsl2rgb } from './colors'

const ColorListBottom = props => {
  const color = props.val

  const [showCount, setShowCount] = useState(10)

  const [showListDom, setShowListDom] = useState(null)

  const genShowList = (val, color) => {
    const { h, s, l } = color
    setShowCount(val)
    const genArr2 = len => Array.from(Array(len + 1), (x, i) => i * 1)

    const hsl2hex = arr =>
      '#' +
      hsl2rgb(arr)
        .slice(0, 3)
        .map(x => x.toString(16).padStart(2, 0))
        .join('')

    const genHexList = fn => genArr2(val).map(x => hsl2hex(fn(x)))

    const cpList2 = fn =>
      genHexList(fn).map((x, i) => (
        <CopyToClipboard
          text={x}
          title={x}
          key={i}
          onCopy={() => message.success('颜色已复制！')}>
          <div
            className="colorItem"
            style={{
              backgroundColor: x
            }}></div>
        </CopyToClipboard>
      ))

    const showH2 = cpList2(x => [(360 / val) * x, s, l])
    const showS2 = cpList2(x => [h, ((100 / val) * x) / 100, l])
    const showL2 = cpList2(x => [h, s, ((100 / val) * x) / 100])

    setShowListDom(
      <div className="showList">
        <div className="action">
          <Radio.Group
            defaultValue="10"
            buttonStyle="solid"
            onChange={onChangeFn}>
            <Radio.Button value="10">10</Radio.Button>
            <Radio.Button value="15">15</Radio.Button>
            <Radio.Button value="20">20</Radio.Button>
            <Radio.Button value="30">30</Radio.Button>
          </Radio.Group>
        </div>
        <div className={'cats count' + val}>
          <div className="cat">{showH2}</div>
          <div className="cat">{showS2}</div>
          <div className="cat">{showL2}</div>
        </div>
      </div>
    )
  }

  const onChangeFn = () => ({ target: { value } }) =>
    genShowList(value * 1, color)

  onChangeFn(showCount, color)

  return (
    <>
      <div className="colorListBottom">{showListDom}</div>
    </>
  )
}
export default ColorListBottom

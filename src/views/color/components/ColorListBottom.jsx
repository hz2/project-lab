import React, { useState, useEffect } from 'react'

import { Radio, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { hsl2rgb } from './colors'

const genArr2 = len => Array.from(Array(len + 1), (x, i) => i * 1)
const hsl2hex = arr =>
  '#' +
  hsl2rgb(arr)
    .slice(0, 3)
    .map(x => x.toString(16).padStart(2, 0))
    .join('')
const genHexList = (fn, val) => genArr2(val).map(x => hsl2hex(fn(x)))

const CopyList2 = ({ fn, val }) => (
  <div className="cat">
    {genHexList(fn, val).map((x, i) => (
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
    ))}
  </div>
)

const ColorList = ({ val, color }) => {
  const [colorState, setColor] = useState(color)
  const [valState, setVal] = useState(val)

  useEffect(() => {
    setColor(color)
    setVal(val)
  }, [color, val])

  return (
    <>
      <div className={'cats count' + valState}>
        <CopyList2
          fn={x => [(360 / valState) * x, colorState.s, colorState.l]}
          val={valState}
        />
        <CopyList2
          fn={x => [colorState.h, ((100 / val) * x) / 100, colorState.l]}
          val={valState}
        />
        <CopyList2
          fn={x => [colorState.h, colorState.s, ((100 / val) * x) / 100]}
          val={valState}
        />
      </div>
    </>
  )
}

const Actiongroup = ({ onChangeFn }) => (
  <div className="showList">
    <div className="action">
      <Radio.Group defaultValue="10" buttonStyle="solid" onChange={onChangeFn}>
        <Radio.Button value="10">10</Radio.Button>
        <Radio.Button value="15">15</Radio.Button>
        <Radio.Button value="20">20</Radio.Button>
        <Radio.Button value="30">30</Radio.Button>
      </Radio.Group>
    </div>
  </div>
)

const ColorListBottom = props => {
  const color = props.val
  const [showCount, setShowCount] = useState(10)
  const onChangeFn = ({ target: { value } }) => setShowCount(value)
  return (
    <>
      <div className="colorListBottom">
        <Actiongroup onChangeFn={onChangeFn} />
        <ColorList color={color} val={showCount} />
      </div>
    </>
  )
}
export default ColorListBottom

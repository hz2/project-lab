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
const genHexList = (fn, count) => genArr2(count * 1).map(x => hsl2hex(fn(x)))

const CopyList2 = ({ hexList, count }) => {
  const [dom, genDom] = useState(null)
  useEffect(() => {
    genDom(
      <div className="cat">
        {hexList.map((x, i) => (
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
  }, [hexList, count])
  return <>{dom}</>
}

const ColorList = ({ count, color }) => {
  const [colorState, setColor] = useState(color)
  const [countState, setCount] = useState(count)

  useEffect(() => {
    setColor(color)
    setCount(count)
  }, [color, count])

  return (
    <>
      <div className={'cats count' + countState}>
        <CopyList2
          hexList={genHexList(
            x => [(360 / countState) * x, colorState.s, colorState.l],
            countState
          )}
          count={countState}
        />
        <CopyList2
          hexList={genHexList(
            x => [colorState.h, ((100 / countState) * x) / 100, colorState.l],
            countState
          )}
          count={countState}
        />
        <CopyList2
          hexList={genHexList(
            x => [colorState.h, colorState.s, ((100 / countState) * x) / 100],
            countState
          )}
          count={countState}
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
        <ColorList color={color} count={showCount} />
      </div>
    </>
  )
}
export default ColorListBottom

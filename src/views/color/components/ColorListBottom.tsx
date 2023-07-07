import { useState } from 'react'

import { copyText } from '@libs/common'
import { Radio, RadioChangeEvent } from 'antd'
import { CopyTwoTone } from '@ant-design/icons'
import { hsl2hex } from './colors'

interface IColorList {
  count: number
  color: {
    h: string
    s: string
    l: string
  }
}

const ColorList = ({ count, color: { h, s, l } }: IColorList) => (
  <div className={'cats count' + count}>
    {[
      (x: number) => [(360 / count) * x, s, l],
      (x: number) => [h, ((100 / count) * x) / 100, l],
      (x: number) => [h, s, ((100 / count) * x) / 100]
    ].map((fn, i) => {
      const list = Array.from({ length: count }, (_x, i) => hsl2hex(fn(i)))
      return (
        <div className="cat" key={i}>
          {list.map((x, i) => (
            <div
              className="colorItem"
              title={x}
              key={i}
              onClick={() => copyText(x, '颜色已复制！')}
              style={{ backgroundColor: x }}></div>
          ))}
          <div
            className="colorItem flex center bgcf c5"
            onClick={() => copyText(JSON.stringify(list), '颜色已复制！')}>
            <CopyTwoTone />
          </div>
        </div>
      )
    })}
  </div>
)

type TFn = (e: RadioChangeEvent) => void

const Actiongroup = ({ onChangeFn }: { onChangeFn: TFn }) => (
  <div className="showList">
    <div className="action">
      <Radio.Group defaultValue={20} buttonStyle="solid" onChange={onChangeFn}>
        {[10, 15, 20, 30].map((x, i) => (
          <Radio.Button value={x} key={i}>
            {x}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  </div>
)

const ColorListBottom = (props: { val: any }) => {
  const color = props.val
  const [showCount, setShowCount] = useState(20)
  const onChangeFn = ({ target: { value } }: RadioChangeEvent) =>
    setShowCount(value)
  return (
    <div className="colorListBottom">
      <Actiongroup onChangeFn={onChangeFn} />
      <ColorList color={color} count={showCount} />
    </div>
  )
}
export default ColorListBottom

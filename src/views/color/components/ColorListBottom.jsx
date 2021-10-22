import React, { useState } from 'react'

import { copyText } from "@libs/common"
import { Radio } from 'antd'
import { hsl2hex } from './colors'

const ColorList = ({ count, color: { h, s, l } }) => (
  <div className={'cats count' + count}>
    {[
      x => [(360 / count) * x, s, l],
      x => [h, ((100 / count) * x) / 100, l],
      x => [h, s, ((100 / count) * x) / 100]
    ].map((fn, i) => (
      <div className="cat" key={i}>
        {Array.from({ length: count }, (x, i) => hsl2hex(fn(i))).map((x, i) => (
          <div className="colorItem"
            title={x}
            key={i}
            onClick={() => copyText(x, '颜色已复制！')} style={{ backgroundColor: x }}></div>
        ))}
      </div>
    ))}
  </div>
)

const Actiongroup = ({ onChangeFn }) => (
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

const ColorListBottom = props => {
  const color = props.val
  const [showCount, setShowCount] = useState(20)
  const onChangeFn = ({ target: { value } }) => setShowCount(value)
  return (
    <div className="colorListBottom">
      <Actiongroup onChangeFn={onChangeFn} />
      <ColorList color={color} count={showCount} />
    </div>
  )
}
export default ColorListBottom

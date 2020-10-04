import React, { useEffect, useState } from 'react'
import './color.less'
import { Input, Button, Radio } from 'antd'

const Color = () => {
  const [inputColor, setInputColor] = useState('')
  const genColor = () =>
    setInputColor(
      '#' +
        Math.random()
          .toString(16)
          .substr(2, 6)
    )

  const rgb2hsl = rgb => {
    const arr = rgb
      .replace(/[rgb() ]/g, '')
      .split(',')
      .map(x => x / 255)
    const [r, g, b] = arr
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    const l = (min + max) / 2
    const h = genHub(r, g, b, min, max)
    const genSaturation = (l, min, max) => {
      if (l === 0 || min === max) {
        return 0
      } else if (0 < l && l <= 0.5) {
        return (max - min) / (2 * l)
      } else if (l > 0.5) {
        return (max - min) / (2 - 2 * l)
      }
    }
    const s = genSaturation(l, min, max)
    return 'hsl(' + [h, s * 100, l * 100].join(',') + ')'
  }

  const genHub = (r, g, b, min, max) => {
    const diff = 60 / (max - min)
    if (max === min) {
      return 0
    } else if (max === r && g >= b) {
      return diff * (g - b) + 0
    } else if (max === r && g < b) {
      return diff * (g - b) + 360
    } else if (max === g) {
      return diff * (b - r) + 120
    } else if (max === b) {
      return diff * (r - g) + 240
    }
  }

  return (
    <div
      className="colorPage"
      style={{
        backgroundColor: inputColor
      }}>
      <Input
        className="item-input"
        placeholder="生成输入手机号码"
        value={inputColor}
        readOnly
      />
      <Button type="primary" onClick={genColor}>
        生成
      </Button>
      <div className="hslbox">
        <Radio value={false} name="qq">
          1
        </Radio>
        <Radio value={false} name="qq">
          2
        </Radio>
        <Radio value={false} name="qq">
          3
        </Radio>
      </div>
    </div>
  )
}

export default Color

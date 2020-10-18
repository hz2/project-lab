import React, { useState } from 'react'
import './color.less'
import { Input, Button, Radio } from 'antd'

const rgb2hsl = rgb => {
  let arr = ['', '', '']
  if (rgb.startsWith('#')) {
    rgb
      .replace('#', '')
      .split('')
      .forEach((x, i) => {
        if ([0, 1].includes(i)) {
          arr[0] += x
        }
        if ([2, 3].includes(i)) {
          arr[1] += x
        }
        if ([4, 5].includes(i)) {
          arr[2] += x
        }
      })
    arr = arr.map(x => parseInt(x, 16) / 255)
  } else {
    arr = rgb
      .replace(/[rgb() ]/g, '')
      .split(',')
      .map(x => x / 255)
  }
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
  return 'hsl(' + [h, s * 100 + '%', l * 100 + '%'].join(',') + ')'
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
const Color = () => {
  const [inputColor, setInputColor] = useState('')

  const [hslBg, setHslBg] = useState('')
  const [hslList, setHslList] = useState(null)
  const [hslList2, setHslList2] = useState(null)
  const [hslList3, setHslList3] = useState(null)
  const genColor = () => {
    setInputColor(
      '#' +
        Math.random()
          .toString(16)
          .substr(2, 6)
    )
    hslDom(inputColor)
  }

  const hslDom = val => {
    const hsl = rgb2hsl(val)
    setHslBg(hsl)
    const hslArr = hsl.replace(/[hsl() ]/g, '').split(',')
    // h
    setHslList(
      Array.from(Array(36), (x, i) => i * 10).map((x, i) => (
        <div
          className="item"
          key={i}
          style={{
            backgroundColor: `hsl(${x},${hslArr[1]},${hslArr[2]})`
          }}></div>
      ))
    )
    // s
    setHslList2(
      Array.from(Array(33), (x, i) => i * 3.33).map((x, i) => (
        <div
          className="item"
          key={i}
          style={{
            backgroundColor: `hsl(${hslArr[0]},${x}%,${hslArr[2]})`
          }}></div>
      ))
    )
    // l
    setHslList3(
      Array.from(Array(33), (x, i) => i * 3.33).map((x, i) => (
        <div
          className="item"
          key={i}
          style={{
            backgroundColor: `hsl(${hslArr[0]},${hslArr[1]},${x}%)`
          }}></div>
      ))
    )
  }

  return (
    <div className="colorPage">
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
      <div className="mainValue" style={{ backgroundColor: hslBg }}></div>
      <div className="title">Hue</div>
      <div className="list">{hslList}</div>
      <div className="title">Saturation</div>
      <div className="list">{hslList2}</div>
      <div className="title">Lightness</div>
      <div className="list">{hslList3}</div>
    </div>
  )
}

export default Color

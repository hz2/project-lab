import React, { useState } from 'react'
import './color.less'
import { Input, Button } from 'antd'

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
const ColorPage = () => {
  const [inputColor, setInputColor] = useState('')
  const [hslBg, setHslBg] = useState({ bg: '' })
  const [hslList, setHslList] = useState(null)
  const [hslList2, setHslList2] = useState(null)
  const [hslList3, setHslList3] = useState(null)
  const genColor = () => {
    const randomColor =
      '#' +
      Math.random()
        .toString(16)
        .substr(2, 6)
    setInputColor(randomColor)
    hslDom(randomColor)
  }

  const hslDom = val => {
    const hsl = rgb2hsl(val)
    const hslArr = hsl.replace(/[hsl() ]/g, '').split(',')
    const [h, s, l] = hslArr.map(x => x.replace('%', ''))
    setHslBg({
      bg: hsl,
      h,
      s,
      l
    })

    console.log('h, s, l', h, s, l, { backgroundColor: `hsl(${50},${s},${l})` })
    const arr360 = Array.from(Array(100), (x, i) => i * 3.6)
    const arr100 = Array.from(Array(100), (x, i) => i * 1)

    const genIndex = (arr, key) => {
      const absArr = arr.map(x => Math.abs(x - key))
      return absArr.findIndex(x => x === Math.min(...absArr))
    }

    const index1 = genIndex(arr360, h)
    const index2 = genIndex(arr100, s)
    const index3 = genIndex(arr100, l)

    // h
    setHslList(
      arr360.map((x, i) => (
        <div
          className={i === index1 ? 'item box' : 'item'}
          key={i}
          style={{ backgroundColor: `hsl(${x},${s}%,${l}%)` }}></div>
      ))
    )
    // s
    setHslList2(
      arr100.map((x, i) => (
        <div
          className={i === index2 ? 'item box' : 'item'}
          key={i}
          style={{ backgroundColor: `hsl(${h},${x}%,${l}%)` }}></div>
      ))
    )
    // l
    setHslList3(
      arr100.map((x, i) => (
        <div
          className={i === index3 ? 'item box' : 'item'}
          key={i}
          style={{ backgroundColor: `hsl(${h},${s}%,${x}%)` }}></div>
      ))
    )
  }

  return (
    <div className="colorPage">
      <Input
        className="item-input"
        placeholder="生成颜色"
        value={inputColor}
        readOnly
      />
      <Button type="primary" onClick={genColor}>
        生成
      </Button>
      <div className="mainValue" style={{ backgroundColor: hslBg.bg }}></div>
      <div className="title">Hue ( {hslBg.h} )</div>
      <div className="list">{hslList}</div>
      <div className="title">Saturation ( {hslBg.s} )</div>
      <div className="list">{hslList2}</div>
      <div className="title">Lightness ( {hslBg.l} )</div>
      <div className="list">{hslList3}</div>
    </div>
  )
}

export default ColorPage

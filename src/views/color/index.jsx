import React, { useState, useEffect } from 'react'
import './color.less'
import { Input, Button, Slider, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
  const [hslBg, setHslBg] = useState({ bg: '', text: '#000' })
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
  // const pickColor = ({ target }) => {
  //   const color = target.style.backgroundColor
  //   setInputColor(color)
  //   hslDom(color)
  // }
  // eslint-disable-next-line
  useEffect(() => genColor(), [])

  const changH = x => {
    const { s, l } = hslBg
    const color = `hsl(${x},${s}%,${l}%)`
    setInputColor(color)
    hslDom(color, 'hsl')
  }

  const changS = x => {
    const { h, l } = hslBg
    const color = `hsl(${h},${x}%,${l}%)`
    setInputColor(color)
    hslDom(color, 'hsl')
  }

  const changL = x => {
    const { h, s } = hslBg
    const color = `hsl(${h},${s}%,${x}%)`
    setInputColor(color)
    hslDom(color, 'hsl')
  }

  const hslDom = (val, type) => {
    let hsl = ''
    if (type === 'hsl') {
      hsl = val
    } else {
      hsl = rgb2hsl(val)
    }
    const arr360 = Array.from(Array(100), (x, i) => (i * 3.6).toFixed(2))
    const arr100 = Array.from(Array(100), (x, i) => i * 1)
    const genClosed = (arr, key) => {
      const absArr = arr.map(x => (Math.abs(x - key) * 100) / 100)
      const index = absArr.findIndex(x => x === Math.min(...absArr))
      return arr[index]
    }

    const hslArr = hsl.replace(/[hsl() ]/g, '').split(',')
    const [h0, s0, l0] = hslArr.map(x => x.replace('%', ''))
    const [h, s, l] = [
      genClosed(arr360, h0),
      genClosed(arr100, s0),
      genClosed(arr100, l0)
    ]
    setHslBg({
      bg: `hsl(${h},${s}%,${l}%)`,
      text: l > 65 ? '#000' : '#fff',
      h,
      s,
      l
    })

    // const index1 = genIndex(arr360, h)
    // const index2 = genIndex(arr100, s)
    // const index3 = genIndex(arr100, l)

    // h
    setHslList(
      arr360.map((x, i) => (
        <div
          className="item"
          key={i}
          style={{ backgroundColor: `hsl(${x},${s}%,${l}%)` }}></div>
      ))
    )
    // s
    setHslList2(
      arr100.map((x, i) => (
        <div
          className="item"
          key={i}
          style={{ backgroundColor: `hsl(${h},${x}%,${l}%)` }}></div>
      ))
    )
    // l
    setHslList3(
      arr100.map((x, i) => (
        <div
          className="item"
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
      <div className="previewColor">
        <CopyToClipboard
          text={hslBg.bg}
          onCopy={() => message.success('颜色已复制！')}>
          <div>
            <div
              className="mainValue"
              style={{ color: hslBg.text, backgroundColor: hslBg.bg }}>
              预览文字
            </div>
            <div
              className="mainValue"
              style={{ color: hslBg.bg, background: hslBg.text }}>
              预览文字
            </div>
          </div>
        </CopyToClipboard>
      </div>
      <div className="title">Hue 色相 ( {hslBg.h} )</div>
      <div className="list">{hslList}</div>
      <Slider
        value={hslBg.h}
        max={356.41}
        step={3.6}
        tooltipVisible={false}
        onChange={val => changH(val)}
      />
      <div className="title">Saturation 饱和度 ( {hslBg.s} )</div>
      <div className="list">{hslList2}</div>
      <Slider
        value={hslBg.s}
        max={99}
        tooltipVisible={false}
        onChange={val => changS(val)}
      />
      <div className="title">Lightness 亮度 ( {hslBg.l} )</div>
      <div className="list">{hslList3}</div>
      <Slider
        value={hslBg.l}
        max={99}
        tooltipVisible={false}
        onChange={val => changL(val)}
      />
    </div>
  )
}

export default ColorPage

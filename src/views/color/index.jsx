import React, { useState, useEffect } from 'react'
import './color.less'
import { Input, Button, Slider, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const colorStr2arr = str => {
  let arr = ['', '', '']
  if (str.startsWith('#')) {
    str
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
    arr = arr.map(x => parseInt(x, 16))
  } else {
    arr = str.replace(/[rgb() ]/g, '').split(',')
  }
  return [...arr, 1]
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

const rgb2hsl = rgba => {
  const [r0, g0, b0, a] = rgba
  const [r, g, b] = [r0, g0, b0].map(x => x / 255)
  const min = Math.min(...[r, g, b])
  const max = Math.max(...[r, g, b])
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
  return [h, s, l, a]
}
const hsl2rgb = hsla => {
  const [h, s, l, a] = hsla
  const C = (1 - Math.abs(2 * l - 1)) * s
  const H_ = h / 60
  const X = C * (1 - Math.abs((H_ % 2) - 1))
  let rgb_ = []
  if (!H_) {
    rgb_ = [0, 0, 0]
  } else if (0 < H_ && H_ <= 1) {
    rgb_ = [C, X, 0]
  } else if (1 < H_ && H_ <= 2) {
    rgb_ = [X, C, 0]
  } else if (2 < H_ && H_ <= 3) {
    rgb_ = [0, C, X]
  } else if (3 < H_ && H_ <= 4) {
    rgb_ = [0, X, C]
  } else if (4 < H_ && H_ <= 5) {
    rgb_ = [X, 0, C]
  } else if (5 < H_ && H_ <= 6) {
    rgb_ = [C, 0, X]
  }
  const m = l - C / 2
  return [...rgb_.map(x => Math.round((x + m) * 255)), a]
}

const arr360 = Array.from(Array(361), (x, i) => i * 1)
const arr100 = Array.from(Array(101), (x, i) => i * 1)
const arr255 = Array.from(Array(256), (x, i) => i * 1)

const ColorPage = () => {
  const [colorSets, setColor] = useState({
    rgba: '',
    text: '#000',
    h: 0,
    s: 0,
    l: 0,
    a: 1,
    r: 0,
    g: 0,
    b: 0
  })
  const [hslRGB, setRGB] = useState(null)

  const genColor = () => {
    const randomColor =
      '#' +
      Math.random()
        .toString(16)
        .substr(2, 6)
    const arr = rgb2hsl(colorStr2arr(randomColor))
    hslDom(arr)
  }
  const changeH = x => {
    const { s, l, a } = colorSets
    hslDom([x, s, l, a])
  }

  const changeS = x => {
    const { h, l, a } = colorSets
    hslDom([h, x / 100, l, a])
  }

  const changeL = x => {
    const { h, s, a } = colorSets
    hslDom([h, s, x / 100, a])
  }
  const changeA = x => {
    const { h, s, l } = colorSets
    hslDom([h, s, l, x / 100])
  }
  const changeR = x => {
    const { g, b, a } = colorSets
    const arr = rgb2hsl([x, g, b, a])
    hslDom(arr)
  }
  const changeG = x => {
    const { r, b, a } = colorSets
    const arr = rgb2hsl([r, x, b, a])
    hslDom(arr)
  }
  const changeB = x => {
    const { r, g, a } = colorSets
    const arr = rgb2hsl([r, g, x, a])
    hslDom(arr)
  }

  // eslint-disable-next-line
  useEffect(() => genColor(), [])

  const renderDomList = ({ h, s, l, a, r, g, b, s_, l_ }) => {
    const domList = [
      {
        name: `Hue 色相 ( ${h}° )`,
        val: h,
        bgval: x => `hsla(${x},${s * 100}%,${l * 100}%,${a})`,
        max: 361,
        arr: arr360,
        fn: changeH
      },
      {
        name: `Saturation 饱和度 ( ${s_}% )`,
        val: s * 100,
        bgval: x => `hsla(${h},${x}%,${l * 100}%,${a})`,
        max: 100,
        arr: arr100,
        fn: changeS
      },
      {
        name: `Lightness 亮度 ( ${l_}% )`,
        val: l * 100,
        bgval: x => `hsla(${h},${s * 100}%,${x}%,${a})`,
        max: 100,
        arr: arr100,
        fn: changeL
      },
      {
        name: `Alpha 透明度 ( ${a} )`,
        val: a * 100,
        bgval: x => `hsla(${h},${s * 100}%,${l * 100}%,${x / 100})`,
        max: 100,
        arr: arr100,
        fn: changeA
      },
      {
        name: `红色 ( ${r} )`,
        val: r,
        bgval: x => `rgba(${x},${g},${b},${a})`,
        max: 255,
        arr: arr255,
        fn: changeR
      },
      {
        name: `绿色 ( ${g} )`,
        val: g,
        bgval: x => `rgba(${r},${x},${b},${a})`,
        max: 255,
        arr: arr255,
        fn: changeG
      },
      {
        name: `蓝色 ( ${b} )`,
        val: b,
        bgval: x => `rgba(${r},${g},${x},${a})`,
        max: 255,
        arr: arr255,
        fn: changeB
      }
    ]
    // rgb
    setRGB(
      domList.map((x, i) => (
        <div className="colorItem" key={i}>
          <div className="title">{x.name}</div>
          <div
            className="list"
            style={{
              backgroundImage: `linear-gradient(to right, ${x.arr
                .map(y => x.bgval(y))
                .join(',')})`
            }}></div>
          <Slider
            key={i}
            value={x.val}
            min={0}
            max={x.max}
            tooltipVisible={false}
            onChange={val => x.fn(val)}
          />
        </div>
      ))
    )
  }

  const hslDom = val => {
    const genClosed = (arr, key) => {
      const absArr = arr.map(x => (Math.abs(x - key) * 100) / 100)
      const index = absArr.findIndex(x => x === Math.min(...absArr))
      return arr[index]
    }
    const [h0, s0, l0, a = 1] = val
    const [h, s, l] = [
      genClosed(arr360, h0),
      genClosed(arr100, s0 * 100) / 100,
      genClosed(arr100, l0 * 100) / 100
    ]
    const [h_, s_, l_, a_] = [h, s, l, a].map(x => Math.round(x * 100))
    const [r, g, b] = hsl2rgb([h, s, l, a])
    const color = {
      hsla: `hsla(${h},${s}%,${l}%)`,
      rgba: `rgba(${[r, g, b, a].join(',')})`,
      hexa: ``,
      text: l > 0.65 ? '#000' : '#fff',
      h, // 0 - 360
      s, // 0 - 1
      l, // 0 - 1
      a, // 0 - 1
      r, // 0 - 255
      g, // 0 - 255
      b, // 0 - 255
      h_,
      s_,
      l_,
      a_
    }
    setColor(color)
    renderDomList(color)
  }

  return (
    <div className="colorPage">
      <Input
        className="item-input"
        placeholder="生成颜色"
        value={colorSets.rgba}
        readOnly
      />
      <Button type="primary" onClick={genColor}>
        生成
      </Button>
      <div className="previewColor">
        <CopyToClipboard
          text={colorSets.rgba}
          onCopy={() => message.success('颜色已复制！')}>
          <div>
            <div
              className="mainValue"
              style={{
                color: colorSets.text,
                backgroundColor: colorSets.rgba
              }}>
              预览文字
            </div>
            <div
              className="mainValue"
              style={{ color: colorSets.rgba, background: colorSets.text }}>
              预览文字
            </div>
          </div>
        </CopyToClipboard>
      </div>
      <>{hslRGB}</>
    </div>
  )
}

export default ColorPage

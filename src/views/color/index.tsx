// @flow
import React, { useState, useEffect } from 'react'
import './color.less'
import { Input, Button, Slider } from 'antd'
import ColorListBottom from './components/ColorListBottom'
import { colorStr2arr, hsl2rgb, rgb2hsl } from './components/colors'

import { copyText } from '@libs/common'

interface IColorSet {
  rgba: string
  text: string
  hexa: string
  h: number
  s: number
  l: number
  a: number
  r: number
  g: number
  b: number
  gradient?: string
  h_?: number
  s_?: number
  l_?: number
  a_?: number
}

const ColorPage = () => {
  const [colorSets, setColor] = useState<IColorSet>({
    rgba: '',
    text: '#000',
    hexa: '',
    h: 1,
    s: 0,
    l: 0,
    a: 1,
    r: 0,
    g: 0,
    b: 0
  })
  const [hslRGB, setHSLRGB] = useState<JSX.Element[] | null>(null)

  const genColor = () => {
    const randomColor =
      '#' +
      Math.random()
        .toString(16)
        .substr(2, 6)
    const arr = rgb2hsl(colorStr2arr(randomColor))
    hslDom(arr)
  }

  const handleColorChange = ({
    target: { value: val }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (val && val.length === 7 && val.startsWith('#')) {
      hslDom(rgb2hsl(colorStr2arr(val)))
    }
  }

  const slidingVal = (x: number, i: number, colors: IColorSet) => {
    const { h, s, l, a, r, g, b } = colors
    const arr = [
      [x, s, l, a],
      [h, x / 100, l, a],
      [h, s, x / 100, a],
      [h, s, l, x / 100],
      rgb2hsl([x, g, b, a]),
      rgb2hsl([r, x, b, a]),
      rgb2hsl([r, g, x, a])
    ][i]
    hslDom(arr)
  }

  // eslint-disable-next-line
  useEffect(() => genColor(), [])

  const genArr = (len: number, fn: (x: number | string) => string) =>
    (len === 360
      ? Array.from(Array(len / 20 + 1), (x, i) => fn(i * 20))
      : [0, len / 2, len].map(x => fn(x * 1))
    ).join(',')

  const tofixed4 = (val: number) => (Number(val.toFixed(4)) * 100).toFixed(2)

  const colorPickerList = (color: IColorSet) => {
    const { h, s, l, a, r, g, b, h_, s_, l_ } = color
    const domList = [
      {
        key: 'h',
        name: `Hue 色相 ( ${(h_ || 0) / 100}° )`,
        val: h,
        bgval: (x: number | string) =>
          `hsla(${x},${tofixed4(s)}%,${tofixed4(l)}%,${a})`,
        max: 360,
        min: 1
      },
      {
        key: 's',
        name: `Saturation 饱和度 ( ${s_}% )`,
        val: s * 100,
        bgval: (x: number | string) => `hsla(${h},${x}%,${l * 100}%,${a})`,
        max: 100
      },
      {
        key: 'l',
        name: `Lightness 亮度 ( ${l_}% )`,
        val: l * 100,
        bgval: (x: number | string) => `hsla(${h},${s * 100}%,${x}%,${a})`,
        max: 100
      },
      {
        key: 'a',
        name: `Alpha 透明度 ( ${a} )`,
        val: a * 100,
        bgval: (x: number | string) =>
          `hsla(${h},${s * 100}%,${l * 100}%,${Number(x) / 100})`,
        max: 100
      },
      {
        key: 'r',
        name: `红色 ( ${r} )`,
        val: r,
        bgval: (x: number | string) => `rgba(${x},${g},${b},${a})`,
        max: 255
      },
      {
        key: 'g',
        name: `绿色 ( ${g} )`,
        val: g,
        bgval: (x: number | string) => `rgba(${r},${x},${b},${a})`,
        max: 255
      },
      {
        key: 'b',
        name: `蓝色 ( ${b} )`,
        val: b,
        bgval: (x: number | string) => `rgba(${r},${g},${x},${a})`,
        max: 255
      }
    ]
    // set css variable
    let dom = document.querySelector('#colorList') as HTMLElement

    domList.forEach(x =>
      dom.style.setProperty(
        '--linear-' + x.key,
        `linear-gradient(to right, ${genArr(x.max, x.bgval)})`
      )
    )

    const SliderList = [domList.slice(0, 4), domList.slice(4)].map((w, h) => (
      <div className="colorSet actionItem" key={h}>
        {w.map((x, i) => (
          <div className="colorItem" key={i}>
            <div className="title">{x.name}</div>
            <div className="sliderBlock">
              <div className={'list bg_' + x.key}></div>
              <Slider
                key={i}
                value={x.val}
                min={x.min || 0}
                max={x.max}
                tooltip={{ open: false }}
                onChange={val => slidingVal(val, h * 4 + i, color)}
              />
            </div>
          </div>
        ))}
      </div>
    ))
    // rgb
    setHSLRGB(SliderList)
  }

  const hslDom = (val: any[]) => {
    const [h, s, l, a] = val
    // const [h, s, l] = [
    //   genClosed(arr360, h0),
    //   genClosed(arr100, s0 * 100) / 100,
    //   genClosed(arr100, l0 * 100) / 100
    // ]
    const [h_, s_, l_, a_] = [h, s, l, a].map(x => Math.round(x * 100))
    const [r, g, b] = hsl2rgb([h, s, l, a])
    const color = {
      rgba: `rgba(${[r, g, b, a].join(',')})`,
      hexa: '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join(''),
      text: l > 0.7 ? '#000' : '#fff',
      gradient: l > 0.25 ? '#fff' : '#000',
      h, // 1 - 360
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
    colorPickerList(color)
  }

  return (
    <>
      <div className="colorPage pb30">
        <Input
          className="item-input"
          placeholder="生成颜色"
          value={colorSets.hexa}
          onChange={handleColorChange}
          // readOnly
        />
        <Button type="primary" onClick={genColor}>
          生成
        </Button>
        <Button
          className="ml25"
          onClick={() => copyText(colorSets.hexa, '颜色已复制！')}>
          {colorSets.hexa}
        </Button>
        <div className="actionList">
          <div className="previewColor">
            <div
              className="previewBox"
              onCopy={() => copyText(colorSets.rgba, '颜色已复制！')}>
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
              <div
                className="mainValue"
                style={{
                  backgroundImage: `linear-gradient( 135deg ,${colorSets.rgba},${colorSets.gradient})`
                }}></div>
              <div
                className="mainValue"
                style={{
                  backgroundImage: `radial-gradient( circle at 100%, ${colorSets.rgba},${colorSets.gradient})`
                }}></div>
              <div
                className="mainValue"
                style={{
                  backgroundImage: `radial-gradient( ellipse at bottom right, ${colorSets.rgba},${colorSets.gradient})`
                }}></div>
              <div
                className="mainValue"
                style={{
                  backgroundImage: `conic-gradient( from 135deg at 65% 65%, ${colorSets.rgba},${colorSets.gradient})`
                }}></div>
            </div>
          </div>
          <div className="colorList" id="colorList">
            {hslRGB}
          </div>
        </div>
      </div>
      <ColorListBottom val={colorSets} />
    </>
  )
}

export default ColorPage

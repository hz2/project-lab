import React, { useState } from 'react'
import { Radio, Form, Button } from 'antd'
import guaJson from './guaText'
import HeluoComp from './heluo'

const w = 1000
const half = w / 2
const subtense = Math.tan((22.5 * Math.PI) / 180) * half
const p1 = half - subtense
const p2 = half + subtense

const listOrig = [
  {
    id: 'ss',
    zh: '南',
    d: ['M', half, half, p1, 0, p2, 0, 'z']
  },
  {
    id: 'sw',
    zh: '西南',
    d: ['M', half, half, p2, 0, w, p1, 'z']
  },
  {
    id: 'ww',
    zh: '西',
    d: ['M', half, half, w, p1, w, p2, 'z']
  },
  {
    id: 'nw',
    zh: '西北',
    d: ['M', half, half, w, p2, p2, w, 'z']
  },

  {
    id: 'nn',
    zh: '北',
    d: ['M', half, half, p2, w, p1, w, 'z']
  },
  {
    id: 'ne',
    zh: '东北',
    d: ['M', half, half, p1, w, 0, p2, 'z']
  },
  {
    id: 'ee',
    zh: '东',
    d: ['M', half, half, 0, p2, 0, p1, 'z']
  },
  {
    id: 'se',
    zh: '东南',
    d: ['M', half, half, 0, p1, p1, 0, 'z']
  }
]
const guaType = {
  // 伏羲先天
  xiantian: ['qian', 'xun', 'kan', 'gen', 'kun', 'zhen', 'li', 'dui'],
  // 文王后天
  houtian: ['li', 'kun', 'dui', 'qian', 'kan', 'gen', 'zhen', 'xun'],
  lianshan: ['gen', 'li', 'zhen', 'qian', 'dui', 'kan', 'xun', 'kun'],
  guishu: ['kun', 'zhen', 'li', 'dui', 'qian', 'xun', 'kan', 'gen'],
  longtu: ['zhen', 'qian', 'dui', 'kan', 'xun', 'kun', 'gen', 'li']
}

const Yi = () => {
  const genDom = (type = 'houtian', textkey = 'trigrams') => {
    const gua = listOrig.map((x, i) =>
      Object.assign(x, guaJson[guaType[type][i]])
    )
    return gua.map((x, i) => (
      <g key={i}>
        <path
          id={x.id}
          d={x.d.join(' ')}
          fill={x.color}
          stroke="#bbb"
          strokeWidth={w / 330}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          fontSize={w / 15}
          x={half}
          y={half * 0.15}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${i * 45},${half},${half})`}>
          <tspan fill="#fff">{x.text}</tspan>
        </text>
        <text
          fontSize={w / 17}
          x={half}
          y={half * 0.35}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${i * 45},${half},${half})`}>
          <tspan fill="#fff">{x[textkey]}</tspan>
        </text>
      </g>
    ))
  }

  const [guaList, setGuaList] = useState(genDom())
  // const [luoshuVal, setLuoshuVal] = useState(null)
  const [guaTypeVal, setGuaTypeVal] = useState('houtian')
  const [guaTextVal, setGuaTextVal] = useState('trigrams')

  const ActionBar1 = () => {
    const list = Object.entries({
      xiantian: '伏羲先天',
      houtian: '文王后天',
      lianshan: '连山',
      guishu: '坤乾龟书',
      longtu: '震巽龙图'
    })
    return (
      <Radio.Group
        value={guaTypeVal}
        buttonStyle="solid"
        onChange={({ target: { value } }) => guaTypeFn(value)}>
        {list.map(x => (
          <Radio.Button key={x[0]} value={x[0]}>
            {x[1]}
          </Radio.Button>
        ))}
      </Radio.Group>
    )
  }

  const guaTypeFn = val => {
    setGuaTypeVal(val)
    setGuaList(genDom(val, guaTextVal))
  }
  const ActionBar2 = () => {
    const list = Object.entries({
      trigrams: '卦',
      t2: '自然',
      t13: '节气',
      t14: '四季',
      zh: '方道',
      t8: '五行',
      t15: '五音',
      t16: '五味',
      t17: '五色',
      t12: '器官',
      t11: '天干',
      t10: '生肖',
      t9: '地支',
      t3: '家人',
      t4: '性情',
      t5: '动物',
      t6: '身体',
      t7: '器官'
    })
    return (
      <Radio.Group
        value={guaTextVal}
        buttonStyle="solid"
        onChange={({ target: { value } }) => guaTextFn(value)}>
        {list.map(x => (
          <Radio.Button key={x[0]} value={x[0]}>
            {x[1]}
          </Radio.Button>
        ))}
      </Radio.Group>
    )
  }
  const guaTextFn = val => {
    setGuaTextVal(val)
    setGuaList(genDom(guaTypeVal, val))
  }

  const [heluoTab, setheluoTab] = useState('fish') // fish

  const ActionBar3 = () => {
    const list = Object.entries({
      // wuji: "无极",
      fish: '太极',
      // huangji: "皇极",
      hetu: '河图',
      hetup: '河图',
      hetup2: '万氏河图',
      luoshu: '洛书',
      luoshup: '洛书',
      taijiorig: '原始太极',
      taijihetu: '太极河图',
      wuxing: '五行',
      wuxing0: '生克',
      wuxing1: '五行生',
      wuxing2: '五行克'
    })
    return (
      <Radio.Group
        buttonStyle="solid"
        value={heluoTab}
        onChange={({ target: { value } }) => setheluoTab(value)}>
        {list.map(x => (
          <Radio.Button key={x[0]} value={x[0]}>
            {x[1]}
          </Radio.Button>
        ))}
      </Radio.Group>
    )
  }

  const downloadSvgFile = type => {
    const downloadBlob = (blob, name) => {
      let file = new FileReader()
      file.onload = e => {
        let el = document.createElement('a')
        el.setAttribute('href', e.target.result)
        el.setAttribute('download', name)
        if (document.createEvent) {
          var event = document.createEvent('MouseEvents')
          event.initEvent('click', true, true)
          el.dispatchEvent(event)
        } else {
          el.click()
        }
      }
      file.readAsDataURL(blob)
    }
    const content = document.querySelector('#plumflower').outerHTML
    const svgblob = new Blob([content], {
      type: 'image/svg+xml'
    })
    if (type === 'svg') {
      downloadBlob(svgblob, 'plumFlowerYi.svg')
    } else if (type === 'bitmap') {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      const DOMURL = window.URL || window.webkitURL || window
      const img = new Image()
      const url = DOMURL.createObjectURL(svgblob)
      img.src = url
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(blob => {
          downloadBlob(blob, 'plumFlowerYi.png')
        })
        DOMURL.revokeObjectURL(url)
      }
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }

  return (
    <div className="pageYi">
      <canvas id="canvas" width="1000" height="1000"></canvas>
      <Form {...layout} name="basic">
        <Form.Item label="卦">
          <ActionBar1 />
        </Form.Item>
        <Form.Item label="象征">
          <ActionBar2 />
        </Form.Item>
        <Form.Item label="河洛">
          <ActionBar3 />
        </Form.Item>
        <Form.Item label="下载" className="downloadBtn">
          <Button type="plain" onClick={() => downloadSvgFile('svg')}>
            下载矢量图
          </Button>
          <Button type="plain" onClick={() => downloadSvgFile('bitmap')}>
            下载位图
          </Button>
        </Form.Item>
      </Form>
      <div className="yiContainer">
        <svg
          id="plumflower"
          viewBox={[0, 0, w, w].join(' ')}
          xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(.9 .9) translate(50,50)">
            <g id="guagraph">{guaList}</g>
            <HeluoComp w={w} tabVal={heluoTab} />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Yi

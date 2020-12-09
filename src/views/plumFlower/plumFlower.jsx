import React, { useState } from 'react'
import { Radio, Switch, Form } from 'antd'
import guaJson from './guaText'

const w = 100
const half = w / 2
const subtense = Math.tan((22.5 * Math.PI) / 180) * half
const p1 = half - subtense
const p2 = half + subtense

const r = Math.sqrt(Math.pow((2 / 6) * w, 2) / 2)
const r2 = Math.sqrt(Math.pow((1 / 6) * w, 2) / 2)

const listOrig = [
  {
    id: 'ss',
    zh: '正南',
    d: ['M', half, half, p1, 0, p2, 0, 'z'],
    pos: [half, (1 / 6) * w]
  },
  {
    id: 'sw',
    zh: '西南',
    d: ['M', half, half, p2, 0, w, p1, 'z'],
    pos: [(1 / 2) * w + r, (1 / 2) * w - r]
  },
  {
    id: 'ww',
    zh: '正西',
    d: ['M', half, half, w, p1, w, p2, 'z'],
    pos: [(5 / 6) * w, (1 / 2) * w]
  },
  {
    id: 'nw',
    zh: '西北',
    d: ['M', half, half, w, p2, p2, w, 'z'],
    pos: [(1 / 2) * w + r, (1 / 2) * w + r]
  },

  {
    id: 'nn',
    zh: '正北',
    d: ['M', half, half, p2, w, p1, w, 'z'],
    pos: [half, (5 / 6) * w]
  },
  {
    id: 'ne',
    zh: '东北',
    d: ['M', half, half, p1, w, 0, p2, 'z'],
    pos: [(1 / 2) * w - r, (1 / 2) * w + r]
  },
  {
    id: 'ee',
    zh: '正东',
    d: ['M', half, half, 0, p2, 0, p1, 'z'],
    pos: [(1 / 6) * w, (1 / 2) * w]
  },
  {
    id: 'se',
    zh: '东南',
    d: ['M', half, half, 0, p1, p1, 0, 'z'],
    pos: [(1 / 2) * w - r, (1 / 2) * w - r]
  }
]
// [
//   [4, 9, 2],
//   [3, 5, 7],
//   [8, 1, 6]
// ]
const luoshu = [
  {
    pos: [half, half],
    num: 5
  },
  {
    pos: [half, (1 / 2) * w - r2],
    num: 9
  },
  {
    pos: [(1 / 2) * w + r2, (1 / 2) * w - r2],
    num: 2
  },
  {
    pos: [(1 / 2) * w + r2, half],
    num: 7
  },
  {
    pos: [(1 / 2) * w + r2, (1 / 2) * w + r2],
    num: 6
  },
  {
    pos: [half, (1 / 2) * w + r2],
    num: 1
  },
  {
    pos: [(1 / 2) * w - r2, (1 / 2) * w + r2],
    num: 8
  },
  {
    pos: [(1 / 2) * w - r2, half],
    num: 3
  },
  {
    pos: [(1 / 2) * w - r2, (1 / 2) * w - r2],
    num: 4
  }
]

// const hetu = [
//   [0, 0, 7, 0, 0],
//   [0, 0, 2, 0, 0],
//   [8, 3, 5.1, 4, 9],
//   [0, 0, 1, 0, 0],
//   [0, 0, 6, 0, 0]
// ]

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
  const genDom = (type = 'houtian', textkey = 'text') => {
    const gua = listOrig.map((x, i) =>
      Object.assign(x, guaJson[guaType[type][i]])
    )
    return gua.map((x, i) => (
      <g key={i}>
        <path
          id={x.id}
          d={x.d.join(' ')}
          fill={x.color}
          stroke="#ccc"
          strokeWidth="0.3px"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          color="#fff"
          fontSize="8px"
          x={x.pos[0]}
          y={x.pos[1]}
          textAnchor="middle"
          dominantBaseline="middle">
          <tspan>{x[textkey]}</tspan>
          <tspan>{x.trigrams}</tspan>
          {/* <tspan>{x.t3}</tspan> */}
        </text>
      </g>
    ))
  }

  const loushuDom = (
    <g id="luoshu">
      {luoshu.map((x, i) => (
        <g key={i}>
          <circle cx={x.pos[0]} cy={x.pos[1]} r="5" fill="#ff89ff" />
          <text
            color="#fff"
            fontSize="5.5"
            transform="translate(0,2.2)"
            x={x.pos[0]}
            y={x.pos[1]}
            textAnchor="middle">
            <tspan>{x.num}</tspan>
          </text>
        </g>
      ))}
    </g>
  )
  const [guaList, setGuaList] = useState(genDom())
  const [luoshuVal, setLuoshuVal] = useState(null)
  const [guaTypeVal, setGuaTypeVal] = useState('houtian')
  const [guaTextVal, setGuaTextVal] = useState('text')

  const actionList0 = (
    <Radio.Group
      defaultValue="houtian"
      buttonStyle="solid"
      onChange={({ target: { value } }) => guaTypeFn(value)}>
      <Radio.Button value="xiantian">伏羲先天</Radio.Button>
      <Radio.Button value="houtian">文王后天</Radio.Button>
      <Radio.Button value="lianshan">连山</Radio.Button>
      <Radio.Button value="guishu">坤乾龟书</Radio.Button>
      <Radio.Button value="longtu">震巽龙图</Radio.Button>
    </Radio.Group>
  )

  const guaTypeFn = val => {
    setGuaTypeVal(val)
    setGuaList(genDom(val, guaTextVal))
  }

  const actionList1 = (
    <Radio.Group
      defaultValue="text"
      buttonStyle="solid"
      onChange={({ target: { value } }) => guaTextFn(value)}>
      <Radio.Button value="text">卦</Radio.Button>
      <Radio.Button value="t8">五行</Radio.Button>
      <Radio.Button value="t9">天干</Radio.Button>
      <Radio.Button value="t10">生肖</Radio.Button>
      <Radio.Button value="t11">地支</Radio.Button>
      <Radio.Button value="t2">自然</Radio.Button>
      <Radio.Button value="t3">家人</Radio.Button>
      <Radio.Button value="t4">性情</Radio.Button>
      <Radio.Button value="t5">动物</Radio.Button>
      <Radio.Button value="t6">身体</Radio.Button>
      <Radio.Button value="t7">器官</Radio.Button>
    </Radio.Group>
  )

  const guaTextFn = val => {
    setGuaTextVal(val)
    setGuaList(genDom(guaTypeVal, val))
  }

  const toggleLuoshu = val => {
    if (val) {
      setLuoshuVal(loushuDom)
    } else {
      setLuoshuVal(null)
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }

  return (
    <div style={{ margin: '50px 25px' }}>
      <Form {...layout} name="basic">
        <Form.Item label="卦"> {actionList0} </Form.Item>
        <Form.Item label="象征"> {actionList1} </Form.Item>
        <Form.Item label="洛书">
          <Switch defaultChecked={false} onChange={val => toggleLuoshu(val)} />
        </Form.Item>
      </Form>
      <div style={{ margin: '25px auto', width: '90%', maxWidth: '1000px' }}>
        <svg
          viewBox={[0, 0, w, w].join(' ')}
          xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(.9 .9) translate(5,5)">
            {guaList}
            {luoshuVal}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Yi

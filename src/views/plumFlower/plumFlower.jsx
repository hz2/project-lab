import React, { useState } from 'react'
import { Radio, Form } from 'antd'
import guaJson from './guaText'
import HeluoComp from './heluo'

const w = 1000
const half = w / 2
const subtense = Math.tan((22.5 * Math.PI) / 180) * half
const p1 = half - subtense
const p2 = half + subtense

// const r = Math.sqrt(Math.pow((2 / 6) * w, 2) / 2)

const listOrig = [
  {
    id: 'ss',
    zh: '正南',
    d: ['M', half, half, p1, 0, p2, 0, 'z']
  },
  {
    id: 'sw',
    zh: '西南',
    d: ['M', half, half, p2, 0, w, p1, 'z']
  },
  {
    id: 'ww',
    zh: '正西',
    d: ['M', half, half, w, p1, w, p2, 'z']
  },
  {
    id: 'nw',
    zh: '西北',
    d: ['M', half, half, w, p2, p2, w, 'z']
  },

  {
    id: 'nn',
    zh: '正北',
    d: ['M', half, half, p2, w, p1, w, 'z']
  },
  {
    id: 'ne',
    zh: '东北',
    d: ['M', half, half, p1, w, 0, p2, 'z']
  },
  {
    id: 'ee',
    zh: '正东',
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
          color="#fff"
          fontSize={w / 15}
          x={half}
          y={half * 0.15}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${i * 45},${half},${half})`}>
          <tspan>{x.text}</tspan>
        </text>
        <text
          color="#fff"
          fontSize={w / 17}
          x={half}
          y={half * 0.35}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${i * 45},${half},${half})`}>
          <tspan>{x[textkey]}</tspan>
        </text>
      </g>
    ))
  }

  const [guaList, setGuaList] = useState(genDom())
  // const [luoshuVal, setLuoshuVal] = useState(null)
  const [guaTypeVal, setGuaTypeVal] = useState('houtian')
  const [guaTextVal, setGuaTextVal] = useState('trigrams')

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
      defaultValue="trigrams"
      buttonStyle="solid"
      onChange={({ target: { value } }) => guaTextFn(value)}>
      <Radio.Button value="trigrams">卦</Radio.Button>
      <Radio.Button value="t2">自然</Radio.Button>
      <Radio.Button value="t13">节气</Radio.Button>
      <Radio.Button value="t14">四季</Radio.Button>
      <Radio.Button value="zh">方道</Radio.Button>
      <Radio.Button value="t8">五行</Radio.Button>
      <Radio.Button value="t15">五音</Radio.Button>
      <Radio.Button value="t16">五味</Radio.Button>
      <Radio.Button value="t17">五色</Radio.Button>
      <Radio.Button value="t12">器官</Radio.Button>
      <Radio.Button value="t11">天干</Radio.Button>
      <Radio.Button value="t10">生肖</Radio.Button>
      <Radio.Button value="t9">地支</Radio.Button>
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

  const [heluoTab, setheluoTab] = useState('fish')

  const actionList2 = (
    <Radio.Group
      defaultValue="fish"
      buttonStyle="solid"
      onChange={({ target: { value } }) => setheluoTab(value)}>
      {/* <Radio.Button value="wuji">无极</Radio.Button> */}
      <Radio.Button value="fish">太极</Radio.Button>
      {/* <Radio.Button value="huangji">皇极</Radio.Button> */}
      <Radio.Button value="hetu">河图</Radio.Button>
      <Radio.Button value="hetup">河图</Radio.Button>
      <Radio.Button value="hetup2">万氏河图</Radio.Button>
      <Radio.Button value="luoshu">洛书</Radio.Button>
      <Radio.Button value="luoshup">洛书</Radio.Button>
      <Radio.Button value="taijiorig">原始太极</Radio.Button>
      <Radio.Button value="taijihetu">太极河图</Radio.Button>
    </Radio.Group>
  )

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }

  return (
    <div style={{ margin: '50px 25px' }}>
      <Form {...layout} name="basic">
        <Form.Item label="卦"> {actionList0} </Form.Item>
        <Form.Item label="象征"> {actionList1} </Form.Item>
        <Form.Item label="河洛"> {actionList2} </Form.Item>
      </Form>
      <div style={{ margin: '25px auto', width: '90%', maxWidth: '1000px' }}>
        <svg
          viewBox={[0, 0, w, w].join(' ')}
          xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(.9 .9) translate(5,5)">
            <g id="guagraph">{guaList}</g>
            <HeluoComp w={w} tabVal={heluoTab} />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Yi

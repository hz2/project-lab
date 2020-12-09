import React from 'react'

const w = 100
const half = w / 2
const subtense = Math.tan((22.5 * Math.PI) / 180) * half
const p1 = half - subtense
const p2 = half + subtense

const obj = {
  qian: {
    trigrams: '☰',
    text: '乾',
    t2: '天',
    t3: '父',
    color: '#00abff'
  },
  dui: {
    trigrams: '☱',
    text: '兑',
    t2: '泽',
    t3: '少女',
    color: '#d0d0d0'
  },
  li: {
    trigrams: '☲',
    text: '离',
    t2: '火',
    t3: '中女',
    color: '#d90505'
  },
  zhen: {
    trigrams: '☳',
    text: '震',
    t2: '雷',
    t3: '长男',
    color: '#00f0a1'
  },
  xun: {
    trigrams: '☴',
    text: '巽',
    t2: '风',
    t3: '长女',
    color: '#00b076'
  },
  kan: {
    trigrams: '☵',
    text: '坎',
    t2: '水',
    t3: '中男',
    color: '#5b5b5b'
  },
  gen: {
    trigrams: '☶',
    text: '艮',
    t2: '山',
    t3: '少男',
    color: '#e3aa00'
  },
  kun: {
    trigrams: '☷',
    text: '坤',
    t2: '地',
    t3: '母',
    color: '#fdcd3c'
  }
}

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

const hetu = [
  [0, 0, 7, 0, 0],
  [0, 0, 2, 0, 0],
  [8, 3, 5.1, 4, 9],
  [0, 0, 1, 0, 0],
  [0, 0, 6, 0, 0]
]

// 文王后天
const houtian = ['li', 'kun', 'dui', 'qian', 'kan', 'gen', 'zhen', 'xun']
// 伏羲先天
const xiantian = ['qian', 'xun', 'kan', 'gen', 'kun', 'zhen', 'li', 'dui']
const list = listOrig.map((x, i) => Object.assign(x, obj[houtian[i]]))
const bagua = (
  <svg
    width="800"
    height="800"
    viewBox={[0, 0, w, w].join(' ')}
    xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(.9 .9) translate(5,5)">
      {list.map((x, i) => (
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
            <tspan>{x.text}</tspan>
            {/* <tspan>{x.trigrams}</tspan> */}
            <tspan>{x.t3}</tspan>
          </text>
        </g>
      ))}

      <g id="luoshu">
        {luoshu.map((x, i) => (
          <g key={i}>
            <circle
              cx={x.pos[0]}
              cy={x.pos[1]}
              r="5"
              fill="#ff89ff"
              stroke="#9999"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
            />
            <text
              color="#fff"
              fontSize="5.5"
              transform="translate(0,.5)"
              x={x.pos[0]}
              y={x.pos[1]}
              textAnchor="middle"
              dominantBaseline="middle">
              <tspan>{x.num}</tspan>
            </text>
          </g>
        ))}
      </g>
    </g>
  </svg>
)

const Yi = () => (
  <div>
    <h1>Yi</h1>
    <div style={{ margin: '25px' }}>{bagua}</div>
  </div>
)

export default Yi

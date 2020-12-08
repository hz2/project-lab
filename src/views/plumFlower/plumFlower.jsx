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
    color: '#ff6c00'
  },
  dui: {
    trigrams: '☱',
    text: '兑',
    color: '#d0d0d0'
  },
  li: {
    trigrams: '☲',
    text: '離',
    color: '#d90505'
  },
  zhen: {
    trigrams: '☳',
    text: '震',
    color: '#00f0a1'
  },
  xun: {
    trigrams: '☴',
    text: '巽',
    color: '#00b076'
  },
  kan: {
    trigrams: '☵',
    text: '坎',
    color: '#5b5b5b'
  },
  gen: {
    trigrams: '☶',
    text: '艮',
    color: '#e3aa00'
  },
  kun: {
    trigrams: '☷',
    text: '坤',
    color: '#fdcd3c'
  }
}

const r = Math.sqrt(Math.pow((2 / 6) * w, 2) / 2)

const listOrig = [
  {
    id: 'nn',
    d: ['M', half, half, p1, 0, p2, 0, 'z'],
    pos: [half, (1 / 6) * w]
  },
  {
    id: 'ne',
    d: ['M', half, half, p2, 0, w, p1, 'z'],
    pos: [(1 / 2) * w + r, (1 / 2) * w - r]
  },
  {
    id: 'ee',
    d: ['M', half, half, w, p1, w, p2, 'z'],
    pos: [(5 / 6) * w, (1 / 2) * w]
  },
  {
    id: 'se',
    d: ['M', half, half, w, p2, p2, w, 'z'],
    pos: [(1 / 2) * w + r, (1 / 2) * w + r]
  },

  {
    id: 'ss',
    d: ['M', half, half, p2, w, p1, w, 'z'],
    pos: [half, (5 / 6) * w]
  },
  {
    id: 'sw',
    d: ['M', half, half, p1, w, 0, p2, 'z'],
    pos: [(1 / 2) * w - r, (1 / 2) * w + r]
  },
  {
    id: 'ww',
    d: ['M', half, half, 0, p2, 0, p1, 'z'],
    pos: [(1 / 6) * w, (1 / 2) * w]
  },
  {
    id: 'nw',
    d: ['M', half, half, 0, p1, p1, 0, 'z'],
    pos: [(1 / 2) * w - r, (1 / 2) * w - r]
  }
]

const houtian = ['li', 'kun', 'dui', 'qian', 'kan', 'gen', 'zhen', 'xun']
const list = listOrig.map((x, i) => Object.assign(x, obj[houtian[i]]))
const bagua = (
  <svg
    width="800"
    height="800"
    viewBox={[0, 0, w, w].join(' ')}
    xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(.9 .9) translate(5,5)">
      {list.map(x => (
        <g>
          <path
            id={x.id}
            d={x.d.join(' ')}
            fill={x.color}
            stroke="#bbb"
            stroke-width="1.5px"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <text
            color="#fff"
            font-size="8px"
            x={x.pos[0]}
            y={x.pos[1]}
            text-anchor="middle"
            dominant-baseline="middle">
            <tspan>{x.text}</tspan>
            <tspan>{x.trigrams}</tspan>
          </text>
        </g>
      ))}
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

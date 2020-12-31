import React from 'react'
const genPos = (half, r, type) => {
  let posArr = []
  if (type === 'wuxing') {
    posArr = [
      [half + r * 2, half],
      [half, half + r * 2],
      [half - r * 2, half],
      [half, half - r * 2],
      [half, half]
    ]
  } else {
    posArr = [
      [half + r * 2, half],
      [half, half + r * 2],
      [half - r * 2, half],
      [half, half - r * 2],
      [half, half]
    ]
  }
  const wxlist = [
    {
      num: '金',
      color: '#dbdbdb'
    },
    {
      num: '水',
      color: '#4b4b4b'
    },
    {
      num: '木',
      color: '#00f0a1'
    },
    {
      num: '火',
      color: '#d90505'
    },
    {
      num: '土',
      color: '#fdcd3c'
    }
  ]

  return wxlist.map((x, i) => ({ pos: posArr[i], ...x }))
}

const Wuxing = props => {
  const { half, r, type } = props
  const w = 2 * half
  const list = genPos(half, r, type)
  return (
    <g id="wuxing">
      {list.map((x, i) => (
        <g key={i}>
          <circle
            cx={x.pos[0]}
            cy={x.pos[1]}
            r={r / 2}
            fill={x.color}
            stroke="#fff"
            strokeWidth={w / 300}
          />
          <text
            color="#fff"
            fontSize={w / 25}
            transform={`translate(0,${r / 6})`}
            x={x.pos[0]}
            y={x.pos[1]}
            textAnchor="middle">
            <tspan>{x.num}</tspan>
          </text>
        </g>
      ))}
    </g>
  )
}

export default Wuxing

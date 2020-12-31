import React from 'react'
const genPos = (half, r, type) => {
  const base = [
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
  const sameObj = {
    pos: [half, half - r * 2],
    textTransform: `translate(0,${r / 6})`,
    textPos: [half, half]
  }
  let posArr = []
  const sinTheta = th => Math.sin((th * Math.PI) / 180)
  const cosTheta = th => Math.cos((th * Math.PI) / 180)

  if (type === 'wuxing') {
    posArr = [
      {
        transform: `rotate(${2 * 72 - 18},${half},${half})`,
        textTransform: `translate(${cosTheta(36) * r * 2},${sinTheta(36) *
          r *
          2 +
          r / 6})`
      },
      {
        transform: `rotate(${3 * 72 - 18},${half},${half})`,
        textTransform: `translate(${cosTheta(72) * r * 2 * -1},${sinTheta(72) *
          r *
          2 +
          r / 6})`
      },
      {
        transform: `rotate(${4 * 72 - 18},${half},${half})`,
        textTransform: `translate(${-r * 2},${r / 6})`
      },
      {
        transform: `rotate(${0 - 18},${half},${half})`,
        textTransform: `translate(${cosTheta(72) * r * 2 * -1},${sinTheta(72) *
          r *
          2 *
          -1 +
          r / 6})`
      },
      {
        transform: `rotate(${72 - 18},${half},${half})`,
        textTransform: `translate(${cosTheta(36) * r * 2},${sinTheta(36) *
          r *
          2 *
          -1 +
          r / 6})`
      }
    ]
  } else {
    posArr = [
      {
        pos: [half + r * 2, half],
        textPos: [half + r * 2, half]
      },
      {
        pos: [half, half + r * 2],
        textPos: [half, half + r * 2]
      },
      {
        pos: [half - r * 2, half],
        textPos: [half - r * 2, half]
      },
      {
        pos: [half, half - r * 2],
        textPos: [half, half - r * 2]
      },
      {
        pos: [half, half],
        textPos: [half, half]
      }
    ]
  }

  return posArr.map((x, i) => Object.assign({}, sameObj, base[i], x))
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
            transform={x.transform}
            r={r / 2}
            fill={x.color}
            stroke="#fff"
            strokeWidth={w / 300}
          />
          <text
            color="#fff"
            fontSize={w / 25}
            transform={x.textTransform}
            x={x.textPos[0]}
            y={x.textPos[1]}
            textAnchor="middle">
            <tspan>{x.num}</tspan>
          </text>
        </g>
      ))}
    </g>
  )
}

export default Wuxing

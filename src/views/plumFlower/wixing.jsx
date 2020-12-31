import React from 'react'
const sinTheta = th => Math.sin((th * Math.PI) / 180)
const cosTheta = th => Math.cos((th * Math.PI) / 180)
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
  let posArr = []

  if (type === 'wuxing') {
    posArr = [
      {
        pos: [half + cosTheta(36) * r * 2, half + sinTheta(36) * r * 2]
      },
      {
        pos: [half - cosTheta(72) * r * 2, half + sinTheta(72) * r * 2]
      },
      {
        pos: [half - r * 2, half]
      },
      {
        pos: [half - cosTheta(72) * r * 2, half - sinTheta(72) * r * 2]
      },
      {
        pos: [half + cosTheta(36) * r * 2, half - sinTheta(36) * r * 2]
      }
    ]
  } else {
    posArr = [
      {
        pos: [half + r * 2, half]
      },
      {
        pos: [half, half + r * 2]
      },
      {
        pos: [half - r * 2, half]
      },
      {
        pos: [half, half - r * 2]
      },
      {
        pos: [half, half]
      }
    ]
  }

  return posArr.map((x, i) => Object.assign({}, base[i], x))
}

const arrowSheng = (half, r, i) => (
  <>
    <path
      d={[
        'M',
        half + cosTheta(36) * r * 2,
        half - sinTheta(36) * r * 2 + r * 0.6,
        half + cosTheta(36) * r * 2,
        half + sinTheta(36) * r * 2 - r * 0.6,
        half + cosTheta(36) * r * 2 - r / 6,
        half + sinTheta(36) * r * 2 - r * 0.8,
        half + cosTheta(36) * r * 2,
        half + sinTheta(36) * r * 2 - r * 0.6,
        half + cosTheta(36) * r * 2 + r / 6,
        half + sinTheta(36) * r * 2 - r * 0.8
      ].join(' ')}
      transform={`rotate(${i * 72},${half},${half})`}
      fill="none"
      stroke="green"
      strokeWidth={half / 90}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      color="green"
      fontSize={half / 15}
      fontWeight="bold"
      x={half + cosTheta(36) * r * 2.5}
      y={half}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(${i * 72},${half},${half})`}>
      <tspan>生</tspan>
    </text>
  </>
)

const arrowKe = (half, r, i) => {
  const arrowKeTheta = (Math.atan(5 / 6) * 180) / Math.PI
  const arrowKeLineC = Math.sqrt(Math.pow(r / 6, 2) + Math.pow(r / 5, 2))
  return (
    <>
      <path
        d={[
          'M',
          half - r * 2 + cosTheta(18) * 0.6 * r,
          half - sinTheta(18) * 0.6 * r,
          half + cosTheta(36) * r * 2 - cosTheta(18) * 0.6 * r,
          half - sinTheta(36) * r * 2 + sinTheta(18) * 0.6 * r,
          // 箭头点
          half +
            cosTheta(36) * r * 2 -
            cosTheta(18) * 0.6 * r -
            sinTheta(72 - arrowKeTheta) * arrowKeLineC,
          half -
            sinTheta(36) * r * 2 +
            sinTheta(18) * 0.6 * r +
            cosTheta(72 - arrowKeTheta) * arrowKeLineC,
          // 端点
          half + cosTheta(36) * r * 2 - cosTheta(18) * 0.6 * r,
          half - sinTheta(36) * r * 2 + sinTheta(18) * 0.6 * r,
          // 箭头点
          half +
            cosTheta(36) * r * 2 -
            cosTheta(18) * 0.6 * r -
            sinTheta(108 - arrowKeTheta) * arrowKeLineC,
          half -
            sinTheta(36) * r * 2 +
            sinTheta(18) * 0.6 * r -
            cosTheta(108 - arrowKeTheta) * arrowKeLineC
        ].join(' ')}
        transform={`rotate(${i * 72},${half},${half})`}
        fill="none"
        stroke="red"
        strokeWidth={half / 90}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
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
            transform={`translate(0,${r / 6})`}
            x={x.pos[0]}
            y={x.pos[1]}
            textAnchor="middle">
            <tspan>{x.num}</tspan>
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map(x => (
        <g>
          {arrowSheng(half, r, x)}
          {arrowKe(half, r, x)}

          <text
            color="red"
            fontSize={half / 12}
            fontWeight="bold"
            x={half}
            y={half}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`translate(0,${r / 6})`}>
            <tspan>克</tspan>
          </text>
        </g>
      ))}
    </g>
  )
}

export default Wuxing

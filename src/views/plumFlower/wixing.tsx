import React from 'react'
const sinTheta = (th: number) => Math.sin((th * Math.PI) / 180)
const cosTheta = (th: number) => Math.cos((th * Math.PI) / 180)
const arrowTheta = (Math.atan(5 / 6) * 180) / Math.PI
const arrowLineC = (r: number) => Math.sqrt(Math.pow(r / 6, 2) + Math.pow(r / 5, 2))
const shengColor = 'green'
const keColor = 'white'
const genPos = (half: number, r: number, type: string) => {
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

const arrowSheng = (half: number, r: number, i: number) => (
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
      stroke={shengColor}
      strokeWidth={half / 100}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      fill={shengColor}
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

const Sheng1 = (half: number, r: number) => {
  const arrow = [
    'M',
    half + 2 * r - cosTheta(45) * r * 0.6,
    half + cosTheta(45) * r * 0.6,
    half + cosTheta(45) * r * 0.6,
    half + 2 * r - cosTheta(45) * r * 0.6,
    half + cosTheta(45) * r * 0.6 + sinTheta(45 - arrowTheta) * arrowLineC(r),
    half +
    2 * r -
    cosTheta(45) * r * 0.6 -
    cosTheta(45 - arrowTheta) * arrowLineC(r),
    half + cosTheta(45) * r * 0.6,
    half + 2 * r - cosTheta(45) * r * 0.6,
    half + cosTheta(45) * r * 0.6 + cosTheta(45 - arrowTheta) * arrowLineC(r),
    half +
    2 * r -
    cosTheta(45) * r * 0.6 -
    sinTheta(45 - arrowTheta) * arrowLineC(r)
  ]
  const arr = [
    [
      'M',
      half,
      half - r * 1.4,
      half,
      half - r * 0.6,
      half - r / 6,
      half - r * 0.8,
      half,
      half - r * 0.6,
      half + r / 6,
      half - r * 0.8
    ],
    [
      'M',
      half + r * 0.6,
      half,
      half + r * 1.4,
      half,
      half + r * 1.2,
      half - r / 6,
      half + r * 1.4,
      half,
      half + r * 1.2,
      half + r / 6
    ],
    arrow,
    arrow,
    arrow
  ]

  return arr.map((x, i) => (
    <g key={i}>
      <path
        d={x.join(' ')}
        transform={i > 2 ? `rotate(${90 * (i + 2)},${half},${half})` : ''}
        fill="none"
        stroke={shengColor}
        strokeWidth={half / 100}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ))
}

const Ke1 = (half: number, r: number) => {
  const arrow = [
    'M',
    half + cosTheta(45) * r * 0.6,
    half - 2 * r + cosTheta(45) * r * 0.6,
    half + 2 * r - cosTheta(45) * r * 0.6,
    half - cosTheta(45) * r * 0.6,
    half +
    2 * r -
    cosTheta(45) * r * 0.6 -
    cosTheta(45 - arrowTheta) * arrowLineC(r),
    half - cosTheta(45) * r * 0.6 - sinTheta(45 - arrowTheta) * arrowLineC(r),
    half + 2 * r - cosTheta(45) * r * 0.6,
    half - cosTheta(45) * r * 0.6,
    half +
    2 * r -
    cosTheta(45) * r * 0.6 -
    sinTheta(45 - arrowTheta) * arrowLineC(r),
    half - cosTheta(45) * r * 0.6 - cosTheta(45 - arrowTheta) * arrowLineC(r)
  ]
  const arr = [
    arrow,
    // jin mu
    [
      'M',
      half + r * 1.4,
      half - r / 6,
      half - r * 1.4,
      half - r / 6,
      half - r * 1.2,
      half - r / 3,
      half - r * 1.4,
      half - r / 6,
      half - r * 1.2,
      half
    ],
    [
      'M',
      half - r * 1.4,
      half,
      half - r * 0.6,
      half,
      half - r * 0.8,
      half - r / 6,
      half - r * 0.6,
      half,
      half - r * 0.8,
      half + r / 6
    ],
    [
      'M',
      half,
      half + r * 0.6,
      half,
      half + r * 1.4,
      half - r / 6,
      half + r * 1.2,
      half,
      half + r * 1.4,
      half + r / 6,
      half + r * 1.2
    ],
    // shui huo
    [
      'M',
      half + r / 6,
      half + r * 1.4,
      half + r / 6,
      half - r * 1.4,
      half,
      half - r * 1.2,
      half + r / 6,
      half - r * 1.4,
      half + r / 3,
      half - r * 1.2
    ]
  ]

  return arr.map((x, i) => (
    <g key={i}>
      <path
        d={x.join(' ')}
        transform={i > 2 ? `rotate(${0},${half},${half})` : ''}
        fill="none"
        stroke={keColor}
        strokeWidth={half / 100}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ))
}

const arrowKe = (half: number, r: number, i: number) => {
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
          sinTheta(72 - arrowTheta) * arrowLineC(r),
          half -
          sinTheta(36) * r * 2 +
          sinTheta(18) * 0.6 * r +
          cosTheta(72 - arrowTheta) * arrowLineC(r),
          // 端点
          half + cosTheta(36) * r * 2 - cosTheta(18) * 0.6 * r,
          half - sinTheta(36) * r * 2 + sinTheta(18) * 0.6 * r,
          // 箭头点
          half +
          cosTheta(36) * r * 2 -
          cosTheta(18) * 0.6 * r -
          sinTheta(108 - arrowTheta) * arrowLineC(r),
          half -
          sinTheta(36) * r * 2 +
          sinTheta(18) * 0.6 * r -
          cosTheta(108 - arrowTheta) * arrowLineC(r)
        ].join(' ')}
        transform={`rotate(${i * 72},${half},${half})`}
        fill="none"
        stroke={keColor}
        strokeWidth={half / 100}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

const ShengKe = (half: number, r: number) =>
  [0, 1, 2, 3, 4].map(x => (
    <g key={x}>
      {arrowSheng(half, r, x)}
      {arrowKe(half, r, x)}
      <text
        fill={keColor}
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
  ))

export type WuXingType = 'wuxing' | 'wuxing1' | 'wuxing2' | 'wuxing0'
const Wuxing = (props: { half: number; r: number; type: WuXingType }) => {
  const { half, r, type } = props
  const w = 2 * half
  const list = genPos(half, r, type)
  let arrow = null

  switch (type) {
    case 'wuxing':
      arrow = ShengKe(half, r)
      break;
    case 'wuxing1':
      arrow = Sheng1(half, r)
      break;
    case 'wuxing2':
      arrow = Ke1(half, r)
      break;
    case 'wuxing0':
      arrow = <>
        {Sheng1(half, r)}
        {Ke1(half, r)}
      </>
      break;

    default:
      break;
  }

  return (
    <g id="wuxing">
      {list.map((x, i) => (
        <g key={i}>
          <circle
            cx={x.pos[0]}
            cy={x.pos[1]}
            // transform={x.transform}
            r={r / 2}
            fill={x.color}
            stroke="#fff"
            strokeWidth={w / 300}
          />
          <text
            fill="#fff"
            fontSize={w / 25}
            transform={`translate(0,${r / 6})`}
            x={x.pos[0]}
            y={x.pos[1]}
            textAnchor="middle">
            <tspan>{x.num}</tspan>
          </text>
        </g>
      ))}
      {arrow}
    </g>
  )
}

export default Wuxing

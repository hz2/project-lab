import React, { useState, useEffect } from 'react'
const HeluoComp = props => {
  const { w, tabVal } = props
  const half = w / 2

  const r2 = Math.sqrt(Math.pow((1 / 8) * w, 2) / 2)
  const r3 = Math.sqrt(Math.pow((1 / 28) * w, 2) / 2)

  // [
  //   [4, 9, 2],
  //   [3, 5, 7],
  //   [8, 1, 6]
  // ]
  const luoshu = [
    {
      pos: [half, half],
      num: '五',
      color: '#d8c518'
    },
    {
      pos: [half, half - r2],
      num: '九',
      color: '#b118d8'
    },
    {
      pos: [half + r2, half - r2],
      num: '二',
      color: '#181818'
    },
    {
      pos: [half + r2, half],
      num: '七',
      color: '#d85118'
    },
    {
      pos: [half + r2, half + r2],
      num: '六',
      color: '#c8c8c8'
    },
    {
      pos: [half, half + r2],
      num: '一',
      color: '#c8c8c8'
    },
    {
      pos: [half - r2, half + r2],
      num: '八',
      color: '#c8c8c8'
    },
    {
      pos: [half - r2, half],
      num: '三',
      color: '#78d818'
    },
    {
      pos: [half - r2, half - r2],
      num: '四',
      color: '#18d89e'
    }
  ]

  // const hetu = [
  //   [0, 0, 7, 0, 0],
  //   [0, 0, 2, 0, 0],
  //   [8, 3, 5.1, 4, 9],
  //   [0, 0, 1, 0, 0],
  //   [0, 0, 6, 0, 0]
  // ]

  const hetu = [
    {
      pos: [half, half],
      num: '五十',
      color: '#fdcd3c'
    },
    {
      pos: [half, half - r2],
      num: '二',
      color: '#d90505'
    },
    {
      pos: [half, half - r2 * 2],
      num: '七',
      color: '#d90505'
    },
    {
      pos: [half + r2, half],
      num: '四',
      color: '#c8c8c8'
    },
    {
      pos: [half + r2 * 2, half],
      num: '九',
      color: '#c8c8c8'
    },
    {
      pos: [half, half + r2],
      num: '一',
      color: '#5b5b5b'
    },
    {
      pos: [half, half + r2 * 2],
      num: '六',
      color: '#5b5b5b'
    },
    {
      pos: [half - r2, half],
      num: '三',
      color: '#00f0a1'
    },
    {
      pos: [half - r2 * 2, half],
      num: '八',
      color: '#00f0a1'
    }
  ]

  const hetup = [
    {
      num: '五',
      color: 'white',
      points: [
        [half, half],
        [half - r3, half],
        [half, half - r3],
        [half + r3, half],
        [half, half + r3]
      ],
      lines: [
        [half - r3, half, half + r3, half],
        [half, half - r3, half, half + r3]
      ]
    },
    {
      num: '十',
      color: 'black',
      points: [
        [half - r3 * 2, half - r3 * 2],
        [half - r3 * 1, half - r3 * 2],
        [half - r3 * 0, half - r3 * 2],
        [half + r3 * 1, half - r3 * 2],
        [half + r3 * 2, half - r3 * 2],
        [half - r3 * 2, half + r3 * 2],
        [half - r3 * 1, half + r3 * 2],
        [half - r3 * 0, half + r3 * 2],
        [half + r3 * 1, half + r3 * 2],
        [half + r3 * 2, half + r3 * 2]
      ],
      lines: [
        [
          half - r3 * 2,
          half - r3 * 2,
          half + r3 * 2,
          half - r3 * 2,
          half + r3 * 2,
          half + r3 * 2,
          half - r3 * 2,
          half + r3 * 2
        ]
      ]
    },
    {
      num: '二',
      color: 'black',
      points: [
        [half - r3 * 0.5, half - r3 * 4],
        [half + r3 * 0.5, half - r3 * 4]
      ],
      lines: [[half - r3 * 0.5, half - r3 * 4, half + r3 * 0.5, half - r3 * 4]]
    },
    {
      num: '七',
      color: 'white',
      points: [
        [half - r3 * 3, half - r3 * 6],
        [half - r3 * 2, half - r3 * 6],
        [half - r3, half - r3 * 6],
        [half, half - r3 * 6],
        [half + r3, half - r3 * 6],
        [half + r3 * 2, half - r3 * 6],
        [half + r3 * 3, half - r3 * 6]
      ],
      lines: [[half - r3 * 3, half - r3 * 6, half + r3 * 3, half - r3 * 6]]
    },
    {
      num: '四',
      color: 'black',
      points: [
        [half + r3 * 4, half - r3 * 1.5],
        [half + r3 * 4, half - r3 * 0.5],
        [half + r3 * 4, half + r3 * 0.5],
        [half + r3 * 4, half + r3 * 1.5]
      ],
      lines: [[half + r3 * 4, half - r3 * 1.5, half + r3 * 4, half + r3 * 1.5]]
    },
    {
      num: '九',
      color: 'white',
      points: [
        [half + r3 * 6, half - r3 * 4],
        [half + r3 * 6, half - r3 * 3],
        [half + r3 * 6, half - r3 * 2],
        [half + r3 * 6, half - r3],
        [half + r3 * 6, half],
        [half + r3 * 6, half + r3],
        [half + r3 * 6, half + r3 * 2],
        [half + r3 * 6, half + r3 * 3],
        [half + r3 * 6, half + r3 * 4]
      ],
      lines: [[half + r3 * 6, half - r3 * 4, half + r3 * 6, half + r3 * 4]]
    },
    {
      num: '一',
      color: 'white',
      points: [[half, half + r3 * 4]],
      lines: []
    },
    {
      num: '六',
      color: 'black',
      points: [
        [half - r3 * 2.5, half + r3 * 6],
        [half - r3 * 1.5, half + r3 * 6],
        [half - r3 * 0.5, half + r3 * 6],
        [half + r3 * 0.5, half + r3 * 6],
        [half + r3 * 1.5, half + r3 * 6],
        [half + r3 * 2.5, half + r3 * 6]
      ],
      lines: [[half - r3 * 2.5, half + r3 * 6, half + r3 * 2.5, half + r3 * 6]]
    },
    {
      num: '三',
      color: 'white',
      points: [
        [half - r3 * 4, half - r3],
        [half - r3 * 4, half],
        [half - r3 * 4, half + r3]
      ],
      lines: [[half - r3 * 4, half - r3, half - r3 * 4, half + r3]]
    },
    {
      num: '八',
      color: 'black',
      points: [
        [half - r3 * 6, half - r3 * 3.5],
        [half - r3 * 6, half - r3 * 2.5],
        [half - r3 * 6, half - r3 * 1.5],
        [half - r3 * 6, half - r3 * 0.5],
        [half - r3 * 6, half + r3 * 0.5],
        [half - r3 * 6, half + r3 * 1.5],
        [half - r3 * 6, half + r3 * 2.5],
        [half - r3 * 6, half + r3 * 3.5]
      ],
      lines: [[half - r3 * 6, half - r3 * 3.5, half - r3 * 6, half + r3 * 3.5]]
    }
  ]

  const hetup2 = hetup
    .map(({ lines, ...y }) =>
      ['五', '十'].includes(y.num) ? { lines, ...y } : y
    )
    .concat([
      {
        num: '',
        color: 'black',
        points: [],
        lines: [
          [
            half - r3 * 6,
            half - r3 * 4,
            half - r3 * 6,
            half + r3 * 6,
            half + r3 * 4,
            half + r3 * 6,
            half + r3 * 4,
            half - r3 * 4
          ]
        ]
      },
      {
        num: '',
        color: 'white',
        points: [],
        lines: [
          [
            half + r3 * 6,
            half + r3 * 4,
            half + r3 * 6,
            half - r3 * 6,
            half - r3 * 4,
            half - r3 * 6,
            half - r3 * 4,
            half + r3 * 4
          ]
        ]
      }
    ])

  const luoshup = [
    {
      num: '五',
      color: 'white',
      points: [
        [half, half],
        [half - r3, half],
        [half, half - r3],
        [half + r3, half],
        [half, half + r3]
      ],
      lines: [
        [half - r3, half, half + r3, half],
        [half, half - r3, half, half + r3]
      ]
    },
    {
      num: '二',
      color: 'black',
      points: [
        [half + r3 * 6.5, half - r3 * 6.5],
        [half + r3 * 5.5, half - r3 * 5.5]
      ],
      lines: [
        [half + r3 * 6.5, half - r3 * 6.5, half + r3 * 5.5, half - r3 * 5.5]
      ]
    },
    {
      num: '九',
      color: 'white',
      points: [
        [half - r3 * 4, half - r3 * 7],
        [half - r3 * 3, half - r3 * 7],
        [half - r3 * 2, half - r3 * 7],
        [half - r3 * 1, half - r3 * 7],
        [half, half - r3 * 7],
        [half + r3 * 1, half - r3 * 7],
        [half + r3 * 2, half - r3 * 7],
        [half + r3 * 3, half - r3 * 7],
        [half + r3 * 4, half - r3 * 7]
      ],
      lines: [[half - r3 * 4, half - r3 * 7, half + r3 * 4, half - r3 * 7]]
    },
    {
      num: '四',
      color: 'black',
      points: [
        [half - r3 * 6, half - r3 * 7],
        [half - r3 * 7, half - r3 * 6],
        [half - r3 * 5, half - r3 * 6],
        [half - r3 * 6, half - r3 * 5]
      ],
      lines: [
        [
          half - r3 * 6,
          half - r3 * 7,
          half - r3 * 7,
          half - r3 * 6,
          half - r3 * 6,
          half - r3 * 5,
          half - r3 * 5,
          half - r3 * 6
        ]
      ]
    },
    {
      num: '三',
      color: 'white',
      points: [
        [half - r3 * 7, half - r3],
        [half - r3 * 7, half],
        [half - r3 * 7, half + r3]
      ],
      lines: [[half - r3 * 7, half - r3, half - r3 * 7, half + r3]]
    },
    {
      num: '七',
      color: 'white',
      points: [
        [half + r3 * 7, half - r3 * 3],
        [half + r3 * 7, half - r3 * 2],
        [half + r3 * 7, half - r3],
        [half + r3 * 7, half],
        [half + r3 * 7, half + r3],
        [half + r3 * 7, half + r3 * 2],
        [half + r3 * 7, half + r3 * 3]
      ],
      lines: [[half + r3 * 7, half - r3 * 3, half + r3 * 7, half + r3 * 3]]
    },
    {
      num: '一',
      color: 'white',
      points: [[half, half + r3 * 7]],
      lines: []
    },
    {
      num: '六',
      color: 'black',
      points: [
        [half + r3 * 6, half + r3 * 7],
        [half + r3 * 7, half + r3 * 6],
        [half + r3 * 5, half + r3 * 6],
        [half + r3 * 6, half + r3 * 5],
        [half + r3 * 5, half + r3 * 4],
        [half + r3 * 4, half + r3 * 5]
      ],
      lines: [
        [
          half + r3 * 6,
          half + r3 * 7,
          half + r3 * 7,
          half + r3 * 6,
          half + r3 * 5,
          half + r3 * 4,
          half + r3 * 4,
          half + r3 * 5
        ]
      ]
    },
    {
      num: '八',
      color: 'black',
      points: [
        [half - r3 * 6, half + r3 * 7],
        [half - r3 * 7, half + r3 * 6],
        [half - r3 * 5, half + r3 * 6],
        [half - r3 * 6, half + r3 * 5],
        [half - r3 * 5, half + r3 * 4],
        [half - r3 * 4, half + r3 * 5],
        [half - r3 * 4, half + r3 * 3],
        [half - r3 * 3, half + r3 * 4]
      ],
      lines: [
        [
          half - r3 * 6,
          half + r3 * 7,
          half - r3 * 7,
          half + r3 * 6,
          half - r3 * 4,
          half + r3 * 3,
          half - r3 * 3,
          half + r3 * 4
        ]
      ]
    }
  ]

  const [heluoVal, setHeluo] = useState(null)

  const fishR = 1.5 * r2
  const fishwhite = [
    'M',
    half,
    half,
    'A',
    fishR / 2,
    fishR / 2,
    0,
    1,
    0,
    half,
    half - fishR,
    'A',
    fishR,
    fishR,
    0,
    1,
    0,
    half,
    half + fishR,
    'A',
    fishR / 2,
    fishR / 2,
    0,
    1,
    1,
    half,
    half
  ]
  const fishblack = [
    'M',
    half,
    half,
    'A',
    fishR / 2,
    fishR / 2,
    0,
    1,
    0,
    half,
    half - fishR,
    'A',
    fishR,
    fishR,
    0,
    1,
    1,
    half,
    half + fishR,
    'A',
    fishR / 2,
    fishR / 2,
    0,
    1,
    1,
    half,
    half
  ]

  const heluoFn = val => {
    const list = {
      hetu,
      hetup2,
      luoshu,
      hetup,
      luoshup
    }

    let dom = null
    if ('fish' === val) {
      dom = (
        <g id="fish">
          <path fill="#fff" d={fishwhite.join(' ')} />
          <path fill="#000" d={fishblack.join(' ')} />
          <circle cx={half} cy={half - fishR / 2} fill="#000" r={fishR / 6} />
          <circle cx={half} cy={half + fishR / 2} fill="#fff" r={fishR / 6} />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${half} ${half}`}
            to={`360 ${half} ${half}`}
            dur="36s"
            repeatCount="indefinite"
          />
        </g>
      )
    } else if ('wuji' === val) {
      dom = (
        <g id="wuji">
          <circle cx={half} cy={half} fill="#fff" r={fishR} />
        </g>
      )
    } else if ('huangji' === val) {
      dom = (
        <g id="huangji">
          <path
            d="m632.5 500a132.5 132.5 0 0 0-132.5-132.5 132.5 132.5 0 0 0-132.5 132.5 132.5 132.5 0 0 0 132.5 132.5 132.5 132.5 0 0 0 132.5-132.5z"
            fill="#fff"
          />
          <path
            d="m500 632.5a66.43 66.25 0 0 1-57.44-99.38 66.43 66.25 0 0 0 35.64 29.39 22.14 22.08 0 0 0-0.3425 3.748 22.14 22.08 0 0 0 22.14 22.08 22.14 22.08 0 0 0 22.14-22.08 22.14 22.08 0 0 0-0.321-3.757 66.43 66.25 0 0 0 44.61-62.49 66.43 66.25 0 0 0-8.95-33.04 66.43 66.25 0 0 0-57.48-99.45 132.9 132.5 0 0 1 0 265z"
            fill="#000"
          />
          <path
            d="m521.8 562.5a66.43 66.25 0 0 1-21.82 3.757 66.43 66.25 0 0 1-21.8-3.748 22.14 22.08 0 0 1 21.8-18.34 22.14 22.08 0 0 1 21.82 18.33z"
            fill="#000"
          />
          <path
            d="m500 411.7c12.23 6.6e-4 22.14 9.888 22.14 22.08-8e-3 1.257-0.1229 2.51-0.3445 3.748-7.005-2.455-14.37-3.722-21.8-3.748-7.433 0.0255-14.81 1.295-21.82 3.755-0.2148-1.24-0.3228-2.497-0.3229-3.755-3.2e-4 -12.2 9.914-22.08 22.14-22.08z"
            fill="#000"
          />
          <path
            d="m557.5 467a66.43 66.25 0 0 1-57.49 33.05 66.43 66.25 0 0 0-57.44 33.12 66.43 66.25 0 0 1-8.986-33.12 66.43 66.25 0 0 1 44.61-62.49 22.14 22.08 0 0 0 21.82 18.33 22.14 22.08 0 0 0 21.8-18.33 66.43 66.25 0 0 1 35.69 29.45z"
            fill="#000"
          />
        </g>
      )
    } else if ('taijiorig' === val) {
      dom = (
        <g id="taijiorig">
          <path
            d="m554.8 404.5c11.24 14.28 20.62 30.68 21.15 51.47 0.4714 18.18-3.255 33.35-10.39 44.06-7.104 10.66-16.64 19.33-28.05 21.86-9.466 2.1-18.91 1.402-27.1-3.217-7.073-3.989-10.16-10.33-10.76-18.64s-3.692-14.66-10.76-18.64c-8.19-4.619-17.63-5.317-27.1-3.217-11.41 2.531-20.95 11.21-28.05 21.86-7.135 10.7-10.86 25.87-10.39 44.06 0.539 20.79 9.916 37.19 21.15 51.47 15.54 19.74 35.7 28.44 55.15 36.97-73.18-1e-5 -132.5-59.32-132.5-132.5s59.32-132.5 132.5-132.5c19.46 8.53 39.61 17.23 55.15 36.97z"
            fill="#fff"
          />
          <path
            d="m444.5 595.5c-11.24-14.28-20.61-30.68-21.15-51.47-0.4713-18.18 3.255-33.35 10.39-44.06 7.104-10.66 16.64-19.33 28.05-21.86 9.467-2.1 18.91-1.402 27.1 3.217 7.073 3.989 10.16 10.33 10.76 18.64 0.6069 8.315 3.692 14.66 10.76 18.64 8.19 4.619 17.63 5.317 27.1 3.217 11.41-2.531 20.95-11.21 28.05-21.86 7.135-10.7 10.86-25.87 10.39-44.06-0.5389-20.79-9.916-37.19-21.15-51.47-15.54-19.74-35.7-28.44-55.15-36.97 73.18 0 132.5 59.32 132.5 132.5 0 73.18-59.32 132.5-132.5 132.5-19.46-8.53-39.61-17.23-55.15-36.97z"
            fill="#000"
          />
        </g>
      )
    } else if ('taijihetu' === val) {
      dom = (
        <g id="taojihetu">
          <path
            d="m389.3 477.9c0 48.79 39.59 88.33 88.44 88.33 36.63 0 66.33-29.66 66.33-66.25 0-24.39-19.8-44.17-44.22-44.17s-44.22 19.77-44.22 44.17c0-36.59 29.7-66.25 66.33-66.25 48.84 0 88.44 39.55 88.44 88.33 0 60.98-49.49 110.4-110.5 110.4-73.26 0-132.7-59.32-132.7-132.5 0-73.18 59.39-132.5 132.7-132.5-61.05 0-110.5 49.44-110.5 110.4z"
            fill="#000"
          />
          <path
            d="m610.2 522.1c0-48.79-39.59-88.33-88.44-88.33-36.63 0-66.33 29.66-66.33 66.25 0 24.39 19.8 44.17 44.22 44.17s44.22-19.77 44.22-44.17c0 36.59-29.7 66.25-66.33 66.25-48.84 0-88.44-39.55-88.44-88.33 0-60.98 49.49-110.4 110.5-110.4 73.26 0 132.7 59.32 132.7 132.5s-59.39 132.5-132.7 132.5c61.05 0 110.5-49.44 110.5-110.4z"
            fill="#fff"
          />
        </g>
      )
    } else if (['hetu', 'luoshu'].includes(val)) {
      dom = (
        <g id="heluo">
          {list[val].map((x, i) => (
            <g key={i}>
              <rect
                x={x.pos[0]}
                y={x.pos[1]}
                height={r2}
                width={r2}
                transform={`translate(${-r2 / 2},${-r2 / 2})`}
                fill={x.color}
                stroke="#fff"
                strokeWidth={w / 300}
              />
              <text
                color="#fff"
                fontSize={w / 25}
                transform={`translate(0,${r2 / 6})`}
                x={x.pos[0]}
                y={x.pos[1]}
                textAnchor="middle">
                <tspan>{x.num}</tspan>
              </text>
            </g>
          ))}
        </g>
      )
    } else if (['hetup', 'luoshup', 'hetup2'].includes(val)) {
      dom = (
        <g id="heluop">
          {list[val].map((x, i) => (
            <g key={i} name={x.num}>
              {x.points.map((y, j) => (
                <circle
                  key={j}
                  cx={y[0]}
                  cy={y[1]}
                  r={w / 100}
                  fill={x.color}
                  stroke="#fff"
                  strokeWidth="0"
                />
              ))}
              {x.lines
                ? x.lines.map((y, j) => (
                    <path
                      key={j}
                      d={'M ' + y.join(' ') + ' Z'}
                      fill="none"
                      stroke={x.color}
                      strokeWidth={w / 300}
                    />
                  ))
                : null}
            </g>
          ))}
        </g>
      )
    }

    setHeluo(dom)
  }
  const reRender = () => heluoFn(tabVal)
  useEffect(reRender, [tabVal])

  return <>{heluoVal}</>
}
export default HeluoComp

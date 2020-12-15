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
      pos: [half, (1 / 2) * w - r2],
      num: '九',
      color: '#b118d8'
    },
    {
      pos: [(1 / 2) * w + r2, (1 / 2) * w - r2],
      num: '二',
      color: '#181818'
    },
    {
      pos: [(1 / 2) * w + r2, half],
      num: '七',
      color: '#d85118'
    },
    {
      pos: [(1 / 2) * w + r2, (1 / 2) * w + r2],
      num: '六',
      color: '#dbdbdb'
    },
    {
      pos: [half, (1 / 2) * w + r2],
      num: '一',
      color: '#dbdbdb'
    },
    {
      pos: [(1 / 2) * w - r2, (1 / 2) * w + r2],
      num: '八',
      color: '#dbdbdb'
    },
    {
      pos: [(1 / 2) * w - r2, half],
      num: '三',
      color: '#78d818'
    },
    {
      pos: [(1 / 2) * w - r2, (1 / 2) * w - r2],
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
      pos: [half, (1 / 2) * w - r2],
      num: '二',
      color: '#d90505'
    },
    {
      pos: [half, (1 / 2) * w - r2 * 2],
      num: '七',
      color: '#d90505'
    },
    {
      pos: [(1 / 2) * w + r2, half],
      num: '四',
      color: '#d0d0d0'
    },
    {
      pos: [(1 / 2) * w + r2 * 2, half],
      num: '九',
      color: '#d0d0d0'
    },
    {
      pos: [half, (1 / 2) * w + r2],
      num: '一',
      color: '#5b5b5b'
    },
    {
      pos: [half, (1 / 2) * w + r2 * 2],
      num: '六',
      color: '#5b5b5b'
    },
    {
      pos: [(1 / 2) * w - r2, half],
      num: '三',
      color: '#00f0a1'
    },
    {
      pos: [(1 / 2) * w - r2 * 2, half],
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

  const heluoFn = val => {
    const list = {
      hide: [],
      hetu,
      luoshu,
      hetup,
      luoshup
    }

    let dom = null
    if (['hetu', 'luoshu'].includes(val)) {
      dom = (
        <g id="heluo">
          {list[val].map((x, i) => (
            <g key={i}>
              <circle
                cx={x.pos[0]}
                cy={x.pos[1]}
                r="4"
                fill={x.color}
                stroke="#fff"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                color="#fff"
                fontSize="4"
                transform="translate(0,1.5)"
                x={x.pos[0]}
                y={x.pos[1]}
                textAnchor="middle">
                <tspan>{x.num}</tspan>
              </text>
            </g>
          ))}
        </g>
      )
    } else if (['hetup', 'luoshup'].includes(val)) {
      dom = (
        <g id="heluop">
          {list[val].map((x, i) => (
            <g key={i} name={x.num}>
              {x.points.map((y, j) => (
                <circle
                  key={j}
                  cx={y[0]}
                  cy={y[1]}
                  r="1"
                  fill={x.color}
                  stroke="#fff"
                  strokeWidth="0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {x.lines.map((y, j) => (
                <path
                  key={j}
                  d={'M ' + y.join(' ') + ' Z'}
                  fill="none"
                  stroke={x.color}
                  strokeWidth=".25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          ))}
        </g>
      )
    }

    setHeluo(dom)
  }
  const reRender = () => heluoFn(tabVal)
  useEffect(reRender, [tabVal])

  return <g> {heluoVal}</g>
}
export default HeluoComp

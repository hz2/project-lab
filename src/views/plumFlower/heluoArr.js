export const luoshuArr = (half, r2) => [
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

export const hetuArr = (half, r2) => [
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
    color: '#dbdbdb'
  },
  {
    pos: [half + r2 * 2, half],
    num: '九',
    color: '#dbdbdb'
  },
  {
    pos: [half, half + r2],
    num: '一',
    color: '#4b4b4b'
  },
  {
    pos: [half, half + r2 * 2],
    num: '六',
    color: '#4b4b4b'
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

export const hetuPonit = (half, r3) => [
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

export const hetuPonit2 = (hetup, half, r3) =>
  hetup
    .map(({ lines, ...y }) =>
      ['五', '十'].includes(y.num)
        ? {
            lines,
            ...y
          }
        : y
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

export const luoshuPoint = (half, r3) => [
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

export const genFishWhite = (half, fishR) => [
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

export const genFishBlack = (half, fishR) => [
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

import React from 'react'

const width = 90
const half = width / 2
const subtense = Math.tan((22.5 * Math.PI) / 180) * half
const p1 = half - subtense
const p2 = half + subtense

const list = [
  {
    id: 'nn',
    d: ['M', half, half, p1, 0, p2, 0, 'z'],
    color: 'red'
  },
  {
    id: 'ne',
    d: ['M', half, half, p2, 0, width, p1, 'z'],
    color: 'orange'
  },
  {
    id: 'ee',
    d: ['M', half, half, width, p1, width, p2, 'z'],
    color: 'yellow'
  },
  {
    id: 'se',
    d: ['M', half, half, width, p2, p2, width, 'z'],
    color: 'green'
  },

  {
    id: 'ss',
    d: ['M', half, half, p2, width, p1, width, 'z'],
    color: 'cyan'
  },
  {
    id: 'sw',
    d: ['M', half, half, p1, width, 0, p2, 'z'],
    color: 'blue'
  },
  {
    id: 'ww',
    d: ['M', half, half, 0, p2, 0, p1, 'z'],
    color: 'purple'
  },
  {
    id: 'nw',
    d: ['M', half, half, 0, p1, p1, 0, 'z'],
    color: 'gray'
  }
]

const bagua = (
  <svg
    width="600"
    height="600"
    viewBox={[0, 0, width, width].join(' ')}
    xmlns="http://www.w3.org/2000/svg">
    {list.map(x => (
      <path
        id={x.id}
        d={x.d.join(' ')}
        fill={x.color}
        stroke="#000"
        stroke-width="0px"
      />
    ))}
  </svg>
)

const About = () => (
  <div>
    <h1>Yi</h1>
    <div style={{ margin: '25px' }}>{bagua}</div>
  </div>
)

export default About

import React from 'react'
import './style.less'

import HexConv from './hexConversion'
import Encode from './encodeDecode'

const encodePage = () => {
  return (
    <div className="encodePage">
      <HexConv />
      <Encode />
    </div>
  )
}

export default encodePage

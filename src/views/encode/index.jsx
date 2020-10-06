import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { Input, Alert } from 'antd'
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

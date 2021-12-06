import React from 'react'
// import React, { useState, useEffect } from 'react'
// import { Input, Button, Slider } from 'antd'

import './colorPicker.less'

const colorPicker = () => {
  return (
    <div className="color-picker">
      <div className="current-color"></div>
      <div className="popover"></div>
    </div>
  )
}

export default colorPicker

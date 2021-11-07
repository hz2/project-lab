// gradient
import React, { useState, useEffect } from 'react'
import './color.less'
import { Input, Button, Slider } from 'antd'
import ColorListBottom from './components/ColorListBottom'
import { colorStr2arr, hsl2rgb, rgb2hsl } from './components/colors'

import { copyText } from "@libs/common.js"

import ColorPicker from './components/colorPicker'

const input = <Input className="w120" />


const GradientPage = () => {
    return <div className="p50">
        <ColorPicker />
        {input}</div>
}

export default GradientPage

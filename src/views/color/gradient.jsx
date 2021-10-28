// gradient
import React, { useState, useEffect } from 'react'
import './color.less'
import { Input, Button, Slider } from 'antd'
import ColorListBottom from './components/ColorListBottom'
import { colorStr2arr, hsl2rgb, rgb2hsl } from './components/colors'

import { copyText } from "@libs/common"

const input = <Input className="w120" />

const addItem = <Button icon="add">addItem</Button>

const GradientPage = () => {
    return <>{input}{addItem}</>
}
    
export default GradientPage


import React, { useState, useEffect } from 'react'
import { Input, Button, Slider } from 'antd'
import { colorStr2arr, hsl2rgb, rgb2hsl } from './components/colors'


const input = <Input className="w120" />


const colorPicker = () => {
    return <>{input}</>
}
    
export default colorPicker

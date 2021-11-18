import React from 'react'
import { Tabs } from 'antd'

import './svgTool.less'
import Svg2bg from './svg2bg'
import SvgSymbol from './svgSymbol'
import SvgO from './svgO'
const { TabPane } = Tabs

const SvgTool = () => {
  return (
    <div className="svgTool common-box">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Svg Optimize" key="1">
          <SvgO />
        </TabPane>
        <TabPane tab="Svg Symbol" key="2">
          <SvgSymbol />
        </TabPane>
        <TabPane tab="Svg Background" key="3">
          <Svg2bg />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SvgTool


import { Tabs, TabsProps } from 'antd'

import './svgTool.less'
import Svg2bg from './svg2bg'
import SvgSymbol from './svgSymbol'
import SvgO from './svgO'


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Svg Optimize',
    children: <SvgO />
  },
  {
    key: '2',
    label: 'Svg Background',
    children: <Svg2bg />
  },
  {
    key: '3',
    label: 'Svg Symbol',
    children: <SvgSymbol />
  },
]


const SvgTool = () => {
  return (
    <div className="svgTool common-box">
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </div>
  )
}

export default SvgTool

import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'antd'
const { TabPane } = Tabs

const SvgTool = () => {
  const [a, setA] = useState('')
  useEffect(() => {
    setA(1)
    console.log('a', a)
  }, [])

  return (
    <div className="svgTool">
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          console.log(11)
        }}>
        <TabPane tab="Symbol" key="1">
          <div className="buttons">
            <Button type="primary" onClick={() => {}}>
              单注
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SvgTool

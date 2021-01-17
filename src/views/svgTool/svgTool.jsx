import React, { useEffect, useState } from 'react'
import { Tabs, Button, Upload } from 'antd'
import { getFileInfo } from 'prettier'
const { TabPane } = Tabs

const SvgTool = () => {
  const [a, setA] = useState('')
  useEffect(() => {
    setA(1)
    console.log('a', a)
  }, [])

  const getFileInfo = e => {
    console.log('e', e)
  }

  return (
    <div className="svgTool common-box">
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          console.log(11)
        }}>
        <TabPane tab="Symbol" key="1">
          <div className="buttons">
            <Upload type="primary" onChange={e => getFileInfo(e)}>
              选择文件
            </Upload>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SvgTool

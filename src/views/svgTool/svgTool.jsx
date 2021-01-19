import React, { useEffect, useState } from 'react'
import { Tabs, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { TabPane } = Tabs
const parseString = require('xml2js').parseString
const xml2js = require('xml2js')
import './svgTool.less'

const SvgTool = () => {
  const [a, setA] = useState('')
  useEffect(() => {
    setA(1)
    console.log('a', a)
  }, [])
  const props = {
    name: 'file',
    beforeUpload: file => {
      console.log('file', file)
      if (file) {
        var reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = evt => {
          const xmlStr = evt.target.result
          parseString(xmlStr, { trim: true }, function(err, result) {
            const arr = result.svg.symbol

            const svgList = arr
              .map(x => {
                var builder = new xml2js.Builder()
                var xml = builder.buildObject({ svg: x })
                return xml
              })
              .join('')

            document.querySelector('#domResult').innerHTML = svgList
          })
        }
        reader.onerror = e => {
          console.error('file err', e)
        }
      }
      return false
    }
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
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div id="domResult"></div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SvgTool

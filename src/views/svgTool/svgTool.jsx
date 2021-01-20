import React, { useEffect, useState } from 'react'
import { Tabs, Upload, Button, message } from 'antd'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import './svgTool.less'
import { downloadBlob } from '../../libs/common.js'
const { TabPane } = Tabs
var JSZip = require('jszip')
const xml2js = require('xml2js')
const parseString = xml2js.parseString

const SvgTool = () => {
  const [svgList, setSvgList] = useState([])
  useEffect(() => {
    // setA(1)
    // console.log('a', a)
  }, [])
  const beforeUpload = file => {
    if (file) {
      var reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = evt => {
        const xmlStr = evt.target.result
        parseString(xmlStr, { trim: true }, (err, result) => {
          const arr = result.svg.symbol
          const svgList = arr.map(x => {
            var builder = new xml2js.Builder()
            var xml = builder.buildObject({ svg: x })
            return {
              svg: xml,
              name: x.$ && x.$.id
            }
          })
          setSvgList(svgList)
        })
      }
      reader.onerror = e => {
        console.error('file err', e)
        message.error('e', e)
      }
    }
    return false
  }

  const donwloadZip = () => {
    var zip = new JSZip()
    const folder = zip.folder('svgList')
    let nameArr = []
    svgList.forEach(x => {
      let name = x.name || 'svg'
      let newName = name
      if (nameArr.includes(name)) {
        newName += '_' + nameArr.filter(y => y === name).length
      }
      nameArr.push(name)
      folder.file(newName + '.svg', x.svg)
    })
    zip
      .generateAsync({ type: 'blob' })
      .then(blob => downloadBlob(blob, 'svgSymbol2svg.zip'))
  }

  const props = {
    name: 'file',
    beforeUpload
  }
  return (
    <div className="svgTool common-box">
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          console.log(11)
        }}>
        <TabPane tab="Svg Symbol" key="1">
          <div className="btngroup">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload Symbol</Button>
            </Upload>
            <Button icon={<DownloadOutlined />} onClick={donwloadZip}>
              Download as Zip
            </Button>
          </div>
          <div id="domResult">
            {svgList.map((x, i) => (
              <div className="item" key={i}>
                <div
                  className="icon"
                  dangerouslySetInnerHTML={{ __html: x.svg }}></div>
                <div className="text">{x.name}</div>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SvgTool

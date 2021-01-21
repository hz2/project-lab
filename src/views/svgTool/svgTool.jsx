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
  const LoadFile = file =>
    new Promise((resolve, reject) => {
      if (!file) reject('no file')
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = ({ target: { result } }) =>
        parseString(
          result,
          { trim: true },
          (err, { svg }) =>
            !err &&
            resolve({
              name: file.name,
              list: svg.symbol.map(x => ({
                svg: new xml2js.Builder().buildObject({ svg: x }),
                name: x.$ && x.$.id
              }))
            })
        )
      reader.onerror = e => reject(e)
    })

  const uploadSymbolOnChange = ({ fileList }) => {
    const arr = fileList.map(x => LoadFile(x.originFileObj))
    Promise.all(arr).then(list => setSvgList(list))
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
    multiple: true,
    onChange: uploadSymbolOnChange,
    beforeUpload: () => false
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
          <div className="result">
            {svgList.map((x, i) => (
              <div className="file" key={i}>
                <div className="file-name">{x.name}</div>
                <div className="file-content">
                  {x.list.map((y, j) => (
                    <div className="item" key={j}>
                      <div
                        className="icon"
                        dangerouslySetInnerHTML={{ __html: y.svg }}></div>
                      <div className="text">{y.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SvgTool

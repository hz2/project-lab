import React, { useEffect, useState } from 'react'
import { Tabs, Upload, Button, message } from 'antd'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import './svgTool.less'
import { downloadBlob } from '../../libs/common.js'
const { TabPane } = Tabs
const JSZip = require('jszip')
const { parseString: xmlParser, Builder: XmlBuilder } = require('xml2js')

const SvgTool = () => {
  const [svgList, setSvgList] = useState([])
  useEffect(() => {}, [])
  const LoadFile = file =>
    new Promise((resolve, reject) => {
      if (!file) reject('no file')
      const reader = new FileReader()
      const builder = new XmlBuilder()
      reader.readAsText(file, 'UTF-8')
      reader.onload = ({ target: { result } }) =>
        xmlParser(
          result,
          { trim: true },
          (err, { svg }) =>
            !err &&
            resolve({
              name: file.name,
              uid: file.uid,
              list: svg.symbol.map(x => ({
                svg: builder.buildObject({ svg: x }),
                name: x.$ && x.$.id
              }))
            })
        )
      reader.onerror = e => reject(e)
    })

  const uploadSymbolOnChange = ({ fileList }) => {
    console.log('fileList', fileList)
    const arr = fileList.map(x => LoadFile(x.originFileObj))
    Promise.all(arr).then(list => setSvgList(list))
  }

  const donwloadZip = () => {
    if (!svgList.length) {
      message.info('请上传 Svg Symbol')
      return
    }
    const zip = new JSZip()
    const FolderList = (list, folder) => {
      let nameArr = []
      list.forEach(x => {
        let name = x.name || 'svg'
        let newName = name
        if (nameArr.includes(name)) {
          newName += '_' + nameArr.filter(y => y === name).length
        }
        nameArr.push(name)
        folder.file(newName + '.svg', x.svg)
      })
    }
    svgList.forEach(x => {
      const folder = zip.folder(x.name.replace('.svg', ''))
      FolderList(x.list, folder)
    })
    zip
      .generateAsync({ type: 'blob' })
      .then(blob => downloadBlob(blob, 'svgSymbol2svg.zip'))
  }

  const scrollToDom = ({ uid }) => {
    const top = document.querySelector('#' + uid).getBoundingClientRect().y
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth'
    })
  }

  const props = {
    name: 'file',
    multiple: true,
    onChange: uploadSymbolOnChange,
    beforeUpload: () => false,
    onPreview: scrollToDom
  }

  const setSample = () => {
    uploadSymbolOnChange({ fileList: [] })
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
            <Button className="ml25" onClick={setSample}>
              Sample
            </Button>
          </div>
          <div className="result">
            {svgList.map((x, i) => (
              <div className="file" key={i}>
                <div className="file-name" id={x.uid}>
                  {x.name}
                </div>
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

import React, { useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd'
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteTwoTone,
  BulbOutlined
} from '@ant-design/icons'
import './svgTool.less'
// import { optimize } from 'svgo'
import { downloadBlob, svgStr2BlobUrl } from '@libs/common.js'
const JSZip = require('jszip')

const dom2ostr = dom => {
  const s = new XMLSerializer();
  const svgString = s.serializeToString(dom)
  return svgString.replace(/symbol/ig, 'svg')
  // const result = optimize(svgString.replace(/symbol/ig, 'svg'), {
  //   multipass: true
  // })
  // return result.data;
}

const str2dom = str => {
  const parser = new DOMParser();
  return parser.parseFromString(str, "image/svg+xml");
}

const SvgTool = () => {
  const [svgList, setSvgList] = useState([])
  useEffect(() => { }, [])
  const LoadFile = file =>
    new Promise((resolve, reject) => {
      if (!file) reject('no file')
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = ({ target: { result } }) =>
        resolve({
          name: file.name,
          uid: file.uid,
          list: [...(str2dom(result)).querySelectorAll('symbol')].map(symbol => ({
            svg: dom2ostr(symbol),
            bloburl: svgStr2BlobUrl(dom2ostr(symbol)),
            name: symbol.id
          }))
        })
      reader.onerror = e => reject(e)
    })

  const uploadSymbolOnChange = ({ fileList }) => {
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
    accept: '.svg',
    onChange: uploadSymbolOnChange,
    beforeUpload: () => false,
    onPreview: scrollToDom
  }

  const setSample = () => {
    fetch('./svgsymbol2.svg', { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const name = 'svgsymbol2.svg'
        blob.name = name
        uploadSymbolOnChange({
          fileList: [
            {
              originFileObj: blob,
              name
            }
          ]
        })
      })
  }

  const removeItem = index => {
    setSvgList(svgList.filter((x, i) => i !== index))
  }

  return (
    <>
      <div className="btngroup">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传图标(Symbol)</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={donwloadZip}>
          下载 Zip
        </Button>
        <Button
          className="ml25"
          icon={<BulbOutlined />}
          onClick={setSample}>
          示例
        </Button>
      </div>
      <div className="result">
        {svgList.map((x, i) => (
          <div className="file" key={i}>
            <div className="file-name common-title" id={x.uid}>
              <span>{x.name}</span>
              <DeleteTwoTone
                className="ml45"
                onClick={() => removeItem(i)}
              />
            </div>
            <div className="file-content">
              {x.list.map((y, j) => (
                <div className="item" key={j}>
                  <div
                    className="icon" >
                    <img src={y.bloburl} alt={y.name} srcSet="" />
                  </div>
                  <div className="text">{y.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SvgTool

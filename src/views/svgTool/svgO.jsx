import React, { useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd'
import {
  UploadOutlined,
  DownloadOutlined
} from '@ant-design/icons'
import './svgTool.less'
import { downloadBlob, formatBytes, copyText } from "@libs/common"
import { svgStr2b64 } from './svgFn'
const { optimize } = require('svgo');

const JSZip = require('jszip')
const SvgO = () => {
  const [svgList, setSvgList] = useState([])
  useEffect(() => { }, [])
  const LoadFile = file =>
    new Promise((resolve, reject) => {
      if (!file) reject('no file')
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = ({ target: { result: svgString } }) => {
        const result = optimize(svgString, {
          // optional but recommended field
          path: 'path-to.svg',
          // all config fields are also available here
          multipass: true,
        });
        const optimizedSvgString = result.data;
        resolve({
          name: file.name,
          svg: optimizedSvgString,
          s1: file.size,
          s2: svgString.length,
          s3: optimizedSvgString.length,
          reduce: svgString.length - optimizedSvgString.length
        })
      }
      reader.onerror = e => reject(e)
    })

  const uploadSymbolOnChange = ({ fileList }) => {
    const arr = fileList.map(x => LoadFile(x.originFileObj))
    Promise.all(arr).then(list => setSvgList(list))

    setTimeout(() => {
      console.log(svgList);
    }, 1000)
  }

  const donwloadZip = () => {
    if (!svgList.length) {
      message.info('请上传 Svg 图标')
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
    accept: ".svg",
    showUploadList: false,
    onChange: uploadSymbolOnChange,
    beforeUpload: () => false,
    onPreview: scrollToDom
  }


  // const removeItem = index => {
  //   setSvgList(svgList.filter((x, i) => i !== index))
  // }

  return (
    <>
      <div className="btngroup">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传图标</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={donwloadZip}>
          下载 Zip
        </Button>
      </div>
      <div className="result">
        <div className="file-content">
          {svgList.map((y, j) => (
            <div className="item" key={j}>
              <div
                className="icon"
                dangerouslySetInnerHTML={{ __html: y.svg }}></div>
              <div className="text">{y.name}</div>
              <div className="">
                <span className="red">{formatBytes(y.s2)}</span> -&gt; <span className="green">{formatBytes(y.s3)}</span></div>
              <div className="">-{formatBytes(y.reduce)}</div>
              <Button onClick={() => copyText(y.svg)}>data</Button>
              <Button onClick={() => copyText(svgStr2b64(y.svg, false))}>bg</Button>
              <Button onClick={() => copyText(svgStr2b64(y.svg, true))}>b64</Button>
            </div>

          ))}
        </div>
      </div>
    </>
  )
}

export default SvgO

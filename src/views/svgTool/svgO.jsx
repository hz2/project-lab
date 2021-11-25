import React, { useEffect, useState } from 'react'
import { Upload, Button, message, Spin, Menu, Dropdown } from 'antd'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import './svgTool.less'
import { downloadBlob, formatBytes, copyText, svgStr2BlobUrl, svgStr2b64 } from '@libs/common'
// const { optimize } = require('svgo');

import { optimize } from 'svgo'

const JSZip = require('jszip')
const SvgO = () => {
  const [svgList, setSvgList] = useState([])
  const [loading, setLoading] = useState(false)
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
          multipass: true
        })
        const optimizedSvgString = result.data || '';
        resolve({
          name: file.name,
          bloburl: svgStr2BlobUrl(optimizedSvgString),
          svg: optimizedSvgString,
          s1: file.size,
          s2: svgString.length,
          s3: optimizedSvgString.length,
          reduce: svgString.length - optimizedSvgString.length
        })
      }
      reader.onerror = e => reject(e)
    })

  const uploadOnChange = ({ fileList }) => {
    setLoading(true)
    const arr = fileList.map(x => LoadFile(x.originFileObj))
    Promise.all(arr).then(list => {
      setSvgList(list)
      setLoading(false)
    })
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
    accept: '.svg',
    showUploadList: false,
    onChange: uploadOnChange,
    beforeUpload: () => false,
    onPreview: scrollToDom
  }

  // const removeItem = index => {
  //   setSvgList(svgList.filter((x, i) => i !== index))
  // }

  const [draging, setDraging] = useState(false)

  const DragEventOver = (ev) => {
    ev.preventDefault()
    setDraging(true)
  }

  const DropEvent = (ev) => {
    ev.preventDefault()
    setDraging(false)
    setLoading(true)
    const arr = [...ev.dataTransfer.items].map(x => LoadFile(x.getAsFile()));
    Promise.all(arr).then(list => {
      setSvgList(list)
      setLoading(false)
    })
  }

  const handleMenuClick = ({ key }, str) => {
    if (key === 'uri') {
      copyText(svgStr2b64(str, true))
    } else if (key === 'base64') {
      copyText(svgStr2b64(str, true))
    } else if (key === 'content') {
      copyText(str)
    }
  }

  const menu = str => (
    <Menu onClick={e => handleMenuClick(e, str)}>
      <Menu.Item key="uri">data URI</Menu.Item>
      <Menu.Item key="base64">base64</Menu.Item>
      <Menu.Item key="content">content</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Spin spinning={loading} size="large">
        <div className="btngroup">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传图标</Button>
          </Upload>
          <Button icon={<DownloadOutlined />} onClick={donwloadZip}>
            下载 Zip
          </Button>
        </div>
        <div className={`${draging ? ' drag-zone draging' : 'drag-zone'}`} onDragOver={DragEventOver} onDrop={DropEvent}>
          <div className="result">
            <div className="file-content">
              {svgList.map((y, j) => (
                <div className="item" key={j}>
                  <div
                    className="icon">
                    <img src={y.bloburl} alt={y.name} srcSet="" />
                  </div>
                  <div className="text">{y.name}</div>
                  <div className="">
                    <span className="red">{formatBytes(y.s2)}</span>
                    <span className="gray"> -&gt; </span>
                    <span className="green">{formatBytes(y.s3)}</span>
                  </div>
                  <Dropdown.Button className='mb15' overlay={menu(y.svg)} >-{formatBytes(y.reduce)}</Dropdown.Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Spin>
    </>
  )
}

export default SvgO

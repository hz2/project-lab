import React, { useState } from 'react'
import { Input, Upload, Button, message } from 'antd'
import {
  UploadOutlined,
  BulbOutlined,
  DeleteTwoTone
} from '@ant-design/icons'
import './svgTool.less'
const { TextArea } = Input
const Page = () => {

  const setSample = () => {
    const str = `<svg opacity="1.0" fill="none" width="32" height="32" stroke-linecap="round" stroke-linejoin="round" stroke="#777" stroke-width="2" viewBox="0 0 32 32"><path d="M14 2 L14 6 M14 18 L14 30 M2 6 L2 18 24 18 30 12 24 6Z"></path></svg>`
    setInputObj({
      text: str,
      dataUrl: svgStr2b64(str)
    })

  }

  const LoadFile = file =>
    new Promise((resolve, reject) => {
      if (!file) reject('no file')
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = ({ target: { result } }) => {
        resolve({
          name: file.name,
          uid: file.uid,
          size: file.size,
          type: file.type,
          file: result
        })
      }
      reader.onerror = e => reject(e)
    })

  const svgStr2b64 = str => {
    let out = str;
    if (! /http\:\/\/\www\.w3\.org\/2000\/svg/i.test(str)) {
      out = str.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
    }
    return 'data:image/svg+xml,' + out.replace(/>[\n\r \t]+</g, '><').replace(/[<>#]/g, x => encodeURIComponent(x)).replace(/[\n\r \t]+/g, ' ')
  }

  const [inputObj, setInputObj] = useState({
    text: '',
    dataUrl: ""

  })
  const uploadChange = async ({ fileList: [{ originFileObj }] }) => {
    const svgContent = await LoadFile(originFileObj)
    const str = svgContent.file;
    const datastr = svgStr2b64(str)
    const obj = {
      text: str,
      dataUrl: datastr
    }
    setInputObj(obj)
  }

  const genPreviewDom = (datastr) => (<div className="w200 h200" id="preview" style={{ backgroundImage: `url('${datastr}')` }}></div>)
  const genPreviewText = (datastr) => `height: 200px;\nwidth: 200px;\nbackground-color: rgb(238, 238, 238);\nbackground-size: contain;\nbackground-repeat: no-repeat;\nbackground-position: center;\nbackground-image: url('${datastr}');`

  const props = {
    name: 'file',
    multiple: false,
    accept: ".svg",
    maxCount: 1,
    showUploadList: false,
    onChange: uploadChange,
    beforeUpload: () => false,
    onPreview: () => false,
  }

  const origTextInput = ({ target: { value } }) => {
    setInputObj({
      text: value,
      dataUrl: svgStr2b64(value)
    })
  }
  const dataUrlInput = ({ target: { value } }) => {
    setInputObj({
      text: value,
      dataUrl: value
    })
  }


  return (
    <div className="svgBg">
      <div className="btngroup">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传图标</Button>
        </Upload>
        <Button icon={<BulbOutlined />} onClick={setSample}>
          示例
        </Button>
      </div>
      <div className="common-box">
        <div className="title-text">输入 SVG 代码</div>
        <TextArea
          className="inputbox2 code"
          placeholder='<?xml version="1.0" encoding="UTF-8"?>'
          value={inputObj.text}
          onChange={origTextInput}
        />

        <div className="title-text">转换结果</div>
        <TextArea
          className="inputbox2 code"
          placeholder="data:image/svg+xml"
          value={inputObj.dataUrl}
          onChange={dataUrlInput}
        />
        <div className="title-text">预览结果</div>
        <div className="flex start">
          {genPreviewDom(inputObj.dataUrl)}
          <div className="pct60">
            <TextArea
              className="inputbox code"
              value={genPreviewText(inputObj.dataUrl)}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

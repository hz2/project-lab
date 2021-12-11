import React, { useState } from 'react'
import { Input, Checkbox, Upload, Button } from 'antd'
import { UploadOutlined, BulbOutlined } from '@ant-design/icons'
import './svgTool.less'
import { svgStr2b64 as svgStr2b64Orgi } from '@libs/common'
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

  const [inputObj, setInputObj] = useState({
    text: '',
    dataUrl: ''
  })
  const [isb64, setB64] = useState(false)
  const svgStr2b64 = (str, val = isb64) => svgStr2b64Orgi(str, val)
  const uploadChange = async ({ fileList: [{ originFileObj }] }) => {
    const svgContent = await LoadFile(originFileObj)
    const str = svgContent.file
    const obj = {
      text: str,
      dataUrl: svgStr2b64(str)
    }
    setInputObj(obj)
  }

  const genPreviewDom = datastr => (
    <div
      className="w200 h200"
      id="preview"
      style={{ backgroundImage: `url('${datastr}')` }}></div>
  )
  const genPreviewText = datastr => `background-image: url('${datastr}');`

  const props = {
    name: 'file',
    multiple: false,
    accept: '.svg',
    maxCount: 1,
    showUploadList: false,
    onChange: uploadChange,
    beforeUpload: () => false,
    onPreview: () => false
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

  const b64Change = ({ target: { checked } }) => {
    setB64(checked)
    const str = inputObj.text
    setInputObj({
      text: str,
      dataUrl: svgStr2b64(str, checked)
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
          spellCheck="false"
        />

        <div className="title-text flex start">
          <div className="text mr15">转换结果</div>
          <Checkbox onChange={b64Change}>base64 加密</Checkbox>
        </div>
        <TextArea
          className="inputbox2 code"
          placeholder="data:image/svg+xml"
          value={inputObj.dataUrl}
          onChange={dataUrlInput}
          spellCheck="false"
        />
        <div className="title-text">预览结果</div>
        <div className="flex start">
          {genPreviewDom(inputObj.dataUrl)}
          <div className="pct60">
            <TextArea
              className="inputbox code"
              value={genPreviewText(inputObj.dataUrl)}
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

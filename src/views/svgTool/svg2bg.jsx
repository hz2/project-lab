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
  const [url, setUrl] = useState('')
  const urlChange = ({ target: { value } }) => {
    console.log('val', value)
    setUrl(value)
  }



  const setSample = () => {
    // fetch('./svgsymbol2.svg', { mode: 'cors' })
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const name = 'svgsymbol2.svg'
    //     blob.name = name
    //     uploadSymbolOnChange({
    //       fileList: [
    //         {
    //           originFileObj: blob,
    //           name
    //         }
    //       ]
    //     })
    //   })
    setInputObj({
      text:`<svg opacity="1.0" fill="none" width="32" height="32" stroke-linecap="round" stroke-linejoin="round" stroke="#777" stroke-width="2" viewBox="0 0 32 32"><path d="M14 2 L14 6 M14 18 L14 30 M2 6 L2 18 24 18 30 12 24 6Z"></path></svg>`
    })
  }



  const props = {
    name: 'file',
    multiple: true,
    onChange: () => false,
    beforeUpload: () => false,
    onPreview: () => false,
  }

  const [inputObj, setInputObj] = useState({
    text: '',
    dataUrl: ""

  })

  const origTextInput = () => { 
    setInputObj()
  }
  const dataUrlInput = () => { }


  return (
    <>
      <div className="btngroup">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传图标</Button>
        </Upload>
        <Button icon={<BulbOutlined />} >
          点击测试
        </Button>
        <Button className="ml25" onClick={setSample}>
          示例
        </Button>
      </div>
      <div className="common-box">
        <div className="text">输入 SVG 代码</div>
        <TextArea
          rows={6}
          className="pct33"
          placeholder='<?xml version=\"1.0\" encoding=\"UTF-8\"?>'
          value={inputObj.text}
          onChange={origTextInput}
        />

        <div className="text">转换结果</div>
        <TextArea
          rows={6}
          className="pct33"
          placeholder="data:image/svg+xml"
          value={inputObj.dataUrl}
          onChange={dataUrlInput}
        />
      </div>
    </>
  )
}

export default Page

import React, { useState } from 'react'
import { Input, Upload, Button, message } from 'antd'
import {
  UploadOutlined,
  BulbOutlined,
  DeleteTwoTone
} from '@ant-design/icons'
import './svgTool.less'
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
  }



  const props = {
    name: 'file',
    multiple: true,
    onChange: () => false,
    beforeUpload: () => false,
    onPreview: () => false,
  }

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
        <Input value={url} onChange={urlChange} />
      </div>
    </>
  )
}

export default Page

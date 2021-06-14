import React, { useState } from 'react'
import { Upload, Input, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './style.less'
const { TextArea } = Input
const DataUrl = () => {
  const [b64Str, setB64Str] = useState('')
  const props = {
    name: 'file',
    maxCount: 1,
    beforeUpload: file => false,
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        const { originFileObj } = fileList[0] || {}
        const reader = new FileReader()
        reader.readAsDataURL(originFileObj)
        reader.onload = () => {
          const result = reader.result
          setB64Str(result)
        }
      }
    }
  }

  return (
    <div className="p20">
      <div className="dataurl">
        <h2>Data URLs 转换</h2>

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <TextArea
          placeholder={'{"id":"1","name":"querystring"}'}
          rows={15}
          value={b64Str}
        />
      </div>
    </div>
  )
}

export default DataUrl

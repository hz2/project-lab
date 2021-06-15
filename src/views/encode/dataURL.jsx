import React, { useState } from 'react'
import { Upload, Input, Button, Radio } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './style.less'
const { TextArea } = Input
const DataUrl = () => {
  const [b64Str, setB64Str] = useState('')
  const [radio, setRadio] = useState('b64')
  const props = {
    name: 'file',
    maxCount: 1,
    beforeUpload: file => false,
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        const file = fileList[0]
        if (!file) {
          return
        }
        const { originFileObj } = file
        const reader = new FileReader()
        if (radio === 'text') {
          reader.readAsText(originFileObj, 'UTF-8')
        } else {
          reader.readAsDataURL(originFileObj, 'UTF-8')
        }
        reader.onload = () => {
          const result = reader.result
          setB64Str(result)
        }
      }
    }
  }

  const setType = ({ target: { value: val } }) => {
    setRadio(val)
  }

  const genPreview = data => {
    const type = data && data.split('/')[0]
    return {
      'data:image': <img alt="preview" src={data} />,
      'data:text': <iframe title="preivew" src={data} />
    }[type]
  }

  return (
    <div className="p20">
      <div className="dataurl">
        <h2>Data URLs 转换</h2>
        <Radio.Group defaultValue="b64" buttonStyle="solid" onChange={setType}>
          <Radio.Button value="text">Text</Radio.Button>
          <Radio.Button value="b64">Base64</Radio.Button>
        </Radio.Group>
        <h4>请选择文件</h4>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <TextArea placeholder="请选择文件" rows={15} value={b64Str} />
        <div className="preview-box w450 h450 mt20">{genPreview(b64Str)}</div>
      </div>
    </div>
  )
}

export default DataUrl

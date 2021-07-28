import React, { useState } from 'react'
import { Upload, Input, Button, Radio } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './style.less'
const { TextArea } = Input
const DataUrl = () => {
  const [fileObj, setFileObj] = useState({
    type: '',
    size: '',
    name: '',
    url: ''
  })
  const [radio, setRadio] = useState('blob')
  const props = {
    name: 'file',
    maxCount: 1,
    className: 'w450 block',
    beforeUpload: file => false,
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        const file = fileList[0]
        if (!file) {
          return
        }
        const { originFileObj, type, size, name } = file
        const reader = new FileReader()
        if (radio === 'blob') {
          const objectURL = URL.createObjectURL(originFileObj)
          setFileObj({
            url: objectURL,
            type,
            size,
            name
          })
          return
        } else if (radio === 'text') {
          reader.readAsText(originFileObj, 'UTF-8')
        } else if (radio === 'b64') {
          reader.readAsDataURL(originFileObj)
        }
        reader.onload = () => {
          const result = reader.result
          setFileObj({
            url: result,
            type,
            size,
            name
          })
        }
      }
    }
  }

  const setType = ({ target: { value: val } }) => {
    setRadio(val)
  }

  const genPreview = fileObj => {
    const { type, url } = fileObj
    const typeprefix = type && type.split('/')[0]
    return {
      image: <img alt="preview" src={url} />,
      text: <iframe title="preivew" src={url} />
    }[typeprefix]
  }

  return (
    <div className="p20">
      <div className="dataurl">
        <h2>Data URLs 转换</h2>
        <Radio.Group defaultValue="blob" buttonStyle="solid" onChange={setType}>
          <Radio.Button value="text">text</Radio.Button>
          <Radio.Button value="b64">base64</Radio.Button>
          <Radio.Button value="blob">blob</Radio.Button>
        </Radio.Group>
        {/* <h4>请选择文件</h4> */}
        <div className="block">
          <span className="mr15">请选择文件</span>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <TextArea placeholder="请选择文件" rows={15} value={fileObj.url} />
        <div className="preview-box w450 h450 mt20">{genPreview(fileObj)}</div>
      </div>
    </div>
  )
}

export default DataUrl

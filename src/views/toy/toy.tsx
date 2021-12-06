import React, { useState } from 'react'
import { Input, Radio, RadioChangeEvent } from 'antd'

interface IType {
  protocol: string;
  value?: string;
  text?: string;
}

const Page = () => {
  const typeList = [
    { protocol: 'http://', value: 'example.com', text: 'HTTP 协议' },
    { protocol: 'ftp://', value: '/', text: '' },
    { protocol: 'file://', value: '/home', text: '' },
    { protocol: 'tel:', value: '13800138000', text: '' },
    { protocol: 'sms:', value: '13800138000', text: '' },
    { protocol: 'mailto://', value: 'qq@qq.com', text: '' },
    { protocol: 'magnet://', value: '', text: '' },
    // { protocol: 'javascript:', value: 'alert("hello")', text: '' },
    { protocol: 'tg://', value: '', text: '' },
    { protocol: 'vscode://', value: '', text: '' },
    { protocol: 'vscode-insider://', value: '', text: '' },
    { protocol: 'vscodium://', value: '', text: '' }
  ]
  const [url, setUrl] = useState<IType>(typeList[0])
  const urlChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setUrl({
      ...url,
      value: value
    })
  }

  const [radio, setRadio] = useState('http://')

  const onChangeFn = ({ target: { value } }: RadioChangeEvent) => {
    const item = typeList.find(x => x.protocol === value) || { protocol: '' }
    setUrl(item)
    setRadio(value)
  }

  return (
    <div className="common-box">
      <div className="my20">选择协议：</div>
      <Radio.Group onChange={onChangeFn} value={radio}>
        {typeList.map((x, i) => (
          <Radio className="my5" value={x.protocol} key={i}>
            {x.protocol}
          </Radio>
        ))}
      </Radio.Group>
      {url.text ? (
        <>
          <div className="my20">协议说明：</div>
          <span> {url.text}</span>
        </>
      ) : null}
      <div className="my20">输入数值：</div>
      <div className="w350">
        <Input value={url.value} onChange={urlChange} />
      </div>
      <div className="my20">访问结果：</div>
      <a
        href={url.protocol + url.value}
        target="_blank"
        rel="noopener noreferrer">
        {url.protocol + url.value}
      </a>
    </div>
  )
}

export default Page

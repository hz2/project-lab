import React, { useEffect, useState } from 'react'
import { Input, Checkbox, Card } from 'antd'
const { TextArea } = Input

const Encode = () => {
  return (
    <div className="encode">
      <h2>编码解码</h2>
      <div className="encodeContent">
        <div className="origVal">
          <TextArea rows={3} placeholder="编码" />
        </div>
        <div className="encodeVal">
          <Card size="small" title="网址编码">
            <Checkbox className="text">URIComponent 模式</Checkbox>
            <TextArea rows={3} placeholder="%E7%BC%96%E7%A0%81" />
          </Card>
          <Card size="small" title="Base64 编码">
            <TextArea rows={3} placeholder="57yW56CB" />
          </Card>
          <Card size="small" title="Unicode 编码">
            <TextArea rows={3} placeholder="\u7f16\u7801" />
            <p className="text">HTML 实体</p>
            <TextArea rows={3} placeholder={'&#32534;&#30721;'} />
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Encode

import React, { useState } from 'react'
import Qs from 'qs'
import { Input, message } from 'antd'
import './style.less'
const { TextArea } = Input

const QsPage = () => {
  const [qsStr, setQsStr] = useState('')
  const [qsObj, setQsObj] = useState('')
  return (
    <div className="encodePage">
      <div className="qscover">
        <h2>Query String 转换</h2>
        <div className="sub-title">Query String</div>
        <TextArea
          placeholder={'id=1&name=querystring'}
          rows={6}
          value={qsStr}
          onChange={({ target: { value } }) => {
            setQsStr(value)
            if (!value) {
              setQsObj('')
              return
            }
            try {
              const str = value.split('?')[1]
              setQsObj(JSON.stringify(Qs.parse(str), null, 4))
            } catch (error) {
              console.log('error', error)
              message.error('输入有误')
            }
          }}
        />
        <div className="sub-title">JSON</div>
        <TextArea
          placeholder={'{"id":"1","name":"querystring"}'}
          rows={6}
          value={qsObj}
          onChange={({ target: { value } }) => {
            setQsObj(value)
            if (!value) {
              setQsStr('')
              return
            }
            try {
              setQsStr(Qs.stringify(JSON.parse(value)))
            } catch (error) {
              console.log('error', error)
              message.error('输入有误')
            }
          }}
        />
      </div>
    </div>
  )
}

export default QsPage

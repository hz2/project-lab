import React, { useState } from 'react'
import { Input, Checkbox, Card, message } from 'antd'
import Qs from 'qs'
const { TextArea } = Input

const Encode = () => {
  const [qsStr, setQsStr] = useState('')
  const [qsObj, setQsObj] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [encodeObj, updateEncodeObj] = useState({
    text: '',
    url: '',
    b64: '',
    unicode: '',
    html: ''
  })
  // input event
  const checkboxChange = ({ target: { checked } }) => {
    setCheckbox(checked)
  }
  const origTextInput = ({ target: { value } }) => {
    updateEncodeObj({
      text: value,
      url: checkbox ? encodeURIComponent(value) : encodeURI(value),
      b64: window.btoa(unescape(encodeURIComponent(value))),
      unicode: value
        .split('')
        .map(
          val =>
            '\\u' +
            val
              .charCodeAt()
              .toString(16)
              .padStart(4, 0)
        )
        .join(''),
      html: value
        .split('')
        .map(val => '&#' + val.charCodeAt() + ';')
        .join('')
    })
  }
  const decodeUrl = ({ target: { value } }) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: ''
    }
    try {
      tempObj.url = value
      tempObj.text = checkbox ? decodeURIComponent(value) : decodeURI(value)
      updateEncodeObj(tempObj)
    } catch (error) {
      console.log('error', error)
      message.error('输入有误')
    }
  }
  const decodeB64 = ({ target: { value } }) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: ''
    }
    try {
      tempObj.b64 = value
      tempObj.text = decodeURIComponent(escape(window.atob(value)))
      updateEncodeObj(tempObj)
    } catch (error) {
      console.log('error', error)
      message.error('输入有误')
    }
  }
  const decodeUni = ({ target: { value } }) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: ''
    }
    try {
      tempObj.unicode = value
      tempObj.text = value
        .split('\\u')
        .map(x => String.fromCharCode(parseInt(x, 16)))
        .splice(1)
        .join('')
      tempObj.html = value
        .split('\\u')
        .map(x => '&#' + parseInt(x, 16) + ';')
        .splice(1)
        .join('')
      updateEncodeObj(tempObj)
    } catch (error) {
      console.log('error', error)
      message.error('输入有误')
    }
  }
  const decodeHtml = ({ target: { value } }) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: ''
    }
    try {
      tempObj.html = value
      tempObj.text = value
        .split(/\W+/g)
        .filter(x => x !== '')
        .map(x => String.fromCharCode(x))
        .join('')
      tempObj.unicode = value
        .split(/\W+/g)
        .filter(x => x !== '')
        .map(x => '\\u' + (x * 1).toString(16).padStart(4, 0))
        .join('')

      updateEncodeObj(tempObj)
    } catch (error) {
      console.log('error', error)
      message.error('输入有误')
    }
  }
  return (
    <div className="encode">
      <h2>编码解码</h2>
      <div className="encodeContent">
        <div className="origVal">
          <TextArea
            rows={3}
            placeholder="编码"
            value={encodeObj.text}
            onChange={origTextInput}
          />
        </div>
        <div className="encodeVal">
          {checkbox}
          <Card size="small" title="网址编码">
            <Checkbox
              className="text"
              checked={checkbox}
              onChange={checkboxChange}>
              URIComponent 模式
            </Checkbox>
            <TextArea
              rows={3}
              placeholder="%E7%BC%96%E7%A0%81"
              value={encodeObj.url}
              onChange={decodeUrl}
            />
          </Card>
          <Card size="small" title="Base64 编码">
            <TextArea
              rows={3}
              placeholder="57yW56CB"
              value={encodeObj.b64}
              onChange={decodeB64}
            />
          </Card>
          <Card size="small" title="Unicode 编码">
            <TextArea
              rows={3}
              placeholder="\u7f16\u7801"
              value={encodeObj.unicode}
              onChange={decodeUni}
            />
            <p className="text">HTML 实体</p>
            <TextArea
              rows={3}
              placeholder={'&#32534;&#30721;'}
              value={encodeObj.html}
              onChange={decodeHtml}
            />
          </Card>
        </div>
        <div className="qscover">
          <h4>Query String 转换</h4>
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
                setQsObj(JSON.stringify(Qs.parse(value), null, 4))
              } catch (error) {
                console.log('error', error)
                message.error('输入有误')
              }
            }}
          />
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
    </div>
  )
}
export default Encode

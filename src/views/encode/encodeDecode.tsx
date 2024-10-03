import { useState } from 'react'
import { Input, Checkbox, Card, message } from 'antd'
import './style.less'
const { TextArea } = Input

type TCheckBox = { target: { checked: boolean } }

const string2GBK = (inputVal: string) => {
  const ranges = [
    [0xA1, 0xA9, 0xA1, 0xFE],
    [0xB0, 0xF7, 0xA1, 0xFE],
    [0x81, 0xA0, 0x40, 0xFE],
    [0xAA, 0xFE, 0x40, 0xA0],
    [0xA8, 0xA9, 0x40, 0xA0],
    [0xAA, 0xAF, 0xA1, 0xFE],
    [0xF8, 0xFE, 0xA1, 0xFE],
    [0xA1, 0xA7, 0x40, 0xA0],
  ]
  const codes = new Uint16Array(23940)
  let i = 0

  for (const [b1Begin, b1End, b2Begin, b2End] of ranges) {
    for (let b2 = b2Begin; b2 <= b2End; b2++) {
      if (b2 !== 0x7F) {
        for (let b1 = b1Begin; b1 <= b1End; b1++) {
          codes[i++] = b2 << 8 | b1
        }
      }
    }
  }
  const str = new TextDecoder('gbk').decode(codes)

  // 编码表
  const table = new Uint16Array(65536)
  for (let i = 0; i < str.length; i++) {
    table[str.charCodeAt(i)] = codes[i]
  }
  const buf = new Uint8Array(inputVal.length * 2)
  let n = 0

  for (let i = 0; i < inputVal.length; i++) {
    const code = inputVal.charCodeAt(i)
    if (code < 0x80) {
      buf[n++] = code
    } else {
      const gbk = table[code]
      buf[n++] = gbk & 0xFF
      buf[n++] = gbk >> 8
    }
  }
  return buf.subarray(0, n)
}

const Encode = () => {
  const [checkbox, setCheckbox] = useState(false)
  const [encodeObj, updateEncodeObj] = useState({
    text: '',
    url: '',
    b64: '',
    unicode: '',
    html: '',
    gbk: '',
  })
  // input event
  const checkboxChange = ({ target: { checked } }: TCheckBox) => {
    setCheckbox(checked)
  }
  const origTextInput = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
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
              .charCodeAt(0)
              .toString(16)
              .padStart(4, '0')
        )
        .join(''),
      html: value
        .split('')
        .map(val => '&#' + val.charCodeAt(0) + ';')
        .join(''),
      gbk: [...string2GBK(value)].map(val => '\\' + val.toString(8)).join(''),
    })
  }
  const decodeUrl = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: '',
      gbk: ''
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
  const decodeB64 = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: '',
      gbk: ''
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
  const decodeUni = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: '',
      gbk: ''
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
  const decodeHtml = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: '',
      gbk: ''
    }
    try {
      tempObj.html = value
      tempObj.text = value
        .split(/\W+/g)
        .filter(x => x !== '')
        .map(x => String.fromCharCode(Number(x)))
        .join('')
      tempObj.unicode = value
        .split(/\W+/g)
        .filter(x => x !== '')
        .map(x => '\\u' + (Number(x) * 1).toString(16).padStart(4, '0'))
        .join('')

      updateEncodeObj(tempObj)
    } catch (error) {
      console.log('error', error)
      message.error('输入有误')
    }
  }
  const decodeGBK = ({
    target: { value }
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = {
      text: '',
      url: '',
      b64: '',
      unicode: '',
      html: '',
      gbk: ''
    }
    try {
      tempObj.gbk = value;
      // input to oct
      const arr = value.trim().split('\\').filter(x => x).map(x => String.fromCharCode(parseInt(x, 8)).charCodeAt(0))
      tempObj.text = new TextDecoder('gbk').decode(new Uint8Array(arr))
      updateEncodeObj(tempObj)
    } catch (error) {
      console.log('error', error)
      message.error('输入有误')
    }
  }
  return (
    <div className="inner-page encodePage">
      <div className="encode">
        <h2>编码解码</h2>
        <div className="encodeContent">
          <div className="origVal">
            <TextArea
              rows={4}
              placeholder="编码"
              value={encodeObj.text}
              onChange={origTextInput}
            />
          </div>
          <div className="encodeVal">
            {checkbox}
            <Card size="small" title="网址编码">
              <div className="text">对统一资源标识符（URI）进行编码</div>
              <TextArea
                rows={4}
                placeholder="%E7%BC%96%E7%A0%81"
                value={encodeObj.url}
                onChange={decodeUrl}
              />
              <Checkbox
                className="text"
                checked={checkbox}
                onChange={checkboxChange}>
                URIComponent 模式
              </Checkbox>
            </Card>
            <Card size="small" title="Base64 编码">
              <div className="text">使用 Base64 进行编码解码</div>
              <TextArea
                rows={4}
                placeholder="57yW56CB"
                value={encodeObj.b64}
                onChange={decodeB64}
              />
            </Card>
            <Card size="small" title="Unicode 编码">
              <div className="text">输入字符，自动获取 Unicode 编码</div>
              <TextArea
                rows={4}
                placeholder="\u7f16\u7801"
                value={encodeObj.unicode}
                onChange={decodeUni}
              />
              <div className="text">HTML 实体</div>
              <TextArea
                rows={4}
                placeholder={'&#32534;&#30721;'}
                value={encodeObj.html}
                onChange={decodeHtml}
              />
            </Card>
            <Card size="small" title="GBK 编码">
              <div className="text">使用 GBK 进行编码解码</div>
              <TextArea
                rows={4}
                placeholder="\261\340\302\353"
                value={encodeObj.gbk}
                onChange={decodeGBK}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Encode

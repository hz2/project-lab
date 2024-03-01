import { useState } from 'react'
import { ColorPicker, ColorPickerProps, Input, QRCode, QRCodeProps, Segmented, message } from 'antd'
import './style.less'
// import jsQR from "jsqr";
const { TextArea } = Input

const QsPage = () => {
  const [inputVal, setInput] = useState(window.location.href)

  const [color, setColor] = useState<ColorPickerProps['value']>('#e8e8e8');
  const [level, setLevel] = useState<string | number>('L');
  const size = 320

  return (
    <div className="encodePage">

      <h2>二维码</h2>
      <QRCode
        style={{ marginBottom: 16 }}
        color={String(color)}

        size={size}
        iconSize={size / 4}
        errorLevel={level as QRCodeProps['errorLevel']}
        value={inputVal}
      />
      <div className="simple-form">
        <div className="item">
          <div className="label">二维码颜色：</div>
          <div className="val">
            <ColorPicker showText value={color} onChange={(val) => setColor(val.toHexString())} />
          </div>
        </div>
        <div className="item">
          <div className="label">容错级别：</div>
          <div className="val">
            <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
          </div>
        </div>
        <div className="item">
          <div className="label">二维码内容：</div>
          <div className="val">
            <TextArea
              placeholder={'请输入'}
              rows={6}
              value={inputVal}
              onChange={({ target: { value } }) => setInput(value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QsPage

import React from 'react'
// import qs from 'qs'
import { Input } from 'antd'
import './style.less'
const { TextArea } = Input

interface IProps { }
interface State {
  val1: string;
  val2: string;
}

class page extends React.Component<IProps, State>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      val1: '',
      val2: ''
    }
  }
  componentDidMount() { }

  componentWillUnmount() { }

  handleChange1({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) {
    let obj = {
      vector: 'svg',
      group: 'g',
      'android:pathData': 'd',
      'android:fillColor': 'fill',
      // 'android:height': 'height',
      // 'android:width': 'width',
      'android:fillType': 'fill-rule',
      'android:fillAlpha': 'fill-opacity',
      'android:strokeColor': 'stroke',
      'android:strokeWidth': 'stroke-width',
      'android:strokeAlpha': 'stroke-opacity',
      'android:strokeLineCap': 'stroke-linecap',
      'android:strokeLineJoin': 'stroke-linejoin',
      'android:autoMirrored="true"': 'style="transform: rotateY(180deg);"',
      '@android:color/': '',
      '([\\d.-]+)dip': (_a: string, b: string) => b,
      '#([\\w\\d]{2})([\\w\\d]{6})': (_a: string, _b: string, c: string) => '#' + c,
      'android:(height|width)="[\\d\\.\\w]+"': '',
      'android:translateX="([\\d.-]+)" android:translateY="([\\d.-]+)"': (
        _a: string,
        b: string,
        c: string
      ) => `transform="translate(${b} ${c})"`,
      'android:viewport\\w+="([\\d.-]+)" android:viewport\\w+="([\\d.-]+)"': (
        _a: string,
        b: string,
        c: string
      ) => `viewBox="0 0 ${b} ${c}"`,
      'xmlns:android="http://schemas.android.com/apk/res/android"':
        'xmlns="http://www.w3.org/2000/svg"'
    }
    let tmp = value
    Object.entries(obj).forEach(x => {
      let tmpreg = new RegExp(x[0], 'g')
      if (typeof x[1] === 'function') {
        tmp = tmp.replace(tmpreg, x[1])
      } else {
        tmp = tmp.replace(tmpreg, x[1])
      }
    })
    this.setState({
      val1: value,
      val2: tmp
    })
  }
  handleChange2({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      val2: value
    })
  }

  render() {
    // let v2 = this.state.val2
    return (
      <div style={{ display: 'flex' }}>
        <div className="container">
          <TextArea
            placeholder=""
            autoSize={{ minRows: 10, maxRows: 16 }}
            value={this.state.val1}
            onChange={e => this.handleChange1(e)}
          />
          <div style={{ margin: '24px 0' }} />
          <TextArea
            placeholder=""
            autoSize={{ minRows: 10, maxRows: 16 }}
            value={this.state.val2}
            onChange={e => this.handleChange2(e)}
          />
        </div>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: this.state.val2 }}></div>
      </div>
    )
  }
}

export default page

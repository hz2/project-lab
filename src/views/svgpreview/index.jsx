import React from 'react'
// import qs from 'qs'
import { Input } from 'antd'
import './style.less'
const { TextArea } = Input

class page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val1: '',
      val2: ''
    }
  }
  componentDidMount() {}

  componentWillUnmount() {}

  handleChange1({ target: { value } }) {
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
      '([\\d.-]+)dip': (a, b, c) => b,
      '#([\\w\\d]{2})([\\w\\d]{6})': (a, b, c) => '#' + c,
      'android:(height|width)="[\\d\\.\\w]+"': '',
      'android:translateX="([\\d.-]+)" android:translateY="([\\d.-]+)"': (
        a,
        b,
        c
      ) => `transform="translate(${b} ${c})"`,
      'android:viewport\\w+="([\\d.-]+)" android:viewport\\w+="([\\d.-]+)"': (
        a,
        b,
        c
      ) => `viewBox="0 0 ${b} ${c}"`,
      'xmlns:android="http://schemas.android.com/apk/res/android"':
        'xmlns="http://www.w3.org/2000/svg"'
    }
    let tmp = value
    Object.entries(obj).forEach(x => {
      let tmpreg = new RegExp(x[0], 'g')
      tmp = tmp.replace(tmpreg, x[1])
    })
    this.setState({
      val1: value,
      val2: tmp
    })
  }
  handleChange2({ target: { value } }) {
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
            autosize={{ minRows: 10, maxRows: 16 }}
            value={this.state.val1}
            onChange={e => this.handleChange1(e)}
          />
          <div style={{ margin: '24px 0' }} />
          <TextArea
            placeholder=""
            autosize={{ minRows: 10, maxRows: 16 }}
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

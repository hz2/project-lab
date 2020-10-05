import React from 'react'
import qs from 'qs'
import { Input } from 'antd'
import './style.less'
const { TextArea } = Input

class page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val1: '',
      val2: '',
      date: new Date()
    }
  }
  componentDidMount() {
    let obj = { id: 1, name: 'querystring' }
    console.log(qs.stringify(obj))

    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }
  handleChange1({ target: { value } }) {
    // console.log(value)
    this.setState({
      val1: value,
      val2: JSON.stringify(qs.parse(value))
    })
  }
  handleChange2({ target: { value } }) {
    // console.log(value)
    this.setState({
      val2: value,
      val1: qs.stringify(JSON.parse(value))
    })
  }

  render() {
    return (
      // const page = () => (
      <div className="container">
        <div>{this.state.date.toLocaleTimeString()}</div>
        <TextArea
          placeholder="id=1&name=querystring"
          autosize={{ minRows: 4, maxRows: 6 }}
          value={this.state.val1}
          onChange={e => this.handleChange1(e)}
        />
        <div style={{ margin: '24px 0' }} />
        <TextArea
          placeholder='{id: 1, name: "querystring"}'
          autosize={{ minRows: 4, maxRows: 6 }}
          value={this.state.val2}
          onChange={e => this.handleChange2(e)}
        />
      </div>
      // )
    )
  }
}

export default page

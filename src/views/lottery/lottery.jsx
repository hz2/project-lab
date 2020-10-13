import React, { useEffect } from 'react'
import './lottery.less'
import { Statistic, Row, Col } from 'antd'

// http://www.cwl.gov.cn/kjxx/ssq/ydjzjmx/

let alpha = '',
  beta = '',
  gamma = ''

let sarr = []
const genBall = (len = 33) => {
  const ballArr = Array.from(Array(len), (x, i) =>
    (i + 1).toString().padStart(2, '0')
  )
  const tianshi = Date.now().toString(32)
  const dili = [alpha, beta, gamma].map(x => x.toString(32).substring(4))
  const renhe = Math.random()
    .toString(32)
    .substring(2)
  const arr = [tianshi, dili, renhe].flat()
  sarr = arr
  const intN = BigInt(parseInt(arr.join(''), 32))
  console.log(sarr, intN, intN % BigInt(len))
  alert(JSON.stringify(sarr))
  console.log(ballArr[intN % BigInt(len)])
  return ballArr[intN % BigInt(len)]
}
const handleOrientation = orientData => {
  alpha = orientData.alpha
  beta = orientData.beta
  gamma = orientData.gamma
}

const twoColorBall = () => {
  // 第七条 "双色球"每注投注号码由6个红色球号码和1个蓝色球号码组成。
  // 红色球号码从1--33中选择;蓝色球号码从1--16中选择。
}

const { Countdown } = Statistic
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

function onFinish() {
  console.log('finished!')
}

const LotteryPage = () => {
  useEffect(() => {
    console.log('init')
    window.addEventListener('deviceorientation', handleOrientation, true)
  }, [])
  return (
    <div className="lotteryPage">
      <button onClick={() => genBall()}>按钮</button>
      sarr {JSON.stringify(sarr)}
      <Row gutter={16}>
        <Col span={12}>
          <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
        </Col>
        <Col span={12}>
          <Countdown
            title="Million Seconds"
            value={deadline}
            format="HH:mm:ss:SSS"
          />
        </Col>
        <Col span={24} style={{ marginTop: 32 }}>
          <Countdown
            title="Day Level"
            value={deadline}
            format="D 天 H 时 m 分 s 秒"
          />
        </Col>
      </Row>
    </div>
  )
}

export default LotteryPage

import React from 'react'
import './lottery.less'
// http://www.cwl.gov.cn/kjxx/ssq/ydjzjmx/
const twoColorBall = () => {
  // 第七条 "双色球"每注投注号码由6个红色球号码和1个蓝色球号码组成。红色球号码从1--33中选择;蓝色球号码从1--16中选择。
}

import { Statistic, Row, Col } from 'antd'

const { Countdown } = Statistic
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

function onFinish() {
  console.log('finished!')
}

const LotteryPage = () => {
  return (
    <div className="lotteryPage">
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

/* global BigInt */
import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'antd'
import './lottery.less'
import CountUp from './countupComp'
const { TabPane } = Tabs

let alpha: number | '' = '',
  beta: number | '' = '',
  gamma: number | '' = ''

interface IGenBall {
  ball: string
  arr?: number[]
}
const genBall = (len: number = 33): Promise<IGenBall> =>
  new Promise((resolve, reject) => {
    const ballArr = Array.from(Array(len), (x, i) =>
      (i + 1).toString().padStart(2, '0')
    )
    // 天时 地利 人和
    const tianshi = Date.now().toString(32)
    const dili = [alpha, beta, gamma].map(x =>
      Number(x)
        .toString(32)
        .substring(4)
    )
    const renhe = Math.random()
      .toString(32)
      .substring(2)
    const arr = [renhe, dili, tianshi]
      .flat()
      .map(x => parseInt((x || 0).toString(), 32))
    // fn && fn(arr)
    const intN = BigInt(arr.join(''))
    const key = Number(intN % BigInt(len))
    // console.log(intN, 'intN', ballArr, intN % BigInt(len));
    resolve({ ball: ballArr[key], arr: arr })
  })

const handleOrientation = (event: DeviceOrientationEvent) => {
  alpha = event.alpha || ''
  beta = event.beta || ''
  gamma = event.gamma || ''
}

const LotteryPage = () => {
  const [rArr, setRarr] = useState<number[]>([])
  const [balldom, palceBall] = useState<JSX.Element | null>(null)
  const [balldom2, palceBall2] = useState<JSX.Element | null>(null)
  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation)
    }
    twoColorBall()
  }, [])

  const twoColorBall = (times?: number) => {
    const genGroup = (key = 0) => {
      const fullArr = new Set(
        Array.from(Array(30), async () => {
          const { arr, ball } = await genBall(33)
          if (arr) {
            setRarr(arr)
          }
          return ball
        })
      )
      const ball6 = [...Array.from(fullArr)].slice(-6).sort()
      const ball1 = genBall(16)
      return (
        <div className="ballgroup" key={key}>
          {ball6.map((x, i) => (
            <div className="ball redball" key={i}>
              <CountUp end={Number(x)} />
            </div>
          ))}
          <div className="ball blueball">
            <CountUp end={Number(ball1)} />
          </div>
        </div>
      )
    }
    if (times) {
      const list = (
        <div className="groups">
          {Array.from(Array(times), (x, i) => genGroup(i))}
        </div>
      )
      palceBall(list)
    } else {
      palceBall(genGroup())
    }
  }
  const superLottery = (times?: number) => {
    const genGroup = (key = 0) => {
      const fullArr = new Set(
        Array.from(Array(30), async () => {
          const { arr, ball } = await genBall(35)
          if (arr) {
            setRarr(arr)
          }
          return ball
        })
      )
      const ball5 = [...Array.from(fullArr)].slice(-5).sort()
      const fullArr2 = new Set(
        Array.from(Array(12), async () => {
          const { arr, ball } = await genBall(12)
          if (arr) {
            setRarr(arr)
          }
          return ball
        })
      )
      const ball2 = [...Array.from(fullArr2)].slice(-2).sort()
      return (
        <div className="ballgroup" key={key}>
          {ball5.map((x, i) => (
            <div className="ball blue2ball" key={i}>
              <CountUp end={Number(x)} />
            </div>
          ))}
          {ball2.map((x, i) => (
            <div className="ball yellowball" key={i}>
              <CountUp end={Number(x)} />
            </div>
          ))}
        </div>
      )
    }
    if (times) {
      const list = (
        <div className="groups">
          {Array.from(Array(times), (x, i) => genGroup(i))}
        </div>
      )
      palceBall2(list)
    } else {
      palceBall2(genGroup())
    }
  }

  return (
    <div className="lotteryPage">
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          twoColorBall()
          superLottery()
        }}>
        <TabPane tab="双色球" key="1">
          <div className="buttons">
            <Button type="primary" onClick={() => twoColorBall()}>
              单注
            </Button>
            <Button type="primary" onClick={() => twoColorBall(5)}>
              单注 x 5
            </Button>
            <span className="link">
              <a
                href="http://www.cwl.gov.cn/kjxx/ssq/"
                target="_blank"
                rel="noopener noreferrer">
                双色球开奖
              </a>
            </span>
          </div>
          <div className="ballList">{balldom}</div>
        </TabPane>
        <TabPane tab="大乐透" key="2">
          <div className="buttons">
            <Button type="primary" onClick={() => superLottery()}>
              单注
            </Button>
            <Button type="primary" onClick={() => superLottery(5)}>
              单注 x 5
            </Button>
            <span className="link">
              <a
                href="https://www.lottery.gov.cn/dlt/index.html"
                target="_blank"
                rel="noopener noreferrer">
                大乐透开奖
              </a>
            </span>
          </div>
          <div className="ballList">{balldom2}</div>
        </TabPane>
      </Tabs>
      <div style={{ display: 'none' }}>{JSON.stringify(rArr)}</div>
    </div>
  )
}

export default LotteryPage

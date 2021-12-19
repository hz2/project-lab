/* global BigInt */
import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'antd'
import './lottery.less'
const { TabPane } = Tabs

let alpha: number | '' = '',
  beta: number | '' = '',
  gamma: number | '' = ''

interface IGenBall {
  ball: string
  arr?: number[]
}
const genBall = (len: number = 33): Promise<IGenBall> => new Promise((resolve, reject) => {
  const ballArr = Array.from(Array(len), (x, i) =>
    (i + 1).toString().padStart(2, '0')
  )
  // 天时 地利 人和
  const tianshi = (Date.now() + Math.random() * 10e13).toString(32)
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
  const intN = BigInt(arr.join(''))
  const key = Number(intN % BigInt(len))
  // console.log(intN, 'intN', ballArr,key,  intN % BigInt(len));
  resolve({ ball: ballArr[key], arr: arr })
})

const pickBall = (arr: string[], num: number) => Array.from(new Set(arr), x => Number(x)).slice(-1 * num).sort((a, b) => a - b)

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

  const twoColorBall = async (times?: number) => {
    const genGroup = async (key = 0) => {
      const fullArrPromise = new Set(
        Array.from(Array(30), async () => {
          const { arr, ball } = await genBall(33)
          if (arr) {
            setRarr(arr)
          }
          return ball
        })
      )
      const fullArr = await Promise.all(Array.from(fullArrPromise))
      const ball6 = pickBall(fullArr, 6)
      const ball1 = Number((await genBall(16)).ball)
      return (
        <div className="ballgroup" key={key}>
          {ball6.map((x, i) => (
            <div className="ball redball" key={i}>{x}</div>
          ))}
          <div className="ball blueball">{ball1}</div>
        </div>
      )
    }
    if (times) {
      const list = <div className="groups">
        {await Promise.all(Array.from(Array(times), (x, i) => genGroup(i)))}
      </div>
      palceBall(list)
    } else {
      const group = await genGroup()
      palceBall(group)
    }
  }
  const superLottery = async (times?: number) => {
    const genGroup = async (key = 0) => {
      const fullArrPromise = new Set(
        Array.from(Array(30), async () => {
          const { arr, ball } = await genBall(35)
          if (arr) {
            setRarr(arr)
          }
          return ball
        })
      )
      const fullArr = await Promise.all(Array.from(fullArrPromise))
      const ball5 = pickBall(fullArr, 5)
      const fullArr2Promise = new Set(
        Array.from(Array(12), async () => {
          const { arr, ball } = await genBall(12)
          if (arr) {
            setRarr(arr)
          }
          return ball
        })
      )
      const fullArr2 = await Promise.all(Array.from(fullArr2Promise))
      const ball2 = pickBall(fullArr2, 2)
      return (
        <div className="ballgroup" key={key}>
          {ball5.map((x, i) => (
            <div className="ball blue2ball" key={i}>{x}</div>
          ))}
          {ball2.map((x, i) => (
            <div className="ball yellowball" key={i}>{x}</div>
          ))}
        </div>
      )
    }
    if (times) {
      const list = (
        <div className="groups">
          {await Promise.all(Array.from(Array(times), (x, i) => genGroup(i)))}
        </div>
      )
      palceBall2(list)
    } else {
      const group = await genGroup()
      palceBall2(group)
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

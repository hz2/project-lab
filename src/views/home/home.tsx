import React from 'react'
import { Divider, Popover } from 'antd'

import { Link } from 'react-router-dom'
import './home.less'

import { ReactComponent as PersonSvg } from './imgs/person.svg'
import { ReactComponent as BingSvg } from './imgs/bing.svg'
import { ReactComponent as SvgNasa } from './imgs/nasa.svg'
import { ReactComponent as ColorSvg } from './imgs/color.svg'
import { ReactComponent as LotterySvg } from './imgs/lottery.svg'
import { ReactComponent as PlumFlower } from './imgs/plumFlower.svg'
import { ReactComponent as EncodeSvg } from './imgs/encode.svg'
import { ReactComponent as HexSvg } from './imgs/hex.svg'
import { ReactComponent as CurrencySvg } from './imgs/currency.svg'
import { ReactComponent as QueryString } from './imgs/queryString.svg'
import { ReactComponent as SvgTool } from './imgs/svgtool.svg'
import { ReactComponent as IpSvg } from './imgs/ip.svg'
import { ReactComponent as LinkSvg } from './imgs/link.svg'
import { ReactComponent as MirrorSvg } from './imgs/TwemojiMirror.svg'
import { ReactComponent as ChatSvg } from './imgs/chat.svg'

const generatorList = [
  {
    name: 'person',
    zh: '用户',
    icon: <PersonSvg />,
  },
  {
    name: 'bing',
    zh: 'Bing',
    icon: <BingSvg />,
  },
  {
    name: 'nasa',
    zh: 'NASA',
    icon: <SvgNasa />,
  },
  {
    name: 'color',
    zh: '颜色',
    icon: <ColorSvg />,
  },
  {
    name: 'lottery',
    zh: '彩票',
    icon: <LotterySvg />,
  },
  {
    name: 'plumFlower',
    zh: '花',
    icon: <PlumFlower />,
  },
  // {
  //   name: 'docker',
  //   icon: <CodeTwoTone twoToneColor="#00bbbb" />
  // }
]
const cnverterList = [
  {
    name: 'encode',
    zh: '编码',
    icon: <EncodeSvg />,
  },
  {
    name: 'hex',
    zh: '十六进制',
    icon: <HexSvg />,
  },
  {
    name: 'currency',
    zh: '货币',
    icon: <CurrencySvg />,
  },
  {
    name: 'transform',
    zh: '转写',
    icon: <QueryString />,
  },
  // {
  //   name: 'QRCode',
  // icon:  <QRcode />
  // },
  {
    name: 'svg',
    zh: '矢量图',
    icon: <SvgTool />,
  },
]
const analyzerList = [
  {
    name: 'iPAddress',
    zh: '位置',
    icon: <IpSvg />,
  },
  {
    name: 'mirrors',
    zh: '镜像',
    icon: <MirrorSvg />,
  },
  // {
  //   name: 'bookmark',
  //   zh: '书签',
  //   icon: <ChatSvg />
  // }
]

const genTitle = (str: string) => {
  const FirstLetter = str.slice(0, 1).toUpperCase()
  return (
    FirstLetter +
    str.slice(1).replace(/[A-Z](?=[a-z])/g, (x: string) => ' ' + x)
  )
}

const genBtn = (list: any[], key: string) =>
  list.map((x: any, i: number) => (
    <Link
      className="item inline-block align-top center m10"
      type="primary"
      key={key + i}
      to={'/' + x.name}
      title={x.zh}>
      <div className="block">{x.icon}</div>
      <div className="text">{x.zh}</div>
    </Link>
  ))
const Home = (props: any) => (
  <div className="app-home">
    <section className="home-container">
      <h1 className="common-title page-title">
        <img src="./logo-lab-thin.svg" alt="lab-logo" className="lab-logo" />
        project Lab
      </h1>
      <h2>Generator</h2>
      <div className="btn-list">{genBtn(generatorList, 'gen')}</div>
      <h2>Converter</h2>
      <div className="btn-list">{genBtn(cnverterList, 'cov')}</div>
      <h2>Network</h2>
      <div className="btn-list">{genBtn(analyzerList, 'aly')}</div>
    </section>
    {/* <Counter /> */}
    <footer className="footer">
      <Divider>
        <span className="footertext">
          <span>2020-present</span>
          <span className="splitcolor">\</span>
          <span>made by </span>
          <a
            href="https://github.com/hz2/project-lab"
            target="_blank"
            rel="noopener noreferrer">
            hz2
          </a>
          <span className="splitcolor">\</span>
          <a
            href="https://github.com/hz2/project-lab/discussions/new"
            target="_blank"
            rel="noopener noreferrer">
            feedback
          </a>
          <span className="splitcolor">\</span>
          <Popover
            content={
              <img
                src="./gh_2799af390fcc_258.jpg"
                alt="lab-mpcode"
                className="lab-mpcode"
              />
            }>
            <span className="link">
              <LinkSvg />
              mini program
            </span>
          </Popover>
          {/* <a
            href="web+lab://bing"
            target="_blank"
            rel="noopener noreferrer">
            wallpaper
          </a> */}
        </span>
      </Divider>
    </footer>
  </div>
)

export default Home

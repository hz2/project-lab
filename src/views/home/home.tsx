
import { Divider, Popover } from 'antd'

import { Link } from 'react-router-dom'
import './home.less'
import LinkSvg from './imgs/link.svg?react'
import routerData from '@/routerData'
import { CSSProperties } from 'react'
import { AppstoreFilled, BulbFilled, CameraFilled, CodeFilled, CompassFilled, ControlFilled, EnvironmentFilled, FireFilled, GiftFilled, HourglassFilled, IdcardFilled, InteractionFilled, PictureFilled, RocketFilled, SmileFilled, StarFilled, TagFilled, ProductFilled, QrcodeOutlined, InsertRowBelowOutlined, PayCircleFilled } from '@ant-design/icons'

// import { ReactComponent as ChatSvg } from './imgs/chat.svg?react'


// const genTitle = (str: string) => {
//   const FirstLetter = str.slice(0, 1).toUpperCase()
//   return (
//     FirstLetter +
//     str.slice(1).replace(/[A-Z](?=[a-z])/g, (x: string) => ' ' + x)
//   )
// }


const iconList = {
  person: IdcardFilled,
  bing: CameraFilled,
  nasa: PictureFilled,
  color: SmileFilled,
  lottery: GiftFilled,
  'gua/*': CompassFilled,
  plumFlower: FireFilled,
  qs: CodeFilled,
  notation: TagFilled,
  hex: ControlFilled,
  encode: InteractionFilled,
  dataURL: BulbFilled,
  ipAddress: EnvironmentFilled,
  svgSymbol: StarFilled,
  svgo: RocketFilled,
  svgbg: AppstoreFilled,
  mirrors: HourglassFilled,
  random: ProductFilled,
  qrcode: QrcodeOutlined,
  table: InsertRowBelowOutlined,
  currency : PayCircleFilled,
}

const Home = (_props: any) => (
  <div className="app-home">
    <section className="home-container">
      <h1 className="common-title page-title">
        <img src="./logo-lab-thin.svg" alt="lab-logo" className="lab-logo" />
        Lab
      </h1>
      <div className="btn-list p30">{
        routerData.filter(x => x.showInHome).map((x, i: number) => {
          const color = `hwb(${Math.round(36 * i * Math.random())} 30% 15% / 100%)`
          const IconComp = iconList[(x.path) as keyof typeof iconList]
          // x.path
          return <Link
            style={{ '--color-item': color } as CSSProperties}
            className="item inline-block align-top center "
            type="primary"
            key={i}
            to={'/' + x.path.replace('/*', '')}
            title={x.zh}>
            <div className="letter">
              {IconComp && <IconComp style={{ color, opacity: .75 }} />}
            </div>
            <div className="text">{x.zh}</div>
          </Link>

        })
      }</div>
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

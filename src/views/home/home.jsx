import React from 'react'
import { Divider } from 'antd'
import {
  IdcardTwoTone,
  BuildTwoTone,
  CameraTwoTone,
  EyeTwoTone,
  HourglassTwoTone,
  FundTwoTone,
  ControlTwoTone,
  ApiTwoTone,
  GiftTwoTone,
  FireTwoTone,
  FilterTwoTone,
  HighlightTwoTone,
  CompassTwoTone
} from '@ant-design/icons'

import { Link } from 'react-router-dom'
import './home.less'

// import ReduxPage from './redux'

const generatorList = [
  {
    name: 'person',
    icon: <IdcardTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'bing',
    icon: <CameraTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'nasa',
    icon: <EyeTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'color',
    icon: <ControlTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'lottery',
    icon: <GiftTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'plumFlower',
    icon: <FireTwoTone twoToneColor="#00bbbb" />
  }
]
const cnverterList = [
  {
    name: 'encode',
    icon: <HourglassTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'hex',
    icon: <BuildTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'currency',
    icon: <FundTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'queryString',
    icon: <ApiTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'dataUrl',
    icon: <FilterTwoTone twoToneColor="#00bbbb" />
  },
  {
    name: 'svg',
    icon: <HighlightTwoTone twoToneColor="#00bbbb" />
  }
]
const analyzerList = [
  {
    name: 'ipAddress',
    icon: <CompassTwoTone twoToneColor="#00bbbb" />
  }
]

const genTitle = str =>
  str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, x => ' ' + x)

const genBtn = (list, key) =>
  list.map((x, i) => (
    <Link
      className="item inline-block align-top center m10"
      type="primary"
      key={key + i}
      to={location => '/' + x.name}
      title={genTitle(x.name)}>
      <div className="block">{x.icon}</div>
      {/* <Button type="link">{genTitle(x.name)}</Button> */}
      <div className="text">{genTitle(x.name)}</div>
    </Link>
  ))
const Home = props => (
  <div className="app-home">
    <section className="home-container">
      <h1 className="common-title page-title">
        <img src="./logo-lab-thin.svg" alt="lab-logo" className="lab-logo" /> project
        Lab
      </h1>
      <h2>Generator</h2>
      <div className="btn-list">{genBtn(generatorList, 'gen')}</div>
      <h2>Converter</h2>
      <div className="btn-list">{genBtn(cnverterList, 'cov')}</div>
      <h2>Analyzer</h2>
      <div className="btn-list">{genBtn(analyzerList, 'aly')}</div>
    </section>
    {/* <ReduxPage /> */}
    <footer className="github">
      <Divider>
        <span className="footertext">
          <span>2020-present</span>
          <span className="splitcolor">\</span>
          <span>made with </span>
          <span role="img" aria-label="sleep">
            💤
          </span>
          <span> by </span>
          <a
            href="https://github.com/hz2/project-lab"
            target="_blank"
            rel="noopener noreferrer">
            Hz²
          </a>
          <span className="splitcolor">\</span>
          <a
            href="https://github.com/hz2/project-lab/discussions/new"
            target="_blank"
            rel="noopener noreferrer">
            feedback
          </a>
        </span>
      </Divider>
    </footer>
  </div>
)

export default Home

import React from 'react'
import { Button, Divider } from 'antd'
import { IdcardTwoTone } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import './home.less'

// import ReduxPage from './redux'

const generatorList = [
  'person',
  'bing',
  'nasa',
  'color',
  'lottery',
  'plumFlower'
]
const cnverterList = [
  'encode',
  'hex',
  'currency',
  'queryString',
  'dataUrl',
  'svg'
]
const analyzerList = ['ipAddress']

const iconObj = {
  person: <IdcardTwoTone />
}

const genTitle = str =>
  str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, x => ' ' + x)

const genBtn = (list, key) =>
  list.map((x, i) => (
    <div className="m10" type="primary" key={key + i}>
      {iconObj[x]}
      <Link to={location => '/' + x}>{genTitle(x)}</Link>
    </div>
  ))
const Home = props => (
  <div className="app-home">
    <h2>Generator</h2>
    <div className="btn-list">{genBtn(generatorList, 'gen')}</div>
    <h2>Converter</h2>
    <div className="btn-list">{genBtn(cnverterList, 'cov')}</div>
    <h2>Analyzer</h2>
    <div className="btn-list">{genBtn(analyzerList, 'aly')}</div>

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

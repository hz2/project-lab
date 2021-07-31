import React from 'react'
import { Button, Divider } from 'antd'

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

const genTitle = str =>
  str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, x => ' ' + x)

const genBtn = (list, history, key) =>
  list.map((x, i) => (
    <Button className="m10" type="primary" key={key + i}>
      <Link to={location => '/' + x}>{genTitle(x)}</Link>
    </Button>
  ))
const Home = props => (
  <div className="app-home">
    <h2>Generator</h2>
    <div className="btn-list">
      {genBtn(generatorList, props.history, 'gen')}
    </div>
    <h2>Converter</h2>
    <div className="btn-list">{genBtn(cnverterList, props.history, 'cov')}</div>
    <h2>Analyzer</h2>
    <div className="btn-list">{genBtn(analyzerList, props.history, 'aly')}</div>

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

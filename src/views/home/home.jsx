import React from 'react'
import { Button, Divider } from 'antd'

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
const cnverterList = ['encode', 'hex', 'currency', 'queryString', 'svg']
const analyzerList = ['ipAddress']

const genTitle = str =>
  str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, x => ' ' + x)

const genBtn = (list, history) =>
  list.map((x, i) => (
    <Button type="primary" key={i} onClick={() => history.push('/' + x)}>
      {genTitle(x)}
    </Button>
  ))
const Home = props => (
  <div className="app-home">
    <h2>Generator</h2>
    <div className="btn-list">{genBtn(generatorList, props.history)}</div>
    <h2>Converter</h2>
    <div className="btn-list">{genBtn(cnverterList, props.history)}</div>
    <h2>Analyzer</h2>
    <div className="btn-list">{genBtn(analyzerList, props.history)}</div>

    {/* <ReduxPage /> */}
    <footer className="github">
      <Divider>
        <span className="footertext">
          <span>2020-present</span>
          <span className="splitcolor">\</span>
          <span>Made with </span>
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
            Feedback
          </a>
        </span>
      </Divider>
    </footer>
  </div>
)

export default Home

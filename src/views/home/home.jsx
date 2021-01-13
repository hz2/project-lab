import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Divider } from 'antd'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

import './home.less'

const generatorList = ['person', 'bing', 'color', 'lottery', 'plumFlower']
const cnverterList = ['encode', 'hex', 'queryString']

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
    <div className="github">
      <Divider>
        <span>
          <span>2020-present</span>
          <span className="splitcolor">\</span>
          <span>Made with </span>
          <span role="img" aria-label="sleep">
            💤
          </span>
          <span className="splitcolor">\</span>
          <span>by </span>
          <a
            href="https://github.com/hz2/project-notwiki-lab-mirror"
            target="_blank"
            rel="noopener noreferrer">
            Hz²
          </a>
        </span>
      </Divider>
    </div>
  </div>
)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('#/about')
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)

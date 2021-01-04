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

const Home = props => (
  <div className="app-home">
    <h2>Generator</h2>
    <div className="btn-list">
      {[
        {
          name: 'Person',
          path: '/person'
        },
        {
          name: 'Bing',
          path: '/bing'
        },
        {
          name: 'Color',
          path: '/color'
        },
        {
          name: 'Lottery',
          path: '/lottery'
        },
        {
          name: 'Plum Flower',
          path: '/plumFlower'
        }
      ].map((x, i) => (
        <Button
          type="primary"
          key={i}
          onClick={() => props.history.push(x.path)}>
          {x.name}
        </Button>
      ))}
    </div>
    <h2>Converter</h2>
    <div className="btn-list">
      {[
        {
          name: 'Encode',
          path: '/encode'
        }
      ].map((x, i) => (
        <Button
          type="primary"
          key={i}
          onClick={() => props.history.push(x.path)}>
          {x.name}
        </Button>
      ))}
    </div>
    <div className="github">
      <Divider>
        <span>github</span>
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

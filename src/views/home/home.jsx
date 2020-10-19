import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

const Home = props => (
  <div className="app-home">
    <h1>Home</h1>
    <div className="btn-list">
      {[
        {
          name: 'ID Card',
          path: '/idcard'
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
          name: 'Encode',
          path: '/encode'
        },
        {
          name: 'Lottery',
          path: '/lottery'
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

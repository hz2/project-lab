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
  <div>
    <h1>Home</h1>
    <p>Count: {props.count}</p>

    <p>
      <Button type="primary" onClick={props.increment}>
        Increment
      </Button>
      <Button
        type="primary"
        onClick={props.incrementAsync}
        disabled={props.isIncrementing}>
        Increment Async
      </Button>
    </p>

    <p>
      <Button type="primary" onClick={props.decrement}>
        Decrement
      </Button>
      <Button
        type="primary"
        onClick={props.decrementAsync}
        disabled={props.isDecrementing}>
        Decrement Async
      </Button>
    </p>

    <p>
      <Button type="primary" onClick={() => props.changePage()}>
        Go to about page via redux
      </Button>
    </p>
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
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

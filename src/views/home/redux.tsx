import React from 'react'
import { push } from 'connected-react-router'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  CounterType
} from '../../modules/counter'

type TEvent = React.MouseEventHandler<HTMLElement> | undefined;

type TProps = {
  count: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  increment: TEvent
  incrementAsync: TEvent
  isIncrementing: boolean | undefined;
  decrement: TEvent
  decrementAsync: TEvent
  isDecrementing: boolean | undefined;
  changePage: () => void
}

const Home = (props: TProps) => (
  <div>
    <br />
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

const mapStateToProps = ({ counter }: { counter: TProps }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
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

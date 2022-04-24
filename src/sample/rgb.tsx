import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  LinkProps,
  useParams
} from 'react-router-dom'

import './rgb.less'

function AnimationExample() {
  const loc = useLocation()
  return <div style={styles.fill}>
      <Routes>
        <Route
          path="/rgb/*"
          element={<Navigate to="/hsl/10/90/50" />}
        /></Routes>
      <ul style={styles.nav}>
        <NavLink to="/hsl/10/90/50">Red</NavLink>
        <NavLink to="/hsl/120/100/40">Green</NavLink>
        <NavLink to="/rgb/33/150/243">Blue</NavLink>
        <NavLink to="/rgb/240/98/146">Pink</NavLink>
      </ul>
    <div className="qq"><>{JSON.stringify(loc ) }</></div>
      <div style={styles.content}>
        <TransitionGroup>
          <CSSTransition
            key={loc.key}
            classNames="fade"
            timeout={300}>
            <Routes >
              <Route path="/hsl/:h/:s/:l" element={<HSL />} />
              <Route path=":r/:g/:b" element={<RGB />} />
              {/* <Route element={<div>Not Found</div>} /> */}
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
}

function NavLink(props: LinkProps) {
  return (
    <li style={styles.navItem}>
      <Link {...props} style={{ color: 'inherit' }} />
    </li>
  )
}

function HSL() {
  let params = useParams();
  return <div
    style={{
      ...styles.fill,
      ...styles.hsl,
      background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
    }}>
    hsl(
    {params.h}, {params.s}
    %, {params.l}
    %)
  </div>

}

function RGB() {
  let params = useParams();
  return <div
    style={{
      ...styles.fill,
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`
    }}>
    rgb({params.r}, {params.g}, {params.b})
  </div>
}

interface IStyle {
  [key: string]: React.CSSProperties
}

const styles: IStyle = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

styles.rgb = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

export default AnimationExample

import { HomeOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import './header.less'

const HeaderBar = () => {
  const location = useLocation()
  if (location.pathname !== '/') {
    return (
      <div className="headerIcon">
        <Link to="/">
          {' '}
          <HomeOutlined />
        </Link>
      </div>
    )
  } else {
    return <></>
  }
}

export default HeaderBar

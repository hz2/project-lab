import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './header.less'

const HeaderBar = () => {
  return (
    <div className="headerIcon">
      <Link to="/">
        {' '}
        <HomeOutlined />
      </Link>
    </div>
  )
}

export default HeaderBar

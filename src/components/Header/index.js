import './index.css'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="header-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-icon"
        />
      </Link>

      <div className="nav-items">
        <Link to="/" className="header-link">
          <h1 className="item1">Home</h1>
        </Link>
        <Link to="/jobs" className="header-link">
          <h1>Jobs</h1>
        </Link>
      </div>
      <ul className="icons-con">
        <Link to="/" className="header-link">
          <li>
            <AiFillHome className="home-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="header-link">
          <li>
            <BsFillBriefcaseFill className="briefcase-icon" />
          </li>
        </Link>
        <button type="button" className="logout-btn" onClick={onLogoutBtn}>
          <li>
            <FiLogOut className="logout-icon" />
          </li>
        </button>
      </ul>
      <button type="button" className="lg-logout-btn" onClick={onLogoutBtn}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)

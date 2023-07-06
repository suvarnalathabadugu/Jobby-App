import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = token => {
    const {history} = this.props

    Cookies.set('jwt_token', token, {expires: 30})

    history.replace('/')
  }

  onLoginBtn = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const credentials = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }

    const response = await fetch(url, options)

    const data = await response.json()
    const jwtToken = data.jwt_token

    if (response.ok === true) {
      this.onSubmitSuccess(jwtToken)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  renderError = () => {
    const {errorMsg} = this.state
    return <p className="error-msg">* {errorMsg}</p>
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="bg-container">
          <form className="login-container" onSubmit={this.onLoginBtn}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input"
              onChange={this.onUsername}
              value={username}
              placeholder="Username"
            />
            <label htmlFor="pass" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="pass"
              className="username-input"
              onChange={this.onPassword}
              value={password}
              placeholder="Password"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {errorMsg.length > 0 && this.renderError()}
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm

import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import pageStyle from '../../styles/page.sass';
import authStyle from '../../styles/auth.sass';

import { login } from '../../actions'


const Login = ({ user, login, push }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email: { value: email }, password: { value: password } } = e.target
    await login({ email, password })
    if(user.token) push('/')
  }

  console.log('pageStyle', pageStyle.skybondsWrap)
  return (
    <div className={pageStyle.skybondsWrap}>
      <div className={authStyle.auth + ' ' + authStyle.auth_login}>
        <div className={authStyle.auth_box}>
          <ul className={authStyle.authHeader}>
            <li className={authStyle.authHeader_item}>
              <Link to={'/'} className={authStyle.authHeader_link}>SkyBonds</Link>
            </li>
          </ul>
          <form onSubmit={handleSubmit}>
            <div className={authStyle.auth_row}>
              <label className={authStyle.auth_label}>
                <span>E-mail</span>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className={authStyle.formInput}
                  autoFocus
                  required
                />
              </label>
            </div>
            <div className={authStyle.auth_row + ' ' + authStyle.auth_row__password}>
              <label className={authStyle.auth_label}>
                <span>Password</span>
                <input
                  type='password'
                  name="password"
                  placeholder="Password"
                  className={authStyle.formInput}
                  required
                />
              </label>
              <a className={authStyle.auth_forgot}>Forgot?</a>
            </div>
            <div className={authStyle.auth_row + ' ' + authStyle.auth_row__submit}>
              <button className={' btn btn-primary ' + authStyle.auth_submit} type="submit">
                <span>Login</span>
              </button>
            </div>
            <div className={ authStyle.authErrors }>
              {user.error ? JSON.stringify(user) : ''}
              {user.token ? <Redirect to="/" /> : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  login: React.PropTypes.func.isRequired
}


const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { login })(Login)

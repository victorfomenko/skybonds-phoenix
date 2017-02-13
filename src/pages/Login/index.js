import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


import { login } from '../../actions'


const Login = ({ user, login }) => {
  const handleSubmit = (e) => {
    console.log(login);
    e.preventDefault()
    const { email: { value: email }, password: { value: password } } = e.target
    login({ email, password })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      	<input
          type='email'
          name='email'
          placeholder='Email'
          autoFocus
          required
        />
      	<input
          type='password'
          name="password"
          placeholder="Пароль"
          required
        />
        <br/>
        <input type="submit" value="Войти" />
      </form>

      {JSON.stringify(user)}
    </div>
  )
}

Login.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  login: React.PropTypes.func.isRequired,
}


const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { login })(Login)

import React from 'react'
import { Redirect } from 'react-router-dom'


const Login = ({ user, login }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email: { value: email }, password: { value: password } } = e.target
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      	<input type='text'/>
      	<input type='password'/>
      </form>
    </div>
  )
}

export default Login
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


import { logout } from '../../actions'


const Logout = ({ user, logout }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    //logout()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Выйти" />
      </form>
      {!user.id && <Redirect to="/" />}
    </div>
  )
}

logout.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  logout: React.PropTypes.func.isRequired,
}


const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { logout })(Logout)
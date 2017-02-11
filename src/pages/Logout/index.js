import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


import { logout } from '../../actions'


class Logout extends Component {
  constructor(props) {
    super(props);
    this.makeLogout()
  }

  async makeLogout(){
    await this.props.logout()
  }

  render() {
    return <Redirect to="/" />
  }
}

Logout.propTypes = {
  logout: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { logout })(Logout)
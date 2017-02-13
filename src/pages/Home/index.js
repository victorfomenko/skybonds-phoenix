import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({ user }) => (
  <div>
  {JSON.stringify(user)}
  	<span>Home page</span>
  	<ul>
  		<li><Link to={'/'}>Home</Link></li>
  		<li><Link to={'/reports/market'}>Market</Link></li>
  		{!user.token ? <li><Link to={'/login'}>Login</Link></li> : null}
  		{user.token ? <li><Link to={'/logout'}>Logout</Link></li> : null}
  	</ul>
  	
  </div>
)

Home.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
}

export default connect(state => ({ user: state.user }))(Home)
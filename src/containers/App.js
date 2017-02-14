import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Header from '../components/Header';
import Reports from '../pages/Reports';
import Home from '../pages/Home'

import style from './styles/phoenix.sass';

// const Home = () => <Async load={import('./Home')} />

const App = ({ user }) => (
  <div className='skybonds'>
    <Header />
    <Switch>
	    <Route path="/" exact={true} component={Home}/>
	     {user.token ? <Route path="/reports" component={Reports} /> : null}
	    <Route path="/login" component={Login} />
	    <Route path="/logout" component={Logout} />
	    <Redirect to="/" />
    </Switch>
  </div>
)

App.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
}

export default connect(state => ({ user: state.user }))(App)

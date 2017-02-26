import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Header from '../components/Header';
import Reports from '../pages/Reports';
import Home from '../pages/Home';
import Bond from '../pages/Bond';

import styles from './styles.sass';

// const Home = () => <Async load={import('./Home')} />

const PrivateRoute = ({ component, user, ...rest }) => (
  <Route {...rest} render={props => (
    user.token ? (
      React.createElement(component, props)
    ) : (
      <Redirect to= '/login' />
    )
  )}/>
)

const App = ({ user }) => (
  <div className='skybonds'>
    <Switch>
	    <Route path="/login" component={Login} />
	    <Route path="/logout" component={Logout} />

        <PrivateRoute path="/" exact={true} component={Home} user={user}/>
        <PrivateRoute path="/reports" component={Reports} user={user}/>
        <PrivateRoute path="/bond/:isin" component={Bond} user={user}/>

        <Redirect to="/" />
    </Switch>
  </div>
);

App.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  summary: React.PropTypes.shape({}).isRequired,
};

export default connect(state => ({ user: state.user, summary: state.summary }))(App);

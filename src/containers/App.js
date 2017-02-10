import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Header from '../components/Header';
import Reports from '../pages/Reports';
import Home from '../pages/Home'

import style from '../phoenix.sass';

// const Home = () => <Async load={import('./Home')} />

const App = ({ user }) => (
  <div>
    <Header />
    <Switch>
	    <Route path="/" exact={true} component={Home}/>
	    <Route path="/reports" component={Reports} />
	    <Route path="/login" component={Login} />
	    <Redirect to="/" />
    </Switch>
  </div>
)

// App.propTypes = {
//   user: React.PropTypes.shape({}).isRequired,
// }

export default connect(state => ({ user: {} }))(App)
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Login from './Auth/Login';
import Header from './Header';
import Market from './reports/Market';
import Home from './Home'

import style from '../phoenix.sass';

// const Home = () => <Async load={import('./Home')} />

const App = ({ user }) => (
  <div>
    <Header />
    <Route path="/" exact={true} component={Home}/>
    <Route path="/reports/market" component={Market} />
    <Route path="/login" component={Login} />
  </div>
)

// App.propTypes = {
//   user: React.PropTypes.shape({}).isRequired,
// }

export default connect(state => ({ user: {} }))(App)
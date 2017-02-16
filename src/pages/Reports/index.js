import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';


import Market from './Market';


const Reports = ({ match }) => (
    <Route path={`${match.url}/market/:reportID?`} component={Market}/>
    //{/*<Route path="/reports/portfolio" component={Portfolio} />*/}
);

export default connect(state => ({ user: {} }))(Reports);
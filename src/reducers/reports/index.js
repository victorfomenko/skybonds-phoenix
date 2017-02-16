import { combineReducers } from 'redux';

import market from './market';
// import portfolioList from './portfolioList'

const reports = combineReducers({
  market
  // portfolioList
});

export default reports;

import { combineReducers } from 'redux';

import market from './market';
import orderVersion from './orderVersion';
// import portfolioList from './portfolioList'

const reports = combineReducers({
  market,
  // portfolioList
  orderVersion,
});

export default reports;

import { combineReducers } from 'redux';

import all from './all';
import market from './market';
// import portfolioList from './portfolioList'

const reports = combineReducers({
  all,
  market,
  // portfolioList
});

export default reports;
